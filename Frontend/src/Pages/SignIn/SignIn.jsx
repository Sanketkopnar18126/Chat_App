import { useState } from "react";
import { NavLink } from "react-router-dom";
export const SignIn = () => {
   const [userData, setuserData] = useState({
      username: "",
      password: "",
   });

   const onHandleSubmit = async (e) => {
      e.preventDefault();
      //   try {
      //      const res = await fetch("/users/");
      //   } catch (error) {
      //      console.log("Error occur at React Ui Part at SignUp Page", error);
      //   }
   };
   return (
      <>
         <div className=" h-[96vh] flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-[26%] p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
               <h1 className="text-3xl font-semibold text-center text-gray-300">
                  Login
                  <span className="text-blue-500"> ChatApp</span>
               </h1>

               <form onSubmit={onHandleSubmit}>
                  <div>
                     <label className="label p-2 ">
                        <span className="text-base label-text">Username</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full input input-bordered h-10"
                        value={userData.username}
                        onChange={(e) =>
                           setuserData({
                              ...userData,
                              username: e.target.value,
                           })
                        }
                     />
                  </div>

                  <div>
                     <label className="label">
                        <span className="text-base label-text">Password</span>
                     </label>
                     <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full input input-bordered h-10"
                        value={userData.password}
                        onChange={(e) =>
                           setuserData({
                              ...userData,
                              password: e.target.value,
                           })
                        }
                     />
                  </div>

                  <NavLink
                     to={"/signup"}
                     className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
                  >
                     {"Don't"} have an account?
                  </NavLink>
                  <div>
                     {/* disabled={loading} */}
                     <button className="btn btn-block btn-sm mt-2">
                        {/* {loading ? <span className='loading loading-spinner '></span> : "Login"} */}
                        SignIn
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};
