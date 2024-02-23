export const Message = () => {
   return (
      <>
         {/* className={`chat ${chatClassName}`} */}
         <div>
            <div className="chat-image avatar">
               <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS chat bubble component" />
               </div>
            </div>
            {/* className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`} */}
            <div></div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center"></div>
         </div>
      </>
   );
};
