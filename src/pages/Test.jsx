import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginData } from '../redux/thunk/UserThunk'

export const Test = () => {
const[state,setSatate]=useState({email:"",password:""})
const dispatch=useDispatch()


const HandleText=(e)=>{
  setSatate({
    ...state,
    [e.target.name]:e.target.value
  })
}

const HandleSubmit=(e)=>{
  e.preventDefault()

  if(state.email!=="" && state.password!==""){
  dispatch(LoginData(state)).unwrap()
  .then((data) => {
    console.log("Login successful:", data);
  })
  .catch((error) => {
    console.error("Login failed:", error);
  })

setSatate({email:"",password:""})
  }
}


 const {userCredentials}=useSelector((state)=>state.userCred)

    console.log("data done",userCredentials);
  return (
    <div>
      <form action="action.php" onSubmit={HandleSubmit}>
        <input type="email" placeholder='email' value={state.email} name='email' onChange={HandleText}/>
        <br /><br />
        <input type="password" placeholder='password' value={state.password} name='password' onChange={HandleText}/>
        <br /><br />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
