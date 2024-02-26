import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSendMessageData } from "../../Slice/usersendmessage.slice";
export const MessageInput = () => {
   const [mssg, setmssg] = useState();
   const { users } = useSelector((state) => state.usersdata);
   // console.log(users)
   // console.log("mssg",mssg)
   const dispatch=useDispatch()
   const onHandleSendBtn = async (e) => {
      e.preventDefault();
      try {
         const res = await fetch(`/users/send/send_message/${users?._id}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: mssg }),
         });

         if (res.ok) {
            const data = await res.json();

            console.log("Mssg send",data)
            dispatch(setSendMessageData(data))
         }
         setmssg("");
      } catch (error) {
         console.log("error at send messg in Messg IP Comp", error);
      }
   };

   return (
      <>
         <form className=" relative px-4 my-3">
            <div className="w-full">
               <input
                  type="text"
                  value={mssg}
                  onChange={(e) => setmssg(e.target.value)}
                  className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
                  placeholder="Send a message"
               />
               <button
                  type="submit"
                  onClick={onHandleSendBtn}
                  className="absolute right-[20px] bottom-[-3px] inset-y-0 end-0 flex items-center pe-3"
               >
                  <BsSend />
               </button>
            </div>
         </form>
      </>
   );
};
