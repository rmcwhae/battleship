export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";

// const initState: { yoyo: boolean } = {
//   yoyo: false
// };

export const yoyo = () => ({
  type: YOYO_BOARD
});

export default function reducer(
  state = initState,
  {type: string, ...payload}) {
    console.log("Action:", type, "& Payload", payload);

  switch (type) {
    case INCREASE:
      return { ...state, count: state.count + 1 };

      case DECREASE:
        return { ...state, count: state.count + 1 };
  
      default:
        // return state;
        throw new Error(
          `Tried to reduce with unsupported action type: ${type}`
        );
  }
};