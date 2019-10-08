export const SENT_GAME = 'SENT_GAME';
export const RECEIVED_GAME = 'RECEIVED_GAME';
export const CONTAINER = 'CONTAINER';
export const SERVER = 'SERVER';
export const RESET = 'RESET';

export default function reducer(
  state = initState,
  {type, ...payload}) {
    // console.log("In reducer:", type, "& Payload", payload, ' to update current state', state);

  switch (type) {
      // return Object.assign({}, state, payload);
    case CONTAINER:
    case RECEIVED_GAME:
    case RESET:
    case SENT_GAME:
    case SERVER:
      return { ...state, ...payload};
  
    default:
      // return state;
      throw new Error(
        `Tried to reduce with unsupported action type: ${type}`
      );
  }
};