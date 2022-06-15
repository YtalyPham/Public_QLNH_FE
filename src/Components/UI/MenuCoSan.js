import React,{ useState, useEffect } from 'react'
import { List, Card, Button, Image, Modal,InputNumber,message } from 'antd';

import { post, get, del, put } from "../../httpHelper";
import hinhSet1 from '../../Img/Set1.JPG';
import hinhSet2 from '../../Img/Set2.JPG';
import hinhSet3 from '../../Img/Set3.JPG';
import hinhSet4 from '../../Img/Set4.JPG';
const { Meta } = Card;

export default function MenuCoSan() {
    const [dulieuTD, setDulieuTD] = useState([]);
    const [valueTest,setValueTest]=useState(1);
    const [tongTienBan,setTongTienBan]=useState(0);
    var tt = 0.0;
    const [tien, setTien] = useState(0);

    const datahinhsettd=(e)=>{
      if(e==0){
        return hinhSet1;
      }else if(e==1){
        return hinhSet2;
      }else if(e==2){
        return hinhSet3;
      }else if(e==3){
        return hinhSet4;
      }else{
        return hinhSet1;
      }
    }

    useEffect(() => {
      fetchTD();
      localStorage.removeItem("soban");
    }, []);
    const fetchTD = async (e) => {
      await get(`/thucdon/khongtrung`)
        .then((response) => {
          setDulieuTD(response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    };
    const chonNgay = (e, item, index) => {
      localStorage.removeItem("myKVbtn");
      localStorage.removeItem("myMonChinh1btn");
      localStorage.removeItem("myMonChinh2btn");
      localStorage.removeItem("myMonChinh3btn");
      localStorage.removeItem("myLaubtn");
      localStorage.removeItem("myTMbtn");

      var elem = document.getElementById("myThucDonbtn"+ item.maThucDon);
     
      var lastelem= document.getElementById("myThucDonbtn"+valueTest);
      //console.log("lelem ",lastelem);
      if(elem.id==lastelem.id){
         
        if (elem.value=="Chọn ngay") {
          localStorage.setItem("idsetthucdon", item.maThucDon);
          elem.value = "Bỏ chọn";
    
        }
        else {
          elem.value = "Chọn ngay";
          localStorage.setItem("idsetthucdon", null);
        };
      }else if(elem.id!=lastelem.id&&valueTest!=0){
        
        if (elem.value=="Chọn ngay") {
          localStorage.setItem("idsetthucdon", item.maThucDon);
          elem.value = "Bỏ chọn";
          lastelem.value= "Chọn ngay";
    
        }
        else {
          elem.value = "Chọn ngay";
          localStorage.setItem("idsetthucdon", null);
        };
      }
        setValueTest(item.maThucDon);
      }

      const getSetTTbyIdTT = async (e) => {
        await get(`/thucdon/${e}`)
          .then((response) => {
            var t1 = parseFloat(response.data.data.donGia);
            console.log("dg", t1);
            handleCong(t1);
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      };

      const tamtinh =  (e) => {
        tt = 0.0;
        var elem = document.getElementById("soban");
        localStorage.setItem("soban", elem.value);
    
        if (localStorage.getItem("idsetthucdon") != null) {
          getSetTTbyIdTT(localStorage.getItem("idsetthucdon"));
        } else {
          errorChon("Set thực đơn");
        }
    
        
      
        localStorage.setItem("dongiatuchon",tien);
        tinhtongtien(elem.value);
      };

      const tinhtongtien = (e) => {
        var sb=parseFloat(e);
        var tien1= parseFloat(localStorage.getItem("dongiatuchon"));
        var tt= tien1 * sb;
        setTongTienBan(tt);
      };

      const handleCong = (e) => {
        var ttt = tt + e;
        tt = ttt;
        setTien(tt);
      };

      const errorChon = (e) => {
        message.error("Hãy chọn món ăn "+e);
      };


      const themPhayVaoSo = (e) => {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };


  return (
    <div>
      <div style={{ textAlign: "left" }}>
      <div style={{ display: "inline-flex" }}>
          <h2>
            Tổng tiền tạm tính: {themPhayVaoSo(tien)}  VNĐ/ban NÊN Tổng tiền bàn: {themPhayVaoSo(tongTienBan)} VNĐ
          </h2>
          
          </div> 
          </div>
        <div style={{ textAlign: "left" }}>
       
          <div style={{ display: "inline-flex" }}>
            <h2>Chọn số bàn tiệc: </h2>
            <InputNumber id="soban" min={1} max={500} defaultValue={1} />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => tamtinh()}
            style={{
              height: "40px",
              fontSize: "15px",
              marginLeft: "50px ",
              background: "#E5CC5F",
              borderColor: "#E5CC5F",
            }}
          >
           Tạm tính tổng bàn
          </Button>
        </div>

        <h2>Chọn gói menu có sẵn từ nhà hàng</h2>
        <List
          grid={{ gutter: 5, column: 1 }}
          dataSource={dulieuTD}
          renderItem={(item,index) => (
            <List.Item>
              <Card 
                style={{background: '#FAFAEB'}}
                hoverable
                >
                <div style={{display: 'flex',background: '#FAFAEB', justifyContent: 'space-around', padding: '25px'}}>   
                    <div style={{float: 'left'}}>
                        <Image style={{width: '250px'}} src={datahinhsettd(index)}/>
                    </div>

                    <div style={{float: 'right', width: '30%', textAlign: 'center'}}>
                        <h2>{item.tenThucDon}</h2>
                        <p>
                        <div>Thực đơn {item.tenThucDon}, thơm ngon mời bạn ăn nha, tôi đây không chờ bạn nữa giờ tôi ăn liền</div>
                        </p>
                        <h3 style={{color: 'red'}}>{item.donGia} / bàn </h3>
                        <br></br>
                        <br></br>
                        <input className='btn btn-main' onClick={(e) => chonNgay(e,item, index)} type="button"
                   value={localStorage.getItem("idsetthucdon") == item.maThucDon ? "Bỏ chọn" : "Chọn ngay"}
                   id={"myThucDonbtn"+ item.maThucDon}></input>
                    </div>
                </div>
              </Card>
            </List.Item>
          )}
        />

    </div>

  )
}
