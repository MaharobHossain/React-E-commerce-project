import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/UserProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';

const OrderDetails = () => {
  const { userData, updateUserData } = useContext(UserContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState();

  useEffect(() => {

      if (userData?.token && !order) {
          axios
              .get("get-order/" + id)
              .then(response => {
                 if(response.data.success){

                  setOrder(response?.data?.data);
                 }

              }).catch(error => {
                  console.log(error);
              })
      }

  }, [userData, order])



  return (
      <>
          <Layout>

              <DashboardLayout>
                  <h3 className="fw-bold font-semibold text-xl">Order Details : </h3>
                  <br/>
                  <h3 className="fw-bold font-mono text-xl">Order Number : {order?.order_number}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Time : {order?.time}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Shiping Name : {order?.shipping_name}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Shiping Phone : {order?.shipping_phone}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Shiping Email : {order?.shipping_email}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Shiping Address : {order?.shipping_address}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Status : {order?.status}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Discount : {order?.discount}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Total Pay Ammount : {order?.pay_amount}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Payment Method :{order?.payment_method}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Payment Status :{order?.payment_status}</h3>
                  <h3 className="fw-bold font-mono text-xl">Order Shiping Charge : {order?.shipping_charges}</h3>

                


                {/* {order?.order_details.map()} */}


              </DashboardLayout>



          </Layout>
      </>
  );
}

export default OrderDetails;