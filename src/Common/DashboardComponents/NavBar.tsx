import logo from "../../assets/image-assets/Volvo-Spread-Word-Mark-Black 1.svg";
import avatarImg from "../../assets/image-assets/account_icon.png";
import DownArrow from "../../assets/image-assets/Down Arrow.png";
import NotificationIcon from "../../assets/image-assets/Notification_icon.svg";
import CalendarIcon from "../../assets/image-assets/Calender-icon.svg";

import SearchIcon from "@mui/icons-material/Search";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";


type NavBarProps = {
  showSettings?: boolean;
};


export default function NavBar({
  showSettings = false,
}: NavBarProps) {


  const navigate = useNavigate();


  const [showLog, setShowLog] = useState(false);

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const [openCalendar, setOpenCalendar] = useState(false);



  const calendarRef = useRef<HTMLDivElement>(null);



  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date("2026-06-01"),
      endDate: new Date("2026-06-13"),
      key: "selection",
    },
  ]);




  const handleNavigation=(path:string)=>{

    setShowSettingsMenu(false);

    navigate(path);

  };





  const formatDate=(date:Date)=>{

    return `${String(date.getDate()).padStart(2,"0")} - ${date.toLocaleString(
      "en",
      {
        month:"long"
      }
    )} - ${date.getFullYear()}`;

  };





  // Outside click close

  useEffect(()=>{


    const handleClick=(event:any)=>{


      if(
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ){

        setOpenCalendar(false);

      }


    };


    document.addEventListener(
      "mousedown",
      handleClick
    );


    return()=>{

      document.removeEventListener(
        "mousedown",
        handleClick
      );

    };


  },[]);







return (

<div className="navbar">



{/* LEFT */}

<div className="navbar-left">


<div className="logo-sect">


<img
src={logo}
alt="Volvo Logo"
className="logo-img"
onClick={()=>handleNavigation("/admin")}
/>


</div>



<div className="greeting">

Hii, John! Welcome back....

</div>



</div>






{/* CENTER */}

<div className="navbar-center">


<div className="search-bar">


<SearchIcon className="search-icon"/>


<input

type="text"

placeholder="Search..."

className="search-input"

/>


</div>


</div>









{/* RIGHT */}

<div className="right-section">






{/* DATE RANGE */}


<div 
className="date-range"
ref={calendarRef}
>


<img

src={CalendarIcon}

alt="calendar"

className="calendar-icon"

onClick={()=>setOpenCalendar(true)}

/>




<span

onClick={()=>setOpenCalendar(true)}

style={{
cursor:"pointer"
}}

>


{
dateRange[0].startDate &&
dateRange[0].endDate

?

`${formatDate(dateRange[0].startDate)} to ${formatDate(dateRange[0].endDate)}`

:

"Select Date Range"

}


</span>





<img

src={DownArrow}

alt="dropdown"

className="dropdown-arrow"

onClick={()=>setOpenCalendar(true)}

style={{
cursor:"pointer"
}}

/>








{

openCalendar &&

<div className="calendar-popup">


<DateRange

ranges={dateRange}


onChange={(item:any)=>{


setDateRange([

{

...dateRange[0],

startDate:item.selection.startDate,

endDate:item.selection.endDate

}

]);


}}


showDateDisplay={false}

rangeColors={[
"#172B75"
]}


/>



<button

className="apply-btn"

onClick={()=>setOpenCalendar(false)}

>

Apply

</button>



</div>


}



</div>









{/* NOTIFICATION */}

{

showSettings &&

<div className="settings-wrapper">


<img

src={NotificationIcon}

alt="notification"

className="settings-icon"

onClick={()=>
setShowSettingsMenu(!showSettingsMenu)
}

/>


</div>


}









{/* ACCOUNT */}



<div

className="account-widget"

onClick={()=>setShowLog(!showLog)}

>



<div className="avatar-box">


<img

src={avatarImg}

alt="avatar"

className="avatar-img"

/>


</div>





<div className="account-info">


<div className="name">

John Doe

</div>



<div className="role">

Admin

</div>



</div>





<img

src={DownArrow}

alt="dropdown"

className="dropdown-arrow"

/>








{

showLog &&


<div className="logout-menu">


<p

onClick={()=>{

setShowLog(false);

navigate("/");

}}

>

Logout

</p>


</div>


}



</div>






</div>



</div>

);

}