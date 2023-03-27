import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../reducers/playerReducer"
import teamReducer from "../reducers/teamReducer"
const store = configureStore({
    reducer: {
      playerDetails:playerReducer,
      teamDetails:teamReducer
    },
  });
  
  export default store;