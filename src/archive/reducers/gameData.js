import { useEffect, useReducer } from "react";
import reducer, { INCREMENT } from "./gameReducers";

export default function useApplicationData({...count }) {
  
  const [ state, dispatch ] = useReducer(reducer, { 
    count: count
    });

  const add = status => dispatch({ type: INCREMENT })
  return { state, dispatch, add };
};