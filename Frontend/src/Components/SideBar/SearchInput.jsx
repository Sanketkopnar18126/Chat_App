// import { useState } from "react";
// import { IoSearchSharp } from "react-icons/io5";
// export const SearchInput = () => {
// 	const [search,setsearch]=useState()



//   return (
// <>
// <form  className='flex items-center gap-2'>
// 			<input
// 				type='text'
// 				placeholder='Search…'
// 				className='input input-bordered rounded-full'
// 				value={search}
// 				onChange={(e) => setsearch(e.target.value)}
// 			/>
// 			<button  className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>

// </>
//   )
// }

// SearchInput.jsx
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export const SearchInput = ({ setSearchTerm }) => {
  const [search, setsearch] = useState("");

  const onHandleSearchBtn = () => {
    setSearchTerm(search);
  };

  return (
    <>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button
          type="button"
          onClick={onHandleSearchBtn}
          className="btn btn-circle bg-sky-500 text-white"
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </>
  );
};

