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
  message,
  InputNumber
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import moment from 'moment';
import {
  SearchOutlined,
  SmileOutlined,
  UserOutlined,
  MailOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  RedoOutlined,PrinterOutlined
} from "@ant-design/icons";
import firebase from "../../firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;

export default function AdminPDT() {
  const [formLichHen] = Form.useForm();
  const [formThanhToan] = Form.useForm();
  const [formDatCoc] = Form.useForm();
  const [test, setTest] = useState({});
  const [dulieuPDT, setDulieuPDT] = useState([]);
  const [valuePDT, setValuePDT] = useState([]);
  const [dataTablePDT, setDataTablePDT] = useState([]);
  const [modalLichHen, setModalLichHen] = useState(false);
  const [modalThanhToan, setModalThanhToan] = useState(false);
  const [valuenull,setValuenull]=useState({});
  const [dulieuDV, setDulieuDV] = useState([]);
  const [dulieuST, setDulieuST] = useState([]);
  const [dulieuMA, setDulieuMA] = useState([]);
  const [dulieuPDTCTT, setDulieuPDTCTT] = useState([]);
  const [valueLHSK, setValueLHSK] = useState([]);
  const [valueHD, setValueHD] = useState(null);
  const [valueCTHD, setValueCTHD] = useState(null);
  const [dataTableDV, setDataTableDV] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [dataTableMA, setDataTableMA] = useState([]);
  const [valueTD, setValueTD] = useState([]);
  const [valueKM, setValueKM] = useState([]);
  const [modalThanhToanPDTAdmin, setModalThanhToanPDTAdmin] = useState(false);
  const [modalDatCocPDTAdmin, setModalDatCocPDTAdmin] = useState(false);
  const [modalDeletePDTAdmin, setModalDeletePDTAdmin] = useState(false);
  const [isPDTDetail, setIsPDTDetail] = useState();
  const [tinhtienps,setTinhTienPS]=useState(0.0);
  const [tienps,settienps]=useState(0.0);
  const [tientralai,settientralai]=useState(0.0);
  const errormess =(e)=>{
    message.error("H??y "+e, 5)
  }
  const columnsPDT = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "M?? phi???u ?????t ti???c",
      dataIndex: "idpdt",
      key: "idpdt",
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
        return record.idpdt.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.idpdt - b.idpdt,
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
      title: "L???ch h???n",
      dataIndex: "lichhen",
      key: "lichhen",
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
        return record.lichhen.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "T??nh tr???ng thanh to??n",
      dataIndex: "tinhtrang",
      key: "tinhtrang",
    },
    {
      title: "Th??nh ti???n (VN??)",
      dataIndex: "thanhtien",
      key: "thanhtien",
      sorter: (a, b) => a.thanhtien - b.thanhtien,
    },
    {
      title: "Xem chi ti???t",
      dataIndex: "xemchitiet",
      key: "xemchitiet",
    },
    {
      title: "?????t l???ch h???n",
      dataIndex: "datlichhen",
      key: "datlichhen",
    },
    {
      title: "?????t c???c",
      dataIndex: "datcoc",
      key: "datcoc",
    },
    {
      title: "Thanh to??n",
      dataIndex: "thanhtoan",
      key: "thanhtoan",
    },
    {
      title: "In h??a ????n",
      dataIndex: "inhoadon",
      key: "inhoadon",
    },
    {
      title: "X??a",
      dataIndex: "xoa",
      key: "xoa",
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
      sorter: (a, b) => a.soluong - b.soluong,
    },
    {
      title: "????n gi?? (VN??)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
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
      sorter: (a, b) => a.vitri.localeCompare(b.vitri),
    },
    {
      title: "K??ch th?????c",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
      sorter: (a, b) => a.kichthuoc.localeCompare(b.kichthuoc),
    },
    {
      title: "Di???n t??ch",
      dataIndex: "dientich",
      key: "dientich",
      sorter: (a, b) => a.dientich - b.dientich,
    },
    {
      title: "????n gi?? (VN??)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
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
      sorter: (a, b) => a.loaimonan.localeCompare(b.loaimonan),
    },
    {
      title: "????n gi?? (VN??)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
    },
  ];

  const success = (e) => {
    message.success(e+' Th??nh c??ng',3);
  };

  function disabledDate(current) {
    // Can not select days before today and today
    //return current && current < moment().endOf('2022-05-09');
    var ntc=localStorage.getItem("idpdtngaytochuc");
    return current && current > moment(ntc) ;
  }

  useEffect(() => {
    // fetchLHSK();
    fetchPDT();
    // fetchPDTCTT();//chuathanhtoanTHH-mm-ss.zzzZ
    // console.log("now ",moment().format('YYYY-MM-DD')+"T"+moment().format('HH:mm:ss')+".000Z");
  }, [test]);

  const fetchPDT = async (e) => {
    await get(`/phieudattiec/`)
      .then((response) => {
        setDulieuPDT(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  useEffect(() => {
    if (dulieuPDT == "false") {
      setDataTablePDT(null);
    } else {
      const _data = dulieuPDT?.map((item, index) => ({
        stt: index + 1,
        ngaytochuc: (item?.ngayToChuc).slice(0, 10),
        lichhen: item?.lichHen == null ? "null" : (item?.lichHen).slice(0, 10),
        idpdt: item?.maPhieuDatTiec,
        tinhtrang:
          item?.thanhToan == true ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          ) : (
            <CloseCircleTwoTone twoToneColor="#f44336" />
          ),
        thanhtien: item?.thanhTien==null?"":themPhayVaoSo(item?.thanhTien),
        xemchitiet: (
          <Button type="dashed" primary onClick={(e) => handleClickPDT(item)}>
            Chi ti???t
          </Button>
        ),
        datlichhen: (
          <Button
            type="dashed"
            primary
            onClick={(e) => handleClickLichHen(item)}
          >
            ?????t l???ch
          </Button>
        ),
        datcoc: 
        item?.thanhToan == true || item?.lichHen == null || item?.tienCoc != null ? (
          <Button disabled={true} style={{background: "#50C7C7", borderColor: "#50C7C7",}}>
          ?????t c???c
        </Button>
        ) : (
          <Button
          type="primary"
          primary
          onClick={(e) => handleClickDatCoc(item)}
          style={{background: "#50C7C7", borderColor: "#50C7C7",}}
        >
          ?????t c???c
        </Button>
        ),
        thanhtoan: 
          item?.thanhToan == true || item?.lichHen == null ||item?.tienCoc == null? (
            <Button disabled={true} > 
            Thanh to??n
          </Button>
          ) : (
            <Button
            type="primary"
            primary
            onClick={(e) => handleClickThanhToan(item)}
           
          >
            Thanh to??n
          </Button>
          ),
          inhoadon: 
          item?.thanhToan == true ? (
            <Button icon={<PrinterOutlined />} style={{background: "#6DD54E", borderColor: "#6DD54E",marginLeft:"30%"}} onClick={(e) => handleInHoaDon(item)}></Button>
          ) : (
            <Button disabled icon={<PrinterOutlined />} style={{background: "#6DD54E", borderColor: "#6DD54E", marginLeft:"30%"}}></Button>
          ),
          xoa:
          item?.thanhToan == true ? (
            <Button disabled={true}>
            X??a
          </Button>
          ) : (
            <Button
            type="danger"
            onClick={(e) => handleClickXoa(item)}
          >
            X??a
          </Button>
          ),
        
        
      }));
      setDataTablePDT(_data);
    }
  }, [dulieuPDT]);

  useEffect(() => {
    const _data = dulieuDV?.map((item, index) => ({
      stt: index + 1,
      tendichvu: item?.tenDichVu,
      soluong: item?.soLuong,
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia),
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
        dongia: dulieuST?.donGia==null?"":themPhayVaoSo(dulieuST?.donGia),
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

  const getKhuyenMai = (e) => {
    get(`/khuyenmai/`)
      .then((response) => {
       // console.log("dataKM",response?.data?.data);
        setValueKM(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
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
        // console.log("HD", response?.data?.data);
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

  const closeModalThanhToan=()=>{
    localStorage.removeItem("idpdtthanhtoan");
    localStorage.removeItem("idkhthanhtoan");
    localStorage.removeItem("tienthanhtoan");
    localStorage.removeItem("tiencoc");
    localStorage.removeItem("tienphatsinh");
    setTinhTienPS(0.0);
    settienps(0.0);
    settientralai(0.0);
    setModalThanhToan(false);

  }

  const closeModalLichHen=()=>{
    localStorage.removeItem("idpdtlichhen");
    localStorage.removeItem("idpdtngaytochuc");
    setModalLichHen(false);
  }

  const closeModalDelete=()=>{
    localStorage.removeItem("idxoapdt");
    setModalDeletePDTAdmin(false);
  }

  const closeModalDatCoc=()=>{
    localStorage.removeItem("iddatcocpdt");
    localStorage.removeItem("tienthanhtoan");
    setModalDatCocPDTAdmin(false);
  }

  const handleClickLichHen = (e) => {
      formLichHen.resetFields();
      setModalLichHen(true);
      localStorage.setItem("idpdtlichhen",e?.maPhieuDatTiec);
      localStorage.setItem("idpdtngaytochuc",e?.ngayToChuc);
  };

  const handleClickThanhToan = (e) => {
    formThanhToan.resetFields();
    getKhuyenMai();
    localStorage.setItem("idpdtthanhtoan",e?.maPhieuDatTiec);
    localStorage.setItem("idkhthanhtoan",e?.maKhachHang);
    localStorage.setItem("tienthanhtoan",e?.thanhTien);
    localStorage.setItem("tiencoc",e?.tienCoc);
    setModalThanhToan(true);
  };

  const handleClickXoa=(e)=>{
    setModalDeletePDTAdmin(true);
    localStorage.setItem("idxoapdt",e?.maPhieuDatTiec);
    console.log("xoa");
  }

  const handleClickDatCoc=(e)=>{
    formDatCoc.resetFields();
    localStorage.setItem("iddatcocpdt",e?.maPhieuDatTiec);
    localStorage.setItem("tienthanhtoan",e?.thanhTien);
    // var ttt= parseFloat(localStorage.setItem("tienthanhtoan",e?.thanhTien));
    // var tc= ttt*0.5;
    // localStorage.setItem("tiencoc",tc);
    setModalDatCocPDTAdmin(true);
  }

  const handleInHoaDon =(e)=>{
    localStorage.setItem("maPDTinHD",e.maPhieuDatTiec);
    localStorage.setItem("maKHinHD",e.maKhachHang);
    window.open(
      '/inhoadon',
      '_blank' // <- This is what makes it open in a new window.
    );
     
  }

  const handleXacNhanXoaPdt=()=>{
    var idpdt= parseInt(localStorage.getItem("idxoapdt"));
    del(`/phieudattiec/${idpdt}`)
    .then((response) => {  
      localStorage.removeItem("idxoapdt");
      setModalDeletePDTAdmin(false);
      fetchPDT();
    })
    .catch((err) => {
      console.log("Err del pdt: ", err);
    });
  }

  const handleThanhToan =(e)=>{
    var idkhachhang=parseInt(localStorage.getItem("idkhthanhtoan"));
    var thanhtientt=parseFloat(localStorage.getItem("tienthanhtoan"));
    var tiencoctt=parseFloat(localStorage.getItem("tiencoc"));
    var tpschuathue=parseFloat(localStorage.getItem("tienphatsinh"));
    var tienphatsinhtt=tpschuathue+(tpschuathue*0.1);
    var tinhtien= thanhtientt-tiencoctt+(tpschuathue+(tpschuathue*0.1));
    var tongtientt= thanhtientt+tienphatsinhtt;
    var tienkduatt= parseFloat(e?.tienkhachdua);
    var tienthoitt=parseFloat(tienkduatt-tinhtien);
    var manvtt=parseInt(localStorage.getItem("maNhanVien"));
    // var kttienam=parseFloat(tienkduatt-);
    
    var ngaylhdtt=moment().format('YYYY-MM-DD')+"T"+moment().format('HH:mm:ss')+".000Z";
    if(tienthoitt<0){
      errormess("H??y nh???p ti???n kh??ch ????a l???n h??n th??nh ti???n",3);
      // const detailtien={
      //   thanhtien: thanhtientt,
      //   tiencoc:tiencoctt,
      //   tienphatsinh: tienphatsinhtt,
      //   tientra: tinhtien,
      //   tongtien: tongtientt,
      //   tienkhachdua: tienkduatt,
      //   tienthoi: tienthoitt,
      // }
      // console.log("tienne ",detailtien);
    }else{
      // const detailtien={
      //   thanhtien: thanhtientt,
      //   tiencoc:tiencoctt,
      //   tienphatsinh: tienphatsinhtt,
      //   tientra: tinhtien,
      //   tongtien: tongtientt,
      //   tienkhachdua: tienkduatt,
      //   tienthoi: tienthoitt,
      // }
      // console.log("tienne ",detailtien);
    //  // console.log("ok");
        const detailInput={
          ngayLapHoaDon:ngaylhdtt,
          maNhaHang:1,
          maNhanVien:manvtt,
          maKhachHang:idkhachhang
        }
        console.log("hoadon ",detailInput);
        post(`/hoadon/`,detailInput)
      .then((response) => {
          //console.log("hoadonsuccess",response?.data?.data);
          // var idhoadontt=response?.data?.data.maHoaDon;
          const km = valueKM.find((item) => item?.tenKhuyenMai === e?.khuyenmai);
          var idpdt=parseInt(localStorage.getItem("idpdtthanhtoan"));
          const detailInput2={
            vat:0.1,
            tongTien:tongtientt,
            thanhTien:thanhtientt,
            tienKhachDua:e?.tienkhachdua,
            tienThoi:tienthoitt,
            tienPhatSinh: tienphatsinhtt,
            thanhToan:true,
            tienCoc: tiencoctt,
            maHoaDon:response?.data?.data.maHoaDon,
            maPhieuDatTiec:idpdt,
            maKhuyenMai:km.maKhuyenMai,
            ngayLapHoaDon:ngaylhdtt,
          }
          //console.log(detailInput2);
          post(`/chitiethoadon/`,detailInput2)
          .then((response) => {
             // console.log("cthdsuccess ",response?.data?.data);
              get(`/phieudattiec/updatethanhtoan/${idpdt}`)
              .then((response) => {
                 // console.log("updateTTsuccess ",response?.data?.data);
                  fetchPDT();
                  closeModalThanhToan();
                  success("Thanh to??n th??nh c??ng");
                //  setModalThanhToan(false);
              })
              .catch((err) => {
                console.log("Err updatethanhtien: ", err);
              });
          })
          .catch((err) => {
            console.log("Err cthd: ", err);
          });
        
      })
      .catch((err) => {
        console.log("Err HD: ", err);
      });
     }
   

   
  }
  
  const handleDatCoc =(e)=>{
    
     
    var idpdt=localStorage.getItem("iddatcocpdt");
    var tiencocne=parseFloat(e?.tiencoc);
    var tttne=parseFloat(localStorage.getItem("tienthanhtoan"));
    var tct=tttne*0.5;
    if(tiencocne<tct){
      errormess("H??y nh???p ti???n c???c b???ng 50% ti???n c???n thanh to??n");
    }else{
        const detailInput={
        maPhieuDatTiec:idpdt,
        tienCoc:parseFloat(e?.tiencoc)
      }
      put(`/phieudattiec/updatetiencoc/`,detailInput)
      .then((response) => {
        //console.log("saukhiuplichhen ",response?.data?.data);
        localStorage.removeItem("iddatcocpdt");
        localStorage.removeItem("tienthanhtoan");
        setModalDatCocPDTAdmin(false);
        fetchPDT();
        success("?????t c???c th??nh c??ng");
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
    }
    
    
   
  }




  const handleDatLichHen = async (e) => {
    
   var idpdt=localStorage.getItem("idpdtlichhen");
  
    const detailInput={
        maPhieuDatTiec:idpdt,
        lichHen:e['lichhen'].format('YYYY-MM-DD') + 'T00:00:00.000Z'
    }
   // console.log("lichhendetail ",detailInput);
    await put(`/phieudattiec/updatelichhen/`,detailInput)
    .then((response) => {
      //console.log("saukhiuplichhen ",response?.data?.data);
      localStorage.removeItem("idpdtlichhen");
      localStorage.removeItem("idpdtngaytochuc");
      setModalLichHen(false);
      fetchPDT();
      success("C???p nh???t l???ch h???n");
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  };

  const handleDaThanhToan = async (e) => {
    await get(`/phieudattiec/listdathanhtoan/`)
    .then((response) => {
      setDulieuPDT(response?.data?.data);
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  };

  const handleChuaThanhToan = async (e) => {
    await get(`/phieudattiec/listchuathanhtoan/`)
    .then((response) => {
      setDulieuPDT(response?.data?.data);
    })
    .catch((err) => {
      console.log("Err: ", err);
    });
  };

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  const handleRefeshPDT=()=>{
    fetchPDT();
    setValueCTHD(null);
    setValueHD(null);
    setValueTD(null);
    setDataTableDV(null);
    setDataTableST(null);
    setDataTableMA(null);
  }

  const tinhtientong=(e)=>{
    localStorage.setItem("tienphatsinh",parseFloat(e));
    var ttt=parseFloat(localStorage.getItem("tienthanhtoan"));
    var tc= parseFloat(localStorage.getItem("tiencoc"));
    
    var tps= parseFloat(e);
    var tinhtien= ttt-tc+(tps+(tps*0.1));
    setTinhTienPS(tinhtien);
    settienps(e);
  }

  const tinhtientralai=(e)=>{
    var ttt=parseFloat(localStorage.getItem("tienthanhtoan"));
    var tc= parseFloat(localStorage.getItem("tiencoc"));
    var tps= parseFloat(localStorage.getItem("tienphatsinh"));
    var tinhtien= (e-(ttt-tc+(tps+(tps*0.1))));
    settientralai(tinhtien);
  }

  var mangso = [
    "kh??ng",
    "m???t",
    "hai",
    "ba",
    "b???n",
    "n??m",
    "s??u",
    "b???y",
    "t??m",
    "ch??n",
  ];
  function dochangchuc(so, daydu) {
    var chuoi = "";
    var chuc = Math.floor(so / 10);
    var donvi = so % 10;
    if (chuc > 1) {
      chuoi = " " + mangso[chuc] + " m????i";
      if (donvi == 1) {
        chuoi += " m???t";
      }
    } else if (chuc == 1) {
      chuoi = " m?????i";
      if (donvi == 1) {
        chuoi += " m???t";
      }
    } else if (daydu && donvi > 0) {
      chuoi = " l???";
    }
    if (donvi == 5 && chuc > 1) {
      chuoi += " l??m";
    } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
      chuoi += " " + mangso[donvi];
    }
    return chuoi;
  }
  function docblock(so, daydu) {
    var chuoi = "";
    var tram = Math.floor(so / 100);
    so = so % 100;
    if (daydu || tram > 0) {
      chuoi = " " + mangso[tram] + " tr??m";
      chuoi += dochangchuc(so, true);
    } else {
      chuoi = dochangchuc(so, false);
    }
    return chuoi;
  }
  function dochangtrieu(so, daydu) {
    var chuoi = "";
    var trieu = Math.floor(so / 1000000);
    so = so % 1000000;
    if (trieu > 0) {
      chuoi = docblock(trieu, daydu) + " tri???u";
      daydu = true;
    }
    var nghin = Math.floor(so / 1000);
    so = so % 1000;
    if (nghin > 0) {
      chuoi += docblock(nghin, daydu) + " ngh??n";
      daydu = true;
    }
    if (so > 0) {
      chuoi += docblock(so, daydu);
    }
    return chuoi;
  }
  function docso(so) {
    if (so == 0) return mangso[0];
    var chuoi = "",
      hauto = "";
    do {
      var ty = so % 1000000000;
      so = Math.floor(so / 1000000000);
      if (so > 0) {
        chuoi = dochangtrieu(ty, true) + hauto + chuoi;
      } else {
        chuoi = dochangtrieu(ty, false) + hauto + chuoi;
      }
      hauto = " t???";
    } while (so > 0);
    return chuoi;
  }

  const themPhayVaoSo=(e)=>{
    return (e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  return (
    <div>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Phi???u ?????t ti???c
      </Divider>
      <div className="site-button-admin-wrapper" >
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => handleRefeshPDT()}>
       
      </Button>
      
      <Button type="danger"  onClick={(e) => handleChuaThanhToan()}>
        Xem Phi???u ch??a thanh to??n
      </Button>
      
      <Button type="primary"  onClick={(e) => handleDaThanhToan()}>
        Xem Phi???u ???? thanh to??n
      </Button>
      </div>
     {/* // onClick={(e) => showCreateDichVuAdmin()} */}
      <Table
       locale={{ 
        triggerDesc: 'S???p x???p gi???m d???n',
        triggerAsc: 'S???p x???p t??ng d???n', 
        cancelSort: 'H???y s???p x???p'
    }}
        scroll={{ y: 350,x:1500 }}
        size={"small"}
        columns={columnsPDT}
        dataSource={dataTablePDT}
      />
       <Modal
        title="C???p nh???t l???ch h???n"
        visible={modalLichHen}
        okButtonProps={{ form: "datlich", key: "submit", htmlType: "submit" }}
        onOk={formLichHen.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalLichHen()}
        okText="?????t l???ch"
        cancelText="H???y"
        width={450}
        centered
      >
        <h2 className="h2">H??y ch???n l???ch h???n</h2>
        <Form
          form={formLichHen}
          name="basic"
          onFinish={handleDatLichHen}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
         <Form.Item  name="lichhen" label="L???ch h???n" {...config}
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Vui l??ng l???ch h???n cho phi???u ?????t ti???c!',
                },
              ]}>
              <DatePicker id="datelichhen" style={{float: 'left'}} showTime format="YYYY-MM-DD" disabledDate={disabledDate} />
        </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="Thanh to??n h??a ????n"
        visible={modalThanhToan}
        okButtonProps={{ form: "thanhtoan", key: "submit", htmlType: "submit" }}
        onOk={formThanhToan.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalThanhToan()}
        okText="Thanh To??n"
        cancelText="H???y"
        width={800}
        centered
      >
        <Form
          form={formThanhToan}
          name="basic"
          onFinish={handleThanhToan}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <h2>S??? ti???n thanh to??n ban ?????u {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo(localStorage.getItem("tienthanhtoan"))} VN??</h2>
          <h2>S??? ti???n ???? ?????t c???c {localStorage.getItem("tiencoc")==null?"":themPhayVaoSo(localStorage.getItem("tiencoc"))} VN??</h2>
          <Form.Item  name="tienphatsinh" label="Nh???p ti???n ph??t sinh"  
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p ti???n ph??t sinh cho phi???u ?????t ti???c!',
                },
              ]}>
              <InputNumber  style={{ width: 200 }} min={0} max={900000000} onChange={(e)=>tinhtientong(e)}/>
        </Form.Item>
        <h2>S??? ti???n ph??t sinh {themPhayVaoSo(tienps)} VN??</h2><h3>Ti???n ph??t sinh ch??a t??nh 10% thu???</h3>
        <h2>S??? ti???n c???n thanh to??n {themPhayVaoSo(tinhtienps)} VN??</h2>
        <h3>{docso(tinhtienps)}</h3>
         <Form.Item  name="tienkhachdua" label="Nh???p ti???n kh??ch ????a"  
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p ti???n kh??ch ????a cho phi???u ?????t ti???c!',
                },
              ]}>
              <InputNumber  style={{ width: 200 }} min={1000} max={900000000} onChange={(e)=>tinhtientralai(e)}/>
        </Form.Item>
        <h2>Ti???n tr??? l???i {themPhayVaoSo(tientralai+"")} VN??</h2>
        <h3>({docso(tientralai)})</h3>
        <Form.Item
                name="khuyenmai"
                label="Ch???n khuy???n m??i"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng ch???n khuy???n m??i!',
                  },
                ]}
              >
                <Select placeholder="Khuy???n m??i">
                  {valueKM?.map((item) => (
                        <Option value={item?.tenKhuyenMai}>{item?.tenKhuyenMai}</Option>
                      ))}
                </Select>
              </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="?????t c???c b???a ti???c"
        visible={modalDatCocPDTAdmin}
        okButtonProps={{ form: "datcoc", key: "submit", htmlType: "submit" }}
        onOk={formDatCoc.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalDatCoc()}
        okText="?????t c???c"
        cancelText="H???y"
        width={550}
        centered
      >
        <h2 className="h2">H??y ch???n l???ch h???n</h2>
        <Form
          form={formDatCoc}
          name="basic"
          onFinish={handleDatCoc}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <h2>L??u ?? ti???n c???c s??? b???ng 50% gi?? tr??? h??a ????n thanh to??n</h2>
          <h2>T???ng ti???n h??a ????n t???m t??nh {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo(localStorage.getItem("tienthanhtoan"))} VN??</h2>
          <h2>S??? ti???n c???c c???n thanh to??n {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo((parseFloat(localStorage.getItem("tienthanhtoan"))*0.5))} VN??</h2>
         <Form.Item  name="tiencoc" label="Ti???n c???c"  
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p ti???n c???c cho phi???u ?????t ti???c!',
                },
              ]}>
              <InputNumber  style={{ width: 200 }} min={1000}  defaultValue={1000}/>
        </Form.Item>
         
        </Form>
      </Modal>
      <p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </p>
      
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
              T???ng ti???n:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tongTien) + " VND"}
              </strong>
            </h5>
            <h5>
              Th??nh ti???n:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.thanhTien) + " VND"}
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
              VAT: <strong>{valueCTHD == null ? "" :valueCTHD.vat}</strong>{" "}
            </h5>
          </div>
          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            D???ch v???
          </Divider>
          <Table  locale={{ 
        triggerDesc: 'S???p x???p gi???m d???n',
        triggerAsc: 'S???p x???p t??ng d???n', 
        cancelSort: 'H???y s???p x???p'
    }} columns={columnsDV} dataSource={dataTableDV} />

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            S???nh ti???c
          </Divider>
          <Table locale={{ 
        triggerDesc: 'S???p x???p gi???m d???n',
        triggerAsc: 'S???p x???p t??ng d???n', 
        cancelSort: 'H???y s???p x???p'
    }} columns={columnsST} dataSource={dataTableST} />

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
    }}  columns={columnsMA} dataSource={dataTableMA} />

          <Modal
            title="X??c nh???n x??a phi???u ?????t ti???c"
            centered
            visible={modalDeletePDTAdmin}
            
            width={500}
            onCancel={()=>closeModalDelete()}
            okText="X??a"
            cancelText="H???y"
            okButtonProps={{ form: "formFinal", key: "submit", htmlType: "submit" }}
            onOk={handleXacNhanXoaPdt}
          >
            <h1>B???n c?? mu???n x??a ????n ?????t ti???c ???? ch???n kh??ng ?</h1>
            <h2>L??u ??:</h2>
            <h3>????n s??? b??? h???y s??? ph???i ?????t ti???c l???i</h3>
          </Modal>
    </div>
  );
}
