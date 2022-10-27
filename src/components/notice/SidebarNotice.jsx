import React from 'react';
import { CONT_SIDE, LI_SIDE, P_SIDE, UL_SIDE } from '../../styles/NoticeStyle';
import { useNavigate } from 'react-router-dom';

const SidebarNotice = () => {

  let navigate = useNavigate();

  return (
    <>
      <div className="col-3">
        <CONT_SIDE>
          <P_SIDE>고객센터</P_SIDE>
          <UL_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/notice')}}>
              공지사항
            </LI_SIDE>

            <LI_SIDE onClick={()=>{ navigate('/faq')}}>
              자주묻는질문
            </LI_SIDE>

          </UL_SIDE>
        </CONT_SIDE>
      </div>
    </>
  );
};

export default SidebarNotice;