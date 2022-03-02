 import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
 import "./ItemPage.css"
 import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
 import { Carousel } from "react-bootstrap";
 import { Button } from "react-bootstrap";
 import Image from 'react-bootstrap/Image';




 const Add_Item = ({ item, cart, setCart }) => {

    const addToCart = (evt) => {
         console.log(evt.target.name)
         setCart([...cart, item])
     }



 
 return (
   
         <div className="product_select" key={item.id}>
             <div className={item.name}></div>
         
             <div className="order_button">
                 <Button variant="outline-secondary" size="sm" onClick={addToCart}><FaShoppingCart></FaShoppingCart>Add to cart</Button>{' '}
                 <Button variant="outline-secondary" size="sm"><FaRegHeart></FaRegHeart></Button>{' '}
             </div>
        </div>
          
 )
}
export default Add_Item;
