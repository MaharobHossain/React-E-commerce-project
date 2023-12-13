import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "../components/common/Toaster";



const Registration = () => {
const navigate = useNavigate();
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [email, setEmail] = useState('');
const [dob, setDob] = useState('');
const [gender, setGender] = useState('');
const [isPasswordMatched, setIsPasswordMatched] = useState(0);

        useEffect(() => {
        if(password!==confirmPassword){
        setIsPasswordMatched(1);
        }
        if(password==confirmPassword && confirmPassword?.length>5){
        setIsPasswordMatched(2);
        }
        }, [confirmPassword])

    
            const signUp = (e) => {
            e.preventDefault();
            var signUpData = {
            customer_name: name,
            customer_password: password,
            customer_password_confirmation: confirmPassword,
            customer_email: email,
            customer_contact: phone,
            customer_dob: dob,
            customer_gender: gender,
            };

        axios.post("register-customer", signUpData)
        .then(response => {
        console.log(response);



                if (response?.data?.success_message) {
                Toaster('Registration Successful', 'success');
                navigate('/', {replace:true});
                }
                else{
                Toaster("Something went wrong", 'error')
                }
                })
                .catch(error =>{
                console.log(error);
                })
                }


                
return (
        <>
          <Layout>
            <div className="mt-12 w-100 flex justify-center items-center">
              <div className="w-[30rem] bg-white mt-4 p-4">
                 <form method="post" onSubmit={(e) => signUp(e)}>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}
                         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                           <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Enter your name</label>
                                </div>
                                  <div class="relative z-0 w-full mb-6 group">
                                    <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                           Enter your phone number</label>
                                             </div>
                                               <div class="relative z-0 w-full mb-6 group">
                                                 <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                      <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                         Enter your password</label>
                                                         </div>
                                                         <div class="relative z-0 w-full mb-6 group">
                                                         <input type="password" name="password_confirm" id="password_confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                                         class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                         <label for="password_confirm" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                         Confirm your password</label>
                                                         {isPasswordMatched==1 && <span className=" text-red-600">Password not matched</span>}
                                                         {isPasswordMatched==2 && <span className=" text-green-600">Password matched</span>}
                                                         </div>

                                                         <div class="relative z-0 w-full mb-6 group">
                                                       <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                     class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                  <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Enter your email address</label>
                                             </div>

                                          <div class="relative z-0 w-full mb-6 group">
                                       <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="dob" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Enter your birth date</label>
                           </div>
                       <div class="relative z-0 w-full mb-6 group">
                    <label for="dob" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Gender</label>
                <div class="pt-2 flex items-center mb-4">
             <input id="male" type="radio" value={"male"} name="default-radio" onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
           <label for="male" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
         </div>
       <div class="pt-2 flex items-center mb-4">
    <input id="female" type="radio" value={"female"} name="default-radio" onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
 <label for="female" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
</div>
<div class="pt-2 flex items-center mb-4">
<input id="other" type="radio" value={"other"} name="default-radio" onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
<label for="other" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
</div>
</div>
<button type="submit" class="text-white bg-pink-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
</form>

</div>

</div>

</Layout>
</>
);
}

export default Registration;
