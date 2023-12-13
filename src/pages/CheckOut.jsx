import React, { useContext, useEffect, useState } from 'react'
import { SettingsContext } from '../components/SettingsProvider'
import { useCart } from 'react-use-cart';
import Layout from '../layouts/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/common/Toaster';






const CheckOut = () => {
    const navigate = useNavigate();
    const settingsDataFromContext = useContext(SettingsContext);
    const {items, cartTotal, emptyCart} = useCart();
    const [customerName, setCustomerName] = useState();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [orderNote, setOrderNote] = useState("");
    const [shippingCharge, setShippingCharge] = useState(0);

    const [insideDhakaAreas, setInsideDhakaAreas] = useState();
    const [outsideAreas, setOutsideAreas] = useState();

    useEffect(()=>{
        if(city=='inside_dhaka'){
            axios.get("ec/area-by-district/dhaka")
                .then(resp => {
                    console.log(resp.data.data.data);
                    setInsideDhakaAreas(resp.data.data.data);
                })
                .catch(e=>{
                    console.log(e);
                })
        }
        else if(city=='outside_dhaka'){
            axios.get("ec/get-cities")
                .then(resp => {
                    console.log(resp.data.data);
                    setOutsideAreas(resp.data.data)
                })
                .catch(e=>{
                    console.log(e);
                })
        }
    }, [city])

    let cartProducts = [];
    //   console.log(items);
    items.forEach(function (item) {
        console.log(item)
        cartProducts.push({
          id: item.id,
          product_id: item.product_id,
          product_name: item.name,
          product_price: Number(item.price).toFixed(2),
          qty: item.quantity
        });
      });

    const checkoutOrder = (e) => {
        e.preventDefault();
        let orderData = {
            shipping_details: {
                customer_name: customerName,
                customer_email: email,
                customer_phone: phone,
                customer_address: address,
                customer_city: city,
                customer_zip: zip,
                shipping_area: area
            },
            products: cartProducts,
            order_note: orderNote,
            payment_method: "cod",
            shipping_cost: shippingCharge,
            vat: "0.00",
            coupon_id: null,
            order_from: "online",
            pointApply: false,
            pointEnableTotalPrice: 0
        }

        axios.post('order', orderData)
            .then(function(response) { 
                console.log(response)
                
                if(response?.data?.success==false){
                    Toaster('Something went wrong! Please try again', 'error');
                   
                }
                if(response?.data?.success){
                    Toaster('Order completed successfully', 'success');
                    emptyCart();

                    navigate("/", {replace: true})

                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
       
    return (
        <>
            <Layout>

                <h3 className="text-red-500">This is checkout page</h3>


                <div className="flex justify-center w-100 ">

                    <div className="w-[50%] bg-slate-300 rounded-xl">

                        <form method="POST" className="flex items-center justify-center my-4" 
                        onSubmit={(e) => checkoutOrder(e)}
                        >

                            <div>

                                <input className="border-4 mb-4" type="text" name="customer_name"
                                    value={customerName}
                                    onChange={(e) => { setCustomerName(e.target.value) }}
                                    placeholder="Enter Your Name" />
                                <br />
                                <input className="border-4 mb-4" type="text" name="customer_name"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    placeholder="Enter Your Email Address" />
                                <br />
                                <input className="border-4 mb-4" type="text" name="customer_name"
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                    placeholder="Enter Your Phone Number" />
                                <br />
                                <select className="border-4 mb-4" name="city" value={city} onChange={(e) => { setCity(e.target.value) }}>
                                <option value={null}>Your City</option>
                                <option value={'inside_dhaka'}>Inside Dhaka</option>
                                <option value={'outside_dhaka'}>Outside Dhaka</option>
                                </select>
                                <br />
                                <select className="border-4 mb-4" name="area" value={area} onChange={(e)=> setArea(e.target.value)}>
                                    <option>Select Area</option>
                                    {city=='inside_dhaka' && (
                                       insideDhakaAreas && insideDhakaAreas.map((zone, index)=>{
                                        return <option key={index} value={zone.name}>{zone.name}</option>
                                       })
                                    )}

                                    {city=='outside_dhaka' && (
                                         outsideAreas && outsideAreas.map((zone, index)=>{
                                            return <option key={index} value={zone.value}>{zone.name}</option>
                                           })
                                        )}
                                </select>

                                <input className="border-4 mb-4" type="text" name="customer_name"
                                    value={zip}
                                    onChange={(e) => { setZip(e.target.value) }}
                                    placeholder="Zip" />
                                <br />
                                <input className="border-4 mb-4" type="text" name="customer_name"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                    placeholder="Address" />
                                <br />
                                <textarea className="border-4 mb-4" type="text" name="customer_name"
                                rows={4}
                                    value={orderNote}
                                    onChange={(e) => { setOrderNote(e.target.value) }}
                                    placeholder="Order Note" />
                                <br />
                          
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                            </div>

                        </form>

                    </div>

                    <div className="w-[50%] ms-2 bg-slate-300 rounded-xl">
                            <div className=" border-2 bg-white p-2">
                            {items?.map((product, index)=>{
                                return(
                                    <div key={index} className="flex justify-between mb-2 border-2">
                                        <div className="w-[30%]">
                                        <img src={product.image} className="border-2" width={80} />
                                        </div>
                                        <div className="w-[50%]">
                                            <span>{product.name}</span>
                                            <br />
                                            <span>x{product.quantity}</span>
                                        </div>
                                        <div className="w-[20%]">
                                        {(Number(product.quantity) * Number(product.price)).toFixed(2)}
                                        </div>
                                    </div>
                                    )
                            })}
                            </div>
                            <br />

                            <h6 className="px-2 font-bold text-xl">Shipping Method</h6>
                            <div className="px-2">
                            <input type="radio" id="Shipping_method" name="Shipping_method" value={city=='inside_dhaka' ? (settingsDataFromContext?.shipping_charges[0]?.price) : settingsDataFromContext?.shipping_charges[1]?.price}
                            onClick={(e)=>setShippingCharge(e.target.value)}
                             />
                             <label htmlFor="Shipping_method" className=" ms-3">Standard Delivery | ৳ {city=='outside_dhaka' && (settingsDataFromContext?.shipping_charges[1]?.price)} {city=='inside_dhaka' && (settingsDataFromContext?.shipping_charges[0]?.price)}</label>
                            </div>

                            <div className="my-4">
                                <p>Subtotal: {cartTotal}</p> <br />
                                <p>Shipping Charge: {shippingCharge}</p>
                                <p>Total: {Number(cartTotal)+Number(shippingCharge)}</p>
                            </div>
                    </div>
                </div>


            </Layout>
        </>
    );
            }
export default CheckOut;