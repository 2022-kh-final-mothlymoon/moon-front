import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const TabCards = (props) => {

  let result = props.padset

  return (
    <>
      
      <div className="col-md-4">
        <img src={result.img} width="80%" alt="img"/>
        <h4 onClick={()=>{ Navigate('/store')}}>
          { result.title }
        </h4>
        <p> { result.content }</p>
        <p> { result.price }원</p>
      </div>

    </>
  );
};

export default TabCards;