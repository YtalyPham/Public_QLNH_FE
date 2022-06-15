import React, { useState } from "react";
import {
  Space,
  Input,
  Form,
  Select,
  Button,
  Radio,
  Typography,
  Row,
  Col,
  notification
} from "antd";
import { UserOutlined, LockOutlined,SmileOutlined } from '@ant-design/icons';
import { post,get } from '../../httpHelper';
const dateFormat = "DD/MM/YYYY";
const { Title, Text } = Typography;
export default function SignUp2() {
  const [props, setProps] = useState();
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState();
  const [tempsdt, setTempSdt] = useState(localStorage.getItem("phone"));

  const handleRadioValue = (e) => {
    const { name, value } = e.target;
    setRadioValue({ [name]: value });
  };

  const handleCallAPILogin = async (e) => {
    let phonesdt = localStorage.getItem("phone").toString() + "";
    
    const detailInput = {
      username: phonesdt,
      password: e?.password,
    };
    await post(`/api/auth/signin/`, detailInput)
      .then((response) => {
          console.log("Signin",response);
          localStorage.setItem("token", response?.data?.accessToken);
          localStorage.setItem("roles", response?.data?.roles);
          localStorage.setItem("maTaiKhoan", response?.data?.id);
          //getKH(response?.data?.id);
          openNotification();
           window.location.href = "/User";
      })
      .catch((err) => {
          console.log(err);
      });
  }

  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description:
        'Tạo tài khoản thành công, Chúc một ngày tốt lành !',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
   

  const handleCallAPIAddUserDetail = async (e,a) => {
    let phonesdt = localStorage.getItem("phone").toString() + "";
     
    let ngaysinh1= e?.ngaySinh+"T00:00:00.000Z";
    const detailInput = {
        sdt: phonesdt,
        tenKhachHang: e?.tenNguoiDung,
        email: e?.email,
        gioiTinh: e?.gioiTinh=="true"?true:false,
        ngaySinh: ngaysinh1,
        diemTichLuy: 0,
        vangLai: false,
        maHinhAnh: null,
        maTaiKhoan: a,
      };
      await post(`/khachhang/`, detailInput)
      .then((response) => {
          console.log("User",response);
          localStorage.setItem("maKhachHang", response?.data?.maKhachHang);
          handleCallAPILogin(e);
      })
      .catch((err) => {
          console.log(err);
      });
     // console.log("User",detailInput);

  };
  // const getKH = async (e) => {
  //   const maTK = "" + e.trim();

  //   await get(`/khachhang/mataikhoan/${maTK}`)
  //     .then((response) => {
  //       localStorage.setItem("maKhachHang",response?.data?.maKhachHang);
  //       console.log("maKH",response?.data?.maKhachHang);
  //       //window.location.href = "/User";
  //     })
  //     .catch((err) => {
  //       console.log("Err: ", err);
  //     });
  // };

  const handleCallAPIAddAccount = async (e) => {
    let phonesdt = localStorage.getItem("phone").toString() + "";
    const detailInput = {
      username: phonesdt,
      password: e?.password,
      role: ["user"],
      mafirebase: localStorage.getItem("firebaseUID")+"",
    };
    await post(`/api/auth/signup/`, detailInput)
            .then((response) => {
                console.log(response);
                handleCallAPIAddUserDetail(e,response?.data?.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
  };
  return (
    <div className="bodysignup">
      <div className="pagewrap">
        <div className="loginpage">
          <Space direction="vertical" align="center">
            <Form
              form={form}
              align="center"
              onFinish={handleCallAPIAddAccount}
              encType="mu"
            >
              <Form.Item name="sms">
                <p id="confirmSMS">
                  Chào mừng đến với Lucky Center:
                  <br />
                  <Title level={2}>{"+"+localStorage.getItem("phone")}</Title>
                  <br />
                </p>
              </Form.Item>
              <Form.Item
                name="tenNguoiDung"
                rules={[{ required: true, message: "Nhập tên của bạn" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nhập tên bạn muốn hiển thị"
                />
              </Form.Item>
              <Form.Item name="email" rules={[{ type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="gioiTinh" label="Giới tính">
                <Radio.Group onChange={handleRadioValue}>
                  <Radio value="true">Nam</Radio>
                  <Radio value="false">Nữ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="ngaySinh"
                label="Ngày sinh của bạn"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn sinh nhật",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Nhập mật khẩu của bạn",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Nhập lại mật khẩu của bạn!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu không khớp nhau!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </div>
    </div>
  );
}
