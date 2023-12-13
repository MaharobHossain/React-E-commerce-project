import React from 'react'
import { useCart } from 'react-use-cart';
import Toaster from './common/Toaster';
import '../assets/css/ProductCard.css'


const ProductCard = (props) => {
const {item} = props;
const {addItem} = useCart();





    console.log(item);
    return (
    <div >
     
      
            <div className='rounded-3xl shadow-2xl bg-gray-50   '>
            <div className='rounded-3xl shadow-2xl  overflow-hidden  product-cart ' >        


                     <img src={item.image.small} alt="" />
                     </div>
                     <div className='text-2xl font-medium mt-2 text-center	'>
                     <h1 >{item.name}</h1>
                     </div>
                     <div className='text-center font-mono'>
                     <h1>{item.formatted_regular_price}</h1>
                     </div>
                     <div className='text-center font-mono'>
                     <h1>{item.discount}</h1>
                     </div>
                     <div className='text-center font-mono'>
                      <h1>{item.discounted_price}</h1>
                     </div>
                     <div className='text-right'>
                     <button className='bg-yellow-400 text-black p-3 rounded-lg hover:bg-black hover:text-white' onClick={(e)=>{
                      e.preventDefault();
                      addItem({
                      id:item?.id,
                      product_id: item?.id,
                      name:item?.name,
                      price:item?.final_product_price,
                      image:item?.image?.small,
                      stock:item?.stock
                      },1);
                      Toaster("Product Add to cart", 'success')
                      }}> Add to curt</button>



                      </div>
                      </div>
                     
     
      </div>
  )
  }

export default ProductCard;
