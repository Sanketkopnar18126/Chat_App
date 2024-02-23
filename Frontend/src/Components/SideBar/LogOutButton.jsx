import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { BiLogOut } from "react-icons/bi";
import {useDispatch} from 'react-redux'
import { signOutSuccess } from "../../Slice/user.slice";

export const LogOutButton = () => {
	const [loading,setloading]=useState(false)

	const dispatch=useDispatch()
	const navigate=useNavigate()
	const onHandleLogOutBtn=async ()=>{
		try {
			setloading(true)
			const res=await fetch('/users/logout',{
				method:'POST',
				headers:{
					'Content-Type':"application/json"
				}
			})
			if(res.ok){
				const data=await res.json()
				dispatch(signOutSuccess(data))

				setloading(false)
				navigate('/signin')
			}
			setloading(false)
		} catch (error) {
			console.log("error occur at loagout btn ",error)
			setloading(false)
		}
	}
  return (
<>

<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={onHandleLogOutBtn} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
            {/* <BiLogOut className='w-6 h-6 text-white cursor-pointer' /> */}
            
		</div>
</>
  )
}
