import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authRedux";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
