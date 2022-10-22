import React, { useEffect, useState } from 'react';
import Footer from '../components/main_member/Footer';
import SliderBanner from '../components/main_member/SliderBanner';
import Header from '../components/main_member/Header';
import EventAlert from '../components/main_member/EventAlert';
import TabContent from '../components/main_member/TabContent';
import { CONTAINER } from './../styles/MainStyle';


const Main = () => {

  let [ alert, setAlert ] = useState(true);

  /* navbar 위에 이벤트알림 Alert */
  useEffect(() => {
    let event = setTimeout(() => { setAlert(false) }, 60000)
    return () => {
      clearTimeout(event)
    } /* 컴포넌트 mount 시 1회만 실행하고 싶으면 이렇게! */
  }, [])

  return (
    <>

      {
        alert == true ?
        <>
          <EventAlert />
        </>
        : null
      }

      <Header />

      <SliderBanner />

      <CONTAINER>
        <TabContent />
      </CONTAINER>

      <Footer />

    </>
  );
};

export default Main;