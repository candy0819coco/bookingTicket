import React, { useCallback, useState, useEffect, Fragment, useContext, createContext, useImperativeHandle } from "react";
import "./Shop.css";
import { Provider } from "../context";
import * as R from "ramda";
import context from "./../context";
import  product_card  from './productdata';
import { Button } from "react-bootstrap";
import  AddCart  from "./Cart/AddCart";
import  DeleteItem from "./Cart/DeleteItem";
import ItemPage from "../ItemPage/ItemPage";






const Shop = () => {
    const [productImg, setproductImg] = useState(0);
    const [currentHoverButtonType, setCurrentHoverButtonType] = useState("");
    const contextValue = useContext(context);
    const { } = contextValue;
    const [cart,setCart]= useState([]);
  
    
    const addToCart = ({ product_card }) =>{
        const addToCart = () =>
        setCart([...cart,product_card]);
    }
    
    
    return (
        <>
        <div className={`shop_container`}>
            <Provider value={contextValue}> 

                <button className="nav_cart" >{cart.length}</button>
                {cart.map(item => <DeleteItem setCart={setCart} cart={cart} itemId={item.id} itemName={item.name} itemPrice={item.price} itemImage={item.image} />)}
                <div class="product-all">
                    <div className="product_header">
                    </div>
                        <div class="hamburger-menu">
                        <input id="menu__toggle" type="checkbox" />
                        <label class="menu__btn" for="menu__toggle">
                            <span></span>
                        </label>

                        <ul class="menu__box">
                            <li><a class="menu__item" href="#">Clothes</a></li>
                            <li><a class="menu__item" href="#">Accessoreies</a></li>
                            <li><a class="menu__item" href="#">Groceries</a></li>
                        </ul>
                        </div>
                
                    <div class="product-container">
                        <div class="sort-by">
                            <select name="sort-by">
                                <option value="Featured">Featured</option>
                                <option value="Bestselling">Bestselling</option>
                                <option value="A-Z alphabet">A-Z Alphabet</option>
                                <option value="Price low to high">price low to high</option>
                                <option value="Price high to low">price high to low</option>
                            </select>

                        </div>
                       
                        
                        <Fragment>
                            {product_card.map(item => <AddCart item={item} cart={cart} setCart={setCart}/>)}
                        </Fragment>
                         
                         
                    </div>
                   
                </div>  
            </Provider>
                
      </div>
      </>
    );
   
 };

export default Shop;

