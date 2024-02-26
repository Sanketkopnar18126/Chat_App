// import { useEffect, useState } from "react";
// import {  getRandomEmoji } from "../../Utils/emoji";
// import {useDispatch} from 'react-redux'
// import { setUser } from "../../Slice/users.slice";
// export const Conversation = () => {
//    const [usersData, setusersData] = useState();

// const dispatch=useDispatch()
//    useEffect(() => {
//       const fetchingUsersData = async () => {
//          try {
//             const res = await fetch("/users/all_users/data");
//             // console.log("res",res)

//             const data = await res.json();
//             setusersData(data);
//          } catch (error) {
//             console.log("error at fetching all users data", error);
//          }
//       };
//       fetchingUsersData();
//    }, []);
//    console.log("UsersData", usersData);

//   //  const onHandleParticularUser=()=>{
//   //   dispatch(setUser())
//   //  }
//   useEffect(()=>{
//     return()=>{
//       dispatch(setUser(null))
//     }
//   })
//    return (
//       <div>
//          {usersData?.data?.user.map((data, index) => (
//             <div key={data._id} onClick={()=>dispatch(setUser(data))}>
//                <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
//                   <div className="avatar online">
//                      <div className="w-12 rounded-full">
//                         <img src={data?.profile} alt="user avatar" />
//                      </div>
//                   </div>
//                   <div className="flex flex-col flex-1">
//                      <div className="flex gap-3 justify-between">
//                         <p className="font-bold text-gray-200">
//                            {data.fullName}
//                         </p>
//                         <span className="text-xl">{getRandomEmoji()}</span>
//                      </div>
//                   </div>
//                </div>
//                {index === usersData.data.user.length - 1 ? (
//                   ""
//                ) : (
//                   <div className="divider my-0 py-0 h-1" />
//                )}
//             </div>
//          ))}
//       </div>
//    );
// };








// import { useEffect, useState } from "react";
// import { getRandomEmoji } from "../../Utils/emoji";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../Slice/users.slice";

// export const Conversation = ({ searchTerm }) => {
//   const [usersData, setusersData] = useState();


//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchingUsersData = async () => {
//       try {
//         const res = await fetch("/users/all_users/data");
//         const data = await res.json();
//         setusersData(data);
//       } catch (error) {
//         console.log("error at fetching all users data", error);
//       }
//     };
//     fetchingUsersData();
//   }, []);

//   useEffect(() => {
//     return () => {
//       dispatch(setUser(null));
//     };
//   }, [dispatch]);

//   const filteredUsers = usersData?.data?.user.filter((data) =>
//     data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {filteredUsers?.map((data, index) => (
//         <div key={data._id} onClick={() => dispatch(setUser(data))}>
//           <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
//             <div className="avatar online">
//               <div className="w-12 rounded-full">
//                 <img src={data?.profile} alt="user avatar" />
//               </div>
//             </div>
//             <div className="flex flex-col flex-1">
//               <div className="flex gap-3 justify-between">
//                 <p className="font-bold text-gray-200">{data.fullName}</p>
//                 <span className="text-xl">{getRandomEmoji()}</span>
//               </div>
//             </div>
//           </div>
//           {index === filteredUsers.length - 1 ? (
//             ""
//           ) : (
//             <div className="divider my-0 py-0 h-1" />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { getRandomEmoji } from "../../Utils/emoji";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slice/users.slice";
import io from "socket.io-client";

const socket = io("http://localhost:5173"); // Replace with your Socket.IO server URL

export const Conversation = ({ searchTerm }) => {
  const [usersData, setUsersData] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchingUsersData = async () => {
      try {
        const res = await fetch("/users/all_users/data");
        const data = await res.json();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching all users data", error);
      }
    };
    fetchingUsersData();
  }, []);

  useEffect(() => {
    // Listen for 'chat message' event from the server
    socket.on("chat message", (msg) => {
      // Update messages in state
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (userId) => {
    // Replace 'userId' with the actual user ID
    const message = `Hello, ${userId}!`; // Your message logic here
    socket.emit("chat message", message);
  };

  const filteredUsers = usersData?.data?.user.filter((data) =>
    data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredUsers?.map((data,index) => (
        <div key={data._id} onClick={() => dispatch(setUser(data))}>
          <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={data?.profile} alt="user avatar" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{data.fullName}</p>
                <span className="text-xl">{getRandomEmoji()}</span>
              </div>
            </div>
          </div>
          {index === filteredUsers.length - 1 ? (
            ""
          ) : (
            <div className="divider my-0 py-0 h-1" />
          )}
        </div>
      ))}

      {/* Displaying the conversation messages */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>

      {/* Example: Input field for new messages
      <input type="text" placeholder="Type a message..." />
      <button onClick={sendMessage}>Send Message</button> */}
    </div>
  );
};
