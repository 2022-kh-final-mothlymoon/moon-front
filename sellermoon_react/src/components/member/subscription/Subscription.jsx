import React from 'react';
import NavbarMypage from './../Common/NavbarMypage';
import SidebarMypage from './../Common/SidebarMypage';
import { BROWN_BTN, CONTENTS } from './../../../styles/NoticeStyle';
import Header from './../Common/Header';
import Footer from './../Common/Footer';
import { TABLE, TH, TH_NOW, TD, P_STRONG, P_SMALL } from './../../../styles/SubStyle';
import { useEffect } from 'react';
import { subslist, subspurchase } from '../../../service/dbLogic';
import { useState } from 'react';
import { subsdeliver } from './../../../service/dbLogic';

const Subscription = ({pointList, no, isLogin}) => {

  const [subsList, setSubsList] = useState({
    member_name: "",
    member_address: "",
    member_address_detail: "",
    md_name: "",
    md_price: 0,
    st_amount: 0,
    sub_no: 0,
    sub_start: "",
    sub_end: "",
    sub_priod: 0,
  });

  const [subsDeliver, setSubsDeliver] = useState({
    order_date: "",
    delivery_status: "",
    delivery_date: "",
  });

  const [subsPurchase, setSubsPurchase] = useState({
    purchase_method: "",
  });

  /* **************************************************** */
  /* 구독 기본정보 가져오기 */
  useEffect(() => {
    const subsList = async () => {
        await subslist({member_no: no}).then((res) => {
          if (res.data === null) {
            return () => {};
          } else {
            console.log(res);
            console.log(res.data);
            setSubsList(res.data);
          }
        })
    }
    subsList()
    }, [no])


/* ************************************************** */


  /* 구독 배송정보 가져오기 */
  useEffect(() => {
    const subsDeliver = async () => {
        await subsdeliver({member_no: no}).then((res) => {
          if (res.data === null) {
            return () => {};
          } else {
            console.log(res.data);
            setSubsDeliver(res.data);
          }
        })
    }
    subsDeliver()
    }, [no])


/* ************************************************** */


  /* 구독 결제정보 가져오기 */
  useEffect(() => {
    const subsPurchase = async () => {
        await subspurchase({member_no: no}).then((res) => {
          if (res.data === null) {
            return () => {};
          } else {
            console.log(res.data);
            setSubsPurchase(res.data);
          }
        })
    }
    subsPurchase()
    }, [no])


/* ************************************************** */




  return (
    <>
      <Header />

      <div className="container">
        <CONTENTS className="row">

          <SidebarMypage />

          <div className="col-9">
            <div className="list-wrapper">

            {
              pointList.map((point, i) => (
                <NavbarMypage key={i} point={point} />
              ))
            }

            <P_STRONG>정기구독 현황</P_STRONG>

            <TABLE>
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>

              <thead>
                <tr>
                  {
                    subsDeliver.DELIVERY_STATUS === "결제완료" 
                    ? <TH_NOW><i className="fa-regular fa-credit-card"></i><br/>결제완료</TH_NOW>
                    : <TH><i className="fa-regular fa-credit-card"></i><br/>결제완료</TH>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송준비" 
                    ? <TH_NOW><i className="fa-solid fa-box-open"></i><br/>배송준비</TH_NOW>
                    : <TH><i className="fa-solid fa-box-open"></i><br/>배송준비</TH>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송중" 
                    ? <TH_NOW><i className="fa-solid fa-truck"></i><br/>배송중</TH_NOW>
                    : <TH><i className="fa-solid fa-truck"></i><br/>배송중</TH>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송완료" 
                    ? <TH_NOW><i className="fa-regular fa-circle-check"></i><br/>배송완료</TH_NOW>
                    : <TH><i className="fa-regular fa-circle-check"></i><br/>배송완료</TH>
                  }
                </tr>
              </thead>

              <tbody>
                <tr>
                  {
                    subsDeliver.DELIVERY_STATUS === "결제완료" &&
                      <TD colSpan={4}>
                        1회차 <strong>정기구독이 결제되었습니다.</strong>
                        <br/>
                        배송 준비 예정입니다.
                      </TD>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송준비" &&
                      <TD colSpan={4}>
                        결제가 승인되어 <strong>배송을 준비하고 있습니다.</strong>
                        <br/>
                        곧 배송이 시작됩니다.
                      </TD>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송중" &&
                      <TD colSpan={4}>
                        고객님의 정기구독 상품을 <strong>배송중입니다.</strong>
                        <br/>
                        택배사의 사정에 따라 배송 지연이 있을 수 있습니다.
                      </TD>
                  }
                  {
                    subsDeliver.DELIVERY_STATUS === "배송완료" &&
                      <TD colSpan={4}>
                        1회차 정기구독 상품이 <strong>배송 완료되었습니다.</strong>
                        <br/>
                        감사합니다.
                      </TD>
                  }
                </tr>
              </tbody>
            </TABLE>




            <P_SMALL>1회차 정기구독 요약</P_SMALL>
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>

              <tbody>
                <tr>
                  <th>결제일</th>
                  <td>{subsDeliver.ORDER_DATE}</td>
                </tr>
                <tr>
                  <th>발송일</th>
                  <td></td>
                </tr>
                <tr>
                  <th>결제금액</th>
                  <td>{subsList.MD_PRICE}원</td>
                </tr>
                <tr>
                  <th>구성</th>
                  <td>{subsList.MD_NAME}</td>
                </tr>
                <tr>
                  <th>배송지</th>
                  <td>{subsList.MEMBER_ADDRESS},&nbsp;{subsList.MEMBER_ADDRESS_DETAIL}</td>
                </tr>
              </tbody>
            </table>


            <P_SMALL>다음 정기구독 현황</P_SMALL>
            <table>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "50%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <tbody>
                <tr>
                  <th>
                    <br/>&nbsp;
                    2회차 정기구독 결제일
                    <br/>&nbsp;
                  </th>
                  <td>
                    <strong>2022년 12월 7일</strong>예정
                  </td>
                  <td>
                    <BROWN_BTN>
                      다음 일정 변경
                    </BROWN_BTN>
                  </td>
                </tr>
              </tbody>
            </table>



            <P_SMALL>결제 정보</P_SMALL>
            <table>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "50%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>

              <tbody>
                <tr>
                  <th>
                    <br/>&nbsp;
                    결제수단
                    <br/>&nbsp;
                  </th>
                  <td>{subsPurchase.PURCHASE_METHOD}</td>
                  <td>
                    <BROWN_BTN>
                      변경
                    </BROWN_BTN>
                  </td>
                </tr>
              </tbody>
            </table>

            <br />
            <br />

            <table>
              <colgroup>
                <col style={{ width: "80%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>정기구독 일시정지</th>
                  <th>
                    <BROWN_BTN>
                      변경
                    </BROWN_BTN>
                  </th>
                </tr>
              </tbody>
            </table>

            <br />
            <br />

            <table>
              <colgroup>
                <col style={{ width: "80%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th>정기구독 해지</th>
                  <th>
                    <BROWN_BTN>
                      변경
                    </BROWN_BTN>
                  </th>
                </tr>
              </tbody>
            </table>

            <br />
            <br />
            <br />


            </div> {/* end of list-wrapper */}
          </div> {/* end of col */}

        </CONTENTS>
      </div> {/* end of container */}

      <Footer />
    </>
  );
};

export default Subscription;

