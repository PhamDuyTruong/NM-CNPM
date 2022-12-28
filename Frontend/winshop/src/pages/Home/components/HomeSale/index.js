import React from "react";
import "./styles.scss";
import banner1 from '../../../../assets/images/shop_banner_img1.jpg';
import banner2 from '../../../../assets/images/shop_banner_img2.jpg';

function HomeSale() {
  return (
    <section className="banner-container">
      <div className="banner">
        <img src={banner1} alt="Hinh anh"/>
        <div className="content-sale">
          <span>Special offer</span>
          <h3>Upto 50% off</h3>
          <a href="/shop" className="btn">
            Shop now
          </a>
        </div>
      </div>
      <div className="banner">
        <img src={banner2} alt="hinh anh" />
        <div className="content-sale">
            <span>Special offer</span>
          <h3>Upto 50% off</h3>
          <a href="/shop" className="btn">
            Shop now
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomeSale;
