import React,{ useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Divider, Card, Avatar,Input,Button,Table,Form,DatePicker } from 'antd';
import {
  UserOutlined,SearchOutlined,RedoOutlined,WarningOutlined,ClockCircleOutlined,CheckCircleOutlined
} from '@ant-design/icons';
import { post, get, del, put } from "../../httpHelper";
import moment from 'moment';
const { Meta } = Card;


export default function AdminMainContent() {
  const [dulieuPDT, setDulieuPDT] = useState([]);
   
  const [formTheoNgay] = Form.useForm();
  const [valueLHSK, setValueLHSK] = useState([]);
  const [valueST, setValueST] = useState([]);
  
  const [dataTablePDT, setDataTablePDT] = useState([]);
  const [demPDTdaTT,setDemPDTdaTT]=useState("-1");
  const [demPDTchuaTT,setDemPDTchuaTT]=useState("-1");
  const [demPDTTrongHomNay,setDemPDTTrongHomNay]=useState("-1");
  const [demSlNhanVien,setDemSlNhanVien]=useState("-1");
  const columnsPDT = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ngày tổ chức",
      dataIndex: "ngaytochuc",
      key: "ngaytochuc",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              
              placeholder="Nhập ngày tổ chức cần tìm"
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
        return record.ngaytochuc.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Số bàn",
      dataIndex: "soban",
      key: "soban",
      sorter: (a, b) => a.soban - b.soban,
    },
    {
      title: "Buổi tổ chức",
      dataIndex: "buoi",
      key: "buoi",
      sorter: (a, b) => a.buoi.localeCompare(b.buoi),
    },
    {
      title: "Loại hình sự kiện",
      dataIndex: "loaihinhsukien",
      key: "loaihinhsukien",
      sorter: (a, b) => a.loaihinhsukien.localeCompare(b.loaihinhsukien),
    },
    {
      title: "Sảnh tiệc",
      dataIndex: "sanhtiec",
      key: "sanhtiec",
      sorter: (a, b) => a.sanhtiec.localeCompare(b.sanhtiec),
    },
    {
      title: "Vị trí",
      dataIndex: "vitri",
      key: "vitri",
      sorter: (a, b) => a.vitri.localeCompare(b.vitri),
    },
   
  ];

  useEffect(() => {
    if(dulieuPDT=="false"){
      setDataTablePDT(null);
    }else{
      const _data = dulieuPDT?.map((item, index) => ({
      stt: index + 1,
      ngaytochuc: (item?.ngayToChuc).slice(0, 10),
      loaihinhsukien: (valueLHSK?.find(
        (e) => e?.maLoaiHinhSuKien === item?.maLoaiHinhSuKien
      )).tenLoaiHinhSuKien,
      soban: item?.soLuongBan,
      buoi: item?.buoi == "TOI" ? "Tối" : "Trưa",
      sanhtiec: (valueST?.find(
        (e) => e?.maSanhTiec === item?.maSanhTiec
      )).tenSanhTiec,
      vitri: (valueST?.find(
        (e) => e?.maSanhTiec === item?.maSanhTiec
      )).viTri,
      
     
    }));
    setDataTablePDT(_data);}
    
  }, [dulieuPDT]);

  useEffect(() => {
    fetchLHSK();
    handleDemPDTchuaTT();
    handleDemPDTdaTT();
    handleDemPDTHomNay();
    handleDemSlNhanVien();
    fetchNV();
  }, []);

  const fetchNV = async (e) => {
    const maTK = "" + localStorage.getItem("maTaiKhoan").trim();

    await get(`/nhanvien/mataikhoan/${maTK}`)
      .then((response) => {
         
        // console.log(response?.data?.data.maKhachHang);
        localStorage.setItem("maNhanVien", response?.data?.data.maNhanVien);

        
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchPDT = async (e) => {
    formTheoNgay.resetFields();
    await get(`/phieudattiec/listdathanhtoan/`)
      .then((response) => {
         
        setDulieuPDT(response?.data?.data);
        
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getPDTHomNay = (e) => {
    formTheoNgay.resetFields();
    const detailInput={
      ngayLapHoaDon:moment().format('YYYY-MM-DD')+"%",
    }
    post(`/phieudattiec/mapdttheongaytochuc/`,detailInput)
      .then((response) => {
         const detailInput2={
           listid:response?.data?.data,
         }
        post(`/phieudattiec/getpdttheolistmapdt/`,detailInput2)
        .then((response) => {
           
          setDulieuPDT(response?.data?.data);
          
        })
        .catch((err) => {
          console.log("Err getlistpdt: ", err);
        });
        
      })
      .catch((err) => {
        console.log("Err getmapdt: ", err);
      });
  };

  const fetchLHSK = async (e) => {
    await get(`/loaihinhsukien/`)
      .then((response) => {
        setValueLHSK(response?.data?.data);
        fetchST();
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchST = (e) => {
    get(`/sanhtiec/`)
      .then((response) => {
        setValueST(response?.data?.data);
        getPDTHomNay();
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handlePDTTheoNgay =(e)=>{
    const detailInput={
      ngayLapHoaDon:e['thongkengay'].format('YYYY-MM-DD')+"%"
    }
    post(`/phieudattiec/mapdttheongaytochuc/`,detailInput)
      .then((response) => {
         const detailInput2={
           listid:response?.data?.data,
         }
         post(`/phieudattiec/getpdttheolistmapdt/`,detailInput2)
        .then((response) => {
           
          setDulieuPDT(response?.data?.data);
          
        })
        .catch((err) => {
          console.log("Err getlistpdt: ", err);
        });
        
      })
      .catch((err) => {
        console.log("Err getmapdt: ", err);
      });
  }

  const handleDemPDTchuaTT = (e) => {
    get(`/phieudattiec/dempdtchuatt/`)
      .then((response) => {
        // console.log("chuatt",response?.data?.data+"");
        setDemPDTchuaTT(response?.data?.data+"");
         
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleDemPDTdaTT = (e) => {
    get(`/phieudattiec/dempdtdatt/`)
      .then((response) => {
        
        setDemPDTdaTT(response?.data?.data+"");
         
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleDemPDTHomNay = (e) => {
    const detailInput={
      ngayLapHoaDon: moment().format('YYYY-MM-DD')+"%",
    }
    post(`/phieudattiec/dempdthomnay/`,detailInput)
      .then((response) => {
        
        setDemPDTTrongHomNay(response?.data?.data+"");
         
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleDemSlNhanVien = (e) => {
    
    get(`/nhanvien/demslnhanvien/`)
      .then((response) => {
         
        setDemSlNhanVien(response?.data?.data+"");
         
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const themPhayVaoSo=(e)=>{
    return (e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
        <Card  title="" ava bordered={true} style={{ width: 300 }}>
          <Meta
            avatar={<ClockCircleOutlined style={{fontSize: "70px"}}/>}
            title="Bữa tiệc hôm nay"
            description={demPDTTrongHomNay}
            style={{fontSize: "30px", textAlign:"center", fontWeight:"bold"}}
          />
        </Card>
        </Col>
        <Col className="gutter-row" span={6}>
        <Card  title="" ava bordered={true} style={{ width: 300 }}>
          <Meta
            avatar={<WarningOutlined style={{fontSize: "70px"}}/>}
            title="Đơn chưa xử lý"
            description={demPDTchuaTT}
            style={{fontSize: "30px", textAlign:"center", fontWeight:"bold"}}
          />
        </Card>
        </Col>
        <Col className="gutter-row" span={6}>
        <Card  title="" ava bordered={true} style={{ width: 300 }}>
          <Meta
            avatar={<CheckCircleOutlined  style={{fontSize: "70px"}}/>}
            title="Đơn đã thanh toán"
            description={demPDTdaTT}
            style={{fontSize: "30px", textAlign:"center", fontWeight:"bold"}}
          />
        </Card>
        </Col>
        <Col className="gutter-row" span={6}>
        <Card  title="" ava bordered={true} style={{ width: 300 }}>
          <Meta
            avatar={<UserOutlined style={{fontSize: "70px"}}/>}
            title="Tổng nhân viên"
            description={demSlNhanVien}
            style={{fontSize: "30px", textAlign:"center", fontWeight:"bold"}}
          ></Meta>
        </Card>
        </Col>
      </Row>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>Những Bữa Tiệc tổ chức trong ngày hôm nay</Divider>
      <div className="site-button-admin-maincontent-wrapper" >
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => getPDTHomNay()}  style={{ display: 'inline-block', width: 'calc(15%)' }}>
       
      </Button>
      
      <Button type="danger"  onClick={(e) => fetchPDT()}  style={{ display: 'inline-block', width: 'calc(15%)' }}>
        Xem tất cả Bữa Tiệc
      </Button>
      
     {/* // <h3 style={{ display: 'inline-block', width: 'calc(20%)' }}></h3> */}
        <Form
          form={formTheoNgay}
          name="formTheoNgay"
          align="left"
          onFinish={handlePDTTheoNgay}
        >
          <span
                style={{ display: 'inline-block', marginRight:'10px' ,padding: '0 0px 0 0px', lineHeight: '32px', textAlign: 'center' }}
              >
               Xem Bữa Tiệc theo ngày
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
              Xem Bữa tiệc theo ngày
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table   locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 150 }} size={"small"} columns={columnsPDT} dataSource={dataTablePDT} />
    </div>
  )
}
