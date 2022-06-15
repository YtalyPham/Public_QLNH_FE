import React, {useState} from 'react';
import ReactMapGL from 'react-map-gl';

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
  DatePicker,
  Upload, message,
  Table, Tag, Space,
  AutoComplete,
  Radio, 
} from 'antd';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 0 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
  },
};
export default function Lienhe() {
  const [viewport, setViewport] = useState({
    width: "fit",
    height: "fit",
    latitude: 21.0244246,
    longitude: 105.7938072,
    zoom: 16,
  })

  const [value, setValue] = React.useState(1);

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div>
      <div className='bannerchucnang'>
          <h1 className='titlemenu'>Liên hệ</h1>
      </div>
      <div className='clr'></div>
      <div className='contact'>
        <div className='pagewrap'>
          <div className='infolienhe'>
            <div className='landing'>
            <h5 class="sub-color">
					TRUNG TÂM HỘI NGHỊ TIỆC CƯỚI LUCKY CENTER</h5>
          <table text-align='left' width="100%">
              <tbody>
                <tr>
                  <td width="120px">Địa Chỉ</td>
                  <td>: 
                  9999 Trường Chinh, Quận Tân Bình, Thành phố Hồ Chí minh</td>
                </tr>
                <tr>
                  <td>Điện thoại</td>
                  <td>: 0938697116
                </td>
                </tr>
                <tr>
                  <td>Fax</td>
                  <td>: (+84) 999 999 999</td>
                </tr>
                            <tr>
                  <td>Email</td>
                  <td>: <a href="mailto:uckypalace@gmail.com">luckypalace@gmail.com</a></td>
                </tr>
                            <tr>
                  <td>Facebook</td>
                  <td>: <a href="https://facebook.com/luckycenter" target="_blank">https://facebook.com/luckycenter</a></td>
                </tr>
                          </tbody>
            </table>
            </div>
          </div>
          <div className='guilienhe'>
          <Form
            {...formItemLayout}
            form={form}
            name="capnhat"
            onFinish={onFinish}
            scrollToFirstError
          >

          <Form.Item
              name="address"
              label="Họ tên:"
              tooltip="What do you want others to call you?"
              rules={[{ required: true, message: 'Nhập họ tên!', whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Nhập sai E-mail!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập SDT!' }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="intro"
              label="Nội dung"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
            >
              <Input.TextArea showCount maxLength={500} />
            </Form.Item>

              <Button  className='buttonnew' type="primary" htmlType="submit">
                GỬI ĐI
              </Button>

          </Form>
          </div>
        </div>
      </div>
      <div className='clr'></div>
      <div class='mapbox'>
        <div className='pagewrap'>
        <div id='mapbox'>
          <ReactMapGL
              { ... viewport}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => setViewport(viewport)}
              mapboxAccessToken="pk.eyJ1IjoiZG9hbnRvdG5naGllcDExMyIsImEiOiJjbDFzbmx3bGYxMWpkM2hwdDN4ZHFvNDQ5In0._MA3dd-zADa5W5Io4h-xnA"
            />
            
  </div>
  </div>
    </div>
    <div className='clr'></div>
    </div>
  )
}
