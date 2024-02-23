import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export const SignUp = () => {
   const [userData, setuserData] = useState({
      fullname: "",
      username: "",
      password: "",
      gender: "",
      profile: "",
   });
   const [loading, setloading] = useState(false);
   const navigate = useNavigate();
   const onHandleCheckBox = (gender) => {
      setuserData({ ...userData, gender: gender });
   };

   const onHandleSubmit = async (e) => {
      e.preventDefault();
      try {
         setloading(true);
         const userFormData = new FormData();
         userFormData.append("fullname", userData.fullname);
         userFormData.append("username", userData.username);
         userFormData.append("password", userData.password);
         userFormData.append("gender", userData.gender);
         // userFormData.append("profile", userData.profile);
         for (let i = 0; i < userData.profile.length; i++) {
            userFormData.append("profile", userData.profile[i]);
         }
         console.log("userFormData", userFormData);
         const res = await fetch("/users/register", {
            method: "POST",

            body: userFormData,
         });
         // console.log(res);
         if (res.ok) {
            const data = await res.json();
            // console.log(data);

            // toast.success("Account Successfully created ", {
            //    position: "top-right",
            //    autoClose: 2000,
            //    hideProgressBar: false,
            //    closeOnClick: true,
            // });
            setuserData({
               username: "",
               password: "",
               profile: "",
               fullname: "",
               gender: "",
            });
            navigate("/signin");
            setloading(false);
         }
         setloading(false);
      } catch (error) {
         console.log("Error occur at React Ui Part at SignUp Page", error);
         setloading(false);
         // toast.success("Fill details properly ", {
         //    position: "top-right",
         //    autoClose: 2000,
         //    hideProgressBar: false,
         //    closeOnClick: true,
         // });
      }
   };
   // console.log("User", userData);
   return (
      <>
         <div className="h-[96vh] flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-[26%]  p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
               <h1 className="text-3xl font-semibold text-center text-gray-300">
                  Sign Up <span className="text-blue-500"> ChatApp</span>
               </h1>

               <form onSubmit={onHandleSubmit}>
                  <div>
                     <label className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                     </label>
                     <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full input input-bordered  h-10"
                        value={userData.fullname}
                        onChange={(e) =>
                           setuserData({
                              ...userData,
                              fullname: e.target.value,
                           })
                        }
                     />
                  </div>

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
                  {/* Add Images */}
                  <div>
                     <label className="label">
                        <span className="text-base label-text">
                           Choose Profile
                        </span>
                     </label>

                     <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full input input-bordered h-10"
                        onChange={(e) =>
                           setuserData({
                              ...userData,
                              profile: e.target.files,
                           })
                        }
                     />
                  </div>
                  {/* Gender Details */}
                  {/* <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} /> */}
                  <div className="flex">
                     <div className="form-control">
                        <label
                           className={`label gap-2 cursor-pointer ${userData.gender === "male" ? "selected" : ""} `}
                        >
                           <span className="label-text">Male</span>
                           <input
                              type="checkbox"
                              className="checkbox border-slate-900"
                              checked={userData.gender === "male"}
                              onChange={() => onHandleCheckBox("male")}
                           />
                        </label>
                     </div>
                     <div className="form-control">
                        <label
                           className={`label gap-2 cursor-pointer  ${userData.gender === "female" ? "selected" : ""}`}
                        >
                           <span className="label-text">Female</span>
                           <input
                              type="checkbox"
                              className="checkbox border-slate-900"
                              checked={userData.gender === "female"}
                              onChange={() => onHandleCheckBox("female")}
                           />
                        </label>
                     </div>
                  </div>
                  <NavLink
                     NavLink
                     to={"/signin"}
                     className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                     href="#"
                  >
                     Already have an account?
                  </NavLink>

                  <div>
                     {/* disabled={loading} */}
                     <button className="btn btn-block btn-sm mt-2 border border-slate-700">
                        {loading ? (
                           <span className="loading loading-spinner"></span>
                        ) : (
                           "Sign Up"
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};
