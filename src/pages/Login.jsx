import React, { useContext, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import Layout from '../layouts/Layout';
import axios from 'axios';
import Toaster from '../components/common/Toaster';



const Login = () => {
    const navigate = useNavigate();
       const [userName, setUserName] = useState('');
          const [password, setPassword] = useState('');
            let [errorMsg, setErrorMsg] = useState([]);
              const { userData, updateUserData } = useContext(UserContext);

    const login = (e) => {
        e.preventDefault();
          var loginData = {
            user_input: userName,
              password: password,
                };

        axios.post("customer/login", loginData)
        .then(response => {
            console.log(response)


                     if (response?.data?.status) {
                       var userData = {
                        token: response?.data?.token, 
                         id: response?.data?.data?.id, 
                          name: response?.data?.data?.customer_name,
                            email: response?.data?.data?.customer_email,
                              phone: response?.data?.data?.customer_contact
                               } 
                              

                                  localStorage.setItem("user", JSON.stringify(userData));

                                     updateUserData(userData);
                                      Toaster('Logged in Successfully', 'success')
                                        navigate('/user/dashbord', {replace: true});
                                          }
            
                                             if(response?.data?.success==false){
                                               Toaster(response?.data?.message, 'error')   
                                                 setErrorMsg(response?.data?.message);  
                                                   }

                                                     })
                                                       .catch(error =>{
                                                          console.log(error);
                                                            })
                                                              }

    return (
        <div className="">
            <Layout>

                <div className=" mt-12 w-100 flex justify-center items-center">
                    <div className="w-[30rem] bg-white mt-4 p-4">
                        <div className=" w-100">
                           {errorMsg && <center><span className="text-red-600 my-6">{errorMsg}</span></center>}
                              </div>
                                 <form method="post" onSubmit={(e) => login(e)}>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="email" name="email" id="email" value={userName} onChange=   {(e) => setUserName(e.target.value)}
                                           class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Enter your Email/Phone</label>
                                                </div>
                                                      <div class="relative z-0 w-full mb-6 group">
                                                      <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                                                      <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                      Enter your password</label>
                                                      </div>

                                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                               
                                </form>


                    </div>


                </div>


            </Layout>
        </div>
    );
}

export default Login;
