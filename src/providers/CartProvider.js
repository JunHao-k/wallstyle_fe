import axios from 'axios';
import React, { useState } from 'react'
import CartContext from '../contexts/CartContext';

//const BASE_URL = "https://8000-junhaok-p3wallstyle-qln0hp2s15f.ws-us63.gitpod.io/api/products"
const BASE_URL = "https://wall-style.herokuapp.com/api/products"

export default function CartProvider(props){

    const [bodyInfo, setBodyInfo] = useState({
        'frameId': '',
        'dimensionId': '',
        'quantity': 1,
        'variantId': ''
    })

    const cartContext = {
        bodyInfo, setBodyInfo,
        addCartItem: async (bodyInfo) => {
            const tokens = JSON.parse(localStorage.getItem("myTokens"))
            try{
                if(tokens.accessToken){
                    const response = await axios.post(BASE_URL + `/${bodyInfo.variantId}/add` , {
                        'frameId': bodyInfo.frameId,
                        'dimensionId': bodyInfo.dimensionId,
                        'quantity': bodyInfo.quantity
                    },{
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`
                        }
                    })
                    console.log(response)
                    return response
                }
            }
            catch(error){
                console.log(error)
            }
            
        }
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}