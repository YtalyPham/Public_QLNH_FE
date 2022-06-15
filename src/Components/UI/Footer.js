import React from 'react'
import '../css/styles.css'
import logo from "../img/menu/logoyellow-removebg-preview.png"
import map from "../img/footer/maplucky.png"
import {FacebookOutlined, InstagramOutlined, GoogleOutlined, YoutubeOutlined} from "@ant-design/icons"

export default function () {
  return (
    <footer>
    <div class="footerWrap">
        <div class="footerInfo">
            <a href='' class="footerLogo">
            <img src={logo} alt="LUCKY CENTER"></img>
            </a>    
        <div class="follow">
            <a  class="logoFacebook" href="" style={{ fontSize: '30px'}}><FacebookOutlined /></a>
            <a  class="logoInstagram" href="" style={{ fontSize: '30px'}}><InstagramOutlined /></a>
            <a  class="logoGG" href="" style={{ fontSize: '30px'}}><GoogleOutlined /></a>
            <a  class="logoYoutube" href="" style={{ fontSize: '30px'}}><YoutubeOutlined /></a>
        </div>
        <p>9999 Trường Chinh, Quận Tân Bình, Thành phố Hồ Chí minh</p>
        <p>
            <a href="mailto:luckypalace@gmai.com">luckypalace@gmail.com</a><br></br>
            <a href="tel: +84938697116">0938697116</a>
        </p>
        </div>
        <div class="footerMap"><img class="map" src={map} alt="LUCKY CENTER"></img></div>
        <div class="line"></div>
        <div class="fooNav">
          <a href="" title="Giới thiệu">Giới thiệu</a>
          <a href="" title="Tin tức">Tin tức</a>
          <a href="" title="Ưu đãi">Ưu đãi</a>
          <a href="" title="Dịch vụ">Dịch vụ</a>
          <a href="" title="Liên hệ">Liên hệ</a>
        </div>
        <div class="copyright">© 2022 LUCKY CENTER <span>|</span> <a href="" target="_blank">Thiết kế web</a> <a href="" target="_blank">LUCKY GROUP</a></div>
        <div class="clr"></div>
    </div>
    </footer>
  )
}
