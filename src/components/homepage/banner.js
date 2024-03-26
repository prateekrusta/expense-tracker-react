import React from "react"
import BannerImage from '../../assets/images/banner-main.svg'
import '../../assets/css/homepage.css'

const Banner = () => {
  return (
    <>
        <div className="box-outer row">
            <div className="box-inner-left col-sm-6">
                <div className="heading">
                    Streamlining <span className="colorer">Finance</span>, Empowering <span className="colorer">Teams</span> <br/>
                    <small>Where <span className="colorer">Expense Management</span> Meets Simplicity</small>
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
