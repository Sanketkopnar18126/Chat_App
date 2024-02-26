import { TiMessages } from "react-icons/ti";
import {useSelector} from 'react-redux'
export const NoChatSelected = () => {
  const {currentUser}=useSelector((state)=>state.userdata)
  // console.log(currentUser)
  return (
   <>
   <div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋  ❄</p>
                {currentUser?.data?.user?.fullName}
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
   
   </>
  )
}
