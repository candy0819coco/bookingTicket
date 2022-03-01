import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "./Jump.scss";


const Jump = () => {
    const navigate = useNavigate();
    const { mMail } = useParams();

    useEffect(() => {
        active();
    }, []);

    const active = (props) => {
        // console.log(this.props.location.pathname);
        setTimeout((() => {
            // console.log(window.location.href);
            // const mMail = props.view.location.pathname.substring(17);
            // const mMail = window.location.href.substring(38);
            // console.log(mMail);
            //拿到網址列的信箱資料
            Axios.put(`http://localhost:3001/register/active/${mMail}`)//把拿到的信箱放到網址裡往後端丟過去
                .then((response) => {
                    // alert("信箱驗證無誤，即將跳轉回登入頁面登入");
                    // console.log(response.data.massage);
                    navigate("/signIn");//驗證成功跳回登入頁面
                }).catch(function (err) {
                    alert("驗證失敗");
                })

        }), 1000);

    }



    return (

        <div className="jump">
            <h2>驗證成功，即將導向登入頁面......</h2>
        </div>

    );

}

export default Jump;