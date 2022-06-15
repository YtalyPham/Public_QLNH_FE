import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Divider,
  DatePicker,
  Space,
  Select,
  notification,
  Radio,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,
  SmileOutlined,
  UserOutlined,
  MailOutlined,RedoOutlined
} from "@ant-design/icons";
import firebase from "../../firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;
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

export default function AdminNhanVien() {
  const [formOne] = Form.useForm();
  const [formInsert] = Form.useForm();
  const [formOTP] = Form.useForm();
  const [formSDT] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [form] = Form.useForm();
  const [dulieuNV, setDulieuNV] = useState([]);
  const [dataTableNV, setDataTableNV] = useState([]);
  const [modalAddNVAdmin, setModalAddNVAdmin] = useState(false);
  const [modalAddUserAdmin, setModalAddUserAdmin] = useState(false);
  const [modalEditNVAdmin, setModalEditNVAdmin] = useState(false);
  const [modalDetailNVAdmin, setModalDetailNVAdmin] = useState(false);
  const [modalDeleteNVAdmin, setModalDeleteNVAdmin] = useState(false);
  const [isNVDetail, setIsNVDetail] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendOTP, setSendOTP] = useState(true);
  const [isConfirmOTP, setConfirmOTP] = useState(true);
  const [value, setValue] = useState();
  
  // tao tai khoan nhan vien
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
  const openNotificationTaoThanhCong = () => {
    notification.open({
      message: "Thông báo",
      description: "Tạo thành công !",
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
              setSendOTP(false);
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
        setConfirmOTP(false);
        localStorage.setItem("firebaseUID", result.user.uid);
      })
      .catch((error) => {
        console.log(error);
        openNotificationOTPFail();
      });
  };

  // tao nhan vien otp

  // tao moi nhvien modal
  const showAddUserAdmin = () => {
    setModalAddUserAdmin(true);
  };

  const handleCallAPIAdd =(e) => {
    let phonesdt2 = formSDT.getFieldValue('sdt');
    const phonesdt = phonesdt2.slice(1);
    const detailInput = {
      username: phonesdt,
      password: e?.password,
      role: ["employee"],
      mafirebase: localStorage.getItem("firebaseUID")+"",
    };
    console.log(detailInput)
    post(`/api/auth/signup/`, detailInput)
            .then((response) => {
                console.log(response);
                handleCallAPIAddUserDetail(e,response?.data?.data.id);
                handleCallAPIAddUserDetailNV(e,response?.data?.data.id);
            })
            .catch((err) => {
                console.log(err);
            });
  };

  const handleCallAPIAddUserDetail =(e,a) => {
    let phonesdt2 = formSDT.getFieldValue('sdt');
    const phonesdt = phonesdt2.slice(1);
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

      post(`/khachhang/`, detailInput)
      .then((response) => {
          console.log("KhacHang",response);
      })
      .catch((err) => {
          console.log(err);
      });

  };
  const handleCallAPIAddUserDetailNV = (e,a) => {
    let phonesdt2 = formSDT.getFieldValue('sdt');
    const phonesdt = phonesdt2.slice(1);
     
    let ngaysinh1= e?.ngaySinh+"T00:00:00.000Z";
    let ngayThue1= e?.ngaythue+"T00:00:00.000Z";

      const detailInputNV = {
        tenNhanVien: e?.tenNguoiDung,
        email: e?.email,
        sdt: phonesdt,
        cmnd: e?.cmnd,
        diaChi: e?.diachi,
        gioiTinh: e?.gioiTinh=="true"?true:false,
        ngaySinh: ngaysinh1,
        ngaythue: ngayThue1,
        ngayLam: 0,
        ngayNghi: 0,
        luongCoBan: 0,
        maHinhAnh: 5,
        maLoaiNhanVien: 1,
        maTaiKhoan: a,
      };
      console.log("NhanVien",detailInputNV);

      post(`/nhanvien/`, detailInputNV)
      .then((response) => {
          console.log("NhanVien",response);
          openNotificationTaoThanhCong();
          window.location.reload(false);
      })
      .catch((err) => {
          console.log(err);
      });
      
  };
  
  //

  const columnsNV = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "tennhanvien",
      key: "tennhanvien",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Nhập tên nhân viên cần tìm"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.tennhanvien.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tennhanvien.localeCompare(b.tennhanvien),
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      sorter: (a, b) => a.sdt - b.sdt,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    const _data = dulieuNV?.map((item, index) => ({
      stt: index + 1,
      tennhanvien: item?.tenNhanVien,
      email: item?.email,
      sdt: item?.sdt,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailNhanVienAdmin(item?.maNhanVien)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteNhanVienAdmin(item?.maNhanVien)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditNhanVienAdmin(item)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableNV(_data);
  }, [dulieuNV]);

  useEffect(() => {
    fetchNV();
    
  }, []);

  const fetchNV = async (e) => {
    await get(`/nhanvien/`)
      .then((response) => {
        setDulieuNV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailNVAdmin = async (e) => {
    await get(`/nhanvien/${e}`)
    .then((response) => {
      setIsNVDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailNhanVienAdmin = async (e) => {
    handleDetailNVAdmin(e);
    setModalDetailNVAdmin(true);
  };

  const handleDeleteNVAdmin = async (e) => {
    const nldel=localStorage.getItem("idnldel");
    await del(`/nhanvien/${nldel}`)
    .then((response) => {
      localStorage.removeItem("idnldel");
      setModalDeleteNVAdmin(false);
      window.location.reload(false);
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


  const handleUpdateNVAdmin = async (e) => {
    
    const nvput=localStorage.getItem("idnvput");
    const matkput=localStorage.getItem("idmataikhoan");
    const malnvput=localStorage.getItem("idmaloainhanvien");
    const detailInput = {
       maNhanVien: nvput,
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
       maLoaiNhanVien: parseInt(malnvput),  
       maTaiKhoan: parseInt(matkput),

       ghiChu: e?.ghichu,
      };
    localStorage.removeItem("idnvput");
    await put(`/nhanvien/`,detailInput)
    .then((response) => {
       
       console.log("updatesuccess",response?.data?.data);
     localStorage.removeItem("idnvput");
      setModalEditNVAdmin(false);
      window.location.reload(false);
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteNhanVienAdmin = async (e) => {
    localStorage.setItem("idnldel", e);
    setModalDeleteNVAdmin(true);

    
  };
  
  const showEditNhanVienAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailNVAdmin(e?.maNhanVien);
    localStorage.setItem("tennv",e?.tenNhanVien);
    localStorage.setItem("idmataikhoan", e?.maTaiKhoan);
    localStorage.setItem("idmaloainhanvien", e?.maLoaiNhanVien);
    localStorage.setItem("idnvput", e?.maNhanVien);

    setModalEditNVAdmin(true);
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Nhân viên
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchNV()}></Button>
      <Button type="primary" onClick={showAddUserAdmin}>
      Tạo mới nhân viên
          </Button>
      <Modal
          title="Thêm nhân viên"
          visible={modalAddUserAdmin}
          // okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          // onOk={formInsert.submit}
          // okText="Thêm"
          // cancelText="Hủy"
          onCancel={() => setModalAddUserAdmin(false)}
          footer={null}
          width={550}
          
        >
         <Form 
          form={formSDT}
          name="formsdt"
          align="center"
          onFinish={sendPhoneNumber}>
            <Form.Item name="sign-in-button">
              <div id="sign-in-button"></div>
            </Form.Item>
            <Form.Item
              name="sdt"
              rules={[{ required: true, message: "Nhập sdt của bạn" }]}
            >
              <PhoneInput
                defaultCountry="VN"
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </Form.Item>
            <Form.Item>
                                <Button onClick={sendPhoneNumber} type="primary" htmlType="submit" id="sign-in-button">
                                    Nhận mã kích hoạt
                                </Button>
                            </Form.Item>
            </Form>
            <Form 
            hidden={isSendOTP}
          form={formOTP}
          name="basic"
           onFinish={onSubmitOTP} 
           autoComplete="off">
                                <Form.Item name="otp" label="Nhập mã OTP">
                                    <Input
                                        type="number"
                                        placeholder="Mã OTP từ điện thoại của bạn"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button  onClick={onSubmitOTP} type="primary" htmlType="submit">
                                        Xác nhận
                                    </Button>
                                </Form.Item>
                            </Form>

          <Form
          id='insertuser'
          hidden={isConfirmOTP}
          form={formInsert}
          name="insert"
          align="center" 
          onFinish={handleCallAPIAdd}>
            <Form.Item
              name="tenNguoiDung"
              rules={[
                {
                  pattern:
                  /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                  message: "Không nhập kí tự đặt biệt hoặc số",
                },
                { required: true, message: "Nhập tên của bạn" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nhập tên bạn muốn hiển thị"
              />
            </Form.Item>
            <Form.Item name="email" rules={[{ type: "email" }]}>
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Nhập email"/>
              </Form.Item>
              <Form.Item name="cmnd" >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Số cmnd"/>
              </Form.Item>
              <Form.Item name="diachi">
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Địa chỉ"/>
              </Form.Item>
            <Form.Item name="gioitinh" label="Giới tính">
              <Radio.Group defaultValue="Male">
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
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
              <input type="date"></input>
            </Form.Item>
            <Form.Item
              name="ngaythue"
              label="Ngày thuê của bạn"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ngày thuê",
                },
              ]}
            >
              <input type="date"></input>
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
                                <Button type="primary" htmlType="submit" id="sign-in-button">
                                    Xác nhận tạo nhân viên
                                </Button>
                            </Form.Item>
          </Form>

        </Modal>
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsNV} dataSource={dataTableNV} />

      <Modal
          title="Xóa nhân viên"
          visible={modalDeleteNVAdmin}
          onCancel={() => setModalDeleteNVAdmin(false)}
          width={600}
          onOk={handleDeleteNVAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa nhân viên ?</h1>
      </Modal>

      <Modal
        title="Chi tiết nhân viên"
        visible={modalDetailNVAdmin}
        onCancel={() => setModalDetailNVAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã nhân viên: {isNVDetail?.maNhanVien}</h3>

          <h3>Tên nhân viên: {isNVDetail?.tenNhanVien}</h3>

          <h3>Email: {isNVDetail?.email}</h3>

          <h3>Số điện thoại: {isNVDetail?.sdt}</h3>

          <h3>CMND: {isNVDetail?.cmnd}</h3>

          <h3>Giới tính: {isNVDetail?.gioiTinh == true ? "nam" : "nữ"}</h3>
         
          <h3>Ngày sinh: {isNVDetail?.ngaySinh}</h3>

          <h3>Ngày làm: {isNVDetail?.ngayLam}</h3>

          <h3>Ngày thuê: {isNVDetail?.ngayThue}</h3>

          <h3>Ngày nghỉ: {isNVDetail?.ngayNghi}</h3>

          <h3>
            Lương cơ bản:
            {isNVDetail?.luongCoBan == null ? " " : isNVDetail?.luongCoBan + " VNĐ"}
          </h3>

        </div>
      </Modal>
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
                  placeholder={isNVDetail?.tenNhanVien}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email",required: true, message: "Nhập email nhân viên" }]}
              >
                <Input
                  placeholder={isNVDetail?.email}
                />
              </Form.Item>
              <Form.Item
                name="sdt"
                label="Số điện thoại"
                rules={[ {
                  pattern:
                  // /^[(09|03|07|08|05)+([0-9]{8})\b]+$/g,
                  /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  message: "Hãy nhập đúng sđt gồm 10 số",
                },
                  { required: true }]}
              >
                <Input
                  placeholder={isNVDetail?.sdt}
                />
              </Form.Item>
              <Form.Item
                name="cmnd"
                label="Số chứng minh"
                rules={[{ required: true, message: "Nhập số chứng minh nhân viên" }]}
              >
                <Input
                  placeholder={isNVDetail?.cmnd}
                />
              </Form.Item>
              <Form.Item
                name="diachi"
                label="Địa chỉ"
                rules={[{ required: true, message: "Nhập địa chỉ nhân viên" }]}
              >
                <Input
                  placeholder={isNVDetail?.diaChi}
                />
              </Form.Item>
              <Form.Item name="gioitinh" label="Giới tính">
              <Radio.Group defaultValue="Male">
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
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD"/>
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
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              name="ngaylam"
              label="Ngày làm"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày làm của nhân viên",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập ngày làm"
                  />
              </Form.Item>
              <Form.Item
              name="ngaynghi"
              label="Ngày nghỉ"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày nghỉ của nhân viên",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập ngày nghỉ"
                  />
              </Form.Item>
              <Form.Item
              name="luongcoban"
              label="Lương cơ bản"
              rules={[
                  {
                    required: true,
                    message: "Nhập lương cơ bản của nhân viên",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập lương cơ bản"
                  />
              </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
