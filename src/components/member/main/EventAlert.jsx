import React from 'react';
import { Link } from 'react-router-dom';

const EventAlert = () => {
  return (
    <>
      <Link to="/mypage/friends" style={{ textDecoration: "none" }}>
        <div className="alert alert-warning" id="event-alert">
          <h5>
            친구가 내 추천링크로 가입하면, 친구도 나도 2,000포인트 적립!
          </h5>
        </div>
      </Link>
    </>
  );
};

export default EventAlert;