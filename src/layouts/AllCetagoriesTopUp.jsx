import React, { useContext } from 'react'
import { UserContext } from '../components/UserProvider'
import { useNavigate } from 'react-router-dom';

const AllCetagoriesTopUp = ({}) => {

    const {userData} =useContext(UserContext);
    const navigate =useNavigate();
    
  return (
    <div>
      
      <div>
      <div className='#'>

      <Link></Link>
      <Link></Link>
      <Link></Link>
      <Link></Link>

     </div> 
      </div>
  </div>
  )
}

export default AllCetagoriesTopUp
