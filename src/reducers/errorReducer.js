const errorReducer = (state = "", action) => {
    if (action.type === "LOAD_ERROR") {
      return action.payload;
    } else {
      return state;
    }
  };
  
  export default errorReducer;
  