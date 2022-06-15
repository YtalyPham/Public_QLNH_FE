import React, { useState } from 'react';
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
} from 'antd';
const { TabPane } = Tabs;

const { RangePicker } = DatePicker;
const { Option } = Select;
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};
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



export default function () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDonDat, setDonDat] = useState(
      {tenKhachHang: "",
      email: "",
      sdt: "",
      soban: "",
      lichhen: "",
      ngaydattiec: "",
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState();
  const operations = <Button onClick={() => setTab(null)} >Hủy</Button>;

  const [form] = Form.useForm();

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  const onFinish = (e) => {
    console.log('Received values of form: ', e);

    const detailInput = {
      tenKhachHang: e?.name,
      email: e?.email,
      sdt: e?.phone,
      soban: e?.soban,
      lichhen: e['lichhen'].format('YYYY-MM-DD HH:mm:ss'),
      ngaydattiec: e['ngaydattiec'].format('YYYY-MM-DD HH:mm:ss'),
      note: e?.note,
      buoidattiec: e?.buoidattiec,
      loaihinh: e?.loaihinh,
      sanhtiec: e?.sanhtiec,
      dichvu: e?.dichvu,
      setthucdon: e?.setthucdon,
      thucuong1: e?.thucuong1,
      thucuong2: e?.thucuong2,
      giatien: e?.giatien,
      monkhaivi: e?.monkhaivi,
      monchinh1: e?.monchinh1,
      monchinh2: e?.monchinh2,
      monchinh3: e?.monchinh3,
      monchinh4: e?.monchinh4,
      montrangmieng: e?.montrangmieng,
    };

    setDonDat(detailInput);

    console.log('day ne:', Object.values(detailInput));

    setIsModalVisible(true);
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
  return (
    <div style={{marginTop: "74px"}}>
      <div className='slogan'style={{padding: "20px 0"}} ><span>ĐẶT TIỆC NHÀ HÀNG</span></div>
      <p style={{marginBottom: "29px"}} >Quý khách vui lòng điền thông tin vào mẫu dưới đây chúng tôi sẽ liên hệ trong thời gian sớm nhất nhé.</p>
      <div className='Dattiecform'>
        <div className='pagewrap'>
          <Form
            {...formItemLayout}
            
            form={form}
            name="dactiec"
            onFinish={onFinish}
            initialValues={{
              prefix: '84',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên',
                },
              ]}
            >
              <Input id='hovaten' />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Email không đúng định dạng',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <Form.Item
              name="soban"
              label="Số bàn dự kiến"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số  bàn!',
                },
              ]}
            >
                <InputNumber style={{float: 'left'}} min={1} max={500} />
            </Form.Item>

            <Form.Item name="lichhen" label="Lịch hẹn" {...config}
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Vui lòng nhập lịch hẹn!',
                },
              ]}>
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item  name="ngaydattiec" label="Ngày đặt tiệc" {...config}
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Vui lòng nhập lịch hẹn!',
                },
              ]}>
              <DatePicker style={{float: 'left'}} showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item
              name="note"
              label="Ghi chú thêm cho nhà hàng"
              rules={[
                {
                  required: true,
                  message: 'Please input Intro',
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item label="Buổi đặt tiệc" style={{ marginBottom: 0 }}>
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
                <Select placeholder="Chọn buổi">
                  <Option value="trua">Trưa</Option>
                  <Option value="toi">Tối</Option>
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
                  <Option value="tieccuoi">Tiệc cưới</Option>
                  <Option value="hoinghi">Hội nghị</Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item label="Sảnh tiệc" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{ float: 'left', display: 'inline-block', width: 'calc(30% - 12px)' }}
                name="sanhtiec"
                label=""
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn buổi!',
                  },
                ]}
              >
                <Select placeholder="Chọn sảnh tiệc">
                  <Option value="king">King</Option>
                  <Option value="queen">Queen</Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item 
              name="dichvu"
              label="Chọn dịch vụ">
              <Checkbox.Group style={{float: 'left' }} >
                <Row>
                  <Col span={8}>
                    <Checkbox value="mc" style={{ lineHeight: '32px', float: 'left' }}>
                      MC
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="mua" style={{ lineHeight: '32px', float: 'left'  }} >
                      Múa
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="conghoa" style={{ lineHeight: '32px', float: 'left'  }}>
                      Cổng hoa
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="xehoa" style={{ lineHeight: '32px', float: 'left'  }}>
                      Xe hoa
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="bannhac" style={{ lineHeight: '32px' , float: 'left' }}>
                      Ban nhạc
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="khukiniem" style={{ lineHeight: '32px', float: 'left'  }}>
                      Khu kỉ niệm
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              
              label="Xem thực đơn"
            >
              <Button style={{float: 'left', background: "#e5cc5f", borderColor: "#e5cc5f"}} type="primary" onClick={() => setVisible(true)} >Xem thực đơn các món nhà hàng</Button>
              <Image.PreviewGroup 
                preview={{
                  visible,
                  onVisibleChange: value => {
                    setVisible(value);
                  },
                }}
              >
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src="https://innhanh24h.net/wp-content/uploads/2018/07/Thuc-don-nha-hang-tiec-cuoi-2.png"
                  
                />
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src="https://innhanh24h.net/wp-content/uploads/2018/07/Thuc-don-nha-hang-tiec-cuoi-4.jpg"
                  
                />
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src="https://marketplace.canva.com/EAD74NKo1r4/1/0/1236w/canva-trang-tr%C3%AD-t%C3%ADm-%C4%91%E1%BA%ADm-v%C3%A0-v%C3%A0ng-nh%E1%BA%A1t-sang-tr%E1%BB%8Dng-%C4%91%C3%A1m-c%C6%B0%E1%BB%9Bi-th%E1%BB%B1c-%C4%91%C6%A1n-6k2sDDEq2nM.jpg"
                  
                />
              </Image.PreviewGroup>

            </Form.Item>

            
            <Form.Item {...tabFormItemLayout} style={{border: "1px #e4e4e4 solid"}}>
              <Tabs type="card" tabBarExtraContent={operations}>
                
                <TabPane tab="Chọn menu" disabled={tab === 1} key="1">
                  <Form.Item label="Chọn set thực đơn" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{ float: 'left', display: 'inline-block', width: 'calc(30% - 12px)' }}
                      name="setthucdon"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn set thực đơn!',
                        },
                      ]}
                    >
                      <Select placeholder="Set thực đơn" id='setthucdon' value={'set1'}>
                        <Option value="set1">Thực đơn 1</Option>
                        <Option value="set2">Thực đơn 2</Option>
                      </Select>
                    </Form.Item>
                    <span
                      style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                    >
                      Thức uống:
                    </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}
                      name="thucuong1"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn thức uống!',
                        },
                      ]}
                    >
                      <Select placeholder="Thức uống">
                        <Option value="nuocngot">Nước ngọt</Option>
                        <Option value="soda">Soda</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                  <div style={{width:"50%",border: "1px #e4e4e4 solid" ,margin: "auto", marginBottom: "20px"}}>
                    <p>Thông tin set thực đơn:</p>
                    <p>Món khai vị:</p>
                    <p>Món chính 1:</p>
                    <p>Món chính 2:</p>
                    <p>Món chính 3:</p>
                    <p>Món chính 4:</p>
                  </div>
                  <Form.Item >
                    <Button  onClick={() => {setTab(2);}}  type="primary" htmlType="button" style={{background: "#e5cc5f", borderColor: "#e5cc5f"}}>
                      xác nhận
                    </Button>
                  </Form.Item>
                  
                  
                </TabPane>
                <TabPane disabled={tab==2} tab="Chọn từ thực đơn"  key="2">
                <Form.Item
                      
                      name="giatien"
                      label="Chọn giá tiền bàn tiệc"
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn giá tiền!',
                        },
                      ]}
                    >
                      <Select placeholder="Chọn giá tiền">
                        <Option value="2000000">2.000.000 VND</Option>
                        <Option value="2500000">2.500.000 VND</Option>
                        <Option value="3000000">3.000.000 VND</Option>
                        <Option value="3500000">3.500.000 VND</Option>
                        <Option value="4000000">4.000.000 VND</Option>
                        <Option value="4500000">4.500.000 VND</Option>
                      </Select>
                    </Form.Item>
                <h2>THỰC ĐƠN CỦA BẠN LÀ</h2>
                <Form.Item label="" style={{ marginBottom: 0 }}>
                <span
                  style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                >
                  Món khai vị:
                </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                      name="monkhaivi"
                      label=""
                      rules={[
                        {
                        
                          message: 'Vui lòng chọn món khai vị!',
                        },
                      ]}
                    >
                      <Select placeholder="Món khai vị">
                        <Option value="sup">Súp</Option>
                        <Option value="chao">Cháo</Option>
                      </Select>
                    </Form.Item>
                    <span
                      style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                    >
                      Món chính 1:
                    </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                      name="monchinh1"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn món chính 1!',
                        },
                      ]}
                    >
                      <Select placeholder="Món chính 1">
                        <Option value="comchien">Cơm chiên</Option>
                        <Option value="comumuoi">Cơm ủ muối</Option>
                      </Select>
                    </Form.Item>
                    
                  </Form.Item>
                  <Form.Item style={{marginBottom: 0}}>
                    <span
                        style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                      >
                        Món chính 2:
                      </span>
                      <Form.Item
                        style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                        name="monchinh2"
                        label=""
                        rules={[
                          {
                            
                            message: 'Vui lòng chọn món chính 2!',
                          },
                        ]}
                      >
                        <Select placeholder="Món chính 2">
                          <Option value="cuarangme">Cua rang me</Option>
                          <Option value="cuachienme">Cua chiên me</Option>
                        </Select>
                      </Form.Item>
                      <span
                  style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                >
                  Món chính 3:
                </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                      name="monchinh3"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn món chính 3!',
                        },
                      ]}
                    >
                      <Select placeholder="Món chính 3">
                        <Option value="galuoc">Gà luộc</Option>
                        <Option value="ganuong">Gà nướng</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="" style={{ marginBottom: 0 }}>
                
                    <span
                      style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                    >
                      Món chính 4:
                    </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                      name="monchinh4"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn món chính 4!',
                        },
                      ]}
                    >
                      <Select placeholder="Món chính 4">
                        <Option value="lauchuahai">Lẩu chua hải</Option>
                        <Option value="laucayhai">Lẩu cay hải</Option>
                      </Select>
                    </Form.Item>
                    <span
                      style={{ display: 'inline-block', padding: '0 10px 0 30px', lineHeight: '32px', textAlign: 'center' }}
                    >
                      Tráng miệng:
                    </span>
                    <Form.Item
                      style={{ display: 'inline-block', width: 'calc(20% - 12px)' }}
                      name="montrangmieng"
                      label=""
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn món tráng miệng!',
                        },
                      ]}
                    >
                      <Select placeholder="Món tráng miệng">
                        <Option value="traicaynhietdoi">Trái cây nhiệt đới</Option>
                        <Option value="raucau">Rau câu</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      style={{margin:'auto', width: 'calc(50% - 12px)' }}
                      name="thucuong2"
                      label="Chọn thức uống"
                      rules={[
                        {
                          
                          message: 'Vui lòng chọn thức uống!',
                        },
                      ]}
                    >
                      <Select placeholder="Chọn thức uống">
                        <Option value="nuocngot">Nước ngọt</Option>
                        <Option value="soda">Soda</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="chacchan"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Phái đồng ý tạo đơn')),
                        },
                      ]}
                    >
                      <Checkbox>
                        Tôi chắc chắn muốn dùng thực đơn đã tạo
                      </Checkbox>
                    </Form.Item>
                    <Form.Item >
                      <Button style={{background: "#e5cc5f", borderColor: "#e5cc5f"}} onClick={() => {
                        setTab(1);
                      }} type="primary" htmlType="button">
                        xác nhận
                      </Button>
                    </Form.Item>
                  </Form.Item>
                </TabPane>
              </Tabs>
            </Form.Item>

            

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Phái đồng ý đặt tiệc')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                Tôi đồng ý với <a href="">điều khoản</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{background: "#e5cc5f", borderColor: "#e5cc5f"} }type="primary" htmlType="submit">
                Gửi xác nhận đặt tiệc
              </Button>
            </Form.Item>
          </Form>
          <Modal title="Xác nhận lại thông tin đặt tiệc" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Họ và tên: {isDonDat.tenKhachHang}</p>
            <p>Email: {isDonDat.email}</p>
            <p>Số điện thoại: {isDonDat.sdt}</p>
            <p>Số bàn: {isDonDat.soban}</p>
            <p>Lịch hẹn: {isDonDat.lichhen}</p>
            <p>Ngày đặt tiệc: {isDonDat.ngaydattiec}</p>
            <p>Note: {isDonDat.note}</p>
            <p>Buổi đặt tiệc: {isDonDat.buoidattiec}</p>
            <p>Loại hình: {isDonDat.loaihinh}</p>
            <p>Sảnh tiệc: {isDonDat.sanhtiec}</p>
            <p>Dịch vụ: {isDonDat.dichvu}</p>
            <p>Set thực đơn: {isDonDat.setthucdon}</p>
            <p>Thức uống 1: {isDonDat.thucuong1}</p>
            <p>Thức uống 2: {isDonDat.thucuong2}</p>
            <p>Giá tiền : {isDonDat.giatien}</p>
            <p>Món khai vị: {isDonDat.monkhaivi}</p>
            <p>Món chính 1: {isDonDat.monchinh1}</p>
            <p>Món chính 2: {isDonDat.monchinh2}</p>
            <p>Món chính 3: {isDonDat.monchinh3}</p>
            <p>Món chính 4: {isDonDat.monchinh4}</p>
            <p>Món tráng miệng: {isDonDat.montrangmieng}</p>

          </Modal>
        </div>
      </div>
    </div>
  )
}
