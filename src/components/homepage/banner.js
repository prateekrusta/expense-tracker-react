import React from "react"
import BannerImage from '../../assets/images/banner-main.svg'
import '../../assets/css/homepage.css'

const Banner = () => {
  return (
    <>
        <div className="box-outer row">
            <div className="box-inner-left col-sm-6">
                <div className="heading">
                    Empowering <span className="colorer">Healthcare</span>, Enhancing <span className="colorer">Lives</span> <br/>
                    <small>Your <span className="colorer">Next-Generation</span> Hospital Management System</small>
                </div>
            </div>
            <div className="box-inner-right col-sm-4">
                <img src={BannerImage} className="img-banner" />
            </div>
        </div>
        <div className="button-banner-outer">
            <button className="button-banner">
                Know More!
            </button>
            <button className="button-banner button-banner2">
                Contact Us!
            </button>
        </div>
    </>
  )
};

export default Banner;
