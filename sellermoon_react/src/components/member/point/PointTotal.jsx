import React from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PointTotal = (props) => {

  let result = props.point;

  return (
    <>
      <tr style={{ height:"80px" }}>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>
          {result.POINT_SUM.toLocaleString()} Point
        </td>
        <td style={{ fontSize:"1.7rem", fontWeight:"600"}}>0 Point</td>
      </tr>
    </>
  );
};

export default PointTotal;