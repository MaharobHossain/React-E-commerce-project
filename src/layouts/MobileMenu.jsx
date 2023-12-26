import React from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

function MobileMenu() {

    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => setIsOpen(true);
    const closeMobileMenu = () => setIsOpen(false);
  
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth > 769) {
            setIsOpen(false);
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [isOpen]);
    


  return (
    <div>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white lg:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>

      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-4 w-full">
                  <Search />
                </div>
                <ul className='flex w-full flex-col'>
                <li className='py-2 text-lg text-black transition-colors hover:text-green-600 '>
                      <Link to='/' className={window.location.pathname === '/' ? 'mobileMenudActive' : ''}>
                        Home
                      </Link>
                   </li>
                       
                       <li className='text-lg text-black transition-colors hover:text-green-600 '>
                       <Link to='/cart' className={window.location.pathname === '/' ? 'mobileMenudActive' : ''}>
                       Cart 
                      </Link>
                       </li>

                           <li className='text-lg text-black transition-colors hover:text-green-600 '>
                            <Link to='/sing-up'  className={window.location.pathname === '/' ? 'mobileMenudActive' : ''} >
                             Sing-Up
                            </Link>
                           </li>

                           <li className='text-lg text-black transition-colors hover:text-green-600 '>
                            <Link to='/Login'  className={window.location.pathname === '/' ? 'mobileMenudActive' : ''} >
                             Log-In
                            </Link>
                           </li>

                           <li className='text-lg text-black transition-colors hover:text-green-600 '>
                            <Link to='/user/dashbord'  className={window.location.pathname === '/' ? 'mobileMenudActive' : ''} >
                            Dashboard
                            </Link>
                           </li>


                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}

export default MobileMenu;
