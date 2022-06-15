import React from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import ChonSanhTiec from './ChonSanhTiec';
import ChonDichVu from './ChonDichVu';
import ChonThucDon from './ChonThucDon';
import ThanhTien from './ThanhTien';
import { Button,message } from 'antd';

export default function Dattiecnew() {
  const errormess =(e)=>{
    message.error("Hãy "+e, 5)
  }

  const handleST=()=>{
    window.location.href = "/dattiec/";
  }

  const handleDV=()=>{
    if(localStorage.getItem("idsanhtiec")==null){
      errormess("Chọn sảnh tiệc");
    }else if(localStorage.getItem("myDonDatTiec")==null){
      errormess("Nhập thông tin tiệc và bấm kiểm tra sảnh tiệc trùng");
    }else{
      window.location.href = "/dattiec/dichvu";
    }
  }

  const handleTD=()=>{
    var a = localStorage.getItem("iddichvu");
    var newStr = a.replace("[", "");
    var newStr2 = newStr.replace("]", "");
    
    if(localStorage.getItem("idsanhtiec")==null){
      errormess("Chọn sảnh tiệc");
    }else if(localStorage.getItem("myDonDatTiec")==null){
      errormess("Nhập thông tin tiệc và bấm kiểm tra sảnh tiệc trùng");
    }else if(localStorage.getItem("iddichvu")==null){
      errormess("Chọn dịch vụ và bấm xác nhận dịch vụ");
    }else if(newStr2==""){
      errormess("Chọn dịch vụ và bấm xác nhận dịch vụ");
    }else if(localStorage.getItem("dongiadichvu")==null){
      errormess("Bấm nút xác nhận dịch vụ");
    }else{
      window.location.href = "/dattiec/thucdon";
    }
  }

  const handlePDT=()=>{
    var a = localStorage.getItem("iddichvu");
    var newStr = a.replace("[", "");
    var newStr2 = newStr.replace("]", "");
   
   
    if(localStorage.getItem("idsanhtiec")==null){
      errormess("Chọn sảnh tiệc");
    }else if(localStorage.getItem("myDonDatTiec")==null){
      errormess("Nhập thông tin tiệc và bấm kiểm tra sảnh tiệc trùng");
    }else if(localStorage.getItem("iddichvu")==null){
      errormess("Chọn dịch vụ và bấm xác nhận dịch vụ");
    }else if(newStr2==""){
      errormess("Chọn dịch vụ và bấm xác nhận dịch vụ");
    }else if(localStorage.getItem("dongiatuchon")==null){
      errormess("Chọn thực đơn và bấm tạm tính");
    }else if(localStorage.getItem("idsetthucdon")==null&&localStorage.getItem("myKVbtn")==null||localStorage.getItem("myKVbtn") =="[0]"||localStorage.getItem("myKVbtn") =="[]"){
      errormess("Chọn thực đơn và bấm tạm tính");
    }else if(localStorage.getItem("idsetthucdon")==null&&localStorage.getItem("myKVbtn")!=null&&localStorage.getItem("myKVbtn") !="[0]"&&localStorage.getItem("myKVbtn") !="[]"){
      if(localStorage.getItem("myMonChinh1btn")==null||localStorage.getItem("myMonChinh1btn")=="null"||localStorage.getItem("myMonChinh1btn") =="[0]"||localStorage.getItem("myMonChinh1btn") =="[]"){
        errormess("Chọn Món chính 1");
      }else if(localStorage.getItem("myMonChinh2btn")==null||localStorage.getItem("myMonChinh2btn")=="null"||localStorage.getItem("myMonChinh2btn") =="[0]"||localStorage.getItem("myMonChinh2btn") =="[]"){
        errormess("Chọn Món chính 2");
      }else if(localStorage.getItem("myMonChinh3btn")==null||localStorage.getItem("myMonChinh3btn")=="null"||localStorage.getItem("myMonChinh3btn") =="[0]"||localStorage.getItem("myMonChinh3btn") =="[]"){
        errormess("Chọn Món chính 3");
      }else if(localStorage.getItem("myLaubtn")==null||localStorage.getItem("myLaubtn")=="null"||localStorage.getItem("myLaubtn") =="[0]"||localStorage.getItem("myLaubtn") =="[]"){
        errormess("Chọn Món Lẩu");
      }else if(localStorage.getItem("myTMbtn")==null||localStorage.getItem("myTMbtn")=="null"||localStorage.getItem("myTMbtn") =="[0]"||localStorage.getItem("myTMbtn") =="[]"){
        errormess("Chọn Tráng miệng");
      }else{
        window.location.href = "/dattiec/thanhtien";
      }
    }
    else if(localStorage.getItem("soban")==null){
      errormess("Chọn số bàn và bấm tạm tính");
    }else{
      window.location.href = "/dattiec/thanhtien";
    }
  }


  return (
    <div style={{marginTop: "74px"}} >
      <div className='slogan'style={{padding: "20px 0"}} ><span>ĐẶT TIỆC NHÀ HÀNG</span></div>
      <p style={{marginBottom: "29px",textAlign:"center"}} >Quý khách vui lòng điền thông tin vào mẫu dưới đây chúng tôi sẽ liên hệ trong thời gian sớm nhất nhé.</p>
      <div  className="demo-nav">
        <Button onClick={()=>handleST()}>Chọn sảnh tiệc</Button>
        <Button onClick={()=>handleDV()}>Chọn dịch vụ</Button>
        <Button onClick={()=>handleTD()}>Chọn thực đơn</Button>
        <Button onClick={()=>handlePDT()}>Hóa đơn tạm tính</Button>
        
        {/* <Link to=".">Chọn sảnh tiệc</Link>
        <Link to="./dichvu">Chọn dịch vụ</Link>
        <Link to="./thucdon">Chọn thực đơn</Link>
        <Link to="./thanhtien">Hóa đơn tạm tính</Link> */}
      </div>
      <Routes>
        <Route path="/" element={<ChonSanhTiec/>} />
        <Route path="/dichvu" element={<ChonDichVu/>} />
        <Route path="/thucdon/*" element={<ChonThucDon/>} />
        <Route path="/thanhtien" element={<ThanhTien/>} />
      </Routes>
      <div className='clr'></div>
    </div>
  )
}
