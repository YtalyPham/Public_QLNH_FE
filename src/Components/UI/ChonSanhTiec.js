import React, { useState,useEffect } from 'react';
import { HashRouter, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { post, get, del, put } from "../../httpHelper";
import moment from "moment";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker,
  TimePicker,
  Image,
  Tabs,
  Modal,
  Breadcrumb, Alert, List, Card
} from 'antd';
const { Meta } = Card;
const gutters = {};
const vgutters = {};
const colCounts = {};
const { TabPane } = Tabs;

const { RangePicker } = DatePicker;
const { Option } = Select;
 
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const tabFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};



export default function ChonSanhTiec() {
  const [dulieuST, setDulieuST] = useState([]);
  const [valueLHSK, setValueLHSK] = useState([]); 
  const [valueKH, setValueKH] = useState([]);
  const [valueST, setValueST] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [valueTest,setValueTest]=useState(1);
  const [listST, setListST] = useState(dulieuST);
  const [dataTest, setDataTest] = useState([]);
  const [modalDetaiSanhTiec, setModalDetailSanhTiec] = useState(false);
  const [sanhTiecDetail, setSanhTiecDetail] = useState([]);
  const [isDonDat, setDonDat] = useState(
    {tenKhachHang: "",
    email: "",
    sdt: "",
    soban: "",
    ngaytochuc: "",
    note: "",
    buoidattiec: "",
    loaihinh: "",
    sanhtiec: "",
    dichvu: "",
    setthucdon: "",
    thucuong1: "",
    giatien: "",
    thucuong2: "",
    monkhaivi: "",
    monchinh1: "",
    monchinh2: "",
    monchinh3: "",
    monchinh4: "",
    montrangmieng: "",}
);

const disabledDate=(current)=> {
  // Can not select days before today and today
 
   
  return current && current < moment().add(7, 'days');
}

    useEffect(() => {
    
     if(localStorage.getItem("myDonDatTiec")!=null){
      var user = JSON.parse(localStorage.getItem('myDonDatTiec'));
       kiemTraTrungSanhTiec(user.ngaytochuc,user.buoidattiec);
     }
      fetchLHSK();
      fetchKH();
    }, []);

    useEffect(() => {
   
      
    }, [dulieuST]);

   
// _listfriend la dulieuST, listfriend la listST
    const changeIsRequestState = (id) => {
      const _index = listST?.findIndex(item => item?.maSanhTiec === id);
  
      const dulieuhandle = [...listST?.slice(0, _index),
        {
          ...listST[_index],
          isRequest: !listST[_index]?.isRequest
        },
        ...listST.slice(_index + 1)
      ];
  
      setDulieuST(dulieuhandle);
    }

    const fetchST = async (e) => {
      await get(`/sanhtiec/`)
        .then((response) => {
          setDulieuST(response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    };

    const fetchKH = async (e) => {
      const maTK = "" + localStorage.getItem("maTaiKhoan").trim();
      await get(`/khachhang/mataikhoan/${maTK}`)
      .then((response) => {
        setValueKH(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
    };

    const fetchLHSK = async (e) => {
      await get(`/loaihinhsukien/`)
        .then((response) => {
          setValueLHSK(response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    };

    const handleDetailST = async (e) => {
      await get(`/sanhtiec/${e}`)
        .then((response) => {
          setSanhTiecDetail(response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    };

  const showDetailSanhtiec = (e, item) => {
    handleDetailST(item?.maSanhTiec);
    
    setModalDetailSanhTiec(true);
  };
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [formSanhTiec] = Form.useForm();
  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img style={{width: '30px'}}  src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract0${i+1}.jpg` }/>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  const chonNgay = (e, item, index) => {
    var elem = document.getElementById("myButton"+ index);
    var lastelem= document.getElementById("myButton"+valueTest);
    if(elem.idButton==lastelem.idButton){
       
      if (elem.value=="Chọn ngay") {
        localStorage.setItem("idsanhtiec", item.maSanhTiec);
        elem.value = "Bỏ chọn";
        localStorage.setItem("dongiasanhtiec", item.donGia);
      }
      else {
        elem.value = "Chọn ngay";
        localStorage.setItem("idsanhtiec", null);
        localStorage.setItem("dongiasanhtiec", null);
      };
    }else if(elem.idButton!=lastelem.idButton&&valueTest!=0){
      
      if (elem.value=="Chọn ngay") {
        localStorage.setItem("idsanhtiec", item.maSanhTiec);
        elem.value = "Bỏ chọn";
        lastelem.value= "Chọn ngay";
        localStorage.setItem("dongiasanhtiec", item.donGia);
      }
      else {
        elem.value = "Chọn ngay";
        localStorage.setItem("idsanhtiec", null);
        localStorage.setItem("dongiasanhtiec",null);
      };
    }
      setValueTest(index);
    if (localStorage.getItem("idsanhtiec") == item.maSanhTiec){
      elem.value = "Bỏ chọn";
    }
    else elem.value = "Chọn ngay";
    
  }

  const kiemTraTrungSanhTiec = async (a,b) =>{
    const detailInput={
      ngayToChuc: a,
      buoi: b
    }
    await post(`/phieudattiec/timmasttheongaybuoi/`,detailInput)
    .then((response) => {
      console.log("MaSTTrung",response?.data?.data);
      loadSTKhongTrung(response?.data?.data);
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  }

  const loadSTKhongTrung = async(e) =>{
    const detailInput={
      listid: e
    }
    await post(`/sanhtiec/timsanhtieckhongtrung/`,detailInput)
    .then((response) => {
     // console.log("STko trung",response?.data?.data);
      if((response?.data?.data).length != 0){
        setDulieuST(response?.data?.data);
      }else{
        fetchST();
      }
      
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  }

  const onFinish = (e) => {
   // console.log('Received values of form: ', e);
    kiemTraTrungSanhTiec(e['ngaytochuc'].format('YYYY-MM-DD') + 'T00:00:00.000Z',e?.buoidattiec);

    const loaihsk = valueLHSK.find((item) => item?.tenLoaiHinhSuKien === e?.loaihinh);

    const detailInput = {
      tenKhachHang: valueKH.tenKhachHang,
      email: valueKH.email,
      sdt: valueKH.sdt,
      ngaytochuc: e['ngaytochuc'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
      buoidattiec: e?.buoidattiec,
      loaihinh: loaihsk.maLoaiHinhSuKien,
      tenloaihinh: e?.loaihinh,
      sanhtiec: localStorage.getItem("idsanhtiec"),
    };

    setDonDat(detailInput);
    localStorage.setItem("myDonDatTiec", JSON.stringify(detailInput));
    console.log('day ne:', Object.values(detailInput));
   // window.location.href = "/dattiec/dichvu";
    
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const datahinhanh =(e)=>{
    if(e==1){
      return "https://asiana-plaza.com/wp-content/uploads/2021/03/sanh-cuoi-dep-va-tot-nhat-1.jpg";
    }else if(e==2){
      return "https://asiana-plaza.com/wp-content/uploads/2021/03/trang-tri-sanh-tiec-cuoi-dep-3.jpg";
    }else if(e==3){
      return  "https://themirahotel.com.vn/wp-content/uploads/2019/09/Phongcachcuoi1-653x526.jpg";
    }else if(e==4){
      return "https://whitelotus.com.vn/wp-content/uploads/2021/05/BIT_2967-1024x683.jpg";
    }else if(e==5){
      return "https://voan.vn/wp-content/uploads/2019/04/trang-tri-sanh-tiec-cuoi-voi-hoa.jpg";
    }else if(e==6){
      return "https://tochuctieccuoi.net/wp-content/uploads/2019/02/9.jpg";
    }else if(e==7){
      return "https://kientrucroman.com.vn/wp-content/uploads/Cac-mau-sanh-tiec-trung-tam-tiec-cuoi-dep-li-tuong-cho-moi-cap-doi-2.jpg";
    }else if(e==8){
      return "https://capellagallery.com/wp-content/uploads/2018/10/nha-hang-tiec-cuoi-sang-trong-nhat-tphcm-1.jpg";
    }else if(e==9){
      return "https://grandpalace.com.vn/multidata/lnom1899_1.jpg";
    }else if(e==10){
      return "https://i.imgur.com/lkPOcpZ.jpg";
    }else if(e==11){
      return "https://asiana-plaza.com/wp-content/uploads/2021/03/trang-tri-sanh-cuoi-dep-va-sang-trong-1.jpg";
    }else if(e==12){
      return "https://asiana-plaza.com/wp-content/uploads/2021/03/cach-trang-tri-tiec-cuoi-tai-nha-hang-1.jpg";
    }else if(e==13){
      return "https://i.imgur.com/L8jscnB.jpg";
    }else if(e==14){
      return "https://www.metropole.com.vn/uploads/news/362b55990548c3-3dff8f6fef152fview5.jpeg";
    }else if(e==15){
      return "https://afamilycdn.com/150157425591193600/2020/7/21/10753656414323951169715494400285729160246129o-15953228874201126119583.jpg";
    }else if(e==16){
      return "https://i.imgur.com/13ucMrl.jpg";
    }else if(e==17){
      return "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/dungtv/anh-bai-blog/top10nhahangtieccuoisangtrongtaihanoi/top-nha-hang-tiec-cuoi-sang-trong-ha-noi-2.jpg";
    }else if(e==18){
      return "https://lh6.googleusercontent.com/sk-vDHleofi-7hLtzlqekzOCulWxnXz2zq8Uqur3ejnA746XKSk85ITRxdX1-3YERLiztpUX2X-Iynemd9qrteakwU44iX6m2eRFeNo6kxwC2HrkxnIVczwKS6zB5nlgnu6zSqgQ";
    }else{
      return "https://www.queenbee.com.vn/wp-content/uploads/S%E1%BA%A3nh-ti%E1%BB%87c-t%E1%BA%A7ng-2-queen-bee-2.jpg";
    }

  }
  

  return (
    <div style={{marginTop: "74px"}} >
      <div className='Dattiecform' >
        <div className='pagewrap'>
        <Form
            {...formItemLayout}
            
            form={formSanhTiec}
            name="formSanhTiec"
            onFinish={onFinish}
            
            scrollToFirstError>
            <Form.Item
              name="name"
              label="Họ và tên"
            
            >
              <Input id='hovaten'  placeholder={valueKH.tenKhachHang} disabled/>
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
           
            >
              <Input placeholder={valueKH.email} disabled/>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
           
            >
              <Input
                  placeholder={valueKH.sdt} disabled
              />
            </Form.Item>
            <h4>Lưu ý bạn chỉ chọn được ngày tổ chức phải sau ngày hôm nay ít nhất 7 ngày</h4>
            <Form.Item  name="ngaytochuc" label="Ngày tổ chức" {...config}
              rules={[
                {
                  
                  required: true,
                  message: 'Vui lòng nhập ngày tổ chức!',
                },
              ]}>
              <DatePicker id="datetochuc" style={{float: 'left'}} showTime format="YYYY-MM-DD" disabledDate={disabledDate}/>
            </Form.Item><Form.Item label="Buổi đặt tiệc" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{ float: 'left', display: 'inline-block', width: 'calc(30% - 12px)' }}
                name="buoidattiec"
                label=""
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn buổi!',
                  },
                ]}
              >
                <Select placeholder="Chọn buổi" >
                  <Option value="TRUA">Trưa (9h- 14h)</Option>
                  <Option value="TOI">Tối (5h-9h)</Option>
                </Select>
              </Form.Item>
              <span
                style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
              >
                Loại hình
              </span>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}
                name="loaihinh"
                label=""
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại hình!',
                  },
                ]}
              >
                <Select placeholder="Loại hình sự kiện">
                  {valueLHSK?.map((item) => (
                        <Option value={item?.tenLoaiHinhSuKien}>{item?.tenLoaiHinhSuKien}</Option>
                      ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                 Kiểm tra trùng sảnh tiệc
                </Button>
              </Form.Item>
            </Form.Item>
        </Form>
         
        <div className='slogan'style={{padding: "20px 0"}} ><span>Sảnh tiệc</span></div>
        
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={dulieuST}
          renderItem={(item,index) => (
            <List.Item>
              <Card 
                style={{background: '#FAFAEB'}}
                hoverable
                >
                <div style={{display: 'flex',background: '#FAFAEB', justifyContent: 'space-around', padding: '25px'}}>   
                  <div style={{float: 'left'}}>
                    <h2>{item.tenSanhTiec}</h2>
                    <a className='sanhtiecHinh'>
                      <Image height={200} src={datahinhanh(item.maSanhTiec)}/>
                    </a>
                  </div>

                  <div style={{float: 'right', width: '40%', textAlign: 'center'}}>
                      <h3>Mời  đặt tiệc</h3>
                      <p>
                        <div>Vị trí sảnh tiệc: {item.viTri}</div>
                      </p>
                      <Button type="dashed" primary onClick={(e) => showDetailSanhtiec(e, item)}>
                        Chi tiết
                      </Button>
                      <br></br>
                      <br></br>
                      <input className='btn btn-main' onClick={(e) => chonNgay(e,item, index)} type="button"
                      value={localStorage.getItem("idsanhtiec") == item.maSanhTiec ? "Bỏ chọn" : "Chọn ngay"}
                      id={"myButton"+ index}></input>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
         <Modal
          visible={modalDetaiSanhTiec}
          onCancel={() => setModalDetailSanhTiec(false)}
          width={1200}
          cancelText="Hủy"
          footer={[
            <Button onClick={() => setModalDetailSanhTiec(false)}>
            Đóng 
            </Button>,
          ]}
        >
        <div style={{display: 'flex',background: '#FAFAEB', justifyContent: 'space-around', padding: '25px'}}>   
              <div style={{float: 'left'}}>
                <Carousel showArrows={true} showThumbs={true} width='470px' infiniteLoop={true} showStatus={false} swipeable={true} emulateTouch={true}>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801665.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1608288947764265.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801904.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801104.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801125.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801303.jpg" />
                </div>
            </Carousel>
              </div>

              <div style={{float: 'right', width: '30%', textAlign: 'center'}}>
                  <h2>{sanhTiecDetail.tenSanhTiec}</h2>
                  <p>
                    <div>Diện tích: {sanhTiecDetail.dienTich} m2</div>
                    <div>Kích thước: {sanhTiecDetail.kichThuoc} m2</div>
                    <div>Kiểu bàn dài: {sanhTiecDetail.kieuBanDai} bàn</div>
                    <div>Kiểu bàn tròn: {sanhTiecDetail.kieuBanTron} bàn</div>
                    <div>Kiểu lớp học: {sanhTiecDetail.kieuLopHoc} bàn</div>
                    <div>Kiểu rạp hát: {sanhTiecDetail.kieuRapHat} bàn</div>
                    <div>Quầy triển lãm: {sanhTiecDetail.quayTrienLam}</div>
                    <div>Vị trí: {sanhTiecDetail.viTri}</div>
                   
                  </p>
                  <h3>Đơn giá: {sanhTiecDetail.donGia} VNĐ</h3>
              </div>
              </div>
        </Modal>
        <div className='slogan'style={{padding: "20px 0"}} ><span>Hình ảnh sảnh tiệc</span></div>  
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://kientrucroman.com.vn/wp-content/uploads/Cac-mau-sanh-tiec-trung-tam-tiec-cuoi-dep-li-tuong-cho-moi-cap-doi-1.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://wedding.celeb.vn/wp-content/uploads/2019/04/sanh-tiec-cuoi-dep-1.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV338gTN2-mZJWiESl92KpfbL87DH6W-b0CYTEIx5MvC45mcw-WVsCfg9r1Q7N93-fUDs&usqp=CAU'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://vcdn-ngoisao.vnecdn.net/2016/09/13/11/anh-settop-1473740747_500x300.jpg'/>
          </Col>

          <Col span={6}>
            <Image className='sanhtiechinh' src='https://www.marry.vn/images/companies/1/nha-hang-tiec-cuoi/CAPELLA%20GALLERY%20HALL/CAPELLA%20GALLERY%20HALL%20%C3%81NH%20S%C3%81NG.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbclwDIGsXmzvaqvUCx3ONt0jXB3KeQQf8VSm81AqFScMFyLB1zzgeBSVqJs2YtO8z4M&usqp=CAU'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://i.imgur.com/lkPOcpZ.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://tochuctieccuoi.net/wp-content/uploads/2016/07/rose.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://www.theadora.vn/media/images/1610175247801994.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://www.theadora.vn/media/images/1610175247801353.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://www.theadora.vn/media/images/1608288947764265.jpg'/>
          </Col>
          <Col span={6}>
            <Image className='sanhtiechinh' src='https://www.theadora.vn/media/images/1608288947764808.jpg'/>
          </Col>
        </Row>
          {/* <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801994.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1610175247801353.jpg" />
                </div>
                <div>
                    <img src="https://www.theadora.vn/media/images/1608288947764808.jpg" />
                </div> */}
        </div>
        {/* <Button type="primary" htmlType="submit" form='formSanhTiec' style={{height: '50px', fontSize: '24px',margin: '20px auto',background: '#E5CC5F', borderColor: '#E5CC5F'}}>
          Gửi xác nhận sảnh tiệc
        </Button> */}
      </div>
      <div className='clr'></div>
    </div>
  )
}
