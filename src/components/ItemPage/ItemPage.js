import React, { useCallback, useState, useEffect, Fragment, useContext } from "react";
import "./ItemPage.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";
import  product_card  from '../Shop/productdata';
import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import DeleteItem from '../Shop/Cart/DeleteItem'
// import InnerImageZoom from 'react-inner-image-zoom';



const ItemPage = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cart,setCart]= useState([]);
    console.log(cart)

    const Add_Cart = ({ item, cart, setCart }) => {

        const addToCart = (evt) => {
            console.log(evt.target.name)
            setCart([...cart, item])
        }};
    
   
           
    return (
        <div className={`shop_container`}>
            <Provider value={contextValue}>
                <div className="item_page">
                    
                    <div className="hamburger-menu">
                        <input id="menu__toggle" type="checkbox" />
                        <label className="menu__btn" htmlFor="menu__toggle">
                            <span></span>
                        </label>

                        <ul className="menu__box">
                            <li><a className="menu__item" href="#">Clothes</a></li>
                            <li><a className="menu__item" href="#">Accessoreies</a></li>
                            <li><a className="menu__item" href="#">Groceries</a></li>
                        </ul>
                    </div>
                    <div className="product_info">
                        <div className="product_carousel">
                            <Carousel>
                                <Carousel.Item interval={1000}>
                                    <Image className="carousel_img" src={[require("../Shop/shopImage/LoTshirt-black.png")] }></Image>
                                </Carousel.Item>
                                <Carousel.Item interval={500}>
                                    <Image className="carousel_img" src={[require("../Shop/shopImage/LoTshirt-red.png")]}></Image>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image className="carousel_img" src={[require("../Shop/shopImage/LoTshirt-white.png")]}></Image>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="product_select">
                            <div className="size_area">
                                <div className="product_size">Size</div>
                                <Button variant="outline-secondary" size="sm">S</Button>{''}
                                <Button variant="outline-secondary" size="sm">M</Button>{''}
                                <Button variant="outline-secondary" size="sm">L</Button>{''}
                            </div>


                            <div className="product_color">Color
                                <div className="color_type">
                                    <Button variant="danger" size="lg"></Button>{' '}
                                    <Button variant="light" size="lg"></Button> {' '}
                                    <Button variant="dark" size="lg"></Button>{' '}
                                </div>
                            </div>


                            <div className="order_button">
                                <Button variant="outline-secondary" size="sm" onClick={show}><FaShoppingCart></FaShoppingCart>Add to cart</Button>{' '}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Notice</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>You have add the product in shopping bag!<br/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button variant="outline-secondary" size="sm"><FaRegHeart></FaRegHeart></Button>{' '}</div>
                        </div>
                         {/* <div className="shopping_cart_area"> 
            
                        <div className="shopping-cart">
                            <div className="shopping-cart-header">Your cart</div>
                            <div className="shopping-cart-items">
                                <Image className="cart_img" src={[require("../ItemPage/Itemimage/blackT.png")]}></Image>
                                <div className="item_info">
                                    <div className="item-name"></div>
                                    <div className="item-price"></div>
                                    <div className="item-quantity">1</div>
                                </div>
                                <div className="shopping-cart-total">
                                    <span className="lighter-text">Total:</span>
                                    <span className="main-color-text">$690</span>
                                </div>
                            </div>
                            <a href="#" className="button">Checkout</a>
                        </div> 
                    </div>      */}
                    </div>

                </div>


            </Provider >
        </div>);
};

export default ItemPage;

