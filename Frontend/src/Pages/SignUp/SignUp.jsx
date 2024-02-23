import { NavLink } from "react-router-dom"

export const SignUp = () => {
  return (
    <>
    
    <div className='h-[96vh] flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-[26%]  p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form >
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='Enter your name'
							className='w-full input input-bordered  h-10'
							// value={inputs.fullName}
							// onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter your username'
							className='w-full input input-bordered h-10'
							// value={inputs.username}
							// onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							// value={inputs.password}
							// onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					{/* <div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							// value={inputs.confirmPassword}
							// onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div> */}


{/* Gender Details */}
					{/* <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} /> */}
          <div className='flex'>
			<div className='form-control'>
      {/* className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `} */}
				<label >
					<span className='label-text'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						// checked={selectedGender === "male"}
						// onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
      {/* className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`} */}
				<label >
					<span className='label-text'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						// checked={selectedGender === "female"}
						// onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
					<NavLink NavLink
						to={"/signin"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</NavLink>

					<div>
          {/* disabled={loading} */}
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' >
							{/* {loading ? <span className='loading loading-spinner'></span> : "Sign Up"} */}
							SignUp
						</button>
					</div>
				</form>
			</div>
		</div>
    
    </>
  )
}
