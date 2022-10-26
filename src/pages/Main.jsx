import React, { useEffect, useState } from 'react';
import Footer from '../components/Common/Footer';
import SliderBanner from '../components/main_member/SliderBanner';
import Header from '../components/Common/Header';
import EventAlert from '../components/main_member/EventAlert';
import TabContent from '../components/main_member/TabContent';
import { CONTAINER_TAB } from '../styles/MainStyle';


const Main = () => {

  let [ alert, setAlert ] = useState(true);

  /* navbar 위에 이벤트알림 Alert */
  useEffect(() => {
    let event = setTimeout(() => { setAlert(false) }, 10000)
    return () => {
      clearTimeout(event)
    } /* 컴포넌트 mount 시 1회만 실행하고 싶으면 이렇게! */
  }, [])

  return (
    <>
        {
          alert === true ?
          <>
            <EventAlert />
          </>
          : null
        }

        <Header />

        <SliderBanner />

        <CONTAINER_TAB>
          <TabContent />
        </CONTAINER_TAB>

        <Footer />
        
    </>
  );
};

export default Main;