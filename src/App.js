import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import MenuPage from "./Components/UI/MenuPage"
import Footer from "./Components/UI/Footer"
import LandingPage from './Components/UI/LandingPage';
import Login from "./Components/UI/Login"
import Signup1 from "./Components/UI/Signup1"
import Signup2 from "./Components/UI/Signup2"
import User from "./Components/UI/User"
import Lienhe from './Components/UI/Lienhe';
import Uudai from "./Components/UI/Uudai";
import Hoinghi from "./Components/UI/Hoinghi";
import Sukien from "./Components/UI/Sukien";
import Thuvien from "./Components/UI/Thuvien";
import Tintuc from "./Components/UI/Tintuc";
import Tieccuoi from "./Components/UI/Tieccuoi";
import { BackTop } from 'antd';
import AdminPage from "./Components/UI/Admin";
import DattiecNew from "./Components/UI/Dattiecnew";
import Thucdon from "./Components/UI/Thucdon";
import SanhTiec from "./Components/UI/SanhTiec";
import LoginEmployee from "./Components/UI/LoginEmployee";
import HoSoNhanVien from "./Components/UI/HoSoNhanVien";
import InHoaDon from "./Components/UI/InHoaDon";
import TinTuc01 from "./Components/UI/TinTuc/TinTuc01";
import TinTuc02 from "./Components/UI/TinTuc/TinTuc02";
import TinTuc03 from "./Components/UI/TinTuc/TinTuc03";
import TinTuc04 from "./Components/UI/TinTuc/TinTuc04";
import TinTuc05 from "./Components/UI/TinTuc/TinTuc05";
import TinTuc10 from "./Components/UI/TinTuc/TinTuc10";
import TinTuc09 from "./Components/UI/TinTuc/TinTuc09";
import TinTuc08 from "./Components/UI/TinTuc/TinTuc08";
import TinTuc07 from "./Components/UI/TinTuc/TinTuc07";
import TinTuc06 from "./Components/UI/TinTuc/TinTuc06";


function App() {
  return (
    <Router>
      <BackTop />
      <Routes>
        <Route exact path="/" element={<LandingHomePage/>} />
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/Signup1" element={<SignUpPage1/>}/>
        <Route exact path="/Signup2" element={<SignUpPage2/>}/>
        <Route exact path="/User" element={<UserPage/>} />
        <Route exact path="/tieccuoi" element={<TieccuoiPage/>} />
        <Route exact path="/hoinghi" element={<HoinghiPage/>} />
        <Route exact path="/thucdon" element={<ThucdonPage/>} />
        <Route exact path="/thuvien" element={<ThuvienPage/>} />
        <Route exact path="/tintuc" element={<TintucPage/>} />
        <Route exact path="/lienhe" element={<LienhePage/>} />
        <Route exact path="/uudai" element={<UudaiPage/>} />
        <Route exact path="/sanhtiec" element={<SanhTiecPage/>} />
        <Route exact path="/admin/*" element={<AdminPage/>} />
        <Route exact path="/dattiec/*" element={<DattiecPageNew/>} />
        <Route exact path="/loginadmin" element={<LoginEmployee/>} />
        <Route exact path="/hosonhanvien" element={<HoSoNhanVien/>} />
        <Route exact path="/inhoadon" element={<InHoaDonPage/>} />
        <Route exact path="/tintuc01" element={<TinTuc01Page/>} />
        <Route exact path="/tintuc02" element={<TinTuc02Page/>} />
        <Route exact path="/tintuc03" element={<TinTuc03Page/>} />
        <Route exact path="/tintuc04" element={<TinTuc04Page/>} />
        <Route exact path="/tintuc05" element={<TinTuc05Page/>} />
        <Route exact path="/tintuc06" element={<TinTuc06Page/>} />
        <Route exact path="/tintuc07" element={<TinTuc07Page/>} />
        <Route exact path="/tintuc08" element={<TinTuc08Page/>} />
        <Route exact path="/tintuc09" element={<TinTuc09Page/>} />
        <Route exact path="/tintuc10" element={<TinTuc10Page/>} />
      </Routes>
      <MessengerCustomerChat
        pageId="109423391739509"
        appId="955889525127922"
      />
    </Router>
  );
}

export default App;

function ThucdonPage() {
  return <div className="App">
  <MenuPage/>
  <Thucdon/>
  <Footer/>
</div>
}
function LandingHomePage() {
  return <div className="App">
  <MenuPage/>
  <LandingPage/>
  <Footer/>
</div>
}

function UserPage() {
  return <div className="App">
    <MenuPage/>
    <User/>
    <Footer/>
  </div>
}

function LienhePage() {
  return <div className="App">
    <MenuPage/>
    <Lienhe />
    <Footer/>
  </div>
}

function UudaiPage() {
  return <div className="App">
    <MenuPage/>
    <Uudai />
    <Footer/>
  </div>
}

function TieccuoiPage() {
  return <div className="App">
    <MenuPage/>
    <Tieccuoi/>
    <Footer/>
  </div>
}

function HoinghiPage() {
  return <div className="App">
    <MenuPage/>
    <Hoinghi />
    <Footer/>
  </div>
}

function SukienPage() {
  return <div className="App">
    <MenuPage/>
    <Sukien />
    <Footer/>
  </div>
}

function ThuvienPage() {
  return <div className="App">
    <MenuPage/>
    <Thuvien />
    <Footer/>
  </div>
}

function TintucPage() {
  return <div className="App">
    <MenuPage/>
    <Tintuc />
    <Footer/>
  </div>
}

function LoginPage() {
  return <div className="App">
    <MenuPage/>
    <Login/>
    <Footer/>
  </div>
}

function SignUpPage1() {
  return <div className="App">
    <MenuPage/>
    <Signup1/>
    <Footer/>
  </div>
}

function SignUpPage2() {
  return <div className="App">
    <MenuPage/>
    <Signup2/>
    <Footer/>
  </div>
}

function SanhTiecPage() {
  return <div className="App">
    <MenuPage/>
    <SanhTiec/>
    <Footer/>
  </div>
}

function DattiecPageNew() {
  return <div className="App">
    <MenuPage/>
    <DattiecNew/>
    <Footer/>
  </div>
}

function InHoaDonPage() {
  return <div className="App">
     
    <InHoaDon/>
     
  </div>
}
function TinTuc01Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc01/>
  <Footer/>
</div>
}

function TinTuc02Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc02/>
  <Footer/>
</div>
}

function TinTuc03Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc03/>
  <Footer/>
</div>
}

function TinTuc04Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc04/>
  <Footer/>
</div>
}

function TinTuc05Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc05/>
  <Footer/>
</div>
}

function TinTuc06Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc06/>
  <Footer/>
</div>
}
function TinTuc07Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc07/>
  <Footer/>
</div>
}
function TinTuc08Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc08/>
  <Footer/>
</div>
}
function TinTuc09Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc09/>
  <Footer/>
</div>
}
function TinTuc10Page() {
  return <div className="App">
  <MenuPage/>
  <TinTuc10/>
  <Footer/>
</div>
}