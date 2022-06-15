import React, { useState, useEffect } from "react";
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
  Upload,
  message,
  Table,
  Tag,
  Space,
  AutoComplete,
  Radio,
  Typography,
  Avatar,
  Modal,
  Divider,
  Tooltip,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import moment from "moment";
import { SearchOutlined,RedoOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
export default function AdminThongKe() {
  const [formTheoNgay] = Form.useForm();
  const [valueTKNgay,setValueTKNgay]=useState(0);
  const [formTheoThang] = Form.useForm();
  const [valueTKThang,setValueTKThang]=useState(0);
  const [formTheoNam] = Form.useForm();
  const [valueTKNam,setValueTKNam]=useState(0);
  const [formTheoKhoang] = Form.useForm();
  const [valueTKKhoang,setValueTKKhoang]=useState(0);

  const handleDTTheoNgay = (e) => {
    //console.log("ngaythongke ",e['thongkengay'].format('YYYY-MM-DD'));
    const detailInput={
      ngayLapHoaDon:e['thongkengay'].format('YYYY-MM-DD')+"%"
    }
    console.log("ngaylaphoadon ",detailInput);
    post(`/chitiethoadon/cthdtheongay`, detailInput)
    .then((response) => {
      const detailInput2={
        listid:response?.data?.data
      }
      post(`/chitiethoadon/tinhtongthanhtien/`, detailInput2)
      .then((response) => {
        //console.log("tienngaylaphoadon ",response?.data.data);
        setValueTKNgay(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err thanhtien: ", err);
      });
    })
    .catch((err) => {
      console.log("Err cthdid: ", err);
    });
    
  };

  const reloadTKNgay=()=>{
    formTheoNgay.resetFields();
    setValueTKNgay(0);
  }

  const handleDTTheoThang = (e) => {
    //console.log("thangthongke ",e['thongkethang'].format('YYYY-MM'));
    const detailInput={
      ngayLapHoaDon:e['thongkethang'].format('YYYY-MM')+"%"
    }
    // console.log("ngaylaphoadon ",detailInput);
    post(`/chitiethoadon/cthdtheothang/`, detailInput)
    .then((response) => {
      // console.log("idthang ",response?.data?.data);
      const detailInput2={
        listid:response?.data?.data
      }
      post(`/chitiethoadon/tinhtongthanhtien/`, detailInput2)
      .then((response) => {
        //console.log("tienngaylaphoadon ",response?.data.data);
        setValueTKThang(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err thanhtien: ", err);
      });
    })
    .catch((err) => {
      console.log("Err cthdid: ", err);
    });
     
  };

  const reloadTKThang=()=>{
    formTheoThang.resetFields();
    setValueTKThang(0);
  }

  const handleDTTheoNam = (e) => {
    //console.log("ngaythongke ",e['thongkengay'].format('YYYY-MM-DD'));
    const detailInput={
      ngayLapHoaDon:e['thongkenam'].format('YYYY')+"%"
    }
    // console.log("ngaylaphoadon ",detailInput);
    post(`/chitiethoadon/cthdtheonam/`, detailInput)
    .then((response) => {
      const detailInput2={
        listid:response?.data?.data
      }
      post(`/chitiethoadon/tinhtongthanhtien/`, detailInput2)
      .then((response) => {
        //console.log("tienngaylaphoadon ",response?.data.data);
        setValueTKNam(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err thanhtien: ", err);
      });
    })
    .catch((err) => {
      console.log("Err cthdid: ", err);
    });
  };

  const reloadTKNam=()=>{
    formTheoNam.resetFields();
    setValueTKNam(0);
  }

  const handleDTTheoKhoang = (e) => {
    const detailInput={
      ngaydau:e.thongkekhoang[0].format('YYYY-MM-DD'),
      ngaysau:e.thongkekhoang[1].format('YYYY-MM-DD')

    }
   // console.log("khoanglaphoadon ",detailInput);
    post(`/chitiethoadon/cthdtheokhoang/`, detailInput)
    .then((response) => {
      const detailInput2={
        listid:response?.data?.data
      }
      post(`/chitiethoadon/tinhtongthanhtien/`, detailInput2)
      .then((response) => {
        //console.log("tienngaylaphoadon ",response?.data.data);
        setValueTKKhoang(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err thanhtien: ", err);
      });
    })
    .catch((err) => {
      console.log("Err cthdid: ", err);
    });
  };

  const reloadTKKhoang=()=>{
    formTheoKhoang.resetFields();
    setValueTKKhoang(0);
  }
  const themPhayVaoSo=(e)=>{
    return (e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  return (
    <div>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thống kê doanh thu
      </Divider>
      <div>
        <h3>Thống kê doanh thu theo ngày</h3>
        <Form
          form={formTheoNgay}
          name="formTheoNgay"
          align="left"
          onFinish={handleDTTheoNgay}
        >
             <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => reloadTKNgay()}>
       
                </Button>
            </span>
            <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                Thống kê theo ngày
            </span>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
            name="thongkengay"
            label=""
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngày thống kê!",
              },
            ]}
          >
            <DatePicker
              style={{ float: "left" }}
              showTime
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
          
          >
            <Button type="primary" htmlType="submit">
              Thống kê doanh thu theo ngày
            </Button>
          </Form.Item>
          <span
                style={{ display: 'inline-block', marginLeft:'100px' ,  lineHeight: '32px', textAlign: 'right',fontSize:"20px",fontWeight:"bold" }}
              >
                {valueTKNgay==null?"0":themPhayVaoSo(valueTKNgay)} VNĐ
            </span>
        </Form>
      </div>

      <div>
        <h3>Thống kê doanh thu theo tháng</h3>
        <Form
          form={formTheoThang}
          name="formTheoThang"
          align="left"
          onFinish={handleDTTheoThang}
        >
             <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => reloadTKThang()}>
       
                </Button>
            </span>
            <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                Thống kê theo tháng
            </span>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
            name="thongkethang"
            label=""
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tháng thống kê!",
              },
            ]}
          >
            <DatePicker
              style={{ float: "left" }}
              showTime
              format="YYYY-MM"
              picker="month"
            />
          </Form.Item>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
          
          >
            <Button type="primary" htmlType="submit">
              Thống kê doanh thu theo tháng
            </Button>
          </Form.Item>
          <span
                style={{ display: 'inline-block', marginLeft:'100px' ,  lineHeight: '32px', textAlign: 'right',fontSize:"20px",fontWeight:"bold" }}
              >
                {valueTKThang==null?"0":themPhayVaoSo(valueTKThang)} VNĐ
            </span>
        </Form>
      </div>

      <div>
        <h3>Thống kê doanh thu theo năm</h3>
        <Form
          form={formTheoNam}
          name="formTheoNam"
          align="left"
          onFinish={handleDTTheoNam}
        >
             <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => reloadTKNam()}>
       
                </Button>
            </span>
            <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                Thống kê theo năm
            </span>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
            name="thongkenam"
            label=""
            rules={[
              {
                required: true,
                message: "Vui lòng chọn năm thống kê!",
              },
            ]}
          >
            <DatePicker
              style={{ float: "left" }}
              showTime
              format="YYYY"
              picker="year"
            />
          </Form.Item>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
          
          >
            <Button type="primary" htmlType="submit">
              Thống kê doanh thu theo năm
            </Button>
          </Form.Item>
          <span
                style={{ display: 'inline-block', marginLeft:'100px' ,  lineHeight: '32px', textAlign: 'right',fontSize:"20px",fontWeight:"bold" }}
              >
                {valueTKNam==null?"0":themPhayVaoSo(valueTKNam)} VNĐ
            </span>
        </Form>
      </div>

      <div>
        <h3>Thống kê doanh thu theo khoảng thời gian  (Ngày kết thúc phải sau ngày muốn tìm 1 ngày)</h3>
        <Form
          form={formTheoKhoang}
          name="formTheoKhoang"
          align="left"
          onFinish={handleDTTheoKhoang}
        >
             <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => reloadTKKhoang()}>
       
                </Button>
            </span>
            <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
                Thống kê theo thời gian
            </span>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(30%)' }}
            name="thongkekhoang"
            label=""
            rules={[
              {
                required: true,
                message: "Vui lòng chọn khoảng thống kê!",
              },
            ]}
          >
            <RangePicker 
              style={{ float: "left" }}
            />
          </Form.Item>
          <Form.Item
          style={{ display: 'inline-block', width: 'calc(15%)' }}
          
          >
            <Button type="primary" htmlType="submit">
              Thống kê doanh thu theo thời gian
            </Button>
          </Form.Item>
          <span
                style={{ display: 'inline-block', marginLeft:'100px' ,  lineHeight: '32px', textAlign: 'right',fontSize:"20px",fontWeight:"bold" }}
              >
                {valueTKKhoang==null?"0":themPhayVaoSo(valueTKKhoang)} VNĐ
            </span>
        </Form>
      </div>



    </div>
  );
}
