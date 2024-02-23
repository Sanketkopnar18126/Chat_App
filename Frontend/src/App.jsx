import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./Pages/SignIn/SignIn";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Home } from "./Pages/Home/Home";
import { Provider } from "react-redux";
import { persistStor, store } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import {ToastContainer} from 'react-toastify'
function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistStor}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="/signin" element={<SignIn />} />
               <Route path="/signup" element={<SignUp />} />
            </Routes>
         </BrowserRouter>
         </PersistGate>
         <ToastContainer/>
      </Provider>
   );
}

export default App;
