import { Button, Form, Input, Row,notification, } from 'antd'
import React from 'react'
import "../css/styles.css"
import {post } from "../../httpHelper";
import PhoneInput from "react-phone-number-input";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import logo from "../img/menu/image2vector.svg";
import { Link } from "react-router-dom";

const FormItem = Form.Item


export default function LoginEmployee() {
  const handleAPILogin = async (e) => {

    let phonesdt = "84" + e?.sdt.slice(1) + "";
    let newstr = phonesdt.replace(/\s/g, '');
    const detailInput = {
      username: newstr,
      password: e?.password,
    };
    console.log(detailInput)
    
    await post(`/api/auth/signin/`, detailInput)
      .then((response) => {
          console.log("Signin",response);
          localStorage.setItem("maTaiKhoan",response?.data?.id);
          localStorage.setItem("phone",response?.data?.username);
          localStorage.setItem("token", response?.data?.accessToken);
          localStorage.setItem("roles", response?.data?.roles);
          openNotification();
          if (response?.data?.roles == "ROLE_ADMIN"){
            window.location.href = "/admin";
          }
          else if (response?.data?.roles == "ROLE_EMPLOYEE"){
            window.location.href = "/hosonhanvien";
          }
          else {
            window.location.href = "/login";
          }
        
      })
      .catch((err) => {
          console.log(err);
      });
  };

  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Đăng nhập thành công, Chúc một ngày tốt lành !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  return (
    <div className="loginform">
          <div className="logoform">
            <span id='logoslogan'>Lucky Center Admin</span>
          </div>
          <Form
          onFinish={handleAPILogin}
            >
            <FormItem name="sdt"  
              rules={[ {
                pattern:
                // /^[(09|03|07|08|05)+([0-9]{8})\b]+$/g,
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                message: "Hãy nhập đúng sđt gồm 10 số",
              },
                { required: true }]}>
                <Input
                  placeholder="Số điện thoại"
                  required
                />
            </FormItem>
              <FormItem name="password" rules={[{ required: true }]} >
              <Input type='password' placeholder="Mật khẩu" required />
              </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </Row>
          </Form>
    </div>
  )
}
