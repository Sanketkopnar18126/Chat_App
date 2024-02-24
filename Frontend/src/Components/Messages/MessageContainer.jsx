import { useSelector } from "react-redux";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { NoChatSelected } from "../Messages/NoChatSelected";
export const MessageContainer = () => {
   const { users } = useSelector((state) => state.usersdata);
   // console.log("use", users);
   return (
      <>
         {users ? (
            <div className="md:min-w-[450px] flex flex-col">
               <>
                  {/* Header */}
                  <div className="bg-slate-500 px-4 py-2 mb-2">
                     <span className="label-text">To:</span>
                     <span className="text-gray-900 font-bold">
                        {users?.fullName}
                     </span>
                  </div>

                  <Messages />
                  <MessageInput />
               </>
            </div>
         ) : (
            <NoChatSelected />
         )}
      </>
   );
};
