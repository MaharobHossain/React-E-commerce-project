import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';
import { UserContext } from '../../components/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Toaster from '../../components/common/Toaster';

const AddressBook = () => {
  const { userData, updateUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState();

  useEffect(() => {

      if (userData?.token && !addresses) {
          axios
              .get("get-customer-addresses/" + userData?.id)
              .then(response => {

                  if (response?.data?.success) {
                      setAddresses(response?.data?.data);
                  }

              }).catch(error => {
                  console.log(error);
              })
      }

  }, [userData, addresses])

  const deleteAddress = (id) => {
      console.log(id);
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {


              axios
                  .get("delete-customer-address/" + id)
                  .then(function (resp) {
                      console.log(resp);
                      if (resp.data.success) {

                          Swal.fire({
                              title: "Deleted!",
                              text: "Your address has been deleted.",
                              icon: "success"
                          });

                          setAddresses(null);
                      }
                  })
                  .catch((err) => {
                      console.log(err);
                  });



          }
      });
  }

  const setDefaultAddress = (id) => {
      axios.put("set-as-default-customer-address/" + userData?.id + "/" + id)
          .then(function (resp) {
              if (resp.data.success) {
                  Toaster(resp.data.message, 'success')
                  setAddresses(null);
              }
          })
          .catch((err) => {
              console.log(err);
          });
  }


  return (
      <div className="bg-teal-400">
          <Layout>

              <DashboardLayout>
                  <h3 className="fw-bold text-xl">Address Book</h3>
                  <Link to={'/user/add-address'} className="hover:underline"><span className='text-2xl addplus font-black'>+ </span>Add new address</Link>
                  <div className=" bg-white p-2">
                      {addresses?.length > 0 ?
                          addresses.map((address, index) => {
                              return (
                                  <>
                                      <div key={index} className="address_div mt-5 h-min border rounded ">
                                          <div className="grid sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 h-full p-8 saveAddDiv">
                                              <div className="col-span-3 p-1 nameAdd">
                                                  <p className=''>{address.name}</p>
                                                  <p>{address.phone}</p>
                                                  <p>{address.email}</p>
                                              </div>
                                              <div className="col-span-4  p-1 areaAdd">
                                                  <p>{address.address}</p>
                                                  <h5 className='mt-2 '><b>{address.is_default === 1 ? (
                                                      <small className="bg-gray-800 text-white text-sm p-1 rounded-md">Default Address</small>
                                                  ) : (
                                                      <button className="site_btn_secondary w-[1rem] hover:underline"
                                                          onClick={() => setDefaultAddress(address.id)}
                                                      >Make This Default</button>
                                                  )}</b></h5>
                                              </div>
                                              <div className="col-span-3 p-1 parmADD">
                                                  <p>{address.area && address.area}</p>
                                                  <p>{address.shipping_id === '1' ? "Inside Dhaka" : "Outside Dhaka"}</p>
                                                  <p>{address.zip && address.zip}</p></div>
                                              <div className="col-span-2  text-end p-1 address_btn">
                                                  <button className="edit_btn inline hover:underline"
                                                  // onClick={() => {setEditAddressID(address.id); setEditAddressModal(true)}}
                                                  >
                                                      <span>Edit Address&nbsp;</span>
                                                      <i className="fa fa-pencil" aria-hidden="true"></i>
                                                  </button>
                                                  <button className="mt-5 delete_btn inline hover:underline"
                                                      onClick={(e) => deleteAddress(address.id)}
                                                  >
                                                      <span>Delete&nbsp;</span>
                                                      <i className="fa fa-times" aria-hidden="true"></i>
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </>
                              );
                          })
                          :
                          <>
                              <div>
                                  <div class="address_div mt-5 h-min border rounded ">
                                      <div class=" p-8 h-min">
                                          <div className='w-full p-4 bg-gray-300 rounded-lg border border-slate-400 flex'>
                                              <h3><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class=" ml-2" viewBox="0 0 16 16" role="img" aria-label="Info:"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg></h3>
                                              <h2 className='ml-2'>You did not added any address yet! Please add a address</h2>
                                          </div>
                                          <h3 className='text-xl mt-4 cursor-pointer text-gray-600 addNewAdd'
                                          // onClick={() => setShowRequestModal(true)} 
                                          >
                                              <Link to={'/user/add-address'} className="hover:underline"><span className='text-2xl addplus font-black'>+ </span>Add new address</Link>
                                          </h3>
                                      </div>

                                  </div>
                              </div>
                          </>
                      }
                  </div>

              </DashboardLayout>



          </Layout>
      </div>
  );
}

export default AddressBook;
