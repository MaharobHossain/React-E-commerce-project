import React from 'react'
import Layout from '../layouts/Layout';
import { useCart } from 'react-use-cart';
import Toaster from './../components/common/Toaster';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { items, removeItem,cartTotal, updateItemQuantity  } = useCart();

    console.log(items);
 

  return (
    <div className="bg-teal-400">
    
     
      <Layout>
         
         <h3 className='bg-gray-900 text-teal-400 lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold text-center'>This is cart Site.</h3>
              <div className="p-4 bg-teal-400">
                <table className="min-w-full divide-y divide-gray-300 bg-white p-4">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5  text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Image
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Price
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Quantity
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  SubTotal
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  Action
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {items?.map((product, index)=>{
                    return(
                        <tr key={index}>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            <img src={product.image} width={80} height={80} />
                            </td>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            {product.name}
                            </td>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            {product.price}
                            </td>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            <div className="flex justify-between items-center w-[6rem]">
                                <button className={`text-2xl p-2 w-8 rounded-lg ${product.quantity==1 ? 'bg-slate-100 text-red-600' : 'bg-slate-500 text-white'}`} onClick={()=>  updateItemQuantity (product.id, (product.quantity-1))} 
                                disabled={product.quantity==1}>
                                    -
                                </button>
                                {product.quantity}
                                <button className="bg-slate-500 text-2xl text-white p-2 w-8 rounded-lg" onClick={()=>updateItemQuantity(product.id, (product.quantity+1))}>
                                    +
                                </button>
                            </div>
                            </td>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            {(Number(product.quantity) * Number(product.price)).toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap py-4  text-sm font-medium text-gray-900 sm:pl-0 text-left">
                            <button className="bg-red-500 text-black p-2" onClick={()=>{
                              removeItem(product?.id);
                              Toaster("Product removed from cart", 'error')
                                }}>
                                Delete
                            </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                  </table>
                  <div className="w-100  text-end">
                <p className="w-auto text-2xl text-slte-600 m-4">Total Price: {cartTotal}</p>

                <br/>
                <Link to={'/checkout'} className='" w-48 p-4 bg-slate-700 text-cyan-400 rounded-lg hover:bg-slate-500"'>Checkout</Link>
                  </div>
              </div>

      </Layout>
    </div>
  );
}

export default Cart;
