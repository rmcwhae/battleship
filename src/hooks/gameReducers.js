export const SENT_GAME = 'SENT_GAME';
export const RECEIVED_GAME = 'RECEIVED_GAME';
export const CONTAINER = 'CONTAINER';
export const SERVER = 'SERVER';
export const INCREMENT = 'INCREMENT';
export const DECREASE = 'DECREASE';
export const TOGGLE = 'TOGGLE';
export const SCENE = 'SCENE';

export default function reducer(
  state = initState,
  {type, ...payload}) {
    console.log("In reducer:", type, "& Payload", payload);

  switch (type) {
    case SENT_GAME:
      return { ...state, ...payload};

    case RECEIVED_GAME:
      state = Object.assign({}, state, payload);
      console.log("After reducer change server state:", state.serverState, "with game:", state.gameState);
      return state;

    case CONTAINER:
      return { ...state,  ...payload};

    case SERVER:
      return { ...state,  ...payload};
 
    case DECREASE:
      return { ...state, count: state.count - 1};

    case INCREMENT:
      return { ...state, count: state.count + 1};

    case TOGGLE:
      return { ...state, ...payload};
    
    case SCENE:
      return { ...state, ...payload};
  
    default:
      // return state;
      throw new Error(
        `Tried to reduce with unsupported action type: ${type}`
      );
  }
};