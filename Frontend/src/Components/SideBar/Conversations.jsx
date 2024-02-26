import { Conversation } from "./Conversation";

export const Conversations = ({ searchTerm }) => {
   return (
      <>
         <div className="py-2 flex flex-col overflow-auto">
            <Conversation  searchTerm={searchTerm}/>
         </div>
      </>
   );
};
