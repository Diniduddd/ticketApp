import update from 'immutability-helper';

import {
  ADD_NEW_TICKET,
  ADD_TICKET_IN_PROGRESS,
  EDIT_TICKET,
  TICKET_STATUS
} from './constants';

const getNewTicketId = (tickets) => {
  let id = 0;
  for (let i = 0; i < tickets.length ; i++) {
    if(id <= tickets[i].id){
      id = tickets[i].id + 1;
    }
  }
  return id;
};

const initialState = {
  tickets: [],
  addTicketInProgress: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TICKET: {
      return update(state, { tickets: {$push: [{
            id: getNewTicketId(state.tickets),
            desc: action.value,
            status: TICKET_STATUS.TODO}]}});
    }
    case ADD_TICKET_IN_PROGRESS: {
      return update(state, { addTicketInProgress: {$set: action.value}})
    }
    case EDIT_TICKET: {

      return update(state, {
        tickets: {
          $apply: (tickets) => tickets.map((ticket) => {
            if (ticket.id === action.value.id) {
              return {
                id: action.value.id,
                desc: action.value.desc || ticket.desc,
                status: action.value.status || ticket.status,
              };
            }
            return ticket;
          })
        }
      });

    }
    default:
      return state;
  }
};
