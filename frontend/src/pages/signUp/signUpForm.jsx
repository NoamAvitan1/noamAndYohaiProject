import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LogInForm from "../logIn/logInForm";
import "./signUpForm.css";
import useUser from "../../hooks/useUser";
import {AiOutlineEyeInvisible,AiOutlineEye,AiFillLock,AiOutlineMail,AiOutlineUser} from 'react-icons/ai';


export default function SignUpForm({ updateModal,closeModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {user,error,loading,signUpUser} = useUser();
  const nameRegex = /^[a-zA-Z ]+$/;
  const emailAlphabet = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [show_password,setShowPassord] = useState(false);

  const hundleSignUp = (data) => {
    console.log(data);
    signUpUser(data);
    reset();
  };

  useEffect(() => {
    if(user){
      closeModal();
    }
  },[user]);

  return (
    <div className="signUp-container">
      <div className="signUp-nav">
        SignUp
        <button
          onClick={() => updateModal(<LogInForm closeModal={closeModal} updateModal={updateModal} />)}
          className="log-in"
        >
          /LogIn
        </button>
      </div>
      <form onSubmit={handleSubmit(hundleSignUp)} className="signUp-form">
        {show_password
          ? <AiOutlineEye className="eye-icon" onClick={() => setShowPassord(false)}   /> 
          : <AiOutlineEyeInvisible className="eye-icon" onClick={()=>setShowPassord(true)}  /> }
        <AiOutlineMail className="email-icon" />
        <AiFillLock className="lock-icon" />
        <AiOutlineUser className="user-icon"/>
        <label>Name</label>
        <input
          {...register("name", {
            required: { value: true, message: "name is Required..." },
            minLength: { value: 2, message: "min 2 chars.." },
            maxLength: { value: 40, message: "max 40 chars.." },
            pattern: {
              value: nameRegex,
              message: "only alphabet allowed",
            },
          })}
          placeholder="Type Your Name.."
          type="text"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <label>Email</label>
        <input
          {...register("email", {
            required: { value: true, message: "Email is Required..." },
            minLength: { value: 8, message: "min 8 chars.." },
            maxLength: { value: 40, message: "max 40 chars.." },
            pattern: {
              value: emailAlphabet,
              message: "only alphabet allowed",
            },
          })}
          placeholder="yourEmail@..."
          type="text"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label>Password</label>
        <input
          {...register("password", {
            required: { value: true, message: "Password is Required..." },
            minLength: { value: 5, message: "min 5 chars.." },
            maxLength: { value: 40, message: "max 40 chars.." },
          })}
          type={show_password ? "text" : 'password'}
          placeholder="Type Password.."
        />
        <button className="signUp-button">SignUp</button>
      </form>
    </div>
  );
}
