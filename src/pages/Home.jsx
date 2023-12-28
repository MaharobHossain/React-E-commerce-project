import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SettingsContext } from '../components/SettingsProvider';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';


const Home = () => {
  //  slider ar kaj suru
  const settingsDataFromContext = useContext(SettingsContext);
  const [settings, setSettings] = useState();
  const [product, setProduct] = useState();

    var slickSettings ={
        dots:true,
        infinite:true,
        speed:300,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed: 2000

    };

    // cetagory ar kaj
    var slickCategorySetting ={
      dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
   
    responsive:[
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           },
         },
       ],
    };



  useEffect(() => {

      axios.get('settings?platform=web')
          .then(response => {
              setSettings(response.data);
          })

  }, [])

 console.log(settings);

// Slider ar kaj sesh
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
console.log(product)

console.log(settingsDataFromContext)


  return (

<div className="bg-teal-400">

 <div>
      <Layout>
      {/* slider ar kaj */}
        <Slider {...slickSettings}>
          {settingsDataFromContext?.hompageBanner.map((banner,index) => {
            return(
              <div>
                <img src={banner.banner_image} className='h-[400px] w-[100%]'/>
              </div>
            )
          })}
        </Slider>
        <br/>
        <br/>
        {/* cetagory ar kaj */}
        <Slider {...slickCategorySetting}>
           {settingsDataFromContext?.categories.map((category,index) =>{
            return (
              <div>
                <div className='p-10 border-2 mx-4 flex items-center justify-center'>
                  <div className='text-center'>
                    <img src={category.image} className='w-[60px] h-[70px]'/>
                    <span>{category.name}</span>
                  </div>
                </div>
              </div>
            )
           })}

        </Slider>


        <br/>
        <br/>

      <div className='p-2 my-6'>
      <div className="bg-gray-900">
      <h2 className="text-teal-400 text-center lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold">Popular Products List</h2>
      </div>
      
       <div className='items-center justify-center min-h-screen container mx-auto grid gap-5  grid-cols-4'>
       {
        product && product.map((item)=>{
          return <Link to={"/product/" + item.slug}>
          <ProductCard key={item.id} item={item}>

        </ProductCard>
          </Link>
        })
       }
       </div>

        </div>
      
      </Layout>
      
    </div>

</div>
  )
}

export default Home;
