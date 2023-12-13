import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import ProductCard from './ProductCard'
import { Link, useParams } from 'react-router-dom'

function Product() { 
  const [products,setProduct] = useState()
  useEffect(() =>{
      
      axios.get('https://uol-v-2.hostprohub.com/api/get-products?platform=web')
      .then((response) => {
          console.log(response)
          setProduct(response.data.data.data)
      })
      .catch((err) => {
          console.log(err)
      })
      
  },[])
  // console.log(products.data)
  return (
    <Layout>
      
      <div className='items-center justify-center min-h-screen container mx-auto grid gap-6  grid-cols-2  '>
         {
           products && products.map((item) => {
                return <Link to={"/product/" + item.slug}>
                <ProductCard key={item.id} item={item}>

              </ProductCard>
                </Link>
            })
           }
         </div>
    </Layout>
  )
}

export default Product;
