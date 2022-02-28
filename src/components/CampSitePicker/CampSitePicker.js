import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./CampSitePicker.scss";
import * as R from "ramda";
import context, { Provider } from "../context";
import axios from "axios";

const CampSitePicker = (props) => {
  const contextValue = useContext(context);
  const {} = contextValue;
  const {
    pickedTicket,
    setPickedTicket,
    campSelectedList,
    setCampSelectedList,
    wsState,
    toDoSelectCamp,
    closeModal,
  } = props;
  console.log("pickedTicket", pickedTicket);
  console.log("campSelectedList", campSelectedList);

  const [campListFromDB, setCampListFromDB] = useState([]);
  const [currentCampArea, setCurrentCampArea] = useState("");

  const reportWindowSize = () => {
    var root = document.querySelector(".camp_site_picker_container");
    root.style.setProperty("--main-width", window.innerWidth);
  };
  window.addEventListener("resize", reportWindowSize);

  const pickCamp = (campItem) => {
    let tempCampList = [...campSelectedList];
    console.log("campItem", campItem);

    if (R.includes(campItem, tempCampList)) {
      tempCampList = R.without([campItem], tempCampList);
    } else {
      tempCampList.push(campItem);
    }
    console.log("tempCampList", tempCampList);
    setCampSelectedList(tempCampList);
    wsState.send(JSON.stringify(tempCampList));
  };

  const handleGetCamp = async (e) => {
    let result;
    await axios({
      method: "get",
      url: `http://localhost:3400/ticket_order/get_camp`,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log("camp_response", response);
        let campResult = response.data;
        console.log("camp_result", campResult);

        const byGrade = R.groupBy(function (campResult) {
          const campArea = campResult.campArea;
          return campArea === "A"
            ? "A"
            : campArea === "B"
            ? "B"
            : campArea === "C"
            ? "C"
            : null;
        });
        let tempCampObject = byGrade(campResult);
        console.log("tempCampObject", tempCampObject);
        let tempCampList = Object.entries(tempCampObject);
        setCampListFromDB(tempCampList);
      })
      .catch((error) => {
        console.log("camp_error", error);
        result = error;
      });
  };

  useEffect(() => {
    handleGetCamp();
  }, []);

  return (
    <div className={`camp_site_picker_container`}>
      <div className="pale_bg"></div>
      <div className="camp_site_picker">
        <div className="camp_map_wrapper">
          <div className="to_be_select">
            <div className="select_title">營位選擇清單</div>
            <div className="select_list">
              {pickedTicket.map((item, index) => {
                if (item.ticketType === "camp") {
                  return (
                    <div className="each_camp_ticket" key={index}>
                      <div className="camp_name">{item.ticketName}</div>
                      {item.campId ? (
                        <div className="camp_site">{item.campId}</div>
                      ) : null}
                      {item.campId ? (
                        <div className={`check_icon`}></div>
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div
            className={`camp_bg_map 
            ${
              currentCampArea === "A" ||
              currentCampArea === "B" ||
              currentCampArea === "C"
                ? "camp_map_blur"
                : ""
            }
            `}
          ></div>
          <div className={`camp_detail_cover`}>
            <div
              className={`camp camp_A ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "area_blur"
                  : ""
              }`}
              onClick={() => setCurrentCampArea("A")}
            ></div>
            <div
              className={`stage ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "stage_blur"
                  : ""
              }`}
            ></div>
            <div
              className={`camp camp_B ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "area_blur"
                  : ""
              }`}
              onClick={() => setCurrentCampArea("B")}
            ></div>
            <div
              className={`camp camp_C ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "area_blur"
                  : ""
              }`}
              onClick={() => setCurrentCampArea("C")}
            ></div>
            <div
              className={`tree tree_one ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "tree_blur"
                  : ""
              }`}
            ></div>
            <div
              className={`tree tree_two ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "tree_blur"
                  : ""
              }`}
            ></div>
            <div
              className={`tree tree_three ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "tree_blur"
                  : ""
              }`}
            ></div>
            <div
              className={`pointer_line ${
                currentCampArea === "A" ||
                currentCampArea === "B" ||
                currentCampArea === "C"
                  ? "pointer_line_blur"
                  : ""
              }`}
            >
              <div className="item camp_title">CAMP</div>
              <div className="item line_and_circle line_one"></div>
              <div className="item line_and_circle line_two"></div>
              <div className="item line_and_circle line_three"></div>
            </div>
          </div>
          <div
            className={`camp_area             ${
              currentCampArea === "A" ||
              currentCampArea === "B" ||
              currentCampArea === "C"
                ? "camp_area_show"
                : ""
            }`}
          >
            {campListFromDB.map((campGroupItem, campGroupIndex) => {
              return (
                <div
                  className={`camp_group ${
                    currentCampArea === campGroupItem[0]
                      ? "camp_group_show"
                      : ""
                  }`}
                  key={campGroupIndex}
                >
                  <div
                    className={`camp_island island_${
                      campGroupIndex === 0
                        ? "A"
                        : campGroupIndex === 1
                        ? "B"
                        : campGroupIndex === 2
                        ? "C"
                        : ""
                    }`}
                  ></div>
                  <div className="pick_wrapper">
                    <div className="camp_area_name">
                      {campGroupIndex === 0
                        ? "A"
                        : campGroupIndex === 1
                        ? "B"
                        : campGroupIndex === 2
                        ? "C"
                        : ""}
                      區營地
                    </div>
                    <div
                      className="close_icon"
                      onClick={() => setCurrentCampArea("")}
                    ></div>
                    <div className="camp_area_site">
                      {campGroupItem[1].map((campItem, campIndex) => {
                        return (
                          <div
                            className={`each_camp ${
                              campItem.campStatus === 0 ? "disabled" : ""
                            }
                            ${
                              R.includes(campItem, campSelectedList)
                                ? "selected"
                                : ""
                            }
                            ${
                              campSelectedList.length ===
                                toDoSelectCamp.length &&
                              !R.includes(campItem, campSelectedList)
                                ? "finished"
                                : ""
                            }
                            `}
                            key={campIndex}
                            onClick={() => pickCamp(campItem)}
                          >
                            <div className="camp_id">{campItem.campId}</div>
                            {/* <div
                              className={`camp_type ${
                                campItem.campType === "budget"
                                  ? "budget"
                                  : "fancy"
                              }`}
                            ></div> */}
                            {/* <div className="camp_capacity">
                              {campItem.campCapacity}人
                            </div>
                            <div className="camp_price">
                              {campItem.campPrice}元
                            </div> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
            <div
              className={`confirm_btn_area ${
                campSelectedList.length === toDoSelectCamp.length
                  ? "finished"
                  : ""
              }`}
            >
              <div
                className={`confirm_btn ${
                  campSelectedList.length === toDoSelectCamp.length
                    ? "finished"
                    : ""
                }`}
                onClick={closeModal}
              >
                確認
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampSitePicker;
