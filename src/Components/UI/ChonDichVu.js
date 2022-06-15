import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { List, Card, Button, Image, Modal,message } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { post, get, del, put } from "../../httpHelper";
const { Meta } = Card;
const datahinh = [
  {
    image:
      "https://daiphatvienthong.vn/upload/images/5097-024-hoa-mau-hong-trang-tri-xe-hoa-cuoi-hoi(1).jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/48913093_2643298902366012_8600121154914484224_n-303.jpg",
  },
  {
    image:
      "https://riversidepalace.vn/resizemultidata/45093853_2564685903560646_270925927146323968_n.jpg",
  },
  {
    image: "https://riversidepalace.vn/multidata/1-904.jpg",
  },
  {
    image:
      "https://riversidepalace.vn/resizemultidata/06-440.jpg",
  },
  {
    image:
      "https://minhvumedia.vn/wp-content/uploads/cho-thue-phong-bat-min.jpg",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmYERvT_4nhn9EcUPNcIF6csg0PhU4PXgyw&usqp=CAU",
  },
  {
    image: "https://cungxuan.vn/wp-content/uploads/2020/08/4.jpg",
  },
  {
    image:
      "https://riversidepalace.vn/multidata/83935447_2316044821831065_1898518545768120320_o.jpg",
  },
  {
    image:
      "https://riversidepalace.vn/multidata/1-221.jpg",
  },
  {
    image:
      "https://riversidepalace.vn/multidata/65229355_2033754163395927_898509408886063104_n.jpg",
  },
  {
    image: "https://riversidepalace.vn/multidata/64579416_2033754920062518_4913241182722588672_n.jpg",
  },
];



  

