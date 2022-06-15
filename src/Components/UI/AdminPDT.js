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
    message.error("Hãy "+e, 5)
  }
  const columnsPDT = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã phiếu đặt tiệc",
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
        return record.idpdt.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.idpdt - b.idpdt,
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
      title: "Lịch hẹn",
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
        return record.lichhen.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tình trạng thanh toán",
      dataIndex: "tinhtrang",
      key: "tinhtrang",
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "thanhtien",
      key: "thanhtien",
      sorter: (a, b) => a.thanhtien - b.thanhtien,
    },
    {
      title: "Xem chi tiết",
      dataIndex: "xemchitiet",
      key: "xemchitiet",
    },
    {
      title: "Đặt lịch hẹn",
      dataIndex: "datlichhen",
      key: "datlichhen",
    },
    {
      title: "Đặt cọc",
      dataIndex: "datcoc",
      key: "datcoc",
    },
    {
      title: "Thanh toán",
      dataIndex: "thanhtoan",
      key: "thanhtoan",
    },
    {
      title: "In hóa đơn",
      dataIndex: "inhoadon",
      key: "inhoadon",
    },
    {
      title: "Xóa",
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
      sorter: (a, b) => a.soluong - b.soluong,
    },
    {
      title: "Đơn giá (VNĐ)",
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
      sorter: (a, b) => a.vitri.localeCompare(b.vitri),
    },
    {
      title: "Kích thước",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
      sorter: (a, b) => a.kichthuoc.localeCompare(b.kichthuoc),
    },
    {
      title: "Diện tích",
      dataIndex: "dientich",
      key: "dientich",
      sorter: (a, b) => a.dientich - b.dientich,
    },
    {
      title: "Đơn giá (VNĐ)",
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
      sorter: (a, b) => a.loaimonan.localeCompare(b.loaimonan),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
    },
  ];

  const success = (e) => {
    message.success(e+' Thành công',3);
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
            Chi tiết
          </Button>
        ),
        datlichhen: (
          <Button
            type="dashed"
            primary
            onClick={(e) => handleClickLichHen(item)}
          >
            Đặt lịch
          </Button>
        ),
        datcoc: 
        item?.thanhToan == true || item?.lichHen == null || item?.tienCoc != null ? (
          <Button disabled={true} style={{background: "#50C7C7", borderColor: "#50C7C7",}}>
          Đặt cọc
        </Button>
        ) : (
          <Button
          type="primary"
          primary
          onClick={(e) => handleClickDatCoc(item)}
          style={{background: "#50C7C7", borderColor: "#50C7C7",}}
        >
          Đặt cọc
        </Button>
        ),
        thanhtoan: 
          item?.thanhToan == true || item?.lichHen == null ||item?.tienCoc == null? (
            <Button disabled={true} > 
            Thanh toán
          </Button>
          ) : (
            <Button
            type="primary"
            primary
            onClick={(e) => handleClickThanhToan(item)}
           
          >
            Thanh toán
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
            Xóa
          </Button>
          ) : (
            <Button
            type="danger"
            onClick={(e) => handleClickXoa(item)}
          >
            Xóa
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
      errormess("Hãy nhập tiền khách đưa lớn hơn thành tiền",3);
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
                  success("Thanh toán thành công");
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
      errormess("Hãy nhập tiền cọc bằng 50% tiền cần thanh toán");
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
        success("Đặt cọc thành công");
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
      success("Cập nhật lịch hẹn");
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
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  function dochangchuc(so, daydu) {
    var chuoi = "";
    var chuc = Math.floor(so / 10);
    var donvi = so % 10;
    if (chuc > 1) {
      chuoi = " " + mangso[chuc] + " mươi";
      if (donvi == 1) {
        chuoi += " mốt";
      }
    } else if (chuc == 1) {
      chuoi = " mười";
      if (donvi == 1) {
        chuoi += " một";
      }
    } else if (daydu && donvi > 0) {
      chuoi = " lẻ";
    }
    if (donvi == 5 && chuc > 1) {
      chuoi += " lăm";
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
      chuoi = " " + mangso[tram] + " trăm";
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
      chuoi = docblock(trieu, daydu) + " triệu";
      daydu = true;
    }
    var nghin = Math.floor(so / 1000);
    so = so % 1000;
    if (nghin > 0) {
      chuoi += docblock(nghin, daydu) + " nghìn";
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
      hauto = " tỷ";
    } while (so > 0);
    return chuoi;
  }

  const themPhayVaoSo=(e)=>{
    return (e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  return (
    <div>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Phiếu đặt tiệc
      </Divider>
      <div className="site-button-admin-wrapper" >
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => handleRefeshPDT()}>
       
      </Button>
      
      <Button type="danger"  onClick={(e) => handleChuaThanhToan()}>
        Xem Phiếu chưa thanh toán
      </Button>
      
      <Button type="primary"  onClick={(e) => handleDaThanhToan()}>
        Xem Phiếu đã thanh toán
      </Button>
      </div>
     {/* // onClick={(e) => showCreateDichVuAdmin()} */}
      <Table
       locale={{ 
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần', 
        cancelSort: 'Hủy sắp xếp'
    }}
        scroll={{ y: 350,x:1500 }}
        size={"small"}
        columns={columnsPDT}
        dataSource={dataTablePDT}
      />
       <Modal
        title="Cập nhật lịch hẹn"
        visible={modalLichHen}
        okButtonProps={{ form: "datlich", key: "submit", htmlType: "submit" }}
        onOk={formLichHen.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalLichHen()}
        okText="Đặt lịch"
        cancelText="Hủy"
        width={450}
        centered
      >
        <h2 className="h2">Hãy chọn lịch hẹn</h2>
        <Form
          form={formLichHen}
          name="basic"
          onFinish={handleDatLichHen}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
         <Form.Item  name="lichhen" label="Lịch hẹn" {...config}
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Vui lòng lịch hẹn cho phiếu đặt tiệc!',
                },
              ]}>
              <DatePicker id="datelichhen" style={{float: 'left'}} showTime format="YYYY-MM-DD" disabledDate={disabledDate} />
        </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="Thanh toán hóa đơn"
        visible={modalThanhToan}
        okButtonProps={{ form: "thanhtoan", key: "submit", htmlType: "submit" }}
        onOk={formThanhToan.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalThanhToan()}
        okText="Thanh Toán"
        cancelText="Hủy"
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
          <h2>Số tiền thanh toán ban đầu {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo(localStorage.getItem("tienthanhtoan"))} VNĐ</h2>
          <h2>Số tiền đã đặt cọc {localStorage.getItem("tiencoc")==null?"":themPhayVaoSo(localStorage.getItem("tiencoc"))} VNĐ</h2>
          <Form.Item  name="tienphatsinh" label="Nhập tiền phát sinh"  
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tiền phát sinh cho phiếu đặt tiệc!',
                },
              ]}>
              <InputNumber  style={{ width: 200 }} min={0} max={900000000} onChange={(e)=>tinhtientong(e)}/>
        </Form.Item>
        <h2>Số tiền phát sinh {themPhayVaoSo(tienps)} VNĐ</h2><h3>Tiền phát sinh chưa tính 10% thuế</h3>
        <h2>Số tiền cần thanh toán {themPhayVaoSo(tinhtienps)} VNĐ</h2>
        <h3>{docso(tinhtienps)}</h3>
         <Form.Item  name="tienkhachdua" label="Nhập tiền khách đưa"  
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tiền khách đưa cho phiếu đặt tiệc!',
                },
              ]}>
              <InputNumber  style={{ width: 200 }} min={1000} max={900000000} onChange={(e)=>tinhtientralai(e)}/>
        </Form.Item>
        <h2>Tiền trả lại {themPhayVaoSo(tientralai+"")} VNĐ</h2>
        <h3>({docso(tientralai)})</h3>
        <Form.Item
                name="khuyenmai"
                label="Chọn khuyến mãi"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khuyến mãi!',
                  },
                ]}
              >
                <Select placeholder="Khuyến mãi">
                  {valueKM?.map((item) => (
                        <Option value={item?.tenKhuyenMai}>{item?.tenKhuyenMai}</Option>
                      ))}
                </Select>
              </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="Đặt cọc bữa tiệc"
        visible={modalDatCocPDTAdmin}
        okButtonProps={{ form: "datcoc", key: "submit", htmlType: "submit" }}
        onOk={formDatCoc.submit}
        //onOk={handleCallApiUpdateKH}
        onCancel={()=>closeModalDatCoc()}
        okText="Đặt cọc"
        cancelText="Hủy"
        width={550}
        centered
      >
        <h2 className="h2">Hãy chọn lịch hẹn</h2>
        <Form
          form={formDatCoc}
          name="basic"
          onFinish={handleDatCoc}
          //onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          <h2>Lưu ý tiền cọc sẽ bằng 50% giá trị hóa đơn thanh toán</h2>
          <h2>Tổng tiền hóa đơn tạm tính {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo(localStorage.getItem("tienthanhtoan"))} VNĐ</h2>
          <h2>Số tiền cọc cần thanh toán {localStorage.getItem("tienthanhtoan")==null?"":themPhayVaoSo((parseFloat(localStorage.getItem("tienthanhtoan"))*0.5))} VNĐ</h2>
         <Form.Item  name="tiencoc" label="Tiền cọc"  
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tiền cọc cho phiếu đặt tiệc!',
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
              Tổng tiền:{" "}
              <strong>
                {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tongTien) + " VND"}
              </strong>
            </h5>
            <h5>
              Thành tiền:{" "}
              <strong>
                {valueCTHD == null
                  ? ""
                  : themPhayVaoSo(valueCTHD.thanhTien) + " VND"}
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
              VAT: <strong>{valueCTHD == null ? "" :valueCTHD.vat}</strong>{" "}
            </h5>
          </div>
          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Dịch vụ
          </Divider>
          <Table  locale={{ 
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần', 
        cancelSort: 'Hủy sắp xếp'
    }} columns={columnsDV} dataSource={dataTableDV} />

          <Divider orientation="left" style={{ fontWeight: "bold" }}>
            Sảnh tiệc
          </Divider>
          <Table locale={{ 
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần', 
        cancelSort: 'Hủy sắp xếp'
    }} columns={columnsST} dataSource={dataTableST} />

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
    }}  columns={columnsMA} dataSource={dataTableMA} />

          <Modal
            title="Xác nhận xóa phiếu đặt tiệc"
            centered
            visible={modalDeletePDTAdmin}
            
            width={500}
            onCancel={()=>closeModalDelete()}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ form: "formFinal", key: "submit", htmlType: "submit" }}
            onOk={handleXacNhanXoaPdt}
          >
            <h1>Bạn có muốn xóa đơn đặt tiệc đã chọn không ?</h1>
            <h2>Lưu ý:</h2>
            <h3>Đơn sẽ bị hủy sẽ phải đặt tiệc lại</h3>
          </Modal>
    </div>
  );
}
