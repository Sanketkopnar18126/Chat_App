import { useDispatch } from "react-redux";
import { MessageContainer } from "../../Components/Messages/MessageContainer";
import { SideBar } from "../../Components/SideBar/SideBar";
import { useEffect } from "react";
import { signOutSuccess } from "../../Slice/user.slice";
// import { SignIn } from "../SignIn/SignIn";

export const Home = () => {
//  let { currentUser } = useSelector((state) => state.userdata);
 const dispatch=useDispatch()
useEffect(()=>{
  return (()=>{
    dispatch(signOutSuccess())
    
  })
},[])
  return (
    <>
      
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <SideBar />
          <MessageContainer />
        </div>
   
    </>
  );
};
