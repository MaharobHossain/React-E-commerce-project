import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'
import DashboardLayout from './../../layouts/DashboardLayout';
import { UserContext } from '../../components/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderList = () => {
    
  const {userData, updateUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState();

  useEffect(() =>{
    if (userData?.token && !orders) {
      axios
      .get("get-customer-orders/" + userData?.id)
      .then(response =>{
        setOrders(response?.data);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [userData, orders])
  
return (
  <div>
     <Layout>

      <DashboardLayout>

      <p className='fw-bold bg-gray-400 text-xl'> Order List </p>

      <div className='table-auto'>
          <table className='w-full text-left text-gray-500 ConOrderTable'>
            <thead className='text-lg text-gray-700'>
            <tr className='bg-gray-100 py-4 ConHeaderOrder'>
              <th scope='col' className='p-3 ConMainHeaderTable'>
                Order Number
              </th>

              <th scope='col' className='p-6 ConMainHeaderTable'>
                Date
              </th>

              <th scope='col' className='p-6 ConMainHeaderTable'>
                Status
              </th>

              <th scope='col' className='p-6 ConMainHeaderTable'>
                Amount
              </th>

              <th scope='col' className='p-6 ConMainHeaderTable'>
                Action
              </th>
            </tr>
           </thead>

            <tbody className='w-full'>
              {orders && (
                orders.lenght > 0 ? (
                  orders.map((order, key) =>{

                    return(
                      <tr key={key} className='w-full conTableDesc mt-3'>
                        
                        <td scope='row' dataTitle="Order number" className='px-6 py-4 font-medium text-gray-900 ConOrderTablwTh'>
                          #{order.order_number}
                        </td>

                        <td dataTitle="Date" className="px-6 py-4 ConOrderTableTh">
                            {/* {order.order_date_time} */}
                          {order.order_date_time.slice(0, 10)}
                          <br/>
                          {order.order_date_time.slice(12, 19)}
                        </td>

                        <td dataTitle="Status" className="px-6 py-4 ConOrderTableTh">
                               {/* {order.status} */}
                           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                               {/* {order.status.charAt(0).toUpperCase() + order.status.slice(1)} */}
                        </td>

                        <td dataTitle="Amount" className="px-6 py-4 font-bold ConOrderTableTh">
                          {order.pay_amount} Tk
                        </td>

                        <td className='text-center'>
                        <Link to={`/user/order/order-details/${order.id}`} className='bg-blue-700 rounded-lg px-4 text-white hover:bg-blue-900'>View</Link>
                        </td>
                      </tr>
                    )
                  }
                  )

                ) : (
                      <tr className='text-center'> <td colspan="100%" > <h2 className='text-2xl font-bold text-amber-500 mt-3'>No Orders Found!</h2></td>
                      </tr>

                )
              )}

            </tbody>

          </table>

      </div>

      </DashboardLayout>

     </Layout>
  </div>
);
}

export default OrderList;