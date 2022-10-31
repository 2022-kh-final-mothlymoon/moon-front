import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PointTotal = ({ pointList }) => {


  return (
    <>
      <tr style={{ height:"80px" }}>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>
          {pointList[0].POINT_SUM} Point
        </td>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>0 point</td>
      </tr>
    </>
  );
};

export default PointTotal;