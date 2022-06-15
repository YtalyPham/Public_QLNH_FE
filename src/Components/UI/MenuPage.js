import React, { useState,useEffect } from "react";
import "../css/styles.css";
import logo from "../img/menu/image2vector.svg";
import { get, post, del, put } from "../../httpHelper";
import { DownOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Input,
  Form,
  message,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { Link,Redirect } from "react-router-dom";
 
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }} defaultValue="+84">
      <Option value="+86">+86</Option>
      <Option value="+84">+84</Option>
    </Select>
  </Form.Item>
);

 
export default function MenuPage() {

  const [visible, setVisible] = useState(false);
  const [lhsk,setLhsk]=useState([]);
  const [formDatTiec] = Form.useForm();
  const [khvl,setKhvl]=useState({name:"a",id:"10"});
  var test={name:"b",id:"20"};
  var idkh="0";
  const fetchLhskList = () => {
    get("/loaihinhsukien/")
      .then((response) => {
        // console.log(response.data);
        setLhsk(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchLhskList();
    
  }, []);

  const handleChangeLink =()=>{
     if(localStorage.getItem("phone")==null){
       window.location.href = "/login";
     }else{
      window.location.href = "/User";
     }
     
  }
  
  const handleCallApiAddKhvanglai =  (e) => {
    const detailInput = {
      tenKhachHang: e?.hoten,
      email: e?.email,
      sdt: e?.phone,
      gioiTinh: true,
      ngaySinh: "",
      diemTichLuy: "0",
      vangLai: true,
      maTaiKhoan: null,
      maHinhAnh: null,
    };
     post(`/khachhang/`, detailInput)
      .then((response) => {
        // console.log(response?.data?.data);
        idkh = response?.data?.data.maKhachHang;
        var  intn=parseInt(idkh);
        // console.log("Detail input: ",intn);
        handleCallApiAdd(e);
        
      })
      .catch((err) => {
        console.log("Error : ",err);
      });
  
  };

  const handleCallApiAdd = (e) => {
    
    const loaihsk = lhsk.find((item) => item?.tenLoaiHinhSuKien === e?.maLoaiHinhSuKien);
    var  idne=parseInt(idkh);
    const detailInput = {
      soLuongBan: e?.soLuongBan,
      ngayDatTiec: e?.ngayDatTiec,
      lichHen: e?.lichHen,
      ghiChu: e?.ghiChu,
      buoi: e?.buoi,
      maLoaiHinhSuKien: loaihsk.maLoaiHinhSuKien,
      maKhachHang: idne
    };
     console.log(detailInput);
     post(`/phieuhen/`, detailInput)
     .then((response) => {
      //  console.log(response?.data?.data);
       message.success({ content: "Đặt lịch hẹn thành công", duration: 5 });
       setVisible(false);
     })
     .catch((err) => {
       console.log("Error : ",err);
     });
     


  };
  const handleOpenPhieuHen=() =>{
      setVisible(true);
      formDatTiec.resetFields();
  }
  return (
    <header class="fixed">
      <div class="pagewrap">
        <Link to="/" class="logo">
          <img src={logo} alt="Lucky Center" />
        </Link>
        <div class="menuMain">
          <ul class="menu">
            <li class="sub">
              <a  title="Người dùng" onClick={handleChangeLink}>
                <UserOutlined />
              </a>
              <ul>
                {localStorage.getItem("phone") ? <li><a onClick={() => {localStorage.clear();window.location.href = "/login";}}title="Đăng xuất">Đăng xuất</a></li> : null}                
              </ul>
            </li>
            <li class="sub">
              <a href="tieccuoi" title="Tiệc cưới">
                Tiệc cưới <DownOutlined />
              </a>
              <ul>
                <li>
                  <a href="/sanhtiec" title="Sảnh tiệc">
                    Sảnh tiệc
                  </a>
                </li>
              </ul>
            </li>
            <li class="sub">
              <a href="hoinghi" title="Hội nghị">
                Hội nghị <DownOutlined />
              </a>
              <ul>
                <li>
                  <a href="/sanhtiec" title="Sảnh tiệc">
                    Sảnh tiệc
                  </a>
                </li>
              </ul>
            </li>
            <li class="sub">
              <a href="../../thucdon" title="Thực đơn">
                Thực đơn
              </a>
            </li>
            <li>
              <a href="../../uudai" title="Ưu đãi">
                Ưu đãi
              </a>
            </li>
          </ul>
          <ul class="menu right">
            <li class="sub">
              <a href="../../thuvien" title="Thư viện">
                Thư viện
              </a>
              <ul>
              </ul>
            </li>
            <li>
              <a href="tintuc" title="Tin tức">
                Tin tức
              </a>
            </li>
            <li>
              <a href="lienhe" title="Liên hệ">
                Liên hệ
              </a>
            </li>
            {localStorage.getItem("phone") ? <li class="active fix"><a href="dattiec" class="btnBook" title="">Đặt Tiệc</a></li> : <li class="active fix"><a onClick={() => setVisible(true)} class="btnBook" title="">Tư Vấn Đặt Tiệc</a></li> }
          </ul>
          <div class="clr"></div>
          <Modal
            title="Đặt lịch hẹn tư vấn"
            centered
            visible={visible}
            footer={null}
            width={1000}
            onCancel={() => setVisible(false)}
          >
            <p>
              Quý khách vui lòng điền thông tin vào mẫu dưới đây, chúng tôi sẽ
              liên hệ quý khách trong thời gian sớm nhất
            </p>
            <Form
              {...layout}
              form={formDatTiec}
              name="nest-messages"
              onFinish={handleCallApiAddKhvanglai}
              validateMessages={validateMessages}
              
            >
              <Form.Item
                name="hoten"
                label="Họ và tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="soLuongBan"
                label="Số bàn dự tính"
                rules={[{ type: "number", min: 20, max: 1000 }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name="lichHen" label="Lịch hẹn">
                <Input type="datetime-local" placeholder="Lịch hẹn" />
                {/* <Input
                  type="text"
                  placeholder="Tháng/Ngày/Năm Giờ/Phút AM/PM"
                  onChange={(e) => console.log(e.target.value)}
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                /> */}
              </Form.Item>
              <Form.Item name="ngayDatTiec" label="Ngày tổ chức"  >
                <Input type="datetime-local" placeholder="Ngày tổ chức" />
                {/* <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" /> */}
              </Form.Item>
              <Form.Item name="buoi" label="Buổi">
                <Select name="buoi" placeholder="Buổi">
                  <Option value="Sáng">Sáng</Option>
                  <Option value="Trưa">Trưa</Option>
                  <Option value="Tối">Tối</Option>
                </Select>
              </Form.Item>
              <Form.Item name="maLoaiHinhSuKien" label="Loại hình sự kiện">
                <Select placeholder="Loại hình sự kiện">
                      {lhsk?.map((item) => (
                        <Option value={item?.tenLoaiHinhSuKien}>{item?.tenLoaiHinhSuKien}</Option>
                      ))}
                    </Select>
              </Form.Item>
              <Form.Item name="ghiChu" label="Ghi chú">
                <Input.TextArea placeholder="Ghi chú cho nhân viên ..."/>
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </header>
  );
}
