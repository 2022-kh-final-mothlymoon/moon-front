import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Link} from 'react-router-dom';

const SliderBanner = () => {

    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
    };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <Link to="/subscription">
              <img src="https://res.cloudinary.com/drxxdsv01/image/upload/v1666423298/slide1_tsnm7t.png" alt="slider1" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <img src="https://res.cloudinary.com/drxxdsv01/image/upload/v1666423297/slide2_mvg0qi.png" alt="slider2" />
            </Link>
          </div>
          <div>
            <Link to="/subscription">
              <img src="https://res.cloudinary.com/drxxdsv01/image/upload/v1666423298/slide3_ow5nsf.png" alt="slider3" />
            </Link>
          </div>
        </Slider>
      </div>
    );
  }


export default SliderBanner;