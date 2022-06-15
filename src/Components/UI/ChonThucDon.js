import React from 'react'
import {Route, Routes, Link} from 'react-router-dom';
import MenuCoSan from './MenuCoSan';
import Menutuchon from './Menutuchon';

export default function ChonThucDon() {
  return (
    <div>
      <div className='pagewrap'>
        <div className='slogan'style={{padding: "20px 0"}} ><span>Chọn thực đơn</span></div>
        <h3>Bạn muốn chọn thực đơn nhà hàng hay tự chọn thực đơn cho mình</h3>
        <div  className="demo-nav" style={{marginBottom: '40px'}}>
          <Link to="./">Chọn từ menu</Link>
          <Link to="./tuchon">Tự chọn</Link>
        </div>
        <Routes>
          <Route path="/" element={<MenuCoSan/>} />
          <Route path="/tuchon" element={<Menutuchon/>} />
        </Routes>
      </div>
    </div>
  )
}
