import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/UserProvider';
import axios from 'axios';

const AddAddress = () => { 
      
     const navigate = useNavigate();
     const {userData} = useContext(UserContext);
     const [errorList, setError] = useState();
     let [username, setUsername] =useState("");
     let [contact, setContact] =useState("");
     let [city, setCity] =useState("inside_dhaka");
     let [area, setArea] =useState("");
     let [areaID, setAreaID] =useState("");
     let [zip, setZip] =useState("");
     let [defaultValue, setDefault] =useState(false);
     let [address, setAddress] =useState("");
     let [email, setEmail] =useState("");
     const [DhakaShippingZoneData, setDhakaShippingZoneData] =useState();
     const [OutsideShippingZonrData, setOutsideShippingZonrData] =useState();


    //  useEffect(() => {
      
    //   if (city == 'inside_dhaka') {
    //     axios.get("")
    //   }
    //  })


  return (
    <div>
      <Layout>
        <DashboardLayout>
          {/* <h2 className='fw-bold text-xl'>Add Address</h2>
          <div className='bg-white p-2'>
            <form onSubmit={(e) => { handleSubmit(e);}}>
              <div className='mb-4'>
                <label htmlFor='name' className=''>
                  Full Name:
                </label>{" "}

                <input
                    id="name"
                    type="text"
                    name="name"
                    required="required"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border-2 h-10 rounded p-3"
                />
                {errorList && (<span className='text-red-700'> {errorList.name}</span>)}
               </div>{" "}

               <div className=" mb-4">
                                <label htmlFor="email">Email:</label>{" "}
                                <input id="email" required="required" type="email" name="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder="your-email@domain.com" className="w-full border-2 h-10 rounded p-3" />
                                {errorList && (<span className='text-red-700'>{errorList.email}</span>)}
                            </div>{" "}

               <div className=" mb-4">
                                <label htmlFor="phone" className="">
                                    Phone:
                                </label>{" "}
                                <input id="phone" required="required" type="text" name="phone" value={contact} onChange={(e) => setContact(e.target.value)} className=" w-full border-2 h-10 rounded p-3" />
                                {errorList && (<span className='text-red-700'>{errorList.phone}</span>)}
                            </div>{" "}

                

                             

            </form>
          </div> */}
        </DashboardLayout>
      </Layout>
    </div>
  )
}

export default AddAddress;

