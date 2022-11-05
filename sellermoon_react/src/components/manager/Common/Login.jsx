import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Login = () => {

  return (
    <>
      <form action="" style={{width:300, alignItems:'center'}}>
        <h4 style={{textAlign:'center'}}>로그인 후 이용해주세요</h4>
        <div>
          <input type="email" className="form-control" id="floatingInput" placeholder="아이디"  style={{marginTop:30}}/>
          <input type="password" className="form-control" id="floatingPassword" placeholder="비밀번호"  style={{marginTop:10}}/>
        </div>
        <Button className="w-100 btn btn-lg btn-primary" type="submit" style={{marginTop:30}}>로그인</Button>
        <div></div>
      </form>
    </>
  );
};

export default Login;