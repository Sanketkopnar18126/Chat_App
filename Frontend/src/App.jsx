import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./Pages/SignIn/SignIn";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Home } from "./Pages/Home/Home";
import { useSelector } from "react-redux";
// import { Provider } from "react-redux";
// import { persistStor, store } from "./Store/store";
// import { PersistGate } from "redux-persist/integration/react";
// import {ToastContainer} from 'react-toastify'
function App() {

  const { currentUser } = useSelector((state) => state.userdata);

   return (
      // <Provider store={store}>
      //    <PersistGate loading={null} persistor={persistStor}>
      //    <BrowserRouter>
      <div className="p-4 h-screen flex items-center justify-center">
         <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path='/' element={currentUser ?.data? <Home /> : <Navigate to={"/signin"} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
         </Routes>
      </div>
      //    </BrowserRouter>
      //    </PersistGate>
      //    <ToastContainer/>
      // </Provider>
   );
}

export default App;
