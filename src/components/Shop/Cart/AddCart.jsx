import { FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";



const Add_Cart = ({ item, cart, setCart }) => {

    const addToCart = (evt) => {
        console.log(evt.target.name)
        setCart([...cart, item])
    }

   
   

    return (
        <div className='cart-list'>

            <div className="product-box" key={item.id}>
                <div className="product-img">

                <Link to="/shop/itemPage">
                <Image src={item.image}>
                </Image>
                </Link>
            </div>

                <div className="cart_button">
                    <button className="cartbutton" onClick={addToCart}><FaShoppingCart/></button>
                    <button className="listbutton"><FaRegHeart/></button>
                </div>


                <div className="product-details">
                    <h6>{item.name}</h6>
                    <h6>{item.price}</h6>
                </div>
            </div>
        </div>
    )
}

export default Add_Cart;