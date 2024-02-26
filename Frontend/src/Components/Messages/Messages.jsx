// import { useSelector } from "react-redux";
import { Message } from "./Message";

export const Messages = () => {

   // const {userMessage}=useSelector((state)=>state.userMessage)
   // console.log("UserMssg",userMessage)
   return (
      <>
      
         <div className="flex flex-col justify-end px-4 flex-1 overflow-auto">
            <Message />
         </div>
      </>
   );
};
