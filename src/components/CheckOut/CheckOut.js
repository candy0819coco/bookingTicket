import './CheckOut.scss';
import React, { useCallback, useState, useEffect, Fragment, useContext, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";
// import CrditCard from "./CreditCard";
import MyModal from "./Mymodal";
import { Modal } from "react-bootstrap";
import { Prev } from 'react-bootstrap/esm/PageItem';


const CheckThis = () => {
    const contextValue = useContext(context);
    const { } = contextValue;
    const [payment, setPayment] = React.useState('cash');
    const handleChange = (event) => {
        setPayment(event.target.value)
    }
   
    const [cart, setCart] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const handleShow = () => setLgShow(true);
    const [count, setCount] = useState(1);
    const [count2 , setCount2] = useState(1);
    const [item , setItem] = useState(0);


    const letCountPlus = (item) => {
        // setCount (item)
        // setCart([...cart,,item]) //setCart 更新陣列內容
        console.log(item)
       
    }

    const letCountMinus = (item) => {
        // setItemCount(item-1)
    }
    // console.log('gotU.test1 out',gotU.test1)
    // console.log('gotU.test2 out',gotU.tset2)
    return (

        <div className={`CheckThis_container`}>
            <Provider value={contextValue}>
                <div className="____">

                    <div className="header"></div>
                    <div className='container'>
                        <div className="main">
                            <div className="rows">
                                <div className="col-6 formContainer d-flex flex-wrap">

                                    <div className="contact-tag" onsubmit="JavaScript:alertZero()">
                                        <div className="contact" >
                                            <span>Contact infomation</span>
                                        </div>

                                        <div className="contact-type"></div>
                                        <div className="email-label">
                                            <label for="email" className="label-heads">E-mail</label>
                                            <br></br>
                                            <input type="email" id="email" name="Email: " placeholder="Enter your email..." class="contain" required></input>
                                        </div>
                                        <div id="call-label">
                                            <label for="tel" className="label-heads">Phone</label>
                                            <br></br>
                                            <input type="tel" id="tel" name="Phone: " pattern="[+][0-9]{2}[0-9]{10}" placeholder="Enter your phone..." class="contain" required></input>
                                        </div>

                                        <div id="address" className="heads">
                                            <span>Shipping address</span>
                                        </div>

                                        <div id="name-label">
                                            <div for="name" className="label-heads">Full name</div>
                                            <br></br>
                                            <input type="name" id="name" placeholder="Your name..." className="contain" name="Name: " required></input>
                                        </div>

                                        <div className="add-label">
                                            <label for="add" className="label-heads">Address</label>
                                            <br></br>
                                            <input type="text" id="add" placeholder="Your address.." className="contain" name="Address: " required></input>
                                        </div>

                                        <div id="city-label">
                                            <label for="city" className="label-heads">City</label>
                                            <br></br>
                                            <input type="text" id="city" placeholder="Your city.." className="contain" name="City: " required></input>
                                        </div>

                                        <div className="country-label">
                                            <label for="country" className="label-heads">Country</label>
                                            <br></br>
                                            <select id="dropdown" className="contain" placeholder="Your country.." required name="Country: ">
                                                <option disabled selected value>Your country..</option>
                                                <option value="Taipei">台北</option>
                                                <option value="Taichung">台中</option>
                                                <option value="Kaohsiung">高雄</option>
                                            </select>
                                        </div>

                                        <div id="zip-label">
                                            <label for="zip-input" className="label-heads">Postal code</label>
                                            <br></br>
                                            <input type="text" pattern="[0-9]*" maxlength="6" required name="PIN Code: " placeholder="Your postal code.." id="zip-input" class="contain"></input>
                                        </div>

                                        <div id="payment-shipping" >
                                            <div><input type="radio" value="cash" /> Cash
                                            </div>
                                            {/* <div><input type="radio" value="credit-card" checked={payment === 'credit-card'} onChange={handleChange}/> Credit card</div> */}
                                            <MyModal className="" />
                                        </div>
                                    </div>


                                    <div id="submit-label">
                                        <input name="preferance" value="Order" type="submit" id="subbtn" onClick={() => setLgShow(true)} />
                                        <Modal
                                            size="lg"
                                            show={lgShow}
                                            onHide={() => setLgShow(false)}
                                            aria-labelledby="example-modal-sizes-title-lg">
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-lg">
                                                    Love & Peace
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>您的訂單已成立！感謝您的購買</Modal.Body>
                                        </Modal>
                                    </div>
                                </div>


                                <div className="left-cart">

                                    <div className="item-row" id="itm-row1">
                                        {/* <img className="pic" alt="img-1" src={[require("../Shop/shopImage/LoCap-black.png")]}></img> */}
                                        <h4 className="item1 item-label">Cap</h4>
                                        <h4 className="item1 item-label">Black</h4>
                                        <h4 className="item1 item-label"></h4>
                                        <p className="item1">
                                            <span className="spl">$650</span>
                                        </p>
                                        <p className="qty" >
                                            <input name="preferance" value="-" type="submit" className="btn-no minus" disabled={count2==1?'disabled':''} id='counter1'
                                            onClick={()=>setCount2(count2 -1)}
                                            />
                                            <span className="qty-no" >{count2}</span>
                                            <input name="preferance" value="+" type="submit" className="btn-no plus" id='counter1'
                                                onClick={()=>setCount2(count2 +1)}
                                            />
                                        </p>
                                    </div>
                                    <br />
                                    <div className="item-row" id="itm-row1">
                                        {/* <img className="pic" alt="img-1" src={[require("../Shop/shopImage/LoTshirt-red.png")]}></img> */}
                                        <h4 className="item1 item-label">T-shirt</h4>
                                        <h4 className="item1 item-label">Red</h4>
                                        <h4 className="item1 item-label">M</h4>
                                        <p className="item1">
                                            <span className="spl">$550</span>
                                        </p>
                                        <p className="qty" id='counter2'>
                                            <input name="preferance" value="-" type="submit" className="btn-no minus" disabled={count ==1?'disabled':''}
                                                onClick={()=>setCount(count -1)}
                                            />

                                            <span className="qty-no" >{count}</span>
                                            <input name="preferance" value="+" type="submit" className="btn-no plus"
                                                onClick={()=>setCount(count +1)}
                                            />
                                        </p>
                                    </div>




                                    {/* <div className="details horizontal" id="hr1">

                                        <div className="details">
                                            <div className="detail-title">
                                                Total:
                                                <span className="total-price" id="tp"></span>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </Provider>
        </div>
    );
};
export default CheckThis;
//A_item array .length?
// B_item array .length?
//Y[ [A,A,A] , [B,B,B] ] >> Y.length=2 (購物車icon上數字)
//Y[ [A,A,A] , [B,B] ] >> Y[0].length=3 (顯示在購物車內的A計數器數字 - 3 + )
//預設給y=[] > 解構[...y,[]] 可行? 如何放入y[ [] ]?
//const [ItemGoCart,setItemGoCart] = useState([])  //負責進行單項商品cart Array的變更
//newArr = [] ;  setItemGoCart[...newArr, A] //>解構newArr放入A商品
//const [giveY , setGiveY] = useState([])>> 負責進行放入Y array 抓length為cart icon上數字
//setGiveY(...giveY , newArr)//解構newArr放入Y array  giveY此時應該是Y[[A],]
//先進行該動作的會為第一項目 用giveY[0].length  (index)可以作為數量顯示在計數器上
//刪除時抓取點選項目呼叫index選擇器 做刪除
//完成?
//1.各項目擁有各自陣列(O) 2.各自的陣列可放入名為y的購物車陣列中(O) 
//3.可用記數器增減購買數量(X) 4.可被指定刪除(O)
// 進行製作單商品計數器
//計數器運算 onClick事件抓取點選到的擁有該計數器的項目index順便判斷加減
//對這個index的arry進行解構再新同樣物件進入該array
//假設humanKnow = index -1 //抓到第二筆array 陣列起始數字為0 需-1
//Y[index-1]=Y[1] ; let goChange = y[1] //console.log(y[1])>>應該為[item1 , item 1,item1]
//setItemGoCart([....goChange , item1]) 
//goChange為y[1]這個array >解構與內部原有item相同的item進入
//goChange == y[1] && == [ item1, item1, item1, item1]
//如成功 , y[1].length會增加
//useEffect刷新畫面上所有在Y array內的個別array.length 重新render