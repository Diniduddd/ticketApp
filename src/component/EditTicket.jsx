import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { editTicketAction } from '../actions';
import { TICKET_STATUS } from '../constants';

const mapStateToProps = state => {
  return {
    tickets: state.tickets
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editTicket: (id, status, desc) => {
      dispatch(editTicketAction(id, status, desc))
    }
  }
};

const styles = {
  editContainer: {
    width: "400px",
    margin: "0px auto",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "3px",
    padding: "0.5em"
  },
  title:{
    textAlign:"center",
    fontSize: "28px"

  },
  errorInputs: {
    color: "red",
    fontSize: "13px"
  }
};

class EditTicket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      desc: '',
      status: '',
      errors: {
        desc: false,
        status: false,
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    tickets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.oneOf(Object.values(TICKET_STATUS))
    })),
    editTicket: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tickets: []
  };

  componentWillMount() {
    const { match: { params } } = this.props;

    const ticket = this.props.tickets.filter((ticket) => ticket.id === parseInt(params.ticketId, 10))[0];
    if (!ticket) {
      this.props.history.push('/');
    }
    else {
      this.setState({
        id: ticket.id,
        desc: ticket.desc,
        status: ticket.status,
      })
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.desc !== '' && this.state.status !== '') {
      this.props.editTicket(this.state.id, this.state.status, this.state.desc);
      this.props.history.push('/');
    }
  };

  handleChange(event, field) {
    if (field === 'desc') {
      this.setState({ desc: event.target.value });
    } else if (field === 'status') {
      this.setState({ status: event.target.value });
    }
  };

  render() {
    return (

      <div className="card bg-light mb-3" style={styles.editContainer}>
        <div className="card-header" style={styles.title}>Update Ticket</div>
        <div className="card-body">
            <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.desc}
                  onChange={(e) => {
                    this.handleChange(e, 'desc')
                  }}
                />
                {this.state.desc === '' &&
                <span style={styles.errorInputs}>This value is required</span>
                }
              </div>
              <div className="form-group">
                <label for="status" style={styles.label}>Status</label>
                <select id="status" className="form-control" value={this.state.status} onChange={(e) => {
                  this.handleChange(e, 'status')
                }}>
                  <option value={''}><span role="img" aria-label="Rocket">🚀</span></option>
                  {Object.values(TICKET_STATUS).map((val) => {
                    return <option key={val} value={val}>{val}</option>
                  })}
                </select>
                {this.state.status === '' &&
                <span style={styles.errorInputs}>This value is required</span>
                }
              </div>
              <div className="form-group">
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Update
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTicket);
