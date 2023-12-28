import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import DashboardLayout from '../../layouts/DashboardLayout'
import { UserContext } from '../../components/UserProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toaster from '../../components/common/Toaster'

const Profile = () => {
  const {userData,updateUserData} = useContext(UserContext);
        
        const [name, setName] =useState('');
        const [phone, setPhone] =useState('');
        const [email, setEmail] =useState('');
        const [dob, setDob] =useState('');
        const [gender, setGender] =useState('');
        let [errorList, setErrorList] =useState([]);

        const navigate = useNavigate();

         useEffect(() => {

          if(userData?.token){
           axios
           .get("get-edit-customer/" + userData?.id)
           .then(response => {
               
   
               if (response.data.success === false) {
                   Toaster(response?.data?.message, 'warn')
               }
               else {
                   
   
                   setName(response?.data?.customer_name);
                   setPhone(response?.data?.customer_contact);
                   setEmail(response?.data?.customer_email);
                   setDob(response?.data?.customer_dob)
                   setGender(response?.data?.customer_gender)
               }
   
           }).catch(error => {
               console.log(error);
           })
          }
   
       }, [userData])
   
       const updateProfile = (e) => {
            console.log('test')
           e.preventDefault();
   
           var obj = {
               id: userData?.id,
               customer_name: name,
               customer_email: email,
               customer_contact: phone,
               customer_dob: dob,
               customer_gender: gender,
           };
               axios
               .post(`get-edit-customer/${userData?.id}`, obj)
               .then(function (resp) {
                   if (resp.data.success_message) {
   
                       localStorage.removeItem("user");
   
                       const updatedState = { ...userData };
   
                       updatedState.name=name;
                       updatedState.email=email;
                       updatedState.phone=phone;
   
                        localStorage.setItem("user", JSON.stringify(updatedState));
   
                       updateUserData(updatedState);
                       
                       Toaster('User Profile Updated Succesfully', 'success')
                       navigate("/user/dashbord", { replace: true });
                   }
               })
               .catch((err) => {
                   console.log(err);
                   setErrorList(err.response.data.errors)
               });
   
            }
  return (
    <div  className="bg-teal-400">
         <Layout>
          <DashboardLayout> 
            
              <form method='post' onSubmit={(e) => updateProfile(e)}>
                   
                   
                   <div class='relative z-0 w-full mb-6 group'>
                    <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} 
                     class="block py-2.5 px-0 w-full text-smtext-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                     <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                     Enter your name</label>
                     {errorList && <span className='text-red-700'>{errorList?.customer_contact}</span>}
                   </div>

                    <div class="relative z-0 w-full mb-6 group">
                            <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Enter your phone number</label>
                            {errorList && <span className=" text-red-600">{errorList?.customer_contact}</span>}
                        </div>


                         <div class="relative z-0 w-full mb-6 group">
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Enter your email address</label>
                            {errorList && <span className=" text-red-600">{errorList?.customer_email}</span>}
                        </div>


                   <div class="relative z-0 w-full mb-6 group">
                            <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="dob" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Enter your birth date</label>
                            {errorList && <span className=" text-red-600">{errorList?.customer_dob}</span>}
                        </div>


                        <div class='relative z-0 w-full mb-6 group'>
                            
                            <label for='dob' class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Gender</label>

                            <div class="pt-2 flex items-center mb-4">
                                <input id="male" type="radio" value={"male"} name="default-radio" checked={gender == 'male' ? true : false} onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="male" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                            </div>


                            <div class="pt-2 flex items-center mb-4">
                                <input id="female" type="radio" value={"female"} name="default-radio" checked={gender == 'female'} onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="female" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                            </div>

                            <div class="pt-2 flex items-center mb-4">
                                <input id="other" type="radio" value={"other"} name="default-radio" checked={gender == 'other'} onChange={(e) => setGender(e.target.value)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="other" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                            </div>
                            {errorList && <span className=" text-red-600">{errorList?.customer_gender}</span>}
                        </div>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile</button>
              </form>
          </DashboardLayout>
         </Layout>
    </div>
    
     );

  }

export default Profile;
