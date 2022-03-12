import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./ItemPage copy.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import product_card from "../Shop/productdata";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import CheckOut from "./../CheckOut/CheckOut";
import DeleteItem from "../Shop/Cart/DeleteItem";
import axios from "axios";
// import AddItem from './AddItem'
// import "./SingleProduct.css"

const ItemPage = () => {
  const contextValue = useContext(context);
  const { shopSingleItemList } = contextValue;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [showCart, setshowCart] = useState(0);
  const [currentHover, setCurrentHover] = useState("");
  const [cart, setCart] = useState([]);
  const [clickMe, setClickMe] = useState("");
  const [myColor, setmyColor] = useState("");
  const [singleItem, setSingleItem] = useState([]);
  const [myName, setMyName] = useState("");
  const [hasColor, setHasColor] = useState(true);
  // const buttons = ['']
  // console.log(cart)

  const WantThis1 = (event) => {
    setClickMe((clickMe) => event.target.id);
  };
  // useEffect=()=>{
  //
  // }
  const thisIsColor = (e) => {
    setmyColor(e.target.id);
    // alert(`選擇${e.target.id}`)
  };

  const Add_Cart = ({ item, cart, setCart }) => {
    const addToCart = (evt) => {
      console.log(evt.target.name);
      setCart([...cart, item]);
    };
  };
  const CartClicked = () => {
    console.log("ok");
    setshowCart(!showCart);
  };

  const { pName } = useParams();

  const getSingleItem = async () => {
    await axios

      .post(`http://localhost:3400/shop/${pName}`, { pName: pName })
      .then((res) => {
        // console.log("get it");
        console.log("res.data.result[0]", res.data.result);
        let results = res.data.result;
        let singleItem = results.filter((item) => {
          console.log("item.pColor", item.pColor);
          return item.pSize === "S" || item.pColor === null;
        });
        setSingleItem(singleItem);
        console.log("singleItem", singleItem);
        setMyName(singleItem[0].pName);

        // console.log(singleItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("hello");
    getSingleItem();
  }, []);
  console.log("passing singleItem:", singleItem);
  // console.log('what Null Is :',null == undefined); true
  // console.log('singleItem[0]',singleItem[0]) //get an obj in an arr

  return (
    <div className={`likeThis`}>
      <div className={`shop_container`}>
        <Provider value={contextValue}>
          <div className="item_page">
            <div className="product_info">
              <Fragment>
                <div className="product_name_oneProduct">
                  <div className="product_name_title">{myName}</div>
                </div>
                {singleItem.length && singleItem.length==1 ? (
                  <div className="IMG_and_Btn">
                    <div className="image_size">
                      <div className="photo_area">
                    <Image src={singleItem[0].pImage} className='soloProductIMG'></Image>
                      </div>
                    <div className="cart_btn_color">
                      <Button
                        className="go_Buy_cart_btn_oneProduct"
                        variant={`secondary`}
                        onClick={CartClicked}
                      >
    
                        <FaShoppingCart className="fookinCart" />
                        Add to cart
                      </Button>
                    </div>
                  </div>
                  </div>
                ) : (
                  <div className="second_div">
                    <div className="product_carousel">
                      <Carousel>
                        {singleItem.map((item) => {
                          console.log('item', item)
                          return (
                            <Carousel.Item interval={155500}>
                              <Image
                                key={item.pId}
                                className="carousel_img"
                                // src={require(`../shopImage/${itemImage}.png`)}
                                src={item.pImage}
                              ></Image>
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </div>
                    <div className="whatType_U_Want">
                      <div className="product_select_oneProduct">
                        <div className="size_area">
                          <div className="product_size_oneProduct">Size</div>
                          <div className="prodoct_size_container">
                            <Button
                              variant={`${
                                clickMe == "1"
                                  ? "secondary"
                                  : "outline-secondary"
                              }`}
                              id="1"
                              className="settingSize "
                              onClick={(id) => WantThis1(id)}
                              size="sm"
                            >
                              S
                            </Button>
                            {""}
                            <Button
                              variant={`${
                                clickMe == "2"
                                  ? "secondary"
                                  : "outline-secondary"
                              }`}
                              id="2"
                              className="settingSize"
                              onClick={(id) => WantThis1(id)}
                              size="sm"
                            >
                              M
                            </Button>
                            {""}
                            <Button
                              variant={`${
                                clickMe == "3"
                                  ? "secondary"
                                  : "outline-secondary"
                              }`}
                              id="3"
                              className="settingSize"
                              onClick={(id) => WantThis1(id)}
                              size="sm"
                            >
                              L
                            </Button>
                            {""}
                          </div>
                        </div>
                      </div>

                      <div className="product_color">
                        <h6 className="ColorText">Color</h6>
                        <div className="color_type">
                          <button
                            className={`btn btn-danger btn-lg ${
                              myColor === "Red" ? "chooseMe" : ""
                            }`}
                            onClick={thisIsColor}
                            id="Red"
                          ></button>
                          {""}
                          <button
                            className={`btn btn-light btn-lg addBorder ${
                              myColor === "White" ? "chooseMe" : ""
                            }`}
                            onClick={thisIsColor}
                            id="White"
                          ></button>
                          {""}
                          <button
                            className={`btn btn-dark btn-lg ${
                              myColor === "Black" ? "chooseBalck" : ""
                            }`}
                            onClick={thisIsColor}
                            id="Black"
                          ></button>
                          {""}
                        </div>
                      </div>
                      <div className="cart_btn_color">
                        <Button
                          className="go_Buy_cart_btn"
                          variant={`secondary`}
                          onClick={CartClicked}
                        >
                          <FaShoppingCart className="fookinCart" />
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            </div>
          </div>
        </Provider>
        <div
          className="showCaseDetail"
          style={{ visibility: showCart ? "visible" : "hidden" }}
          >
          <div>
            <div className="sheet">
              <Image
                className="redLogoT"
                src="https://cdn.discordapp.com/attachments/677538517949218820/950787473980665856/LoTshirt-red.png"
              ></Image>
              <div className="namePrice">
                <span>{singleItem.pName}</span>
                <br />
                <span>$ {singleItem.pPrize}</span>
              </div>
            </div>
            <button className="btn goToChecKThis">
              <Link to={`/shop/ItemPage/CheckOut`} className="linkName">
                結帳
              </Link>
            </button>
            {/*Link 內網址修正*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
