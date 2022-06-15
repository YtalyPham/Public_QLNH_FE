import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Table,
  Checkbox,
  Modal,Divider,
  Result,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 5,
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

const columnsDV = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
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

const columnsMA = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
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

const columnsST = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
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

export default function ThanhTien() {
  const [formFinal] = Form.useForm();
  const [dulieuDV, setDulieuDV] = useState([]);
  const [dataTableDV, setDataTableDV] = useState([]);
  const [dulieuMA, setDulieuMA] = useState([]);
  const [dataTableMA, setDataTableMA] = useState([]);
  const [dulieuST, setDulieuST] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [modelOk, setModelOk] = useState(false);
  const [modelConfirmPdt, setModalConfirmPdt] = useState(false);
  const [settdv, setSettdv] = useState({});
  const [tongtientamtinh, settongtientamtinh] = useState(0.0);
  const [docthanhtien,setDocThanhTien]=useState("");
  const [socophay,setsocophay]=useState("");
  const [isDonDat, setDonDat] = useState({
    tenKhachHang: "",
    email: "",
    sdt: "",
    soban: "",
    ngaytochuc: "",
    note: "",
    buoidattiec: "",
    loaihinh: "",
    sanhtiec: "",
    dichvu: "",
    setthucdon: "",
    giatien: "",
    monkhaivi: "",
    monchinh1: "",
    monchinh2: "",
    monchinh3: "",
    monchinh4: "",
    montrangmieng: "",
  });
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  useEffect(() => {
    fetchDV();
    fetchMA();
    getSanhTiec();
    // saveTapDichVu();
    // if(localStorage.getItem("idsetthucdon")==null){
    //   saveThucDon();
    // }else{

    // }
    handleTinhTienHoaDon();
  }, []);

  // const fetchLhskList = () => {
  //   get("/loaihinhsukien/")
  //     .then((response) => {
  //       // console.log(response.data);
  //       setLhsk(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  // const fetchLhskById = () => {

  //   var user = JSON.parse(localStorage.getItem("myDonDatTiec"));
  //   var id= parseInt(user.loaihinh);
  //   get(`/loaihinhsukien/${id}/`)
  //     .then((response) => {
  //      // console.log(response?.data?.data);
  //       setLhsk(response?.data?.data.tenLoaiHinhSuKien);
  //       sk=response?.data?.data.tenLoaiHinhSuKien+"";
  //       console.log("loaisk",sk);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  useEffect(() => {
    const _data = dulieuDV?.map((item, index) => ({
      stt: index + 1,
      tendichvu: item?.tenDichVu,
      soluong: item?.soLuong,
      dongia: item?.donGia==null?"":themPhayVaoSotable(item?.donGia),
    }));
    setDataTableDV(_data);
  }, [dulieuDV]);

  const fetchDV = () => {
    var a = localStorage.getItem("iddichvu");
    var newStr = a.replace("[", "");
    var newStr2 = newStr.replace("]", "");
    var b = newStr2.split(",").map(function (item) {
      return parseInt(item, 10);
    });

    const detailInput = {
      listid: b,
    };
    // console.log("iddichvu", b);
    post(`/dichvu/timdichvutheopdt/`, detailInput)
      .then((response) => {
        setDulieuDV(response?.data?.data);
        //console.log("dichvu", response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
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

  useEffect(() => {
    const _data = dulieuMA?.map((item, index) => ({
      stt: index + 1,
      tenmonan: item?.tenMonAn,
      loaimonan: handleLoaiMA(item?.loaiMonAn), //item?.loaiMonAn,
      dongia: item?.donGia==null?"":themPhayVaoSotable(item?.donGia), //item?.donGia+" đ"
    }));
    setDataTableMA(_data);
  }, [dulieuMA]);

  const fetchMA = async () => {
    var user = JSON.parse(localStorage.getItem("myDonDatTiec"));
    if (localStorage.getItem("myMonChinh3btn") == null) {
      get(`/thucdon/${localStorage.getItem("idsetthucdon")}`)
        .then((response) => {
          const detailInput1 = {
            name: response?.data?.data.tenThucDon,
          };
          post(`/thucdon/mamonan/`, detailInput1)
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
    } else {
      //var amonan = [];
      var amonan = [];
      var idKhaiVi=localStorage.getItem("myKVbtn");
      var newStrKV = idKhaiVi.replace("[", "");
      var newStr2KV = newStrKV.replace("]", "");
      var idKV = newStr2KV.split(",").map(function (item) {
          return parseInt(item, 10);
      });
    
    var idMonChinh1=localStorage.getItem("myMonChinh1btn");
    var newStrMC1 = idMonChinh1.replace("[", "");
    var newStr2MC1 = newStrMC1.replace("]", "");
    var idMC1 = newStr2MC1.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idMonChinh2=localStorage.getItem("myMonChinh2btn");
    var newStrMC2 = idMonChinh2.replace("[", "");
    var newStr2MC2 = newStrMC2.replace("]", "");
    var idMC2 = newStr2MC2.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idMonChinh3=localStorage.getItem("myMonChinh3btn");
    var newStrMC3 = idMonChinh3.replace("[", "");
    var newStr2MC3 = newStrMC3.replace("]", "");
    var idMC3 = newStr2MC3.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idLauNe=localStorage.getItem("myLaubtn");
    var newStrLau = idLauNe.replace("[", "");
    var newStr2Lau = newStrLau.replace("]", "");
    var idLau = newStr2Lau.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idTrangMieng=localStorage.getItem("myTMbtn");
    var newStrTM = idTrangMieng.replace("[", "");
    var newStr2TM = newStrTM.replace("]", "");
    var idTM = newStr2TM.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    amonan= idKV.concat(idMC1,idMC2,idMC3,idLau,idTM);

      const detailInput = {
        listid: amonan,
      };
      console.log("idmonan", detailInput);
      post(`/monan/timmonantheothucdon`, detailInput)
        .then((response) => {
          //  console.log(response?.data.data);
          setDulieuMA(response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
  };

  useEffect(() => {
    const _data = [
      {
        stt: dulieuST?.maSanhTiec != null ? "1" : dulieuST?.maSanhTiec,
        tensanhtiec: dulieuST?.tenSanhTiec,
        vitri: dulieuST?.viTri,
        kichthuoc: dulieuST?.kichThuoc,
        dientich: dulieuST?.dienTich,
        dongia: dulieuST?.donGia==null?"":themPhayVaoSotable(dulieuST?.donGia),
      },
    ];
    setDataTableST(_data);
  }, [dulieuST]);

  const getSanhTiec = () => {
    get(`/sanhtiec/${localStorage.getItem("idsanhtiec")}`)
      .then((response) => {
        setDulieuST(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const saveTapDichVu = async () => {
    var a = localStorage.getItem("iddichvu");
    var newStr = a.replace("[", "");
    var newStr2 = newStr.replace("]", "");
    var b = newStr2.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    var tendv = genRandomStringForId(12);
    const detailInput = {
      tenTapDichVu: tendv,
      maNhieuDichVu: b,
    };
    //console.log("iddichvu", detailInput);
    await post(`/tapdichvu/luunhieu/`, detailInput)
      .then((response) => {
        localStorage.setItem("tdv", response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const saveThucDon = () => {
    var user = JSON.parse(localStorage.getItem("myDonDatTiec"));
    if (localStorage.getItem("myMonChinh3btn") == null) {
      return localStorage.getItem("idsetthucdon");
    } else {
      var amonan = [];
      var idKhaiVi=localStorage.getItem("myKVbtn");
      var newStrKV = idKhaiVi.replace("[", "");
      var newStr2KV = newStrKV.replace("]", "");
      var idKV = newStr2KV.split(",").map(function (item) {
          return parseInt(item, 10);
      });
    
    var idMonChinh1=localStorage.getItem("myMonChinh1btn");
    var newStrMC1 = idMonChinh1.replace("[", "");
    var newStr2MC1 = newStrMC1.replace("]", "");
    var idMC1 = newStr2MC1.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idMonChinh2=localStorage.getItem("myMonChinh2btn");
    var newStrMC2 = idMonChinh2.replace("[", "");
    var newStr2MC2 = newStrMC2.replace("]", "");
    var idMC2 = newStr2MC2.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idMonChinh3=localStorage.getItem("myMonChinh3btn");
    var newStrMC3 = idMonChinh3.replace("[", "");
    var newStr2MC3 = newStrMC3.replace("]", "");
    var idMC3 = newStr2MC3.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idLauNe=localStorage.getItem("myLaubtn");
    var newStrLau = idLauNe.replace("[", "");
    var newStr2Lau = newStrLau.replace("]", "");
    var idLau = newStr2Lau.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    var idTrangMieng=localStorage.getItem("myTMbtn");
    var newStrTM = idTrangMieng.replace("[", "");
    var newStr2TM = newStrTM.replace("]", "");
    var idTM = newStr2TM.split(",").map(function (item) {
        return parseInt(item, 10);
    });

    amonan= idKV.concat(idMC1,idMC2,idMC3,idLau,idTM);
      //xu ly luu thuc don moi
      var tentd = genRandomStringForId(12);
      var dg = parseFloat(localStorage.getItem("dongiatuchon"));
      const detailInput = {
        tenThucDon: tentd,
        setThucDon: null,
        donGia: dg,
        macDinh: false,
        maNhieuMonAn: amonan,
        maHinhAnh: 8,
      };
      console.log(detailInput);

      post(`/thucdon/luunhieu/`, detailInput)
        .then((response) => {
          console.log("mathucdon khi luu la", response?.data?.data);
          localStorage.setItem("td", response?.data?.data);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
  };

  const onFinishxong = (e) => {
    var user = JSON.parse(localStorage.getItem("myDonDatTiec"));

    var tdv = parseInt(localStorage.getItem("tdv"));
    var td;
    if (localStorage.getItem("idsetthucdon") == null) {
      td = parseInt(localStorage.getItem("td"));
    } else {
      td = parseInt(localStorage.getItem("idsetthucdon"));
    }

    var mast = parseInt(localStorage.getItem("idsanhtiec"));
    var slban = parseInt(localStorage.getItem("soban"));
    var malhsk = parseInt(user.loaihinh);
    var gc = e?.ghichuform;
    var makh = parseInt(localStorage.getItem("maKhachHang"));
    var ghiChupdt= localStorage.getItem("ghiChuPDT");

    const detailDonDat = {
      soLuongBan: slban,
      ngayToChuc: user.ngaytochuc,
      lichHen: null,
      ngayDatTiec:
        moment().format("YYYY-MM-DD") +
        "T" +
        moment().format("HH:mm:ss") +
        ".000Z",
      ghiChu: ghiChupdt,
      buoi: user.buoidattiec,
      thanhToan: false,
      thanhTien: tongtientamtinh,
      tienCoc:null,
      maThucDon: td,
      maSanhTiec: mast,
      maTapDichVu: tdv,
      maLoaiHinhSuKien: malhsk,
      maKhachHang: makh,
    };

    console.log("dondatla", detailDonDat);
    post(`/phieudattiec/`, detailDonDat)
      .then((response) => {
        console.log("Ok don dat thanh cong", response?.data?.data);

        setModelOk(true);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
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

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const genRandomStringForId = (length) => {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const showModalConfirm = (e) => {
    var elem = document.getElementById("ghiChu");
    localStorage.setItem("ghiChuPDT",elem.value);
    setModalConfirmPdt(true);
    saveTapDichVu();
    if (localStorage.getItem("idsetthucdon") == null) {
      saveThucDon();
    } else {
    }
  };

  const handleXacNhanPdt = () => {
    onFinishxong();
  };

  const handleCloseModalOk = () => {
    setModelOk(false);
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
    window.location.href = "/User";
  };

  const handleTinhTienHoaDon = () => {
    var tienst = parseFloat(localStorage.getItem("dongiasanhtiec"));
    var tiendv = parseFloat(localStorage.getItem("dongiadichvu"));
    var tientd = parseFloat(localStorage.getItem("dongiatuchon"));
    var soluongban = parseInt(localStorage.getItem("soban"));
    var tttt = 0.0;
    tttt =
      tienst +
      tiendv +
      tientd * soluongban +
      (tienst + tiendv + tientd * soluongban) * 0.1;
    settongtientamtinh(tttt);
    docso(tttt);
    themPhayVaoSo(tttt);
  };

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
    return setDocThanhTien(chuoi);
  }

  const themPhayVaoSo=(e)=>{
    setsocophay(e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  const themPhayVaoSotable=(e)=>{
    return (e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  var user = JSON.parse(localStorage.getItem("myDonDatTiec"));
  return (
    <div style={{ marginTop: "74px" }}>
      <div className="pagewrap">
        <div style={{ textAlign: "left" }}>
          <Divider orientation="left" style={{ fontWeight: "bold" }}>Sảnh tiệc</Divider>
          <Table dataSource={dataTableST} columns={columnsST} pagination={false}/>
          <Divider orientation="left" style={{ fontWeight: "bold" }}>Dịch vụ</Divider>
          <Table dataSource={dataTableDV} columns={columnsDV} pagination={false}/>
          <Divider orientation="left" style={{ fontWeight: "bold" }}>Thực đơn | Số bàn dự kiến: {localStorage.getItem("soban")} </Divider>
          <Table dataSource={dataTableMA} columns={columnsMA} pagination={false}/>
        </div>
        <Divider orientation="left" style={{ fontWeight: "bold" }}>Thông tin cá nhân</Divider>
        <Form
          {...formItemLayout}
          form={formFinal}
          name="formFinal"
          onFinish={showModalConfirm}
          initialValues={{
            prefix: "84",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            initialValue={user.tenKhachHang}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}
          >
            <Input id="hovaten" disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            initialValue={user.email}
            rules={[
              {
                type: "email",
                message: "Email không đúng định dạng",
              },
              {
                required: true,
                message: "Vui lòng nhập email",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            initialValue={user.sdt}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input
              disabled
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="ngaytochuc"
            label="Ngày tổ chức"
            {...config}
            initialValue={moment(user.ngaytochuc, "YYYY-MM-DD")}
            rules={[
              {
                type: "object",
                required: true,
                message: "Vui lòng nhập ngày tổ chức!",
              },
            ]}
          >
            <DatePicker
              style={{ float: "left" }}
              disabled
              showTime
              format="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item label="Buổi đặt tiệc" style={{ marginBottom: 0 }}>
            <Form.Item
              style={{
                float: "left",
                display: "inline-block",
                width: "calc(30% - 12px)",
              }}
              name="buoidattiec"
              label=""
              initialValue={user.buoidattiec}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn buổi!",
                },
              ]}
            >
              <Input
                disabled
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                padding: "0 10px 0 30px",
                lineHeight: "32px",
                textAlign: "center",
              }}
            >
              Loại hình
            </span>
            <Form.Item
              style={{ display: "inline-block", width: "calc(30% - 12px)" }}
              name="loaihinh"
              label=""
              initialValue={user.tenloaihinh}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại hình!",
                },
              ]}
            >
              <Input
                disabled
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Vui lòng đồng ý và xác nhận")
                        ),
                },
              ]}
            >
              <Checkbox>Tôi đồng ý và xác nhận đơn đặt tiệc</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="ghichuform"
            label="Ghi chú"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ghi chú!",
              },
            ]}
          >
            <Input id="ghiChu" placeholder="Ghi chú cho nhà hàng" />
          </Form.Item>
        </Form>

        <p style={{textAlign:"center"}}>
          <h3 style={{textAlign:"center"}}>Tổng thành tiền đặt tiệc</h3>
          {/* <h2>{tongtientamtinh} VNĐ</h2> */}
          <h2 style={{textAlign:"center"}}>{socophay} VNĐ</h2>
          <h2 style={{textAlign:"center"}}>{docthanhtien}</h2>
          <h4>(Tiền Đã bao gồm thuế VAT(10%))</h4>
        </p>

        <Button
          type="primary"
          htmlType="submit"
          form="formFinal"
          style={{
            height: "50px",
            fontSize: "24px",
            margin: "20px auto",
            background: "#E5CC5F",
            borderColor: "#E5CC5F",
          }}
        >
          Gửi xác nhận sảnh tiệc
        </Button>
        <Modal
          centered
          visible={modelOk}
          footer={null}
          width={500}
          onCancel={() => handleCloseModalOk()}
        >
          <Result
            title="Bạn đã đặt tiệc thành công, Cảm ơn bạn đã tin dùng nhà hàng chúng tôi"
            extra={
              <Button type="primary" onClick={() => handleCloseModalOk()}>
                Xác nhận
              </Button>
            }
          />
        </Modal>
        <Modal
          title="Xác nhận thông tin đặt tiệc"
          centered
          visible={modelConfirmPdt}
          width={500}
          onCancel={() => setModalConfirmPdt(false)}
          okText="Đặt tiệc"
          cancelText="Hủy"
          okButtonProps={{
            form: "formFinal",
            key: "submit",
            htmlType: "submit",
          }}
          onOk={handleXacNhanPdt}
        >
          <h1>Bạn có muốn xác nhận đơn đặt tiệc đã chọn không ?</h1>
          <h2>Lưu ý:</h2>
          <h3>
            Đơn sẽ bị hủy sau 3 ngày nếu bạn không xác nhận thanh toán với nhân
            viên
          </h3>
          <h3>Hãy đến nhà hàng của chúng tôi để tham quan và kí hợp đồng</h3>
        </Modal>
      </div>
    </div>
  );
}
