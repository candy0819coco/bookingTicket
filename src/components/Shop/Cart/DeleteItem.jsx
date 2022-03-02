import Image from 'react-bootstrap/Image';
import "./Cart.css";
import { Button } from "react-bootstrap";
import { useState } from 'react';




const List_Item = ({ itemId, setCart, cart, itemName, itemPrice, itemImage }) => {

    const deleteItem = () => {

        setCart(cart.filter(cartItem => itemId !== cartItem.id))

    }
    



    return (
        <div className="shopping-cart">
            <div className="shopping-info">
                <div className="item-name">{itemName}</div>
                <Image className="item-image" src={itemImage}></Image>
                <div className="item-price">{itemPrice}</div>
                <div className="item-quantity"></div>
                <Button className="shopping-cart-button" onClick={deleteItem}>Delete</Button>
            </div>
        </div>



    )
}

export default List_Item;