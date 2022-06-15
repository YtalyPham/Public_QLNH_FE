import React, { useState } from "react";
import "../css/styles.css";
import {
  Form,
  Input,
  Button,
  Space,
  message,
  Row,
  Col,
  notification,
  Select,
} from "antd";
import { get, post } from "../../httpHelper";
import PhoneInput from "react-phone-number-input";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import logo from "../img/menu/image2vector.svg";
import { Link } from "react-router-dom";
// import {useNavigate} from 'react-router-dom';
const { Option } = Select;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue={{ value: "84" }} style={{ width: 70 }}>
      <Option value="84">+84</Option>
      <Option value="1">+1</Option>
      <Option value="7">+7</Option>
      <Option value="20">+20</Option>
      <Option value="27">+27</Option>
      <Option value="30">+30</Option>
      <Option value="31">+31</Option>
      <Option value="81">+81</Option>
      <Option value="82">+82</Option>
    </Select>
  </Form.Item>
);

export default function Login() {
  const [value, setValue] = useState();
  const handleCallAPILoginUser = async (e) => {};
  // const navigate = useNavigate();
  const handleAPILogin = async (e) => {
    let phonesdt = e?.sdt + "";
    const numberSdt = phonesdt.slice(1);
    const detailInput = {
      username: numberSdt,
      password: e?.password,
    };
    
    await post(`/api/auth/signin/`, detailInput)
      .then((response) => {
          console.log("Signin",response);
          localStorage.setItem("maTaiKhoan",response?.data?.id);
          localStorage.setItem("phone",response?.data?.username);
          localStorage.setItem("token", response?.data?.accessToken);
          localStorage.setItem("roles", response?.data?.roles);
          openNotification();
        window.location.href = "/User";
        // navigate('/User', {replace: true});
        
         // getKH();
      })
      .catch((err) => {
          console.log(err);
      });
  };
  // const getKH = () => {
  //   const maTK = "" + localStorage.getItem("maTaiKhoan").trim();

  //    get(`/khachhang/mataikhoan/${maTK}`)
  //     .then((response) => {
  //       localStorage.setItem("maKhachHang",response?.data?.maKhachHang);
  //       console.log("maKH",response?.data?.maKhachHang);
        
  //     })
  //     .catch((err) => {
  //       console.log("Err: ", err);
  //     });
  // };
  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Đăng nhập thành công, Chúc một ngày tốt lành !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const logmess = () => {
    console.log("aaa");
  };
  const info = () => {
    message.success("Sucess", [2], logmess);
  };
  const openNotificationFail = () => {
    notification.open({
      message: "Thông báo",
      description: "Đăng nhập thất bại, Hãy thử lại !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  return (
    <div className="bodysignup">
      <div className="pagewrap">
        <div class="loginpage">
          <Space direction="vertical" align="center">
            <Link to="/">
              <img src={logo} />
            </Link>
            <Form align="center" onFinish={handleAPILogin}>
              <Form.Item name="sdt">
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="VN"
                  value={value}
                  onChange={setValue}
                />
              </Form.Item>
              {console.log(value)}
              <Form.Item name="password">
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập với mật khẩu
                </Button>
                <br />
                <a href="#">Quên mật khẩu ?</a>
              </Form.Item>
            </Form>
            <div>
              {" "}
              Bạn chưa có tài khoản?
              <Link to="/signup1">
                <a> Đăng ký ngay!</a>
              </Link>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}
