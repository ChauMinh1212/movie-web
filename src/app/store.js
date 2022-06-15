import userReducer from "../features/Auth/userSlice";
import categoryReducer from "../features/Movie/categorySlice";

import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
  user: userReducer,
  category: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
