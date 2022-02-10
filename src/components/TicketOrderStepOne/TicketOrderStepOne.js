import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useContext,
} from "react";
import "./TicketOrderStepOne.scss";
import { Provider } from "../context";
import * as R from "ramda";
import context from "../context";

const TicketOrderStepOne = (props) => {
  const [currentHoverTicketType, setCurrentHoverTicketType] = useState("");

  const contextValue = useContext(context);
  const { isDarkMode } = contextValue;
  const { setTicketOrderStep, setSelectedTicketType } = props;
  const handlePickTicketType = (ticketType) => {
    setSelectedTicketType(ticketType);
    console.log("票種選擇完成，下一步");
    setTicketOrderStep(1);
  };
  return (
    <div
      className={`ticket_order_step_one_container ${
        isDarkMode ? "ticket_order_container_dark" : ""
      }`}
    >
      <Provider value={contextValue}>
        <div className="ticket_order">
          <div className="title_container">
            <div
              className={`ticket_order_title  ${
                isDarkMode ? "ticket_order_title_dark" : ""
              }`}
            ></div>
          </div>
          <div className="ticket_type_area">
            <div
              className={`ticket_box ${
                currentHoverTicketType === "two" ||
                currentHoverTicketType === "camp"
                  ? "add_blank"
                  : ""
              }`}
            >
              <div
                className="ticket_image ticket_one_day"
                onMouseEnter={() => setCurrentHoverTicketType("one")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "one" ? "order_button_show" : ""
                  }`}
                  onClick={() => handlePickTicketType("one")}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "one" ? "area_show" : ""
                }
                ${isDarkMode ? "ticket_info_area_dark" : ""}
                `}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "one" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "one" ? (
                    <div
                      className={`content ${isDarkMode ? "content_dark" : ""}`}
                    >
                      <div className="main_rule">
                        費用細節
                        <br />
                        <span className="spanBlue">V 搭乘樂園摩天輪乙次 </span>
                        <br />
                        <span className="spanBlue">V 單日入場門票</span>
                        <br />
                        X 現場酒水
                        <br />
                        X 停車費
                        <br />
                        X 露營以及帳篷設施
                        <br />
                      </div>
                      <div className="sub_rule">
                        使用方式 電子憑證{" "}
                        <span className="spanRed">每筆交易限購4張。</span>{" "}
                        <br />
                        指定效期區間 2022-08-13 ~ 2022-08-14
                        <br />
                        逾期失效。
                        <br />
                      </div>
                      <p>
                        活動現場，車輛不得進入，請將車輛停在停車場。
                        <br />
                        憑電子票券入場，核銷後領取活動手環 2022/08/1前
                        <br />
                      </p>
                      ⚠️本票券只包含單日入場參與音樂祭活動，不含現場露營。
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={`ticket_box ${
                currentHoverTicketType === "camp" ? "add_blank" : ""
              }`}
            >
              <div
                className="ticket_image ticket_two_day"
                onMouseEnter={() => setCurrentHoverTicketType("two")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "two" ? "order_button_show" : ""
                  }`}
                  onClick={() => handlePickTicketType("two")}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "two" ? "area_show" : ""
                }`}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "two" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "two" ? (
                    <div
                      className={`content ${isDarkMode ? "content_dark" : ""}`}
                    >
                      <div className="main_rule">
                        費用細節
                        <br />
                        <span className="spanBlue">V 搭乘樂園摩天輪乙次 </span>
                        <br />
                        <span className="spanBlue">V 雙日入場門票</span>
                        <br />
                        X 現場酒水
                        <br />
                        X 停車費
                        <br />
                        X 露營以及帳篷設施
                        <br />
                      </div>
                      <div className="sub_rule">
                        使用方式 電子憑證{" "}
                        <span className="spanRed">每筆交易限購4張。</span>{" "}
                        <br />
                        指定效期區間 2022-08-13 ~ 2022-08-14
                        <br />
                        逾期失效。
                        <br />
                      </div>
                      <p>
                        活動現場，車輛不得進入，請將車輛停在停車場。
                        <br />
                        憑電子票券入場，核銷後領取活動手環 2022/08/1前
                        <br />
                      </p>
                      ⚠️本票券只包含雙日入場參與音樂祭活動，不含現場露營。
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="ticket_box">
              <div
                className="ticket_image ticket_camp"
                onMouseEnter={() => setCurrentHoverTicketType("camp")}
                onMouseLeave={() => setCurrentHoverTicketType("")}
              >
                <div
                  className={`order_button ${
                    currentHoverTicketType === "camp" ? "order_button_show" : ""
                  }`}
                  onClick={() => handlePickTicketType("camp")}
                >
                  BUY
                </div>
              </div>
              <div
                className={`ticket_info_area ${
                  currentHoverTicketType === "camp" ? "area_show" : ""
                }`}
              >
                <div
                  className={`info_content ${
                    currentHoverTicketType === "camp" ? "info_show" : ""
                  }`}
                >
                  {currentHoverTicketType === "camp" ? (
                    <div
                      className={`content ${isDarkMode ? "content_dark" : ""}`}
                    >
                      {" "}
                      <div className="main_rule">
                        費用細節
                        <br />
                        <span className="spanBlue">V 搭乘樂園摩天輪乙次 </span>
                        <br />
                        <span className="spanBlue">V 雙日入場門票</span>
                        <br />
                        X 現場酒水
                        <br />
                        X 停車費
                        <br />
                        <span className="spanBlue">V 露營以及帳篷設施</span>
                        <br />
                      </div>
                      <div className="sub_rule">
                        使用方式 電子憑證{" "}
                        <span className="spanRed">每筆交易限購4張。</span>{" "}
                        <br />
                        指定效期區間 2022-08-13 ~ 2022-08-14
                        <br />
                        逾期失效。
                        <br />
                      </div>
                      <p>
                        <li>
                          為配合場地規範，車輛不可停放於營地，並遵守工作人員指揮，車輛統一停放於停車區。
                        </li>
                        <li>
                          場地四週皆有水源及流動廁所，不提供電源，有接泊車來回接送。
                        </li>
                        <li>
                          Love & Peace Rock
                          Festival活動主辦單位保有活動最終解釋權，所有活動、節目異動請詳官方訊息。
                        </li>
                        <li>
                          本活動僅提供營位出租，不負責露營裝備、車輛、人員之保管責任，請妥善保管自身財物、裝備、車輛，避免失竊及受損。
                        </li>
                      </p>
                      ⚠️本票券包含雙日入場參與音樂祭活動，以及現場露營。
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};
export default TicketOrderStepOne;
