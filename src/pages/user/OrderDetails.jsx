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
                  <h3 className="fw-bold text-xl">Order details {order?.order_number}</h3>

                {order?.time}
                {order?.time}
                {order?.time}
                {order?.time}
                {order?.time}

                {/* {order?.order_details.map()} */}


              </DashboardLayout>



          </Layout>
      </>
  );
}

export default OrderDetails;