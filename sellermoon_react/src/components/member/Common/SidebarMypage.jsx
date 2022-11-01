import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CONT_SIDE, P_SIDE, UL_SIDE, LI_SIDE } from './../../../styles/NoticeStyle';

const SidebarMypage = () => {

  let navigate = useNavigate();

  return (
    <>
      <div className="col-3">
        <CONT_SIDE>
          <P_SIDE onClick={()=>{ navigate('/mypage')}}>My Page</P_SIDE>
          <UL_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              MyMoonStory
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              정기구독
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              주문배송조회
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              결제수단
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              사용후기
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              계정설정
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/mypage/point')}}>
              적립금
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              친구초대
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/')}}>
              문의내역
            </LI_SIDE>

          </UL_SIDE>
        </CONT_SIDE>
      </div>
    </>
  );
};

export default SidebarMypage;