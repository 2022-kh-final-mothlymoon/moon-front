import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const StoreRow = (props) => {
  let navigate = useNavigate();
  const [storeList, setStoreList] = useState([]);
  const [storeVO, setStoreVO] = useState({
    STORE_NO: 0,
    MD_NO: 0,
    MD_NAME: "",
    STORE_CONTACT: "",
    STORE_MANAGER: "",
    STORE_MEMO: "",
    STORE_YN: "",
    STORE_START_DATE: "",
    FIELD: "",
  });
  return (
    <>
      <tr>
        <td>{props.store.STORE_NO}</td>
        <td>[{props.store.STORE_YN}]</td>
        <td
          onClick={() => {
            navigate("/admin/store/detail/" + props.store.STORE_NO);
          }}
          id="td-title"
        >
          {props.store.FIELD}
        </td>
        <td>{props.store.STORE_MANAGER}</td>
        <td>{props.store.STORE_CONTACT}</td>
      </tr>
    </>
  );
};

export default StoreRow;
