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
      title: "Ng??y ?????t ti???c",
      dataIndex: "ngaydattiec",
      key: "ngaydattiec",
    },
    {
      title: "Ng??y t??? ch???c",
      dataIndex: "ngaytochuc",
      key: "ngaytochuc",
    },
    {
      title: "Th??nh ti???n (VN??)",
      dataIndex: "thanhtien",
      key: "thanhtien",
    },
    {
      title: "Ti???n ph???i ?????t c???c (VN??)",
      dataIndex: "tiencoc",
      key: "tiencoc",
    },
    {
      title: "Ng??y c??n l???i ????? ?????t c???c",
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
      title: "Ng??y t??? ch???c",
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
              
              placeholder="Nh???p ng??y t??? ch???c c???n t??m"
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
      title: "S??? b??n",
      dataIndex: "soban",
      key: "soban",
    },
    {
      title: "Bu???i t??? ch???c",
      dataIndex: "buoi",
      key: "buoi",
    },
    {
      title: "Lo???i h??nh s??? ki???n",
      dataIndex: "loaihinhsukien",
      key: "loaihinhsukien",
    },
    {
      title: "Thanh to??n",
      dataIndex: "thanhtoan",
      key: "thanhtoan",
    },
    {
      title: "Th??nh ti???n (VN??)",
      dataIndex: "thanhtien",
      key: "thanhtien",
    },
    {
      title: "Xem chi ti???t",
      dataIndex: "xemchitiet",
      key: "xemchitiet",
    },
    {
      title: "In h??a ????n",
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
      title: "T??n d???ch v???",
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
              
              placeholder="Nh???p t??n d???ch v??? c???n t??m"
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
      title: "S??? l?????ng",
      dataIndex: "soluong",
      key: "soluong",
    },
    {
      title: "????n gi?? (VN??)",
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
      title: "T??n s???nh ti???c",
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
              
              placeholder="Nh???p s???nh ti???c c???n t??m"
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
      title: "V??? tr??",
      dataIndex: "vitri",
      key: "vitri",
    },
    {
      title: "K??ch th?????c",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
    },
    {
      title: "Di???n t??ch",
      dataIndex: "dientich",
      key: "dientich",
    },
    {
      title: "????n gi?? (VN??)",
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
      title: "T??n m??n ??n",
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
              
              placeholder="Nh???p t??n m??n ??n c???n t??m"
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
      title: "Lo???i m??n ??n",
      dataIndex: "loaimonan",
      key: "loaimonan",
    },
    {
      title: "????n gi?? (VN??)",
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
      buoi: item?.buoi == "TOI" ? "T???i" : "Tr??a",
      thanhtoan: item?.thanhToan==true?<CheckCircleTwoTone twoToneColor="#52c41a" />:<CloseCircleTwoTone twoToneColor="#f44336" />,
      thanhtien: item?.thanhTien==null?"":themPhayVaoSo(item?.thanhTien),
      xemchitiet: (
        <Button type="dashed" primary onClick={(e) => handleClickPDT(item)}>
          Chi ti???t
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
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia), //item?.donGia+" ??"
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
      return "Khai v???";
    } else if (e == "LAU") {
      return "L???u";
    } else if (e == "MON_CHINH_1") {
      return "M??n ch??nh 1";
    } else if (e == "MON_CHINH_2") {
      return "M??n ch??nh 2";
    } else if (e == "MON_CHINH_3") {
      return "M??n ch??nh 3";
    } else {
      return "Tr??ng mi???ng";
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
        (moment.duration(moment(item?.ngayToChuc, "YYYY-MM-DD").diff(moment().startOf('day'))).asDays()-4)<0?"Qu?? h???n":
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
            <Divider orientation="left" style={{ fontWeight: "bold" }}>Th??ng tin ng?????i d??ng</Divider>

            <Row gutter={[3, 24]} span={24}>
              <Col className="gutter-row" span={3}>
                <Avatar src="https://joeschmoe.io/api/v1/random" size={100} />
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph size="15px">
                  H??? t??n:
                  <Text strong>{valueKH.tenKhachHang}</Text>
                </Paragraph>
                <Paragraph>
                  S??? ??i???n tho???i:
                  <Text strong>{valueKH.sdt}</Text>
                </Paragraph>
                <Paragraph>
                  Ng??y sinh:
                  <Text strong>{ns}</Text>
                </Paragraph>
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph>
                  Email:
                  <Text strong>{valueKH.email}</Text>
                </Paragraph>
                <Paragraph>
                  Gi???i t??nh:
                  <Text strong>{valueKH.gioiTinh === true ? "Nam" : "N???"}</Text>
                </Paragraph>
                <Tooltip title="C???p nh???t th??ng tin">
                  <Button
                    icon={<EditOutlined />}
                    type="dashed"
                    shape="circle"
                    onClick={showModal}
                  >
                    C???p nh???t th??ng tin
                  </Button>
                </Tooltip>
              </Col>

              <Col className="gutter-row" span={4}>
                <Paragraph className="odiemtichluy">
                  S??? ??i???m t??ch l??y:
                  <Text strong className="txtodiemtichluy">
                    {valueKH.diemTichLuy}
                  </Text>
                </Paragraph>
              </Col>
              <Col className="gutter-row" span={5}>
                <Paragraph className="odiemtichluy">
                  H??a ????n ch??a thanh to??n
                  <Text strong className="txtodiemtichluy">
                    {dulieuPDTCTT}
                  </Text>
                </Paragraph>
              </Col>
              {/* <Col className="gutter-row" span={3}>
                  <Paragraph className="odiemtichluy">
                    S??? ??i???m t??ch l??y:
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
            L???ch s??? ?????t ti???c
          </Divider>
          <Button type="dashed" icon={<RedoOutlined />} style={{marginLeft: '0px'}} onClick={(e) => handleRefeshPDT()}></Button>
          <Badge count={soPDTchuaTT} style={{marginLeft: '20px'}}>
            <Button type="dashed" icon={<AlertOutlined />}  onClick={(e) => handleThongBaoDatCoc()}>Th??ng b??o</Button>
          </Badge>
          <Button type="danger" style={{marginLeft:"30px"}} onClick={(e) => handleChuaThanhToan()}>
            Xem Phi???u ch??a thanh to??n
          </Button>
          
          <Button type="primary" style={{marginLeft:"15px"}} onClick={(e) => getPDTDaTTKH()}>
            Xem Phi???u ???? thanh to??n
          </Button>
          <Table locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} columns={columnsPDT} dataSource={dataTablePDT} scroll={{ y: 600 }} size={"large"}/>
        </div>
      </div>
      <div class="orderdetail">
        <div class="pagewrap" id="cthd">
          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Chi ti???t h??a ????n
          </Divider>

          <div class="chitiet">
            <h5>
              M?? h??a ????n:{" "}
              <strong>
                {valueHD == null ? "" : "HD00" + valueHD.maHoaDon}
              </strong>
            </h5>
            <h5>
              Th??nh ti???n:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  :  themPhayVaoSo(valueCTHD.thanhTien) + " VND"}
              </strong>
            </h5>
            <h5>
              T???ng ti???n:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tongTien) + " VND"}
              </strong>
            </h5>
            <h5>
              Ti???n c???c:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienCoc) + " VND"}
              </strong>
            </h5>
            <h5>
              Ti???n ph??t sinh:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienPhatSinh) + " VND"}
              </strong>
            </h5>
            <h5>
              Ti???n kh??ch ????a:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.tienKhachDua) + " VND"}
              </strong>
            </h5>
            <h5>
              Ti???n th???i l???i:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tienThoi) + " VND"}
              </strong>
            </h5>
            <h5>
              VAT: <strong>{valueCTHD==null ? "": valueCTHD.vat}</strong>{" "}
            </h5>
          </div>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            D???ch v???
          </Divider>
          <Table locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} columns={columnsDV} dataSource={dataTableDV} pagination={false}/>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            S???nh ti???c
          </Divider>
          <Table  locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} columns={columnsST} dataSource={dataTableST} pagination={false}/>

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Th???c ????n
          </Divider>
          <div class="chitiet">
            <h5>M?? th???c ????n: {valueTD?.maThucDon}</h5>
            <h5>T??n th???c ????n: {valueTD?.tenThucDon}</h5>
            <h5>Set th???c ????n: {valueTD?.setThucDon}</h5>
            <h5>????n gi??: <strong>{valueTD?.donGia== null ? "" : themPhayVaoSo(valueTD?.donGia) + " VND"}</strong></h5>
          </div>
          <Table locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} columns={columnsMA} dataSource={dataTableMA} pagination={false}/>
        </div>
      </div>
      <Modal
        title="C???p nh???t th??ng tin"
        visible={isModalVisible}
        okButtonProps={{ form: "edituser", key: "submit", htmlType: "submit" }}
        onOk={formCapNhat.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={() => setIsModalVisible(false)}
        okText="C???p nh???t"
        cancelText="H???y"
        width={450}
        centered
      >
        <h2 className="h2">Th??ng tin chi ti???t ng?????i d??ng</h2>
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
                /^[a-zA-z _????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]+$/g,
                message: "Kh??ng nh???p k?? t??? ?????t bi???t ho???c s???",
              },
              { required: true, message: "Nh???p t??n c???a b???n" }]}
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
                message: "Nh???p email m???i c???a b???n",
              },
            ]}
          >
            <Input placeholder={valueKH.email + ""} />
          </Form.Item>
          <Form.Item
            name="sdt"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                S??? ??i???n tho???i
              </p>
            }
          >
            <Input defaultValue={valueKH?.sdt} disabled />
          </Form.Item>

          <Form.Item
            name="ngaySinh"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>Ng??y sinh</p>
            }
            rules={[{ required: true, message: "Nh???p ng??y sinh c???a b???n" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="gioiTinh"
            label={
              <p style={{ fontSize: "15px", fontWeight: "bold" }}>Gi???i t??nh</p>
            }
            rules={[{ required: true, message: "Ch???n gi???i t??nh c???a b???n" }]}
          >
            <Radio.Group
              name="gioiTinh"
              defaultValue={valueKH.gioiTinh === true ? "true" : "false"}
              onChange={setGender}
            >
              <Radio value="true">Nam</Radio>
              <Radio value="false">N???</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* setIsModalCanDatCoc */}
      <Modal
        title="Phi???u ?????t ti???c c???n ?????t c???c"
        visible={isModalCanDatCoc}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setIsModalCanDatCoc(false)}
        cancelText="????ng"
        width={950}
        centered
      >
        <h2>L??u ??: B???n h??y li??n h??? v???i nh?? h??ng ????? l??n l???ch h???n t???i nh?? h??ng v?? ?????t c???c</h2>
        <h2>Ti???n c???c s??? b???ng 50% s??? ti???n c???n thanh to??n</h2>
        <Table locale={{ 
          triggerDesc: 'S???p x???p gi???m d???n',
          triggerAsc: 'S???p x???p t??ng d???n', 
          cancelSort: 'H???y s???p x???p'
      }} columns={columnsPDTDatCoc} dataSource={dataTablePDTChuaTTKH} scroll={{ y: 800, x:300 }} size={"small"}/>
        
      </Modal>
    </div>
  );
}
