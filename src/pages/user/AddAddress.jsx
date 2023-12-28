import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/UserProvider';
import axios from 'axios';
import Toaster from '../../components/common/Toaster';

const AddAddress = () => {

    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const [errorList, setError] = useState();
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [contact, setContact] = useState("");
    let [city, setCity] = useState("inside_dhaka");
    let [area, setArea] = useState("");
    let [areaID, setAreaId] = useState("");
    let [zip, setZip] = useState("");
    let [defaultValue, setDefault] = useState(false);
    let [address, setAddress] = useState("");
    const [DhakaShippingZoneData, setDhakaShippingZoneData] = useState();
    const [OutsideShippingZoneData, setOutsideShippingZoneData] = useState();
   
  useEffect(() => {
      // console.log(city);
      if (city == 'inside_dhaka') {
          axios.get("ec/area-by-district/dhaka")
              .then(resp => {
                  setDhakaShippingZoneData(resp.data.data.data);
              }).catch(err => {
                  console.log(err);
              });
      }
      else if (city == 'outside_dhaka') {
          axios.get("ec/get-cities")
              .then(resp => {
                  setOutsideShippingZoneData(resp.data.data);
              }).catch(err => {
                  console.log(err);
              });
      }
  }, [city]);

  const handleSubmit = (event) => {
     
      var obj = {
          name: username,
          email: email,
          phone: contact,
          address: address,
          city: city,
          zip: zip,
          area: area,
          area_id: areaID,
          shipping_id: 0,
          is_default: defaultValue
      };
      console.log(obj);
      if (city === 'inside_dhaka') {
          obj.shipping_id = 1;
      }
      else if (city === 'outside_dhaka') {
          obj.shipping_id = 2;
      }
      if (userData?.token) {
          axios.defaults.headers.common["Authorization"] = 'Bearer ' + userData?.token;

          console.log('inside the function');
          // console.log(obj);
          axios
              .post("add-customer-address/" + userData?.id, obj)
              .then(function (resp) {
                  // console.log(resp.data);
                  var data = resp.data;
                  // console.log(data);
                  if (data.success == false) {
                      setError(data.message);
                      Toaster(data.message, 'error');
                  }
                  else if (data.message) {
                      Toaster(data.message, 'success');
                      navigate('/user/addresses', {replace:true})
                  }
                  if (resp.data.code === 401 || resp.data.message === "Authorization token invalid, You cannot proceed") {
                      Toaster(resp.data.message, 'error')
                       
                  }
              })
              .catch((err) => {
                  console.log(err);
                  setError(err.response.data.errors)
                  Toaster(err.response.data.errors, 'error');
              });
      }
      // console.log(errorList);
      event.preventDefault();
  };
  return (
      <div className="bg-teal-400">
          <Layout>


              <DashboardLayout>
                  <h3 className="fw-bold text-xl">Add Address</h3>
                  <div className="bg-white p-2">
                      <form onSubmit={(e) => { handleSubmit(e); }}>
                          <div className=" mb-4">
                              <label htmlFor="name" className="">
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
                              {errorList && (<span className='text-red-700'>{errorList.name}</span>)}
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
                          <div className=" mb-4">
                              <label htmlFor="city" className="">
                                  City:
                              </label>{" "}
                              <select className="w-full border-2 h-11 rounded p-2"
                                  id="city"
                                  name="city"
                                  value={city}
                                  required="required"
                                  onChange={(e) => { setCity(e.target.value); }}
                              >
                                  {/* <option>Your City</option> */}
                                  <option value={'inside_dhaka'}>Inside Dhaka</option>
                                  <option value={'outside_dhaka'}>Outside Dhaka</option>
                              </select>
                              {errorList && (<span className='text-red-700'>{errorList.city}</span>)}
                          </div>{" "}
                          <div className=" mb-4">
                              <label htmlFor="area" className="">
                                  Area:
                              </label>{" "}
                              {city === 'inside_dhaka' && (

                                  DhakaShippingZoneData && (
                                      <div className=" ">
                                          <select className="w-full border-2 h-11 rounded p-2" id='area'
                                              name="area" required={area === "" ? true : false}
                                              value={area}
                                              onChange={(e) => setArea(e.target.value)}
                                          >
                                              <option value={null}>Select Area</option>
                                              {DhakaShippingZoneData &&
                                                  (DhakaShippingZoneData.map((srvzn, index) => {
                                                      return <option key={index} value={srvzn.name}>{srvzn.name}</option>;
                                                  }))}
                                          </select>
                                          {errorList && (
                                              <span className="text-red-700">
                                                  {errorList['shipping_details.area'] && errorList['shipping_details.area'][0]}
                                              </span>
                                          )}
                                      </div>
                                  )
                              )}
                              {city === 'outside_dhaka' && (
                                  OutsideShippingZoneData && (
                                      <div className=" mb-4">

                                          <select className="w-full border-2 h-11 rounded p-2"
                                              name="area"
                                              required
                                              value={area}
                                              onChange={(e) => { setArea(e.target.value); }}
                                          >
                                              <option value={null}>Select Area</option>
                                              {OutsideShippingZoneData &&
                                                  (OutsideShippingZoneData.map((srvzn, index) => {
                                                      return <option key={index} value={srvzn.value}>{srvzn.name}</option>;
                                                  }))}
                                          </select>
                                      </div>
                                  )
                              )}
                          </div>{" "}
                          <div className=" mb-4">
                              <label htmlFor="zip" className="">
                                  Zip:
                              </label>{" "}
                              <input id="zip" required="required" type="text" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Enter your city" className="w-full border-2 h-11 rounded p-2" />
                          </div>{" "}
                          <div className=" mb-4">
                              <label htmlFor="address" className="">
                                  Address:
                              </label>{" "}
                              <input
                                  id="address"
                                  type="text"
                                  name="address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  required="required"
                                  placeholder="Enter your address"
                                  className="w-full border-2 h-11 rounded p-2"
                              />
                              {errorList && (<span className='text-red-700'>{errorList.address}</span>)}
                          </div>{" "}
                          <div className=" mb-4">
                              <div className="">
                                  <input type="checkbox" name="is_default" value={1} id="is_default" onClick={(e) => setDefault(!defaultValue)} className="form-check-input" />{" "}
                                  <label htmlFor="is_default" className="">
                                      <span>Use this address as default.</span>
                                  </label>
                              </div>
                          </div>{" "}
                          <div className="col-span-12">
                              <button type="submit" className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                                  <span className="button__text">Save address</span>
                              </button>
                          </div>
                      </form>
                  </div>

              </DashboardLayout>



          </Layout>
      </div>
  );
}

export default AddAddress;

