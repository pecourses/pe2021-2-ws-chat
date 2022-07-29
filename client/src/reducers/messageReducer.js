import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 10,
};

const messageReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPES.GET_MESSAGES_REQUEST:
    case ACTION_TYPES.CREATE_MESSAGE_REQUEST: {
      return produce(state, draftState => {
        draftState.isFetching = true;
        draftState.error = null;
      });
    }
    case ACTION_TYPES.GET_MESSAGES_SUCCESS: {
      const { payload: messages } = action;
      return produce(state, draftState => {
        draftState.messages = [];
        draftState.isFetching = false;
        draftState.messages.push(...messages.reverse());
      });
    }
    case ACTION_TYPES.CREATE_MESSAGE_SUCCESS: {
      const { payload: newMessage } = action;
      return produce(state, draftState => {
        draftState.isFetching = false;
        if (draftState.messages.length >= draftState.limit) {
          draftState.messages.splice(0, 1);
        }
        draftState.messages.push(newMessage);
      });
    }
    case ACTION_TYPES.GET_MESSAGES_ERROR:
    case ACTION_TYPES.CREATE_MESSAGE_ERROR: {
      const { payload: err } = action;
      return produce(state, draftState => {
        draftState.isFetching = false;
        draftState.error = err;
      });
    }
    default:
      return state;
  }
};

export default messageReducer;
