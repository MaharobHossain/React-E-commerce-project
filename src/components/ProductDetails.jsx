import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { useCart } from 'react-use-cart'
import Toaster from './common/Toaster'

const ProductDetails = () => {
    const [product,setProduct] = useState();
    const [productPrice, setProductPrice] = useState(0);
    const [ProductDetails, setProductDetails] = useState();
    const [attributeId, setAttributeId] = useState(); 
    const {addItem} = useCart();
    const { slug } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedAttribute, setSelectedAttribute] = useState();


    useEffect(() =>{
        
        axios.get('get-product/' + slug)
        .then((response) => {
            console.log(response);
            if (response?.data?.success){
              setProductDetails(response?.data?.data);
              setProductPrice(response?.data?.data?.formatted_final_product_price);
              setProduct(response?.data?.data);
            }


        })
        .catch((err) => {
            console.log(err)
        })
        
    },[])
    console.log(productPrice)
  return (

     <div className="bg-teal-400">

      <Layout>
      <h3 className="bg-gray-900 text-teal-400 lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold text-center">This is product Details page</h3>
        
        <div className='grid grid-cols-2'>
          <div>
             <img src={product?.image?.large} className='' />
          </div>

          <div>
            <h1 className='font-bold text-2xl'>{product?.name}</h1>
            <p className='font-bold'>Rrgular Price:<del className='font-sans text-2xl'>{product?.regular_price}৳</del></p>
            <p className='font-bold text-2xl'>Offer Price:{productPrice}৳</p>
               <br/>
               
               <div className='attribute_section'>
                {ProductDetails?.attributes.map((attribute,index)=>{
                  return(
                    <button key={index} className={`p-4 rounded-lg mr-4 ${(attributeId==attribute?.id) ?'bg-green-500 text-black' : 'bg-green-200' }`} onClick={()=>{
                      setProductPrice(attribute.attribute_final_price);
                      setAttributeId(attribute?.id)
                      setSelectedAttribute(attribute)
                      }
                      }>{attribute?.attribute_value}</button>
                  );
                })}

               </div>

                 <br/>

                 <div className='flex my-4'>

                     <input className='w-[4rem] bg-yellow-400 text-black mr-2 hover:bg-black hover:text-white' type='number' min={1} max={100} name='quantity' onChange={(e) => setQuantity(e.target.value)} />
                    
                     <button className='bg-yellow-400 text-black p-3 rounded-lg hover:bg-black hover:text-white' onClick={(e)=>{
                       e.preventDefault();

                      if(!selectedAttribute){
                        Toaster('Please select Variation frist', 'warn')
                      }

                      else if( Number(selectedAttribute?.stock) > 0) {
                      
                        addItem({
                          id: selectedAttribute?.id + '-' + selectedAttribute?.product_id,
                          product_id: selectedAttribute?.product_id,
                          name: ProductDetails?.name + '('+ selectedAttribute?.attribute_value +')',
                          slug:ProductDetails?.slug,
                          price:selectedAttribute?.attribute_final_price,
                          image:ProductDetails?.image?.small,
                          stock:selectedAttribute?.stock
                         }, quantity);
                         Toaster("Product Add to cart", 'success')

                      }

                      else{
                         Toaster('Product is out of stock', 'warn')
                          }
                       
                     }}> Add to curt</button>
                 </div>
              

          </div>

  
        </div>

       </Layout>

      
    </div>
  )
}

export default ProductDetails;
