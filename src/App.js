import React from "react";
import { Provider } from "react-redux";
import Router from "./routes";
import { store, persistor } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";

const App = () => {
	return (
		<div>
			<Provider store={store}>
				<PersistGate
					loading={null}
					persistor={persistor}>
					<Router />
				</PersistGate>
			</Provider>
		</div>
	);
};

export default App;
