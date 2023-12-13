import React, { useContext } from 'react'
import Layout from '../../layouts/Layout'
import DashboardLayout from '../../layouts/DashboardLayout'
import { UserContext } from '../../components/UserProvider'

const Dashboard = () => {
      const {userData} = useContext(UserContext);
  return (
    <div>
          <Layout>
            <DashboardLayout>
              <div>
                <h2>Hello,{userData?.name}</h2>
                <p>Email:{userData?.email}</p>
                <p>Phone:{userData?.phone}</p>
              </div>
            </DashboardLayout>
          </Layout>
    </div>
  )
}

export default Dashboard;
