import React, { useContext, useState } from 'react'
import Layout from '../../layouts/Layout'
import DashboardLayout from './../../layouts/DashboardLayout';
import { UserContext } from '../../components/UserProvider';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
    
    const {userData, updateUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const [orders, setOrders] =useState();
    
  return (
    <div>
       <Layout>

        <DashboardLayout>

        </DashboardLayout>

       </Layout>
    </div>
  )
}

export default OrderList
