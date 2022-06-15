import React, { useState, useEffect } from "react";
import {
  Input,
  message,
  Space,
  List,
  Card,
  Image,
  Button,
  Modal,
  InputNumber,
  Table,
  Divider
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import { isDisabled } from "@testing-library/user-event/dist/utils";
const { Meta } = Card;
const { Search } = Input;
const onSearch = (value) => console.log(value);


var items = [];
export default function Menutuchon() {
  const [dulieuKV, setDulieuKV] = useState([]);
  const [dulieuC1, setDulieuC1] = useState([]);
  const [dulieuC2, setDulieuC2] = useState([]);
  const [dulieuC3, setDulieuC3] = useState([]);
  const [dulieuLau, setDulieuLau] = useState([]);
  const [dulieuTM, setDulieuTM] = useState([]);
  const [valueTestKV, setValueTestKV] = useState(0);
  const [valueTestC1, setValueTestC1] = useState(0);
  const [valueTestC2, setValueTestC2] = useState(0);
  const [valueTestC3, setValueTestC3] = useState(0);
  const [valueTestLau, setValueTestLau] = useState(0);
  const [valueTestTM, setValueTestTM] = useState(0);
  const [valueFixC1, setValueFixC1] = useState(0);
  const [tongTienBan,setTongTienBan]=useState(0)
  const [isModalXemTDDaChon,setIsModalXemTDDaChon]=useState(false);
  const [dulieuTDDC, setDulieuTDDC] = useState([]);
  const [dataTableTDDC, setDataTableTDDC] = useState([]);
  const [errKV,setErrKV]=useState("");
  const [errMC1,setErrMC1]=useState("");
  const [errMC2,setErrMC2]=useState("");
  const [errMC3,setErrMC3]=useState("");
  const [errLau,setErrLau]=useState("");
  const [errTM,setErrTM]=useState("");

  var tt = 0.0;
  const [tien, setTien] = useState(0);

  const columnsTDDC = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên món ăn",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Loại món ăn",
      dataIndex: "loaimonan",
      key: "loaimonan",
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
    }
  ];

  const datahinhanhKV=(e)=>{
    if(e==0){
      return "https://thucthan.com/media/2019/06/sup-cua/sup-cua.jpg";
    }else if(e==1){
      return "https://cachlammonngon.vn/wp-content/uploads/2016/04/tu-buu-hai-san.jpeg";
    }else if(e==2){
      return  "https://cdn.cet.edu.vn/wp-content/uploads/2019/10/goi-bo-bop-thau-thom-ngon.jpg";
    }else if(e==3){
      return "https://haithuycatering.com/image/5c26e7ba51046d774a12ec3a/original.jpg";
    }else if(e==4){
      return "https://image.cooky.vn/recipe/g1/7907/s640/recipe7907-636414105607683030.jpg";
    }else{
      return "https://cdn.daotaobeptruong.vn/wp-content/uploads/2020/05/mon-ngon-dai-tiec-don-gian.jpg";
    }
  }

  const datahinhanhLau=(e)=>{
    if(e==0){
      return "https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/kinh-nghiem-meo-hay/n%E1%BA%A5u%20%C4%83n/nau-lau-thai-chuan-vi-ngon-nhu-the-nao.jpg";
    }else if(e==1){
      return "https://massageishealthy.com/wp-content/uploads/2017/07/cach-nau-lau-mam-5.jpg";
    }else if(e==2){
      return  "https://cdn.tgdd.vn/2020/07/CookRecipe/Avatar/lau-ghe-chua-cay-thumbnail.jpg";
    }else if(e==3){
      return "https://emoi.vn/wp-content/uploads/2018/11/lau-ga-la-giang-7.jpg";
    }else if(e==4){
      return "https://cachlammoi.com/wp-content/uploads/2018/07/d471858084bf47fd8e15cb0a4723ee1b_master.jpg";
    }else if(e==5){
      return "https://bigvn.blog/dp/wp-content/uploads/2019/03/lau-ca-khoai-1-660x422.png";
    }else{
      return "https://canghaisan.com/wp-content/uploads/2020/12/40.jpg";
    }
  }

  const datahinhanhMonChinh1=(e)=>{
    if(e==0){
      return "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/00001-An-mon%20an%20cong%20thuc/muc-xao-chua-cay/cach-lam-muc-xao-chua-ngot-khong-tanh-chi-voi-30-phut-1.png";
    }else if(e==1){
      return "https://cdn.bepcuoi.com/media/650-425-ghe-hap-bia-bepcuoi-790.jpg";
    }else if(e==2){
      return  "https://anh.eva.vn/upload/2-2020/images/2020-04-16/1586999649-916-thumbnail_schema_article.jpg";
    }else if(e==3){
      return "https://cdn.netspace.edu.vn/images/2018/10/26/cach-lam-ga-nuong-mat-ong-ngon-ngay-ngat-1-1024.jpg";
    }else if(e==4){
      return "https://yummyday.vn/uploads/images/cach-chien-xu-ca-tai-tuong.jpg";
    }else{
      return "https://anh.eva.vn/upload/3-2018/images/2018-07-24/ca-hap-bia-ava-1532399186-282-width640height480.jpg";
    }
  }

  const datahinhanhMonChinh2=(e)=>{
    if(e==0){
      return "https://baotiepthi.com/uploads/news/2019_04/24/5490915154132-38718.jpg";
    }else if(e==1){
      return "https://songkhoe.medplus.vn/wp-content/uploads/2020/03/meo-lam-ga-bo-xoi-them-thom-ngon-gion-rum.png";
    }else if(e==2){
      return  "https://i.ytimg.com/vi/6NQuG-30C_o/maxresdefault.jpg";
    }else if(e==3){
      return "https://anh.eva.vn/upload/3-2020/images/2020-08-13/cach-lam-muc-hap-gung-sa-ngot-thom-khong-tanh-bao-nhieu-cung-het-muc-ong-hap-1597283231-941-width600height400.jpg";
    }else if(e==4){
      return "https://cdn.tgdd.vn/2021/04/CookProduct/1-1200x676-89.jpg";
    }else{
      return "https://anh.eva.vn/upload/3-2018/images/2018-07-24/ca-hap-bia-ava-1532399186-282-width640height480.jpg";
    }
  }

  const datahinhanhMonChinh3=(e)=>{
    if(e==0){
      return "https://wikimamy.com/wp-content/uploads/2021/07/Mon-thit-lon-cuon-pho-mai-chien-xu-ngon.jpg";
    }else if(e==1){
      return "https://cdn3.ivivu.com/2020/04/suong-heo-sot-chua-ngot-ivivu-1.jpg";
    }else if(e==2){
      return  "https://cdn.tgdd.vn/Files/2021/08/17/1375794/cach-nau-ca-ri-ga-thom-ngon-chuan-vi-an-do-202201060937230531.jpg";
    }else if(e==3){
      return "https://thuvienamthuc.vn/upload/images/2018/09/19/oc-buou-nhoi-thit-hap-sa.jpg";
    }else if(e==4){
      return "https://cdn.tgdd.vn/2021/03/CookProduct/1200-1200x676-31.jpg";
    }else{
      return "https://anh.eva.vn/upload/3-2018/images/2018-07-24/ca-hap-bia-ava-1532399186-282-width640height480.jpg";
    }
  }

  const datahinhanhTM=(e)=>{
    if(e==0){
      return "https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2021/nkdkswkqoc/201607/original/resize_images1622613_hoa_qua.jpg";
    }else if(e==1){
      return "https://static2.yan.vn/YanNews/2167221/202003/4-cach-lam-rau-cau-dua-ngon-bo-re-don-gian-tai-nha-71d5c0f3.jpg";
    }else if(e==2){
      return  "https://www.nguyenkim.com/images/companies/_1/Content/tin-tuc/nha-bep/vao-bep/cach-de-co-duoc-mon-sua-chua-viet-quat-dac-quanh-tai-nha-01.jpg";
    }else if(e==3){
      return "https://t.vietgiaitri.com/2021/12/8/cach-lam-banh-flan-trai-dua-thom-beo-ngon-mien-che-e74-6227326.jpeg";
    }else if(e==4){
      return "https://cdn.tgdd.vn/2020/10/CookRecipe/GalleryStep/thanh-pham-16.jpg";
    }else{
      return "https://cf.shopee.vn/file/6bcbb02759958b0410c77ee55353a3f6";
    }
  }




  useEffect(() => {
    fetchKV();
    fetchC1();
    fetchC2();
    fetchC3();
    fetchLau();
    fetchTM();
    if ( localStorage.getItem("myKVbtn") == null ) {
      var m = [0];
      localStorage.setItem("myKVbtn", JSON.stringify(m));
    }
    if ( localStorage.getItem("myMonChinh1btn") == null ) {
      var m = [0];
      localStorage.setItem("myMonChinh1btn", JSON.stringify(m));
    }
    if ( localStorage.getItem("myMonChinh2btn") == null ) {
      var m = [0];
      localStorage.setItem("myMonChinh2btn", JSON.stringify(m));
    }
    if ( localStorage.getItem("myMonChinh3btn") == null ) {
      var m = [0];
      localStorage.setItem("myMonChinh3btn", JSON.stringify(m));
    }
    if ( localStorage.getItem("myLaubtn") == null ) {
      var m = [0];
      localStorage.setItem("myLaubtn", JSON.stringify(m));
    }
    if ( localStorage.getItem("myTMbtn") == null ) {
      var m = [0];
      localStorage.setItem("myTMbtn", JSON.stringify(m));
    }
    localStorage.removeItem("dongiatuchon");
  }, []);

  const getMAbyIdTT = async (e) => {
    var a = e;
    var newStr = a.replace("[", "");
    var newStr2 = newStr.replace("]", "");
    var dsidmonan = newStr2.split(",").map(function (item) {
        return parseInt(item, 10);
    });
    const detailInput={
      listid: dsidmonan,
    }
    await post(`/monan/tinhtien/`,detailInput)
      .then((response) => {
        var t1 = parseFloat(response.data.data);
        console.log("dg", t1);
        handleCong(t1);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const errorChon = (e) => {
    message.error("Hãy chọn món ăn "+e);
  };

  const tamtinh =  (e) => {
    tt = 0.0;
    var elem = document.getElementById("soban");
    localStorage.setItem("soban", elem.value);

    if (localStorage.getItem("myKVbtn") != null && localStorage.getItem("myKVbtn") !="[0]" && localStorage.getItem("myKVbtn") !="[]") {
      getMAbyIdTT(localStorage.getItem("myKVbtn"));
    } else {
      errorChon("Khai vị");
    }

    if (localStorage.getItem("myMonChinh1btn") != null && localStorage.getItem("myMonChinh1btn") !="[0]" && localStorage.getItem("myMonChinh1btn") !="[]") {
      getMAbyIdTT(localStorage.getItem("myMonChinh1btn"));
      
    } else {
      errorChon("Món chính 1");
    }
    

    if (localStorage.getItem("myMonChinh2btn") == null && localStorage.getItem("myMonChinh2btn") !="[0]" && localStorage.getItem("myMonChinh2btn") !="[]") {
      errorChon("Món chính 2");
    } else {
      getMAbyIdTT(localStorage.getItem("myMonChinh2btn"));
    }

    if (localStorage.getItem("myMonChinh3btn") == null && localStorage.getItem("myMonChinh3btn") !="[0]" && localStorage.getItem("myMonChinh3btn") !="[]") {
      errorChon("Món chính 3");
    } else {
      getMAbyIdTT(localStorage.getItem("myMonChinh3btn"));
    }

    if (localStorage.getItem("myLaubtn") == null && localStorage.getItem("myLaubtn") !="[0]" && localStorage.getItem("myLaubtn") !="[]") {
      errorChon("Món chính Lẩu");
    } else {
      getMAbyIdTT(localStorage.getItem("myLaubtn"));
    }

    if (localStorage.getItem("myTMbtn") == null && localStorage.getItem("myTMbtn") !="[0]" && localStorage.getItem("myTMbtn") !="[]") {
      errorChon("Món chính Tráng miệng");
    } else {
      getMAbyIdTT(localStorage.getItem("myTMbtn"));
    }
  
    localStorage.setItem("dongiatuchon",tien);
    tinhtongtien(elem.value);
  };

  const fetchKV = async (e) => {
    const detailInput = {
      name: "KHAI_VI",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuKV(response?.data?.data);
        setValueTestKV(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchC1 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_1",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC1(response?.data?.data);
        setValueTestC1(response?.data?.data[0].maMonAn);
        setValueFixC1(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchC2 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_2",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC2(response?.data?.data);
        setValueTestC2(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchC3 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_3",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC3(response?.data?.data);
        setValueTestC3(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchLau = async (e) => {
    const detailInput = {
      name: "LAU",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuLau(response?.data?.data);
        setValueTestLau(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchTM = async (e) => {
    const detailInput = {
      name: "TRANG_MIENG",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuTM(response?.data?.data);
        setValueTestTM(response?.data?.data[0].maMonAn);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const tinhtongtien = (e) => {
    var sb=parseFloat(e);
    var tien1= parseFloat(localStorage.getItem("dongiatuchon"));
    var tt= tien1 * sb;
    setTongTienBan(tt);
  };

  const handleChonNgayKVClick = (item, index) => {
    if (localStorage.getItem("myKVbtn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayKV = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myKhaiVibtn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myKVbtn")!=null){
        if(localStorage.getItem("myKVbtn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myKVbtn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myKVbtn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myKVbtn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myKVbtn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myKVbtn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myKVbtn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };

  // const chonNgayKhaivi = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myKhaiVibtn" + item.maMonAn);
  //   var lastelem = document.getElementById("myKhaiVibtn" + valueTestKV);
  //   console.log("elemne ", elem);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myKVbtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myKVbtn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestKV != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myKVbtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myKVbtn", null);
  //     }
  //   }
  //   setValueTestKV(item.maMonAn);
  //   // if (localStorage.getItem("myKVbtn") == item.maMonAn) {
  //   //   elem.value = "Bỏ chọn";
  //   //   handleCong(item.donGia);
  //   // } else {
  //   //   handleTru(item.donGia);
  //   //   elem.value = "Chọn ngay";}
  // };

  const handleChonNgayMC1Click = (item, index) => {
    if (localStorage.getItem("myMonChinh1btn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayMC1 = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myMonChinh1btn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myMonChinh1btn")!=null){
        if(localStorage.getItem("myMonChinh1btn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myMonChinh1btn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myMonChinh1btn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myMonChinh1btn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myMonChinh1btn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myMonChinh1btn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myMonChinh1btn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };



  // const chonNgayMonChinh1 = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myMonChinh1btn" + item.maMonAn);

  //   var lastelem = document.getElementById("myMonChinh1btn" + valueTestC1);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh1btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh1btn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestC1 != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh1btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh1btn", null);
  //     }
  //   }
  //   setValueTestC1(item.maMonAn);
  //   // if (localStorage.getItem("myMonChinh1btn") == item.maMonAn){
  //   //   elem.value = "Bỏ chọn";
  //   // }
  //   // else elem.value = "Chọn ngay";
  // };

  const handleChonNgayMC2Click = (item, index) => {
    if (localStorage.getItem("myMonChinh2btn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayMC2 = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myMonChinh2btn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myMonChinh2btn")!=null){
        if(localStorage.getItem("myMonChinh2btn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myMonChinh2btn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myMonChinh2btn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myMonChinh2btn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myMonChinh2btn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myMonChinh2btn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myMonChinh2btn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };

  // const chonNgayMonChinh2 = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myMonChinh2btn" + item.maMonAn);

  //   var lastelem = document.getElementById("myMonChinh2btn" + valueTestC2);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh2btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh2btn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestC2 != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh2btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh2btn", null);
  //     }
  //   }
  //   setValueTestC2(item.maMonAn);
  //   if (localStorage.getItem("myMonChinh2btn") == item.maMonAn) {
  //     elem.value = "Bỏ chọn";
  //   } else elem.value = "Chọn ngay";
  // };

  const handleChonNgayMC3Click = (item, index) => {
    if (localStorage.getItem("myMonChinh2btn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayMC3 = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myMonChinh3btn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myMonChinh3btn")!=null){
        if(localStorage.getItem("myMonChinh3btn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myMonChinh3btn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myMonChinh3btn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myMonChinh3btn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myMonChinh3btn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myMonChinh3btn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myMonChinh3btn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };

  // const chonNgayMonChinh3 = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myMonChinh3btn" + item.maMonAn);

  //   var lastelem = document.getElementById("myMonChinh3btn" + valueTestC3);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh3btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh3btn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestC3 != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myMonChinh3btn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myMonChinh3btn", null);
  //     }
  //   }
  //   setValueTestC3(item.maMonAn);
  //   if (localStorage.getItem("myMonChinh3btn") == item.maMonAn) {
  //     elem.value = "Bỏ chọn";
  //   } else elem.value = "Chọn ngay";
  // };

  const handleChonNgayLauClick = (item, index) => {
    if (localStorage.getItem("myLaubtn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayLau = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myLaubtn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myLaubtn")!=null){
        if(localStorage.getItem("myLaubtn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myLaubtn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myLaubtn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myLaubtn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myLaubtn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myLaubtn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myLaubtn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };

  // const chonNgayLau = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myLaubtn" + item.maMonAn);

  //   var lastelem = document.getElementById("myLaubtn" + valueTestLau);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myLaubtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myLaubtn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestLau != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myLaubtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myLaubtn", null);
  //     }
  //   }
  //   setValueTestLau(item.maMonAn);
  //   if (localStorage.getItem("myLaubtn") == item.maMonAn) {
  //     elem.value = "Bỏ chọn";
  //   } else elem.value = "Chọn ngay";
  // };

  const handleChonNgayTMClick = (item, index) => {
    if (localStorage.getItem("myTMbtn").indexOf(item.maMonAn) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  const chonNgayTM = (item, index) => {
    localStorage.removeItem("idsetthucdon");
    var elem = document.getElementById("myTMbtn" + item.maMonAn);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("myTMbtn")!=null){
        if(localStorage.getItem("myTMbtn")=="[]"){
          items.push(item.maMonAn);
       
          localStorage.setItem("myTMbtn", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("myTMbtn");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maMonAn);
            localStorage.setItem("myTMbtn", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
      }else{
      
          items.push(item.maMonAn);
          localStorage.setItem("myTMbtn", JSON.stringify(items));
          elem.value = "Bỏ chọn";
      }
     
    } else {
        var a = localStorage.getItem("myTMbtn");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maMonAn);
  
        items = filteredArray;
        localStorage.setItem("myTMbtn", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
    }
  };
  // const chonNgayTM = (e, item, index) => {
  //   localStorage.removeItem("idsetthucdon");
  //   var elem = document.getElementById("myTMbtn" + item.maMonAn);

  //   var lastelem = document.getElementById("myTMbtn" + valueTestTM);
  //   if (elem.id == lastelem.id) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myTMbtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myTMbtn", null);
  //     }
  //   } else if (elem.id != lastelem.id && valueTestTM != 0) {
  //     if (elem.value == "Chọn ngay") {
  //       localStorage.setItem("myTMbtn", item.maMonAn);
  //       elem.value = "Bỏ chọn";
  //       lastelem.value = "Chọn ngay";
  //     } else {
  //       elem.value = "Chọn ngay";
  //       localStorage.setItem("myTMbtn", null);
  //     }
  //   }
  //   setValueTestTM(item.maMonAn);
  //   if (localStorage.getItem("myTMbtn") == item.maMonAn) {
  //     elem.value = "Bỏ chọn";
  //   } else elem.value = "Chọn ngay";
  // };

  const handleCong = (e) => {
    var ttt = tt + e;
    tt = ttt;
    setTien(tt);
  };

  const openModalXemTDDaChon=()=>{
    handleXemTDDaChon();
    setIsModalXemTDDaChon(true);
  }

  const handleXemTDDaChon=()=>{
    var listidMA=[];
    var idKhaiVi=localStorage.getItem("myKVbtn");
    // var newStrKV = idKhaiVi.replace("[", "");
    // var newStr2KV = newStrKV.replace("]", "");
    // var idKV = newStr2KV.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });
    
    var idMonChinh1=localStorage.getItem("myMonChinh1btn");
    // var newStrMC1 = idMonChinh1.replace("[", "");
    // var newStr2MC1 = newStrMC1.replace("]", "");
    // var idMC1 = newStr2MC1.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });

    var idMonChinh2=localStorage.getItem("myMonChinh2btn");
    // var newStrMC2 = idMonChinh2.replace("[", "");
    // var newStr2MC2 = newStrMC2.replace("]", "");
    // var idMC2 = newStr2MC2.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });

    var idMonChinh3=localStorage.getItem("myMonChinh3btn");
    // var newStrMC3 = idMonChinh3.replace("[", "");
    // var newStr2MC3 = newStrMC3.replace("]", "");
    // var idMC3 = newStr2MC3.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });

    var idLauNe=localStorage.getItem("myLaubtn");
    // var newStrLau = idLauNe.replace("[", "");
    // var newStr2Lau = newStrLau.replace("]", "");
    // var idLau = newStr2Lau.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });

    var idTrangMieng=localStorage.getItem("myTMbtn");
    // var newStrTM = idTrangMieng.replace("[", "");
    // var newStr2TM = newStrTM.replace("]", "");
    // var idTM = newStr2TM.split(",").map(function (item) {
    //     return parseInt(item, 10);
    // });

    // listidMA= idKV.concat(idMC1,idMC2,idMC3,idLau,idTM);
     
    
    // console.log("listidshowthu ",listidMA);
    // console.log("typeoflisidthu ",typeof(listidMA));



    if(idKhaiVi!=null&&idKhaiVi!="null"&&idKhaiVi!="[0]"){
      var newStrKV = idKhaiVi.replace("[", "");
      var newStr2KV = newStrKV.replace("]", "");
      var idKV = newStr2KV.split(",").map(function (item) {
          return parseInt(item, 10);
      });
      //listidMA.concat(idKV);
      if(idMonChinh1!=null&&idMonChinh1!="null"&&idMonChinh1!="[0]"){
        var newStrMC1 = idMonChinh1.replace("[", "");
        var newStr2MC1 = newStrMC1.replace("]", "");
        var idMC1 = newStr2MC1.split(",").map(function (item) {
            return parseInt(item, 10);
        });
        //listidMA.concat(idMC1);
        if(idMonChinh2!=null&&idMonChinh2!="null"&&idMonChinh2!="[0]"){
          var newStrMC2 = idMonChinh2.replace("[", "");
          var newStr2MC2 = newStrMC2.replace("]", "");
          var idMC2 = newStr2MC2.split(",").map(function (item) {
              return parseInt(item, 10);
          });
          //listidMA.concat(idMC2);
          if(idMonChinh3!=null&&idMonChinh3!="null"&&idMonChinh3!="[0]"){
            var newStrMC3 = idMonChinh3.replace("[", "");
            var newStr2MC3 = newStrMC3.replace("]", "");
            var idMC3 = newStr2MC3.split(",").map(function (item) {
                return parseInt(item, 10);
            });
            //listidMA.concat(idMC3);
            if(idLauNe!=null&&idLauNe!="null"&&idLauNe!="[0]"){
              var newStrLau = idLauNe.replace("[", "");
              var newStr2Lau = newStrLau.replace("]", "");
              var idLau = newStr2Lau.split(",").map(function (item) {
                  return parseInt(item, 10);
              });
              //listidMA.concat(idLau);
              if(idTrangMieng!=null&&idTrangMieng!="null"&&idTrangMieng!="[0]"){
                var newStrTM = idTrangMieng.replace("[", "");
                var newStr2TM = newStrTM.replace("]", "");
                var idTM = newStr2TM.split(",").map(function (item) {
                    return parseInt(item, 10);
                });
                //listidMA.concat(idTM);
                listidMA= idKV.concat(idMC1,idMC2,idMC3,idLau,idTM);
              }else{
                //errormessXem("Chọn khai vị");
                setErrTM("Bạn chưa chọn tráng miệng");
              }
            }else{
              //errormessXem("Chọn Lẩu");
              setErrLau("Bạn chưa chọn Lẩu");
            }
          }else{
            //errormessXem("Chọn món chính 3");
            setErrMC3("Bạn chưa chọn món chính 3");
          }
        }else{
          //errormessXem("Chọn món chính 2");
          setErrMC2("Bạn chưa chọn món chính 2");
        }
      }else{
        //errormessXem("Chọn món chính 1");
        setErrMC1("Bạn chưa chọn món chính 1");
      }
    }else{
      //errormessXem("Chọn khai vị");
      setErrKV("Bạn chưa chọn khai vị");
    }
    console.log("listidTDChon",listidMA);
    console.log("tyypeoflistidTDChon",typeof(listidMA));

    const detailInput ={
      listid: listidMA
    }
    post(`/monan/timmonantheothucdon/`, detailInput)
      .then((response) => {
        setDulieuTDDC(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }

  useEffect(() => {
    if(dulieuTDDC=="false"){
      setDataTableTDDC(null);
    }else{
      const _data = dulieuTDDC?.map((item, index) => ({
      stt: index + 1,
      ten: item?.tenMonAn,
      loaimonan: handleLoaiMonAnName(item?.loaiMonAn),
      dongia: item?.donGia,
    }));
    setDataTableTDDC(_data);}
    
  }, [dulieuTDDC]);

  const handleLoaiMonAnName=(e)=>{
    if(e=="KHAI_VI"){
      return "Khai Vị";
    }else if(e=="MON_CHINH_1"){
      return "Món chính 1";
    }else if(e=="MON_CHINH_2"){
      return "Món chính 2";
    }else if(e=="MON_CHINH_3"){
      return "Món chính 3";
    }else if(e=="TRANG_MIENG"){
      return "Tráng miệng";
    }else if(e=="LAU"){
      return "Lẩu";
    }else{
      return "Ăn ăn"
    }
  }

  const errormessXem =(e)=>{
    message.error("Hãy "+e, 8);
  }

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div className="pagewrap">
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

        <h1>Tự chọn thực đơn</h1>
        <Button onClick={(e)=>openModalXemTDDaChon()} style={{ color:"white",background: "#E5CC5F", borderColor: "#E5CC5F", margin:"0 auto"}}>Xem thực đơn đã đặt</Button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Khai vị</h2>
        </div>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuKV}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayKV(item, index)}
                    type="button"
                    value={
                     handleChonNgayKVClick(item,index)
                    }
                    id={"myKhaiVibtn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "14em", height: "14em" }}
                  src={datahinhanhKV(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
        <br></br>
        <h2 style={{ textAlign: "left" }}>Món chính 1:</h2>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuC1}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayMC1(item, index)}
                    type="button"
                    value={handleChonNgayMC1Click(item,index)}
                    id={"myMonChinh1btn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "15em", height: "15em" }}
                  src={datahinhanhMonChinh1(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
        <h2 style={{ textAlign: "left" }}>Món chính 2:</h2>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuC2}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayMC2(item, index)}
                    type="button"
                    value={handleChonNgayMC2Click(item,index)}
                    id={"myMonChinh2btn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "15em", height: "15em" }}
                  src={datahinhanhMonChinh2(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
        <h2 style={{ textAlign: "left" }}>Món chính 3:</h2>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuC3}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayMC3(item, index)}
                    type="button"
                    value={handleChonNgayMC3Click(item,index)}
                    id={"myMonChinh3btn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "15em", height: "15em" }}
                  src={datahinhanhMonChinh3(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
        <h2 style={{ textAlign: "left" }}>Món lẩu:</h2>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuLau}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayLau(item, index)}
                    type="button"
                    value={handleChonNgayLauClick(item,index)}
                    id={"myLaubtn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "15em", height: "15em" }}
                  src={datahinhanhLau(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
        <h2 style={{ textAlign: "left" }}>Món tráng miệng:</h2>
        <List
          grid={{ gutter: 10, column: 5 }}
          dataSource={dulieuTM}
          renderItem={(item, index) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <input
                    style={{
                      background: "#E5CC5F",
                      border: "none",
                      padding: "5px",
                      color: "#ffffff",
                    }}
                    onClick={(e) => chonNgayTM(item, index)}
                    type="button"
                    value={handleChonNgayTMClick(item,index)}
                    id={"myTMbtn" + item.maMonAn}
                  ></input>,
                ]}
              >
                <img
                  style={{ width: "15em", height: "15em" }}
                  src={datahinhanhTM(index)}
                />
                <Meta title={item.tenMonAn} />
                <h3>{item.donGia} VNĐ</h3>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Menu đã chọn"
        visible={isModalXemTDDaChon}
        onCancel={() => setIsModalXemTDDaChon(false)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Đóng"
        width={550}
        centered
      >
        <h2  style={{ color: "red" }}>Lưu ý: Bạn phải chọn đủ 6 món theo Loại món ăn để đến bước thanh toán</h2>
        <Table columns={columnsTDDC} dataSource={dataTableTDDC} pagination={false} />
       
        </Modal>
    </div>
  );
}
function add(accumulator, a) {
  return accumulator + a;
}
