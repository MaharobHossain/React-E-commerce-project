import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-teal-400">
        <Navbar/>
        <div className='min-h-[75vh] bg-slate-100'>
        {children}
        </div>


        <Footer/>

    </div>
  )
}

export default Layout;
