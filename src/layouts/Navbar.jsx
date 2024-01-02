import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import MobileMenu from './MobileMenu';
import { useCart } from 'react-use-cart';
import { UserContext } from '../components/UserProvider';
import axios from 'axios';
import Toaster from '../components/common/Toaster';





const Navbar = () => {
   const navigate = useNavigate();
   const { totalUniqueItems } = useCart();
   const { userData, updateUserData } = useContext(UserContext);
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);

   const logOut = () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData?.token}`;
      axios.post('customer/logout')
         .then(function (resp) {


            if (resp.data.success) {
               Toaster('Logged out Successfully', 'success');
               localStorage.removeItem('user');
               updateUserData(null);
               navigate('/', { replace: true });

            }
         })
         .catch((err) => {
            console.log(err);
         });
   }

   return (

      <>
         <nav className="sticky top-0 z-40 w-full backdrop-blur flex items-center justify-between p-4 lg:px-6 border-b border-gray-200 ">
            <div className="block flex-none md:hidden">
               <MobileMenu />
            </div>

            <div className="flex w-full items-center">
               <div className="flex w-full h-[70px] md:w-1/3">
                  <Link to="/" className="mr-2 flex w-50 items-center justify-center md:w-auto lg:mr-6">
                     <img src={require('../assets/images/Logo.png')} className='w-[20px] md:w-full' width={90} alt='' />
                     <div className="ml-2 flex-none text-black text-2xl font-bold uppercase md:hidden lg:block">
                        DhakaShop.XYZ
                     </div>
                  </Link>
               </div>
       
               <div>
                <Link to="/" className='mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6 relative'>
                  <button className='bg-blue-400 px-4 py-2 md:hidden lg:block' onClick={()=> {setIsCategoryOpen(!isCategoryOpen)}}>
                  All Categories
                  </button>

                  <div className={`grid grid-cols-2 p-2 bg-slate-300 absolute top-[2.6rem] ${isCategoryOpen ? '' : 'hidden'}`}>
                 
                 <div className='bg-yellow-300 mx-1'>Category No 1</div>
                 <div className='bg-yellow-300 mx-1'>Category No 2</div>
                 <div className='bg-yellow-300 mx-1'>Category No 3</div>
                 <div className='bg-yellow-300 mx-1'>Category No 4</div>
                  </div>
                </Link>
               </div>
               
               <div className="hidden  justify-end md:flex md:w-1/3">
                  <Search />
               </div>

               <div className='#'>
                  <Link to={'/blogs'}
                  className='bg-black text-white p-3 rounded-lg hover:bg-purple-900 hover:text-white absolute right-[20%] top-[30%] text-sm w-15 h-9 '>
                  Blogs
                  </Link>
              </div>

               <div className="flex justify-end md:w-1/3 ">
                  <Link title='Cart' to={'/cart'} className='mx-5 text-3xl hover:underline relative' alt='card icon'>
                     <ion-icon name="cart-outline"></ion-icon>
                     <span className='bg-black text-white text-xs w-4 h-4 absolute right-[-26%] top-[-27%] text-center rounded-[50%]'>{totalUniqueItems}</span>
                  </Link>

                  

                  {
                     userData ?
                        <div className='flex flex-row'>
                          <Link to={`/user/dashbord`} className='hover:underline'><h3>{userData?.name}</h3></Link>
                          
                           <p className='mx-5 text-3xl hover:underline relative' title='Log out' onClick={logOut}
                           ><ion-icon name="log-out-outline"></ion-icon></p>
                        </div> : <div>

                        <Link
                              to={'#'}
                              className="user_icon underline-offset-4  hover:text-blue-600 hover:underline">
                              <div title='Account'>
                                 <p className='#'><ion-icon size="large" name="person-circle-outline" className=" "></ion-icon></p>
                              </div>


                              <div className='child_data'>

                                 <Link to={'/sing-up'}>
                                    <div>
                                       <button className="bg-yellow-400 text-black p-1 rounded-lg hover:bg-black hover:text-white " type="button">Sign up</button>
                                    </div>
                                 </Link>


                                 <Link to={'/Login'}>
                                    <div className='' title='Log in'>
                                       <button className="bg-yellow-400 text-black p-1 rounded-lg hover:bg-black hover:text-white " type="button">Log in</button>
                                    </div>
                                 </Link>
                              </div>
                           </Link>


                        </div>

                  }
               </div>
            </div>
         </nav>
      </>

   )
}

export default Navbar;


