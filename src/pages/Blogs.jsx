import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {

  const [blogs, setBlogs] = useState();

useEffect(() => {

  axios.get('blogs')
  .then(response => {
      console.log(response.data);
      setBlogs(response.data);
  })

},[])



return (
<div>
   <Layout>
   <p className='bg-gray-900 text-teal-400 lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold'>It's Blog page.</p>
   

   {blogs && blogs.map((blog, index) => {
      return(
         <Link to={`/blog/${blog.slug}`} key={index}>

          <div className='bg-white m-6 p-6 rounded-lg flex'>
              <img src={blog.image} className='h-auto px-6' width={300} />

              <div className=''>
                <h2 className='text-2xl'>{blog.title}</h2>
                <p>{blog.sub_title}</p>
              </div>
          </div>
         </Link>
      )
    })}
   </Layout>
</div>
)
}

export default Blogs;