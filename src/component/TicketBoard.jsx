import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Ticket from "./Ticket";
import {addNewTicketAction, editTicketAction} from '../actions';
import {TICKET_STATUS} from '../constants';
import AddTicket from './AddTicket';

const styles = {
  container: {
    display: "flex"
  },
  box: {
    flex: "0 1 33%",
    textAlign: "center",
    borderRight: "1px solid #ccc",
    label: {
      fontWeight: 600
    }
  }
};
const mapStateToProps = state => {
  return {
    tickets: state.tickets
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTicket: ticket => {
      dispatch(addNewTicketAction(ticket))
    },
    editTicket: (id, status, desc) => {
      dispatch(editTicketAction(id, status, desc))
    }
  }
};

class TicketBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {desc: ''};

    this.handleMoveTicket = this.handleMoveTicket.bind(this);
    this.goToEditTicket = this.goToEditTicket.bind(this);
  }


  static propTypes = {
    history: PropTypes.object,
    tickets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.oneOf(Object.values(TICKET_STATUS))
    })),
    addTicket: PropTypes.func.isRequired,
    editTicket: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tickets: []
  };

  goToEditTicket(id){
    this.props.history.push(`/ticket/${id}`);
  };

  handleMoveTicket(id, newState) {
    this.props.editTicket(id, newState);
  };

  render() {
    return (
      <div>
        <AddTicket/>
        <div style={styles.container}>
          <div style={styles.box}>
            <label style={styles.box.label}>IN-PROGRESS</label>
            {this.props.tickets
              .filter((ticket) => ticket.status === TICKET_STATUS.TODO)
              .map((ticket) => <Ticket key={ticket.id} id={ticket.id} desc={ticket.desc} status={ticket.status}
                                       goToEditTicket={this.goToEditTicket}
                                       handleMoveTicket={this.handleMoveTicket}/>)}
          </div>
          <div style={styles.box}>
            <label style={styles.box.label}>DONE</label>
            {this.props.tickets
              .filter((ticket) => ticket.status === TICKET_STATUS.DONE)
              .map((ticket) => <Ticket key={ticket.id} id={ticket.id} desc={ticket.desc} status={ticket.status}
                                       handleMoveTicket={this.handleMoveTicket}
                                       goToEditTicket={this.goToEditTicket}/>)}
          </div>
          <div style={styles.box}>
            <label style={styles.box.label}>CLOSE</label>
            {this.props.tickets
              .filter((ticket) => ticket.status === TICKET_STATUS.CLOSE)
              .map((ticket) => <Ticket key={ticket.id} id={ticket.id} desc={ticket.desc} status={ticket.status}
                                       goToEditTicket={this.goToEditTicket}
                                       handleMoveTicket={this.handleMoveTicket}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketBoard);


