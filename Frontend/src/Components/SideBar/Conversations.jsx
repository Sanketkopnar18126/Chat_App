import { Conversation } from "./Conversation";

export const Conversations = () => {
   return (
      <>
         <div className="py-2 flex flex-col overflow-auto">
            <Conversation />
         </div>
      </>
   );
};
