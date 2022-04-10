 import Image from 'react-bootstrap/Image';
import "./Cart.css";
import { Button } from "react-bootstrap";
import { useState , useContext } from 'react';
import Add_Cart from './AddCart';
import Shop from '../Shop';
import context,{Provider} from '../../context';


const DeleteItem = ({ item}) => {
    const contextValue = useContext(context);
    const { cart,setCart} = contextValue;
    const [itemCount, setItemCount] = useState(1);

    const DeleteThis = () => {
        // console.log(itemId);
        console.log('cart',cart)

        setCart(cart.filter(cartItem => item.pId !== cartItem.pId))
        console.log(cart);

    }
    
    // const contextValue = useContext(context);
    // const {productImg ,setproductImg}=contextValue;

    return (
        
        <>
            <Provider value={contextValue}>

            <div className="shopping-info" >
                <div className="item-name">{item.pName}</div>
                <Image className="item-image" src={item.pImage}></Image>
                <div className="item-price">{item.pPrize}</div>
                <div className="item-quantity">
                <input name="preferance" value="-" type="submit" className="btn-no minus" onClick={() => {
                        setItemCount(Math.max(itemCount - 1, 0));
                    }} />
                    <span className="qty-no" >{itemCount}</span>
                    <input name="preferance" value="+" type="submit" className="btn-no plus" onClick={() => {
                        setItemCount(itemCount + 1);
                    }} />
                </div>
                <Button className="shopping-cart-button" variant="danger" onClick={DeleteThis}>Delete</Button>
            </div>
            </Provider>

        </>   
      

    )
}




export default DeleteItem;