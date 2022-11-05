import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AmdRow = (props) => {
  let navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{props.amd.MD_NO}</td>
        <td>[{props.amd.MD_BRAND}] </td>
        <td
          onClick={() => {
            navigate("/admin/amd/detail/" + props.amd.MD_NO);
          }}
          id="td-title"
        >
          {props.amd.MD_NAME}
        </td>
        <td>{props.amd.STORE_NO}</td>
        <td>{props.amd.ST_AMOUNT}</td>
      </tr>
    </>
  );
};

export default AmdRow;
