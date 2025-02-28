import React from "react"
import ReactDOM from "react-dom/client"
import "./themes/global.scss"
import App from "./App"
import { loadUser } from "contexts/loginReducer"
import { store, persistor } from "./utils/store"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
// import reportWebVitals from './reportWebVitals';

const token = store.getState().auth.token
if (token) {
  store.dispatch(loadUser(token))
}
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
