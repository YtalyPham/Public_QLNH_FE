import React, {useEffect, useState} from "react";
import { Route, Router, Routes, Link } from 'react-router-dom';
import moment from 'moment';  
import { post, get, del, put } from "../../httpHelper";

import { Avatar, Col, Dropdown, Menu, Row, Space, Typography, Input, Form, Modal, Radio, DatePicker } from "antd";
import { UserOutlined, HomeOutlined, BellOutlined, LogoutOutlined,CalendarOutlined,DollarCircleOutlined, EditOutlined,SkinOutlined , SnippetsOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text} = Typography;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export default function HoSoNhanVien() {
  const [valueNV, setValueNV] = useState([]);
  const [test, setTest] = useState({});
  const [ngaySinh,setngaySinh] = useState("");
  const [ngayThue,setngayThue] = useState("");
  const [modalEditNVAdmin, setModalEditNVAdmin] = useState(false);
  const [formUpdate] = Form.useForm();
  const [lnv,setlnv] = useState("");
  
  useEffect(() => {
    fetchNV();
  }, [test]);

  const fetchNV = async (e) => {
    const maTK = "" + localStorage.getItem("maTaiKhoan").trim();

    await get(`/nhanvien/mataikhoan/${maTK}`)
      .then((response) => {
        setValueNV(response?.data?.data);
        localStorage.setItem("maNhanVien", response?.data?.data.maNhanVien);
        setngaySinh(response?.data?.data.ngaySinh.slice(0,10));
        setngayThue(response?.data?.data.ngayThue.slice(0,10));
            get(`/loainhanvien/${response?.data?.data.maLoaiNhanVien}`)
          .then((response) => {
            
          setlnv(response?.data?.data.tenLoai);
         // console.log("lnv ",response?.data?.data);
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

 

  const showEditNhanVienAdmin = () => {
  setModalEditNVAdmin(true);
  };
  
  const handleUpdateNVAdmin = async (e) => {

    const detailInput = {
       maNhanVien: e?.manhanvien,
       tenNhanVien: e?.tennhanvien,
       email: e?.email,
       sdt: e?.sdt,
       cmnd: e?.cmnd,
       diaChi: e?.diachi,
       gioiTinh: e?.gioitinh=="true"?true:false,
       ngaySinh: e['ngaysinh'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayThue: e['ngaythue'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayLam: parseInt(e?.ngaylam),
       ngayNghi: parseInt(e?.ngaynghi),
       luongCoBan: parseInt(e?.luongcoban),
       maHinhAnh: 5,
       maLoaiNhanVien: parseInt(e?.maloainhanvien),  
       maTaiKhoan: parseInt(e?.mataikhoan),
      };
     // console.log(detailInput)
    
    await put(`/nhanvien/`,detailInput)
    .then((response) => {
       
       console.log("updatesuccess",response?.data?.data);
      setModalEditNVAdmin(false);
      fetchNV();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  let ngaysinhinput = valueNV.ngaySinh;
  let ngaythueinput = valueNV.ngayThue;
  return (
    <div  style={{ background: "#e7ecf0", height: '100vh' }}>
      <div className="headeremployee">
        <div className="pagewrap">
          <div className="menuemployee" style={{ float: "left" }}>
            <ul>
              <li>
                <a href="" title="">
                  <span>
                  <HomeOutlined />
                  </span>
                  Trang chủ
                </a>
              </li>

              <li>
                <a
                  href=""
                >
                  <div>
                  <BellOutlined />
                    Tin tức
                  </div>
                </a>
              </li>
              <li>
                <a
                  onClick={() => {localStorage.clear();window.location.href = "../../loginadmin";}}
                >
                  <div>
                  <LogoutOutlined />
                    Đăng xuất
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <Modal
          title="Cập nhật nhân viên"
          visible={modalEditNVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditNVAdmin(false)}
          width={600}
          
        >
          
         <Form 
         {...formItemLayout}
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateNVAdmin}>
             <Form.Item
                name="tennhanvien"
                label="Tên nhân viên"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên nhân viên" }]}
              >
                <Input
                  defaultValue={valueNV.tenNhanVien}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{type: "email", required: true, message: "Nhập email nhân viên" }]}
              >
                <Input
                  defaultValue={valueNV.email}
                />
              </Form.Item>
              <Form.Item
                name="sdt"
                label="Số điện thoại"

                 hidden={true}
              >
                <Input
                  defaultValue={valueNV.sdt}
                />
              </Form.Item>
              <Form.Item
                name="cmnd"
                label="Số chứng minh"
                rules={[ {
                  pattern:
                  /(([0-9]{11})\b)/g,
                  message: "Hãy nhập đúng gồm 11 số",
                },
                  { required: true }]}
              >
                <Input
                  defaultValue={valueNV.cmnd}
                />
              </Form.Item>
              <Form.Item
                name="diachi"
                label="Địa chỉ"
                rules={[{ required: true, message: "Nhập địa chỉ nhân viên" }]}
              >
                <Input
                  defaultValue={valueNV?.diaChi}
                />
              </Form.Item>
              <Form.Item name="gioitinh" label="Giới tính">
              <Radio.Group defaultValue={valueNV.gioiTinh}>
                <Radio value="true">Nam</Radio>
                <Radio value="false">Nữ</Radio>
              </Radio.Group>
              </Form.Item>
              <Form.Item
              name="ngaysinh"
              label="Ngày sinh"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày sinh của nhân viên",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}} defaultValue={moment(ngaysinhinput, "YYYY-MM-DD")} format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              name="ngaythue"
              label="Ngày thuê"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày thuê của nhân viên",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}} defaultValue={moment(ngaythueinput, "YYYY-MM-DD")} format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              hidden={true}
              name="ngaylam"
              label="Ngày làm"
              initialValue={valueNV.ngayLam}
              >

              </Form.Item>
              <Form.Item
              hidden={true}
              name="ngaynghi"
              label="Ngày nghỉ"
              initialValue={valueNV.ngayNghi}
              >
              </Form.Item>
              <Form.Item
              hidden={true}
              name="luongcoban"
              label="Lương cơ bản"
              initialValue={valueNV.luongCoBan}
              >

              </Form.Item>
              <Form.Item
              hidden={true}
                name='mataikhoan'
                initialValue={valueNV.maTaiKhoan}
              ></Form.Item>
              <Form.Item
                hidden={true}
                name='maloainhanvien'
                initialValue={valueNV.maLoaiNhanVien}
              ></Form.Item>
              <Form.Item
                hidden={true}
                name='manhanvien'
                initialValue={valueNV.maNhanVien}
              ></Form.Item>
          </Form>

        </Modal>
          <div style={{ float: "right", padding: '9px 0'}}>
            <Avatar src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} />
            <span>   Xin chào, {valueNV.tenNhanVien}</span>
          </div>
        </div>
      </div>
      <div className="contentEmployee" style={{background: "#e7ecf0", marginTop: '50px', position: 'relative'}}>
        <div className="pagewrap">
          <Row>
            <Col span={24}>
            <div className="boxInfo">
              <div style={{fontWeight: "Bold", fontSize: '30px', textAlign: "center",borderBottom: "1px solid #eee"}}>Thông tin nhân viên</div>
              <Row>
                <Col span={8}>
                  <br></br>
                  <Avatar   src="https://joeschmoe.io/api/v1/random" style={{marginLeft: '23%'}} icon={<UserOutlined />} size={180}/>
                  <br></br>
                  <a  style={{marginLeft: '31%'}} onClick={() => showEditNhanVienAdmin()}>Cập nhật thông tin</a>

                </Col>
                <Col span={8}>
                  <div className="thongtinnv">
                    <p>Mã nhân viên: <span>{valueNV.maNhanVien}</span></p>
                    <p>Tên nhân viên:<span>{valueNV.tenNhanVien}</span> </p>
                    <p>Email: <span>{valueNV.email}</span></p>
                    <p>Số điện thoại: <span>{valueNV.sdt}</span></p>
                    <p>CMND: <span>{valueNV.cmnd}</span></p>
                    <p>Địa chỉ: <span>{valueNV.diaChi}</span> </p>
                    <p>Giới tính: <span>{valueNV.maNhanVien == true ? "nam": "nữ"} </span></p>
                    <p>Ngày sinh: <span>{ngaySinh}</span> </p>

                  </div>
                </Col>
                <Col span={8}>
                <div className="thongtinnv">
                    <p>Ngày thuê: <span>{ngayThue}</span></p>
                    <p>Ngày làm:  <span>{valueNV.ngayLam}</span></p>
                    <p>Ngày nghỉ: <span>{valueNV.ngayNghi}</span></p>
                    <p>Lương cơ bản: <span>{valueNV.luongCoBan}</span></p>
                    <p>CMND: <span>{valueNV.cmnd}</span></p>
                    <p>Loại nhân viên: <span>{lnv}</span> </p>
                    <p>Mã tài khoản: <span>{valueNV.maTaiKhoan}</span></p>
                  </div>
                </Col>
              </Row>
            </div>

            </Col>
          </Row>
          <Row  justify="space-between" gutter={[16,16]} >
            <Col span={8}>
              <div className="boxChucNang">
              <Link  to=''>
              <CalendarOutlined style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Lịch làm việc</p>
                </Link>

              </div>
            </Col>
            <Col span={8}>
              <div className="boxChucNang">
              <Link  to=''>
              <DollarCircleOutlined style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Chi tiết lương</p>
                </Link>

              </div>
            </Col>
            <Col span={8}>
              <div className="boxChucNang">
                <Link  to=''>
                <BellOutlined style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Tin tức</p>
                </Link>

              </div>
            </Col>
          </Row>

          <Row  justify="space-between" gutter={[16,16]} >
            <Col span={8}>
              <div className="boxChucNang">
              <Link  to='../../admin/dattiec'>
              <EditOutlined  style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Báo cáo</p>
                </Link>

              </div>
            </Col>
            <Col span={8}>
              <div className="boxChucNang">
              <Link  to='../../admin/'>
              <SnippetsOutlined style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Quản lí nhà hàng</p>
                </Link>

              </div>
            </Col>
            <Col span={8}>
              <div className="boxChucNang">
                <Link to=''>
                <BellOutlined style={{fontSize: '100px'}}/>
                <p style={{fontSize: '20px'}}>Nhắc nhở</p>
                </Link>
              </div>
            </Col>
          </Row>

        </div>
      </div>
    </div>
  );
}
