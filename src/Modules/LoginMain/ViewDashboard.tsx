import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
 
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../assets/image-assets/bus1.png";
import img2 from "../../assets/image-assets/bus2.png";
import viewdashboardicon from "../../assets/image-assets/viewdashboard-icon.png";

 
export default function ViewDashboard() {
  return (
    <>
    <div className="viewdash-slider-page">
      <p>Dashboard !</p>
      <Swiper className="viewdashboard-container"
   modules={[Autoplay, Pagination]}
  loop={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  speed={2000}
  pagination={{ clickable: true }}
      
    >
       <SwiperSlide><img src={img1} /></SwiperSlide>
  <SwiperSlide><img src={img1} /></SwiperSlide>
  <SwiperSlide><img src={img1} /></SwiperSlide>
  <SwiperSlide><img src={img2} /></SwiperSlide>
    </Swiper>
    <div className="dashboard-login-btn">
  <Link to="/AdminInbound">
    <button>
      <img src={viewdashboardicon} alt="" /> View Dashboard
    </button>
  </Link>
</div>
</div>
    </>
  
  );
}