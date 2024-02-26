import { useState } from "react";
import { Conversations } from "./Conversations";
import { LogOutButton } from "./LogOutButton";
import { SearchInput } from "./SearchInput";

export const SideBar = () => {
   const [searchTerm, setSearchTerm] = useState("");
   return (
      <>
         <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput  setSearchTerm={setSearchTerm}/>
            <div className="divider px-3"></div>
            <Conversations searchTerm={searchTerm} />

            <LogOutButton />
         </div>
      </>
   );
};
