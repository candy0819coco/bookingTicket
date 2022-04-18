import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useImperativeHandle,
  useContext,
} from "react";
import "./Shop.scss";
import {Link} from "react-router-dom";
import * as R from "ramda";
import context, { Provider } from "../context";
import product_card from "./productdata";
import { Button } from "react-bootstrap";
import AddCart from "./Cart/AddCart";
import DeleteItem from "./Cart/DeleteItem";
import ItemPage from "../ItemPage/ItemPage";
import axios from "axios";
// import '../ItemPage/ItemPage.css';

const Shop = () => {
  const [shopItemList, setShopItemList] = useState({});
  const [shopSingleItemList, setShopSingleItemList] = useState({});
  const [currentHoverButtonType, setCurrentHoverButtonType] = useState("");
  const contextValue = useContext(context);
  const {} = contextValue;
  const [cart, setCart] = useState({});
  const handleGetItem = () => {
    let results;
    axios
      .get("http://localhost:3400/shop/product_display")
      .then(function (response) {
        console.log('responseAsnwer', response)
        results = response.data;
        // setShopSingleItemList(results);
        // console.log("shopSingleItemList", shopSingleItemList);
        var newResults = results.filter((item) => {
          return (
            (item.pColor === "Black" && item.pSize == "S") || item.pSize == null
          );
        });
        console.log('newResultsTest',newResults);
        setShopItemList(newResults);
      })
      .catch((error) => {
        console.log("shop_display_error", error);
      });
    
  };
  useEffect(() => {
    handleGetItem();
  }, []);
 const toObj = Object.assign({},shopItemList)
console.log('toObj',toObj)
  return (
    <Provider
      value={{
        cart: cart,
        setCart: setCart,
      }}
    >
      <div className={`shop_container shopScss`}>
        <button className="nav_cart">{cart.length}</button>
        <div
          className="shopping-cart"
          style={{ display: cart.length === 0 ? "none" : "block" }}
        >
          {/* {cart.map((item) => (
            <DeleteItem setCart={setCart} item={item} cart={cart} />
          ))} */}
        
        <div className="shopping-cart-footer">
          <div className="shopping-cart-total">Total:</div>
          <div className="check-out">
            <Button className="check-out-button" variant="success">Check out
            <Link to={`/shop/ItemPage/CheckOut`} className="linkName">
            </Link>
            </Button>
          </div>
        </div>
        </div>
        <div className="product-all">
          <div className="product-container">
            {/* <Fragment>
              {shopItemList.map((item) => (
                <AddCart
                  item={item}
                  cart={cart}
                  setCart={setCart}
                  itemImage={item.pImage}
                />
              ))}
            </Fragment> */}
          </div>
        </div>
        {/* </Provider> */}
      </div>
    </Provider>
  );
};

export default Shop;
