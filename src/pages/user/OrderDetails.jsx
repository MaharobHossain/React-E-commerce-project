import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../components/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';

const OrderDetails = () => {

    const {userData, updateUserData}=useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useContext();

    useEffect(() =>{
        if (userData?.token && !orders) {
            axios.get('get-order/' + id)
            .then(response =>{
                if(response.data.success){
                    setOrder(response?.data?.data);
                }
            }).catch(error => {
                console.log(error);
            })
         
        }
    }, [userData, order])
  return (
    <div>
      <Layout>

        <DashboardLayout>
        <p> This is OrderDetails page</p>
        <h3 className='fw-bold text-xl'> Order Details  {order?.order_number} </h3>
        {order?.time}
        
        </DashboardLayout>

      </Layout>
    </div>
  )
}

export default OrderDetails;
