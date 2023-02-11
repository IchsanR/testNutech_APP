import { combineReducers } from "redux";
import itemsReducer from "./items";
import userReducer from "./user";

const rootReducer = combineReducers({
	user: userReducer,
	items: itemsReducer,
});

export default rootReducer;
