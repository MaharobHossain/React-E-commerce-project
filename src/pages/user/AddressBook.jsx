import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../layouts/Layout';
import DashboardLayout from '../../layouts/DashboardLayout';
import { UserContext } from '../../components/UserProvider';
import { useNavigate } from 'react-router-dom';

const AddressBook = () => {

  const {userData, updateUserData}=useContext(UserContext);
  const navigate = useNavigate();
  const [addresses, setAddresses] =useState();
  useEffect(() =>{
    
  })

  return (
    <div>
      <Layout>
        <DashboardLayout>
        <p>This id Address Book Page.</p>
        </DashboardLayout>
      </Layout>
    </div>
  )
}

export default AddressBook;
