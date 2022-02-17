import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Jump = () => {
    const navigate = useNavigate();
    const active = (props) => {

        const mMail = props.view.location.pathname.substring(17);
        //拿到網址列的信箱資料

        Axios.put(`http://localhost:3001/register/active/${mMail}`)//把拿到的信箱放到網址裡往後端丟過去
            .then((response) => {
                alert("信箱驗證無誤，即將跳轉回登入頁面登入");
                // console.log(response.data.massage);
                navigate("/signIn");//驗證成功跳回登入頁面
            }).catch(function (err) {
                alert("驗證失敗");
            })

    }



    return (
        <div>
            <button onClick={active}>點擊認證</button>
            {/* <p>認證成功，即將跳轉回首頁</p> */}
        </div>

    );

}

export default Jump;