import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { addNewTicketAction } from '../actions';

const styles = {
  container: {
    width: "400px",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "30px",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "3px",
    padding: "0.5em"
  }
};

const mapStateToProps = state => {
  return {
    addTicketInProgress: state.addTicketInProgress
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTicket: ticket => {
      dispatch(addNewTicketAction(ticket))
    }
  }
};

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { desc: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    addTicket: PropTypes.func.isRequired,
    addTicketInProgress: PropTypes.bool.isRequired,
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.desc !== '' && !this.props.addTicketInProgress) {
      this.props.addTicket(this.state.desc);
      this.setState({ desc: '' });
    }
  }

  handleChange(event) {
    this.setState({ desc: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.container}>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.desc}
              onChange={this.handleChange}
            />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={this.props.addTicketInProgress}>
          ADD
        </button>
        </div>
        {this.props.addTicketInProgress &&
        <span> ... </span>
        }
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTicket);
