import { useEffect, useState } from "react";
import {  getRandomEmoji } from "../../Utils/emoji";
import {useDispatch} from 'react-redux'
import { setUser } from "../../Slice/users.slice";
export const Conversation = () => {
   const [usersData, setusersData] = useState();
const dispatch=useDispatch()
   useEffect(() => {
      const fetchingUsersData = async () => {
         try {
            const res = await fetch("/users/all_users/data");
            // console.log("res",res)

            const data = await res.json();
            setusersData(data);
         } catch (error) {
            console.log("error at fetching all users data", error);
         }
      };
      fetchingUsersData();
   }, []);
   // console.log("UsersData", usersData);

  //  const onHandleParticularUser=()=>{
  //   dispatch(setUser())
  //  }
  useEffect(()=>{
    return()=>{
      dispatch(setUser(null))
    }
  })
   return (
      <div>
         {usersData?.data?.user.map((data, index) => (
            <div key={data._id} onClick={()=>dispatch(setUser(data))}>
               <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
                  <div className="avatar online">
                     <div className="w-12 rounded-full">
                        <img src={data?.profile} alt="user avatar" />
                     </div>
                  </div>
                  <div className="flex flex-col flex-1">
                     <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">
                           {data.fullName}
                        </p>
                        <span className="text-xl">{getRandomEmoji()}</span>
                     </div>
                  </div>
               </div>
               {index === usersData.data.user.length - 1 ? (
                  ""
               ) : (
                  <div className="divider my-0 py-0 h-1" />
               )}
            </div>
         ))}
      </div>
   );
};
