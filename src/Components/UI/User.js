import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
  Upload,
  message,
  Table,
  AutoComplete,
  Radio,
  Typography,
  Avatar,
  Modal,
  Divider,
  Tooltip,Badge,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  UploadOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,CheckCircleTwoTone,CloseCircleTwoTone,RedoOutlined,PrinterOutlined,AlertOutlined
} from "@ant-design/icons";
import logo from "../img/menu/userdf.png";
const { Title, Paragraph, Text, Link } = Typography;
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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

export default function () {
  const [value, setValue] = React.useState(1);
  const [test, setTest] = useState({});
  const [valuenull,setValuenull]=useState({});
  const [valueKH, setValueKH] = useState([]);
  const [ns, setns] = useState("");
  const [formCapNhat] = Form.useForm();
  const [form] = Form.useForm();
  const [editName, setEditName] = useState(valueKH?.tenKhachHang);
  const [dob, setDob] = useState(valueKH?.ngaySinh);
  const [gender, setGender] = useState(valueKH?.gioiTinh);
  const [emailkhachhang, setEmail] = useState(valueKH?.email);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [radioValue, setRadioValue] = useState();
  const [dulieuPDT, setDulieuPDT] = useState([]);
  const [dulieuDV, setDulieuDV] = useState([]);
  const [dulieuST, setDulieuST] = useState([]);
  const [dulieuMA, setDulieuMA] = useState([]);
  const [dulieuPDTCTT, setDulieuPDTCTT] = useState([]);
  const [dulieuPDTChuaTTKH, setDulieuPDTChuaTTKH] = useState([]);
  const [dulieuPDTDaTTKH, setDulieuPDTDaTTKH] = useState([]);
  const [valueLHSK, setValueLHSK] = useState([]);
  const [valueHD, setValueHD] = useState(null);
  const [valueCTHD, setValueCTHD] = useState(null);
  const [dataTablePDT, setDataTablePDT] = useState([]);
  const [dataTableDV, setDataTableDV] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [dataTableMA, setDataTableMA] = useState([]);
  const [dataTablePDTChuaTTKH, setDataTablePDTChuaTTKH] = useState([]);
  const [dataTablePDTDaTTKH, setDataTablePDTDaTTKH] = useState([]);
  const [valueTD, setValueTD] = useState([]);
  const [isModalCanDatCoc, setIsModalCanDatCoc] = useState(false);
  const [soPDTchuaTT, setSoPDTchuaTT] = useState(0);
  
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const columnsPDTDatCoc = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ngày đặt tiệc",
      dataIndex: "ngaydattiec",
      key: "ngaydattiec",
    },
    {
      title: "Ngày tổ chức",
      dataIndex: "ngaytochuc",
      key: "ngaytochuc",
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "thanhtien",
      key: "thanhtien",
    },
    {
      title: "Tiền phải đặt cọc (VNĐ)",
      dataIndex: "tiencoc",
      key: "tiencoc",
    },
    {
      title: "Ngày còn lại để đặt cọc",
      dataIndex: "ngayconlai",
      key: "ngayconlai",
    },
  ];

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
    },
    {
      title: "Buổi tổ chức",
      dataIndex: "buoi",
      key: "buoi",
    },
    {
      title: "Loại hình sự kiện",
      dataIndex: "loaihinhsukien",
      key: "loaihinhsukien",
    },
    {
      title: "Thanh toán",
      dataIndex: "thanhtoan",
      key: "thanhtoan",
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "thanhtien",
      key: "thanhtien",
    },
    {
      title: "Xem chi tiết",
      dataIndex: "xemchitiet",
      key: "xemchitiet",
    },
    {
      title: "In hóa đơn",
      dataIndex: "inhoadon",
      key: "inhoadon",
    },
  ];
  const columnsDV = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "tendichvu",
      key: "tendichvu",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              
              placeholder="Nhập tên dịch vụ cần tìm"
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
        return record.tendichvu.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tendichvu.localeCompare(b.tendichvu),
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
    },
  ];
  const columnsST = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên sảnh tiệc",
      dataIndex: "tensanhtiec",
      key: "tensanhtiec",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              
              placeholder="Nhập sảnh tiệc cần tìm"
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
        return record.tensanhtiec.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tensanhtiec.localeCompare(b.tensanhtiec),
    },
    {
      title: "Vị trí",
      dataIndex: "vitri",
      key: "vitri",
    },
    {
      title: "Kích thước",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
    },
    {
      title: "Diện tích",
      dataIndex: "dientich",
      key: "dientich",
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
    },
  ];

  const columnsMA = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên món ăn",
      dataIndex: "tenmonan",
      key: "tenmonan",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              
              placeholder="Nhập tên món ăn cần tìm"
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
        return record.tenmonan.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tenmonan.localeCompare(b.tenmonan),
    },
    {
      title: "Loại món ăn",
      dataIndex: "loaimonan",
      key: "loaimonan",
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
    },
  ];

  useEffect(() => {
    localStorage.removeItem("myKVbtn");
    localStorage.removeItem("myMonChinh1btn");
    localStorage.removeItem("myMonChinh2btn");
    localStorage.removeItem("myMonChinh3btn");
    localStorage.removeItem("myLaubtn");
    localStorage.removeItem("myTMbtn");
    localStorage.removeItem("myDonDatTiec");
    localStorage.removeItem("soban");
    localStorage.removeItem("idsanhtiec");
    localStorage.removeItem("tdv");
    localStorage.removeItem("td");
    localStorage.removeItem("iddichvu");
    localStorage.removeItem("tendichvu");
    localStorage.removeItem("idsetthucdon");
    localStorage.removeItem("dongiatuchon");
    localStorage.removeItem("ghiChuPDT");
    localStorage.removeItem("dongiasanhtiec");
    localStorage.removeItem("dongiadichvu");
    localStorage.removeItem("maPDTinHD");
    localStorage.removeItem("maKHinHD");
    fetchKH();
    fetchLHSK();
    fetchPDT();
    fetchPDTCTT();
  }, [test]);

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
      thanhtoan: item?.thanhToan==true?<CheckCircleTwoTone twoToneColor="#52c41a" />:<CloseCircleTwoTone twoToneColor="#f44336" />,
      thanhtien: item?.thanhTien==null?"":themPhayVaoSo(item?.thanhTien),
      xemchitiet: (
        <Button type="dashed" primary onClick={(e) => handleClickPDT(item)}>
          Chi tiết
        </Button>
      ),
      inhoadon: (
        item?.thanhToan==true?
        <Button icon={<PrinterOutlined />} style={{background: "#6DD54E", borderColor: "#6DD54E",}} onClick={(e) => handleInHoaDon(item)}>
           
        </Button >
        : <Button disabled icon={<PrinterOutlined />} style={{background: "#6DD54E", borderColor: "#6DD54E",}}>
           
        </Button>
        
        
        ),
    }));
    setDataTablePDT(_data);}
    
  }, [dulieuPDT]);

  useEffect(() => {
    const _data = dulieuDV?.map((item, index) => ({
      stt: index + 1,
      tendichvu: item?.tenDichVu,
      soluong: item?.soLuong,
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia) ,
    }));
    setDataTableDV(_data);
  }, [dulieuDV]);

  useEffect(() => {
    const _data = [
      {
        stt: dulieuST?.maSanhTiec != null ? "1" : dulieuST?.maSanhTiec,
        tensanhtiec: dulieuST?.tenSanhTiec,
        vitri: dulieuST?.viTri,
        kichthuoc: dulieuST?.kichThuoc,
        dientich: dulieuST?.dienTich,
        dongia: dulieuST?.donGia != null ?  themPhayVaoSo(dulieuST?.donGia) : "",
      },
    ];
    setDataTableST(_data);
  }, [dulieuST]);

  useEffect(() => {
    const _data = dulieuMA?.map((item, index) => ({
      stt: index + 1,
      tenmonan: item?.tenMonAn,
      loaimonan: handleLoaiMA(item?.loaiMonAn), //item?.loaiMonAn,
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia), //item?.donGia+" đ"
    }));
    setDataTableMA(_data);
  }, [dulieuMA]);

  const handleClickPDT = (e) => {
    showDetailDV(e?.maTapDichVu);
    getSanhTiec(e?.maSanhTiec);
    getThucDon(e?.maThucDon);
    getMATheoTD(e?.maThucDon);
    getCTHD(e?.maPhieuDatTiec);
  };

  const handleInHoaDon =(e)=>{
    localStorage.setItem("maPDTinHD",e.maPhieuDatTiec);
    localStorage.setItem("maKHinHD",e.maKhachHang);
    window.open(
      '/inhoadon',
      '_blank' // <- This is what makes it open in a new window.
    );
     
  }

  const handleLoaiMA = (e) => {
    if (e == "KHAI_VI") {
      return "Khai vị";
    } else if (e == "LAU") {
      return "Lẩu";
    } else if (e == "MON_CHINH_1") {
      return "Món chính 1";
    } else if (e == "MON_CHINH_2") {
      return "Món chính 2";
    } else if (e == "MON_CHINH_3") {
      return "Món chính 3";
    } else {
      return "Tráng miệng";
    }
  };

  const showDetailDV = async (e) => {
    get(`/tapdichvu/${e}`)
      .then((response) => {
        // console.log("tapdichvu",response?.data.data);
        get(`/tapdichvu/madichvu/${response?.data?.data.tenTapDichVu}`)
          .then((response) => {
            // console.log("IDmadichvu",response?.data.data);
            const detailInput = {
              listid: response?.data.data,
            };
            post(`/dichvu/timdichvutheopdt`, detailInput)
              .then((response) => {
                // console.log("dichvula",response?.data.data);
                setDulieuDV(response?.data?.data);
              })
              .catch((err) => {
                console.log("Err: ", err);
              });
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getThucDon = (e) => {
    get(`/thucdon/${e}`)
      .then((response) => {
        // console.log("data",response?.data?.data);
        setValueTD(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getSanhTiec = (e) => {
    get(`/sanhtiec/${e}`)
      .then((response) => {
        setDulieuST(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getCTHD = (e) => {
    get(`/chitiethoadon/maphieudattiec/${e}`)
      .then((response) => {
        setValueCTHD(response?.data?.data);
       // console.log("CTHD", typeof(response?.data?.data));
        if((response?.data?.data)!=null){
          getHD(response?.data?.data.maHoaDon);
        }else{
          setValueHD(null);
        }
        
      })
      .catch((err) => {
        console.log("Err: ", err);
        setValueCTHD(valuenull);
        setValueHD(valuenull);
      });
  };

  const getHD = (e) => {
    get(`/hoadon/${e}`)
      .then((response) => {
        setValueHD(response?.data?.data);
        //console.log("HD", response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
        
      });
  };

  const getMATheoTD = (e) => {
    get(`/thucdon/${e}`)
      .then((response) => {
        const detailInput1 = {
         name:response?.data?.data.tenThucDon,
        };
        post(`/thucdon/mamonan/`,detailInput1)
          .then((response) => {
            // console.log(response?.data.data);
            const detailInput = {
              listid: response?.data.data,
            };
            post(`/monan/timmonantheothucdon`, detailInput)
              .then((response) => {
                //  console.log(response?.data.data);
                setDulieuMA(response?.data?.data);
              })
              .catch((err) => {
                console.log("Err: ", err);
              });
          })
          .catch((err) => {
            console.log("Err: ", err);
          });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const showModal = async () => {
    setEditName(valueKH?.tenKhachHang);
    setDob(valueKH?.ngaySinh);
    setGender(valueKH?.gioiTinh);
    //console.log(editName+dob+gender);
    //fetchKH();
    formCapNhat.resetFields();
    setIsModalVisible(true);
  };

  const fetchKH = async (e) => {
    const maTK = "" + localStorage.getItem("maTaiKhoan").trim();

    await get(`/khachhang/mataikhoan/${maTK}`)
      .then((response) => {
        setValueKH(response?.data?.data);
        // console.log(response?.data?.data.maKhachHang);
        localStorage.setItem("maKhachHang", response?.data?.data.maKhachHang);

        //console.log("KH ", response);
        var ngs = "" + response?.data?.data.ngaySinh;
        setns(ngs.slice(0, 10));

        //console.log("ns", ns);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchLHSK = async (e) => {
    await get(`/loaihinhsukien/`)
      .then((response) => {
        setValueLHSK(response?.data?.data);
        setTest("asdf");
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchPDT = async (e) => {
    const maKH = "" + localStorage.getItem("maKhachHang").trim();
    await get(`/phieudattiec/timpdttheomakh/${maKH}`)
      .then((response) => {
         
        setDulieuPDT(response?.data?.data);
        
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchPDTCTT = async (e) =>{
    const maKH = "" + localStorage.getItem("maKhachHang").trim();
    await get(`/phieudattiec/chuathanhtoan/${maKH}`)
      .then((response) => {
         
        setDulieuPDTCTT(response?.data?.data);
        // console.log("pdtctt",response?.data?.data);
        if(response?.data?.data!=0){
          handleThongBaoDatCoc();
          setSoPDTchuaTT(response?.data?.data);
        }else{

        }
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    //formCapNhat.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRadioValue = (e) => {
    const { name, value } = e.target;
    setRadioValue({ [name]: value });
  };

  const handleCallApiUpdateKH = (e) => {
    const maTK = "" + localStorage.getItem("maTaiKhoan").trim();
    const detailInput = {
      maKhachHang: valueKH.maKhachHang,
      tenKhachHang: e?.tenKhachHang,
      email: e?.emailkh,
      sdt: valueKH.sdt,
      gioiTinh: e?.gioiTinh,
      ngaySinh: e?.ngaySinh + "T00:00:00.000Z",
      diemTichLuy: valueKH.diemTichLuy,
      vangLai: false,
      maHinhAnh: null,
      maTaiKhoan: maTK,
    };
   // console.log("updatekh",detailInput);

    put(`/khachhang/`, detailInput)
      .then((response) => {
        // setValueKH(response?.data?.data);
        // console.log("KH ", response);
        var ngs = "" + response?.data?.data.ngaySinh;
        setns(ngs.slice(0, 10));
        fetchKH();
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const handleRefeshPDT=()=>{
    fetchPDT();
    setValueCTHD(null);
    setValueHD(null);
    setValueTD(null);
    setDataTableDV(null);
    setDataTableST(null);
    setDataTableMA(null);
  }

  const handleThongBaoDatCoc=()=>{
    getPDTChuaTTKH();
    setIsModalCanDatCoc(true);
  }

  const getPDTChuaTTKH =  (e) => {
    const maKH = "" + localStorage.getItem("maKhachHang").trim();

     get(`/phieudattiec/timpdtchuatttheomakh/${maKH}`)
      .then((response) => {
         setDulieuPDTChuaTTKH(response?.data?.data);
        
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getPDTDaTTKH =  (e) => {
    const maKH = "" + localStorage.getItem("maKhachHang").trim();

     get(`/phieudattiec/timpdtdatttheomakh/${maKH}`)
      .then((response) => {
        setDulieuPDT(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleChuaThanhToan =(e)=>{
    const maKH = "" + localStorage.getItem("maKhachHang").trim();

    get(`/phieudattiec/timpdtchuatttheomakh/${maKH}`)
     .then((response) => {
       setDulieuPDT(response?.data?.data);
     })
     .catch((err) => {
       console.log("Err: ", err);
     });
  }

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const _data = dulieuPDTChuaTTKH?.map((item, index) => ({
      stt: index + 1,
      ngaydattiec: item?.ngayDatTiec.slice(0,10),
      ngaytochuc: item?.ngayToChuc.slice(0,10), 
      thanhtien: item?.thanhTien==null?"":themPhayVaoSo(item?.thanhTien), 
      tiencoc: item?.thanhTien==null?"":themPhayVaoSo((item?.thanhTien*0.5)),
      ngayconlai: (
        (moment.duration(moment(item?.ngayToChuc, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()-4)<0?"Quá hạn":
        (moment.duration(moment(item?.ngayToChuc, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()-4)
      ),
    }));
    setDataTablePDTChuaTTKH(_data);
  }, [dulieuPDTChuaTTKH]);



  return (
    <div class="wrap">
      <div class="clr"></div>
      <div class="userinfo">
        <div class="pagewrap">
          <div class="capnhatform">
            <Divider orientation="left" style={{ fontWeight: "bold" }}>Thông tin người dùng</Divider>

            <Row gutter={[3, 24]} span={24}>
              <Col className="gutter-row" span={3}>
                <Avatar src="https://joeschmoe.io/api/v1/random" size={100} />
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph size="15px">
                  Họ tên:
                  <Text strong>{valueKH.tenKhachHang}</Text>
                </Paragraph>
                <Paragraph>
                  Số điện thoại:
                  <Text strong>{valueKH.sdt}</Text>
                </Paragraph>
                <Paragraph>
                  Ngày sinh:
                  <Text strong>{ns}</Text>
                </Paragraph>
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph>
                  Email:
                  <Text strong>{valueKH.email}</Text>
                </Paragraph>
                <Paragraph>
                  Giới tính:
                  <Text strong>{valueKH.gioiTinh === true ? "Nam" : "Nữ"}</Text>
                </Paragraph>
                <Tooltip title="Cập nhật thông tin">
                  <Button
                    icon={<EditOutlined />}
                    type="dashed"
                    shape="circle"
                    onClick={showModal}
                  >
                    Cập nhật thông tin
                  </Button>
                </Tooltip>
              </Col>

              <Col className="gutter-row" span={4}>
                <Paragraph className="odiemtichluy">
                  Số điểm tích lũy:
                  <Text strong className="txtodiemtichluy">
                    {valueKH.diemTichLuy}
                  </Text>
                </Paragraph>
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph className="odiemtichluy">
                  Hóa đơn chưa thanh toán
                  <Text strong className="txtodiemtichluy">
                    {dulieuPDTCTT}
                  </Text>
                </Paragraph>
              </Col>
              {/* <Col className="gutter-row" span={3}>
                  <Paragraph className="odiemtichluy">
                    Số điểm tích lũy:
                    <Text strong className="txtodiemtichluy">
                      {valueKH.diemTichLuy}
                    </Text>
                  </Paragraph>
                
                </Col> */}
            </Row>
          </div>
          <div class="clr"></div>
        </div>
      </div>
      <div class="orderhistory">
        <div class="pagewrap">
          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Lịch sử đặt tiệc
          </Divider>
          <Button type="dashed" icon={<RedoOutlined />} style={{marginLeft: '0px'}} onClick={(e) => handleRefeshPDT()}></Button>
          <Badge count={soPDTchuaTT} style={{marginLeft: '20px'}}>
            <Button type="dashed" icon={<AlertOutlined />}  onClick={(e) => handleThongBaoDatCoc()}>Thông báo</Button>
          </Badge>
          <Button type="danger" style={{marginLeft:"30px"}} onClick={(e) => handleChuaThanhToan()}>
            Xem Phiếu chưa thanh toán
          </Button>
          
          <Button type="primary" style={{marginLeft:"15px"}} onClick={(e) => getPDTDaTTKH()}>
            Xem Phiếu đã thanh toán
          </Button>
          <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} columns={columnsPDT} dataSource={dataTablePDT} scroll={{ y: 600 }} size={"large"}/>
        </div>
      </div>
      <div class="orderdetail">
        <div class="pagewrap" id="cthd">
          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Chi tiết hóa đơn
          </Divider>

          <div class="chitiet">
            <h5>
              Mã hóa đơn:{" "}
              <strong>
                {valueHD == null ? "" : "HD00" + valueHD.maHoaDon}
              </strong>
            </h5>
            <h5>
              Thành tiền:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  :  themPhayVaoSo(valueCTHD.thanhTien) + " VND"}
              </strong>
            </h5>
            <h5>
              Tổng tiền:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tongTien) + " VND"}
              </strong>
            </h5>
            <h5>
              Tiền cọc:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienCoc) + " VND"}
              </strong>
            </h5>
            <h5>
              Tiền phát sinh:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienPhatSinh) + " VND"}
              </strong>
            </h5>
            <h5>
              Tiền khách đưa:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienKhachDua) + " VND"}
              </strong>
            </h5>
            <h5>
              Tiền thối lại:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tienThoi) + " VND"}
              </strong>
            </h5>
            <h5>
              VAT: <strong>{valueCTHD==null ? "": valueCTHD.vat}</strong>{" "}
            </h5>
          </div>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Dịch vụ
          </Divider>
          <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} columns={columnsDV} dataSource={dataTableDV} pagination={false}/>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Sảnh tiệc
          </Divider>
          <Table  locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} columns={columnsST} dataSource={dataTableST} pagination={false}/>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Thực đơn
          </Divider>
          <div class="chitiet">
            <h5>Mã thực đơn: {valueTD?.maThucDon}</h5>
            <h5>Tên thực đơn: {valueTD?.tenThucDon}</h5>
            <h5>Set thực đơn: {valueTD?.setThucDon}</h5>
            <h5>Đơn giá: <strong>{valueTD?.donGia== null ? "" : themPhayVaoSo(valueTD?.donGia) + " VND"}</strong></h5>
          </div>
          <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} columns={columnsMA} dataSource={dataTableMA} pagination={false}/>
        </div>
      </div>
      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        okButtonProps={{ form: "edituser", key: "submit", htmlType: "submit" }}
        onOk={formCapNhat.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={() => setIsModalVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
        width={450}
        centered
      >
        <h2 className="h2">Thông tin chi tiết người dùng</h2>
        <Form
          form={formCapNhat}
          name="basic"
          onFinish={handleCallApiUpdateKH}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="tenKhachHang"
            rules={[
              {
                pattern:
                /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                message: "Không nhập kí tự đặt biệt hoặc số",
              },
              { required: true, message: "Nhập tên của bạn" }]}
          >
            <Input placeholder={valueKH?.tenKhachHang} />
          </Form.Item>
          <Form.Item
            name="emailkh"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Nhập email mới của bạn",
              },
            ]}
          >
            <Input placeholder={valueKH.email + ""} />
          </Form.Item>
          <Form.Item
            name="sdt"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                Số điện thoại
              </p>
            }
          >
            <Input defaultValue={valueKH?.sdt} disabled />
          </Form.Item>

          <Form.Item
            name="ngaySinh"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>Ngày sinh</p>
            }
            rules={[{ required: true, message: "Nhập ngày sinh của bạn" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="gioiTinh"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>Giới tính</p>
            }
            rules={[{ required: true, message: "Chọn giới tính của bạn" }]}
          >
            <Radio.Group
              name="gioiTinh"
              defaultValue={valueKH.gioiTinh === true ? "true" : "false"}
              onChange={setGender}
            >
              <Radio value="true">Nam</Radio>
              <Radio value="false">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* setIsModalCanDatCoc */}
      <Modal
        title="Phiếu đặt tiệc cần đặt cọc"
        visible={isModalCanDatCoc}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setIsModalCanDatCoc(false)}
        cancelText="Đóng"
        width={950}
        centered
      >
        <h2>Lưu ý: Bạn hãy liên hệ với nhà hàng để lên lịch hẹn tại nhà hàng và đặt cọc</h2>
        <h2>Tiền cọc sẽ bằng 50% số tiền cần thanh toán</h2>
        <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} columns={columnsPDTDatCoc} dataSource={dataTablePDTChuaTTKH} scroll={{ y: 800, x:300 }} size={"small"}/>
        
      </Modal>
    </div>
  );
}
