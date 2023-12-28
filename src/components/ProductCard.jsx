import React from 'react'
import { useCart } from 'react-use-cart';
import Toaster from './common/Toaster';
import '../assets/css/ProductCard.css'
import { Link } from 'react-router-dom';


const ProductCard = (props) => {
  const {item} = props;
  const {addItem} = useCart();
  const {product} = props;
  
  
  
  
      console.log(item);
      return (
      <div>
       
       <Link to={`product/${item?.slug}`}>
  
       <div className='rounded-3xl shadow-2xl bg-gray-50   '>
              <div className='rounded-3xl shadow-2xl  overflow-hidden  product-cart ' >        
  
             {Number(item?.discounted_price)>0 &&(
              <div className='bg-black text-center text-white w-20 '>{item?.discount} Off</div>
             )}
  
            {Number(item?.stock)<1 && (
                <div className='bg-red-700 text-right text-black w-20 '>Out of stock</div>
            )}
  
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
                        if(Number(item?.stock)>0){
                          addItem({
                              id: item?.id,
                              product_id: item?.id,
                              name: item?.name,
                              slug: item?.slug,
                              price: item?.final_product_price,
                              image: item?.image?.small,
                              stock: item?.stock
                          });
                         Toaster('Product added to cart', 'success');
                      }
                      else{
                          Toaster('Product is out of stock', 'warn')
                      }
                        }}> Add to curt</button>
  
  
  
                        </div>
                        </div>
                       
         
       </Link>
        
                 
        </div>
    )
    }
  
  export default ProductCard;
