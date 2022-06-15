import React, { useState } from "react";
import {
  Button,
  message,
  Space,
  Form,
  Select,
  Input,
  Row,
  Col,
  notification,
  Modal,
} from "antd";
import { get, post, del, put } from "../../httpHelper";
import { PhoneOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../img/menu/image2vector.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import firebase from "../../firebase";
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

const selectBefore = (
  <Form.Item
    name="regionprefix"
    noStyle
    rules={[
      {
        required: true,
        message: "Hãy nhập mã vùng điện thoại ",
      },
    ]}
  >
    <Select className="select-before" placeholder="Mã vùng">
      <Option value="+84">+84</Option>
      <Option value="+80">+80</Option>
    </Select>
  </Form.Item>
);
export default function SignUp1() {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const configureCapchar = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Verify");
        },
        defaultCountry: "VN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    configureCapchar();

    const phoneNumber = e;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP have been sent");
        showModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openNotificationFail = () => {
    notification.open({
      message: "Thông báo",
      description: "SĐT đã tồn tại, Hãy thử lại !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const openNotificationOTPFail = () => {
    notification.open({
      message: "Thông báo",
      description: "OTP sai Hãy thử lại !",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const openNotificationOTPSuccess = () => {
    notification.open({
      message: "Thông báo",
      description: "OTP thành công!",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const handleCallAPICheckPhone = async (e) => {
    const userDetails = e;
    let res;
    const phoneNumber = "" + e?.sdt.trim();
    const numberSdt= phoneNumber.slice(1);
    
    await get(`/khachhang/sdt/${numberSdt}`)
        .then((response) => {
            if (response?.data?.data===false) {
                 
                onSignInSubmit("" + e?.sdt.trim());
                localStorage.setItem("phone", numberSdt);
            } else if (response?.data?.data === true) {
                openNotificationFail();
                console.log('SOMETHING WENT WRONG');
            }
            
        })
        .catch((err) => {
            openNotificationFail();
            console.log('Err: ',err);
        });
  };
  const sendPhoneNumber = async (e) => {
    const detailInput = {
      sdt: e?.sdt,
    };
    console.log(detailInput);
    const userDetail = handleCallAPICheckPhone(detailInput);
  };
  const onSubmitOTP = (e) => {
    const code = "" + e?.otp.trim();
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        console.log("In SubmitOTP");
        openNotificationOTPSuccess();
        localStorage.setItem("firebaseUID", result.user.uid);
        window.location.href = "/signup2";
      })
      .catch((error) => {
        console.log(error);
        openNotificationOTPFail();
      });
  };

  return (
    <div className="bodysignup">
      <div className="pagewrap">
        <div className="loginpage">
          <Space direction="vertical" align="center">
            <Link to="/">
              <img src={logo} />
            </Link>
            <Form
              form={form}
              align="center"
              size="middle"
              onFinish={sendPhoneNumber}
              //onFinish={onSignInSubmit}
            >
              <Form.Item name="sign-in-button">
                <div id="sign-in-button"></div>
              </Form.Item>
              <Form.Item
                name="sdt"
                rules={[
                  // {
                  //   pattern: /^[0-9]{10}/,
                  //   message: "Nhập 10 số",
                  // },
                  {
                    required: true,
                    message: "Hãy nhập mã kích hoạt",
                  },
                ]}
              >
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="VN"
                  value={value}
                  onChange={setValue}
                />
              </Form.Item>
              <Form.Item>
                <div>
                  Bằng cách nhấn vào nút đăng ký, bạn đã đồng ý với
                  <a href="#"> các điều khoản đã sử dụng</a>
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" id="sign-in-button">
                  Nhận mã kích hoạt
                </Button>
              </Form.Item>
            </Form>

            <Modal
              title="Cập nhật thông tin"
              visible={isModalVisible}
              okButtonProps={{ disabled: true }}
              onCancel={handleCancel}
              width={450}
              footer={false}
              centered={true}
            >
              <Form name="basic" onFinish={onSubmitOTP} autoComplete="off">
                <Form.Item name="otp" label="Nhập mã OTP">
                  <Input
                    type="number"
                    placeholder="Mã OTP từ điện thoại của bạn"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </div>
      </div>
    </div>
  );
}