export default function ChonDichVu() {
  const [modalDetaiSanhTiec, setModalDetailSanhTiec] = useState(false);
  const [dulieuDV, setDulieuDV] = useState([]);
  const [test, setTest] = useState("test");
  const [dichVuDetail, setDichVuDetail] = useState([]);
  const [tongTienBan,setTongTienBan]=useState(0)
  var tt = 0.0;
  const [tien, setTien] = useState(0);
  var items = [];
  var itemsten = [];
 
  const datahinhanh =(e)=>{
    if(e==0){
      return "https://ely.com.vn/wp-content/uploads/2020/12/MC-dam-cuoi.jpg";
    }else if(e==1){
      return "https://7799wedding.vn/mediacenter/media/images/2458/news/ava/s1000_1000/cong-hoa-dam-cuoi-1-1623029834.jpg";
    }else if(e==2){
      return  "https://producer.com.vn/wp-content/uploads/2020/10/quay-phim-dam-cuoi1.jpg";
    }else if(e==3){
      return "https://hupentertainment.com/wp-content/uploads/2019/07/mi-2.jpg";
    }else if(e==4){
      return "http://www.sunpalace.com.vn/uploads/ANH_NHA_HANG/GDL_14.jpg";
    }else if(e==5){
      return "https://hoatuoivannam.com/wp-content/uploads/2019/07/Xe-hoa-c%C6%B0%E1%BB%9Bi-600x400.jpg";
    }else if(e==6){
      return "https://sugarweddingplan.com/wp-content/uploads/2021/02/z2339005183138_271d168ab255774806b6bb0afa6307a2-683x1024.jpg";
    }else if(e==7){
      return "https://alitools.io/en/showcase/image?url=https%3A%2F%2Fae01.alicdn.com%2Fkf%2FHTB13c5LXYj1gK0jSZFuq6ArHpXaN%2FCelebration-birthday-wedding-party-creative-layout-acrylic-five-layer-round-wine-rack-cup-tower-wedding-props.jpg";
    }else if(e==8){
      return "https://cdn-img-v2.webbnc.net/uploadv2/web/39/3978/news/2019/05/14/04/30/1557808237_1490001868_cung-cap-vu-doan-phat-hoang-gia-36.jpg";
    }else if(e==9){
      return "https://i.vietgiaitri.com/2019/6/18/to-chuc-dong-ca-nhung-thieu-nu-nam-sinh-trong-lop-gia-gai-dung-v-bb552a.jpg";
    }else if(e==10){
      return "https://baohay.vn/wp-content/uploads/2019/04/mac-van-khoa-la-ai-3.png";
    }else{
      return "https://cdn.trithuccongdong.net/trithuccongdong/uploads/2018/02/Dich-vu-la-gi-Dac-diem-va-ban-chat-cua-dich-vu.jpg";
    }

  }

  const chonNgay = (item, index) => {
    var elem = document.getElementById("myDichVubtn" + item.maDichVu);
  
    if (elem.value == "Chọn ngay") {
      
      if(localStorage.getItem("iddichvu")!=null){
        if(localStorage.getItem("iddichvu")=="[]"){
          items.push(item.maDichVu);
       
          localStorage.setItem("iddichvu", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        }else{
          var a = localStorage.getItem("iddichvu");
          var newStr = a.replace("[", "");
          var newStr2 = newStr.replace("]", "");
          var b = newStr2.split(",").map(function (item) {
            return parseInt(item, 10);
          });
         
            var aid= b;
            var loaio= aid.filter((e) => e !== 0);
            items=loaio;
            items.push(item.maDichVu);
            localStorage.setItem("iddichvu", JSON.stringify(items));
            elem.value = "Bỏ chọn";
        }
       
        
       
      }else{
        // var a = localStorage.getItem("iddichvu");
        // var newStr = a.replace("[", "");
        // var newStr2 = newStr.replace("]", "");
        // var b = newStr2.split(",").map(function (item) {
        //   return parseInt(item, 10);
        // });
        // console.log("b co null",b);
        // if(a.indexOf(null)!=-1){
        //   var aid= b;
        //   var loaio= aid.filter((e) => e !== null);
        //   items.push(item.maDichVu);
       
        //   localStorage.setItem("iddichvu", JSON.stringify(items));
         
        //   elem.value = "Bỏ chọn";
        // }else{
          items.push(item.maDichVu);
       
          localStorage.setItem("iddichvu", JSON.stringify(items));
         
          elem.value = "Bỏ chọn";
        // }
       
      }
     
    } else {
     
        var a = localStorage.getItem("iddichvu");
        var newStr = a.replace("[", "");
        var newStr2 = newStr.replace("]", "");
        var b = newStr2.split(",").map(function (item) {
          return parseInt(item, 10);
        });
        var aid= b;
        var filteredArray = aid.filter((e) => e !== item.maDichVu);
  
        items = filteredArray;
        localStorage.setItem("iddichvu", JSON.stringify(filteredArray));
        elem.value = "Chọn ngay";
     
    
    }
   
  };
  const showDetailSanhtiec = (item) => {
    handleDetailDichVu(item?.maDichVu);
     
    setModalDetailSanhTiec(true);
  };

  const handleChonNgayClick = (item, index) => {
    if (localStorage.getItem("iddichvu").indexOf(item.maDichVu) !== -1) {
      return "Bỏ chọn";
    } else {
      return "Chọn ngay";
    }
  };

  useEffect(() => {
    fetchDV();
    if ( localStorage.getItem("iddichvu") == null ) {
      var m = [0];
      localStorage.setItem("iddichvu", JSON.stringify(m));
    }
    localStorage.removeItem("dongiadichvu");
  }, [test]);

  const fetchDV = async (e) => {
    await get(`/dichvu/`)
      .then((response) => {
        setDulieuDV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleDetailDichVu = async (e) => {
    await get(`/dichvu/${e}`)
      .then((response) => {
        setDichVuDetail(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getSetTTbyIdTT=async (e)=>{
    const detailInput={
      listid: e
    }
    await post(`/dichvu/tinhtien/`,detailInput)
    .then((response) => {
      var t1 = parseFloat(response.data.data);
     // console.log("dg", t1);
      setTien(t1);
      localStorage.setItem("dongiadichvu",t1);
    })
    .catch((err) => {
      console.log("Err: ", err);
    });



  }


  const tamtinh =  (e) => {
    tt = 0.0;
    

    if (localStorage.getItem("iddichvu") != null) {
      var a = localStorage.getItem("iddichvu");
      var newStr = a.replace("[", "");
      var newStr2 = newStr.replace("]", "");
      var b = newStr2.split(",").map(function (item) {
        return parseInt(item, 10);
      });
      getSetTTbyIdTT(b);
    } else {
      errorChon("Chọn dịch vụ");
    }

   
  };

 
  const errorChon = (e) => {
    message.error("Hãy chọn món ăn "+e);
  };

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="ChonDichTiecForm" style={{ marginTop: "74px" }}>
      <div className="pagewrap">
      <div style={{ display: "inline-flex" }}>
          <h2>
            Tổng tiền dịch vụ tạm tính: {themPhayVaoSo(tien)}  VNĐ
          </h2>
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
           Tạm tính tiền dịch vụ
          </Button>
      </div> 
         
        
        <h2>Chọn dịch vụ</h2>
        <List
          grid={{ gutter: 10, column: 3 }}
          dataSource={dulieuDV}
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
                  onClick={() => chonNgay(item, index)}
                  type="button"
                  value={handleChonNgayClick(item, index)}
                  id={"myDichVubtn" + item.maDichVu}
                ></input>
                ]}
              >
                <img
                  style={{ width: "20em", height: "20em" }}
                  src={
                    datahinhanh(index)
                  }
                />
                <Meta title={item.tenDichVu}/><div></div>
                <h4>{item.donGia} VNĐ</h4>
                <Button
                  type="dashed"
                  primary
                  onClick={() => showDetailSanhtiec(item)}
                >
                  Xem chi tiết
                </Button>
              
              </Card>
            </List.Item>
          )}
        />
        <Modal
          visible={modalDetaiSanhTiec}
          onCancel={() => setModalDetailSanhTiec(false)}
          width={1200}
          footer={[<Button onClick={() => setModalDetailSanhTiec(false)}>Đóng</Button>]}
        >
          <div
            style={{
              display: "flex",
              background: "#FAFAEB",
              justifyContent: "space-around",
              padding: "25px",
            }}
          >
            <div style={{ float: "left" }}>
              <Carousel
                showArrows={true}
                showThumbs={true}
                width="470px"
                infiniteLoop={true}
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
              >
                <div>
                  <img src="https://riversidepalace.vn/newsmultidata/f3_2.png" />
                </div>
                <div>
                  <img src="https://riversidepalace.vn/multidata/50456917_2685799998115902_7221006782506729472_n.jpg" />
                </div>
                <div>
                  <img src="https://riversidepalace.vn/multidata/50275156_2685799691449266_6497098518736404480_n.jpg" />
                </div>
                <div>
                  <img src="https://riversidepalace.vn/newsmultidata/f5.png" />
                </div>
                <div>
                  <img src="https://riversidepalace.vn/resizemultidata/65146019_2033751360062874_8482945633806712832_n-931.jpg" />
                </div>
              </Carousel>
            </div>

            <div style={{ float: "right", width: "30%", textAlign: "center" }}>
              <h2>{dichVuDetail.tenDichVu}</h2>
              <div>Ghi chú:</div>
              <h4>{dichVuDetail.ghiChu}</h4>
              <h3>{dichVuDetail.donGia} VNĐ</h3>
               
            </div>
          </div>
        </Modal>
        <div className="slogan" style={{ padding: "20px 0" }}>
          <span>Hình ảnh dịch vụ tại LuckyCenter</span>
        </div>
        <List
          grid={{ gutter: [16, 16], column: 4 }}
          dataSource={datahinh}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ border: "none" }}>
                <Image width={250} height={250} src={item.image} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
