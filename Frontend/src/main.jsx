import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react.js";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { persistStor, store } from "./Store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
   <>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistStor}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </PersistGate>
         <ToastContainer />
      </Provider>
   </>
);
