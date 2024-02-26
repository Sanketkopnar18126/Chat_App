import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setMessageData } from "../../Slice/usermessage.slice";

export const Message = () => {
   const [message, setmessage] = useState();
   const [loading, setloading] = useState(true);

   const { users } = useSelector((state) => state.usersdata);
   const { currentUser } = useSelector((state) => state.userdata);
  //  const dispatch = useDispatch();
  const {userSendMessage}=useSelector((state)=>state.userSendMessage)
  // console.log("userSendMssg",userSendMessage)
   useEffect(() => {
      const gettingMessg = async () => {
         try {
            setloading(true);
            const res = await fetch(`/users/get/get_message/${users?._id}`);
            // console.log("res", res);
          
               const data = await res.json();
              //  console.log("Data", data);
               setmessage(data);
              //  dispatch(setMessageData(data));
               setloading(false);
         

            // setloading(false);
         } catch (error) {
            console.log("error at getting msg at Message comp", error);
            setloading(false);
         }
      };
      gettingMessg();
   }, [users,userSendMessage]);
  //  console.log("message", message);
   return (
      <div className="relative" >
     {loading ? (
   <span className=" absolute bottom-[223px] left-[179px] loading loading-bars w-[3.25rem]"></span>
    ) : (
      message?.data?.user ? (
        message?.data?.user.map((item) => {
          const isCurrentUser =
            item.senderId === currentUser?.data?.user?._id;
          const chatClassName = isCurrentUser ? "chat-end" : "chat-start";
          const profilePic = isCurrentUser
            ? currentUser?.data?.user?.profile
            : users?.profile;
          const bubbleBgColor = isCurrentUser ? "bg-blue-500" : "";
          return (
            <div className={`chat ${chatClassName}`} key={item._id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={profilePic}
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${bubbleBgColor} text-white pb-2`}
                key={item._id}
              >
                {item.message}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">
          Send a message to start the conversation
        </p>
      )
    )}
    </div>
    
   );
};
// loading ? (
//    <span className="absolute top-[133px] left-[178px] loading loading-bars w-[60px]"></span>
// ) :) : (
//    <p className="text-center">
//    Send a message to start the conversation
// </p>
// )