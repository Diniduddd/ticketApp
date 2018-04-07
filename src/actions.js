import {
  TICKET_STATUS,
  ADD_NEW_TICKET,
  ADD_TICKET_IN_PROGRESS,
  EDIT_TICKET
} from './constants';

const delay = (t) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  });
};

const addNewTicketAction = (desc) => {
  return (dispatch) => {
    dispatch({ type: ADD_TICKET_IN_PROGRESS, value: true });
    delay(2000)
      .then(() => {
        dispatch({ type: ADD_NEW_TICKET, value: desc });
        dispatch({ type: ADD_TICKET_IN_PROGRESS, value: false });
      });
  }
};

const editTicketAction = (id, status, desc) => {
  return (dispatch) => {
    dispatch({ type: EDIT_TICKET, value: { id, status, desc } });
    if (status === TICKET_STATUS.DONE) {
      delay(5000)
        .then(() => {
          dispatch({ type: EDIT_TICKET, value: { id, status: TICKET_STATUS.CLOSE, desc } });
        });
    }
  }
};

export {
  ADD_NEW_TICKET,
  ADD_TICKET_IN_PROGRESS,
  EDIT_TICKET,
  addNewTicketAction,
  editTicketAction,
};
