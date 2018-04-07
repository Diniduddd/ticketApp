import React, { Component } from "react";
import PropTypes from "prop-types";

import { TICKET_STATUS } from '../constants';

const styles = {
  ticket: {
    cursor: "pointer",
    minHeight: "7em",
    padding: "0.5em",
    margin: "0.5em",
    fontWeight: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  btn: {
    marginRight: "10px"
  },
  title:{
    fontSize: "21px"
  }
};

class Ticket extends Component {
  static propTypes = {
    id: PropTypes.number,
    desc: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(TICKET_STATUS)),
    handleMoveTicket: PropTypes.func.isRequired,
    goToEditTicket: PropTypes.func.isRequired,
  };

  render() {
    const { desc } = this.props;

    const cardType = this.props.status === TICKET_STATUS.TODO ? "info" : 
    (this.props.status === TICKET_STATUS.DONE ? "success" : "danger");

    return (
      <div className={`card text-white bg-${cardType} mb-3`} style={styles.ticket}  onClick={() => {
        this.props.goToEditTicket(this.props.id)
      }}>
      <div className="card-header" style={styles.title}>{desc}</div>
      <div className="card-body">
        <div>
          <div>
            {this.props.status === TICKET_STATUS.TODO &&
            <button className="btn btn-primary" style={styles.btn} onClick={(e) => {
              e.stopPropagation();
              this.props.handleMoveTicket(this.props.id, TICKET_STATUS.DONE)
            }}>Done</button>
            }
            {this.props.status === TICKET_STATUS.DONE &&
            <button className="btn btn-warning" style={styles.btn} onClick={(e) => {
              e.stopPropagation();
              this.props.handleMoveTicket(this.props.id, TICKET_STATUS.TODO)
            }}>Not Fix</button>
            }
            {this.props.status !== TICKET_STATUS.CLOSE &&
            <button className="btn btn-danger" style={styles.btn} onClick={(e) => {
              e.stopPropagation();
              this.props.handleMoveTicket(this.props.id, TICKET_STATUS.CLOSE)
            }}>Close</button>
            }
          </div>
      </div>
      </div>
     </div>
    );
  }
}

export default Ticket;
