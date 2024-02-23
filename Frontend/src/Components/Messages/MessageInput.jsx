import { BsSend } from "react-icons/bs";
export const MessageInput = () => {



   return (
      <>
         <form className=" relative px-4 my-3">
            <div className="w-full">
               <input
                  type="text"
                  className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
                  placeholder="Send a message"
               />
               <button
                  type="submit"
                  className="absolute right-[20px] bottom-[-3px] inset-y-0 end-0 flex items-center pe-3"
               >
                  <BsSend />
               </button>
            </div>
         </form>
      </>
   );
};
