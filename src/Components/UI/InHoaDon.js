import React, { useState, useEffect } from "react";
import moment from "moment";
import logo from "../../Components/img/menu/logo.png";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Table,
  Checkbox,
  Modal,
  Divider,
  Result,
  Image,
  Row,
  Col,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import { SearchOutlined } from "@ant-design/icons";
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
const columnsPDT = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Ngày tổ chức",
    dataIndex: "ngaytochuc",
    key: "ngaytochuc",
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
    title: "Thành tiền",
    dataIndex: "thanhtien",
    key: "thanhtien",
  },
];
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

export default function InHoaDon() {
  const [valuenull, setValuenull] = useState({});
  const [valueKH, setValueKH] = useState([]);
  const [ntc, setntc] = useState("");
  const [ndt, setndt] = useState("");
  const [ns, setns] = useState("");
  const [nlhd, setnlhd] = useState("");

  const [editName, setEditName] = useState(valueKH?.tenKhachHang);
  const [dob, setDob] = useState(valueKH?.ngaySinh);
  const [gender, setGender] = useState(valueKH?.gioiTinh);
  const [emailkhachhang, setEmail] = useState(valueKH?.email);
  const [radioValue, setRadioValue] = useState();
  const [dulieuPDT, setDulieuPDT] = useState([]);
  const [dulieuDV, setDulieuDV] = useState([]);
  const [dulieuST, setDulieuST] = useState([]);
  const [dulieuMA, setDulieuMA] = useState([]);
  const [dulieuNV, setDulieuNV] = useState([]);

  const [valueLHSK, setValueLHSK] = useState([]);
  const [valueHD, setValueHD] = useState(null);
  const [valueCTHD, setValueCTHD] = useState(null);

  const [dataTableDV, setDataTableDV] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [dataTableMA, setDataTableMA] = useState([]);
  const [valueTD, setValueTD] = useState([]);

  useEffect(() => {
    fetchKH();
    fetchLHSK();
    fetchPDT();
    //printBill();
  }, []);

  const printBill = () => {
    // sleep(5000);
    window.print();
  };

  //   const sleep =(ms)=>{
  //     return new Promise(resolve => setTimeout(resolve, ms));
  //   }
  const fetchNV = async (e) => {
    const maNV = parseInt(e);

    await get(`/nhanvien/${maNV}`)
      .then((response) => {
         
         setDulieuNV(response?.data?.data.tenNhanVien);

        
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  useEffect(() => {
    const _data = dulieuDV?.map((item, index) => ({
      stt: index + 1,
      tendichvu: item?.tenDichVu,
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
        dongia: dulieuST?.donGia != null ? themPhayVaoSo(dulieuST?.donGia): "",
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
        if (response?.data?.data != null) {
          getHD(response?.data?.data.maHoaDon);
          var nglhd = "" + response?.data?.data.ngayLapHoaDon;
          setnlhd(nglhd.slice(0, 10));
        } else {
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
        fetchNV(response?.data?.data.maNhanVien);
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
  };
  const fetchKH = async (e) => {
    const maKH = "" + localStorage.getItem("maKHinHD").trim();

    await get(`/khachhang/${maKH}`)
      .then((response) => {
        setValueKH(response?.data?.data);
        // console.log(response?.data?.data.maKhachHang);
        //localStorage.setItem("maKhachHang", response?.data?.data.maKhachHang);

        //console.log("KH ", response);
        var ngs = "" + response?.data?.data.ngaySinh;
        setns(ngs.slice(0, 10));
         
        localStorage.removeItem("maKHinHD");
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
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchPDT = async (e) => {
    const maPDT = "" + localStorage.getItem("maPDTinHD").trim();
    await get(`/phieudattiec/${maPDT}`)
      .then((response) => {
        // console.log("pdt la",response?.data?.data);
        var ngdt = "" + response?.data?.data.ngayDatTiec;
        setndt(ngdt.slice(0, 10));
        var ngtc = "" + response?.data?.data.ngayToChuc;
        setntc(ngtc.slice(0, 10));
        setDulieuPDT(response?.data?.data);
        showDetailDV(response?.data?.data.maTapDichVu);
        getSanhTiec(response?.data?.data.maSanhTiec);
        getThucDon(response?.data?.data.maThucDon);
        getMATheoTD(response?.data?.data.maThucDon);
        getCTHD(response?.data?.data.maPhieuDatTiec);
        localStorage.removeItem("maPDTinHD");
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    return chuoi;
  }

  return (
    <div className="pagewrapinhd" style={{ width: "1000px !important" }}>
      <Button type="primary" id="printPageButton" onClick={(e) => printBill()}>
        In hóa đơn
      </Button>
      <br></br>
      <Row>
        <Col span={24}>
          <Image width={300} src={logo} preview={false} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ float: "left" }}>
            <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
              CÔNG TY TNHH ĐẠT Ý
            </h5>
            <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
              NHÀ HÀNG TIỆC CƯỚI & HỘI NGHỊ LUCKY CENTER
            </h5>
          </div>
          <div style={{ float: "right", textAlign: "center" }}>
            <h5 style={{ fontWeight: "bold" }}>
              CỘNG HÒA XÃ HỘI-CHỦ NGHĨA-VIỆT NAM
            </h5>
            <h5 style={{ fontWeight: "bold" }}>Độc lập-Tự do-Hạnh phúc</h5>
          </div>
        </Col>
      </Row>
      <div>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          HỢP ĐỒNG ĐẶT TIỆC NHÀ HÀNG LUCKY CENTER
        </h1>
        <h5>
          - Căn cứ vào Bộ Luật Dân sự và Bộ Luật Thương mại của Nước Cộng Hòa Xã
        </h5>
        <h5>Hội Chủ Nghĩa Việt Nam được Quốc hội thông qua ngày 14/06/2005</h5>
        <h5>- Căn cứ chức năng nhiệm vụ, khả năng và nhu cầu của hai bên</h5>
        <h5>
          Hôm nay ngày{" "}
          {valueCTHD == null ? "" : valueCTHD.ngayLapHoaDon.slice(8, 10)} tháng{" "}
          {valueCTHD == null ? "" : valueCTHD.ngayLapHoaDon.slice(5, 7)} năm{" "}
          {valueCTHD == null ? "" : valueCTHD.ngayLapHoaDon.slice(0, 4)}
        </h5>
      </div>
      <h2 style={{ fontWeight: "bold" }}>
        BÊN A: CÔNG TY TNHH ĐẠT Ý TRUNG TÂM HỘI NGHỊ VÀ TIỆC CƯỚI LUCKY CENTER
      </h2>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thông tin nhà hàng
      </Divider>
      <div className="chitiet">
        <h8>
          Đại diện: <strong>{dulieuNV==null?"":dulieuNV}</strong>
        </h8>

        <h8>
          Chức vụ: <strong>Sale</strong>
        </h8>

        <h8>
          Điện thoại: <strong>0905065523</strong>
        </h8>

        <h8>Fax:</h8>
        <h8>
          Địa chỉ:{" "}
          <strong>
            9999 Trường Chinh, P.14, Quận Tân Bình, TP.Hồ Chí Minh
          </strong>
        </h8>
      </div>
      <h2 style={{ fontWeight: "bold" }}>BÊN B: BÊN ĐẶT TIỆC</h2>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thông tin khách hàng
      </Divider>
      <div className="chitiet">
        <h8>
          Tên khách hàng: <strong>{valueKH.tenKhachHang}</strong>
        </h8>

        <h8>
          Email: <strong>{valueKH.email}</strong>
        </h8>

        <h8>
          Ngày sinh: <strong>{ns}</strong>
        </h8>

        <h8>
          Giới tính: <strong>{valueKH.gioiTinh == 1 ? "Nam" : "Nữ"}</strong>
        </h8>
        <h8>
          Số điện thoại: <strong>{valueKH.sdt}</strong>
        </h8>
        <h8>
          Loại khách hàng:{" "}
          <strong>{valueKH.vangLai == 0 ? "Thân thiết" : "Vãng lai"}</strong>
        </h8>
      </div>
      <h2 style={{ fontWeight: "bold" }}>I. NỘI DUNG BUỔI TIỆC</h2>
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thông tin hóa đơn đã đặt
      </Divider>
      <div class="chitiet">
        <h8>
          Mã Phiếu đặt tiệc:{" "}
          <strong>
            {dulieuPDT == null ? "" : "PDT00" + dulieuPDT.maPhieuDatTiec}
          </strong>
        </h8>
        <h8>
          Số bàn:{" "}
          <strong>{dulieuPDT == null ? "" : dulieuPDT.soLuongBan}</strong>
        </h8>
        <h8>
          Buổi đặt tiệc:{" "}
          <strong>
            {dulieuPDT == null
              ? ""
              : dulieuPDT.buoi == "TOI"
              ? "Tối (5h-9h)"
              : "Trưa (9h- 14h)"}
          </strong>
        </h8>
        <h8>
          Ngày đặt tiệc: <strong>{dulieuPDT == null ? "" : ndt}</strong>
        </h8>
        <h8>
          Ngày tổ chức: <strong>{dulieuPDT == null ? "" : ntc}</strong>
        </h8>
        <h8>
          Ghi chú: <strong>{dulieuPDT == null ? "" : dulieuPDT.ghiChu}</strong>{" "}
        </h8>
      </div>

      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Chi tiết hóa đơn
      </Divider>

      <div class="chitiet">
        <h8>
          Mã hóa đơn:{" "}
          <strong>{valueHD == null ? "" : "HD00" + valueHD.maHoaDon}</strong>
        </h8>
        <h8>
          Thành tiền:{" "}
          <strong>
            {valueCTHD == null
              ? ""
              : themPhayVaoSo(valueCTHD.thanhTien) + " VND"}
          </strong>
        </h8>
        <h8>
          Tổng tiền:{" "}
          <strong>
            {valueCTHD == null
              ? ""
              : themPhayVaoSo(valueCTHD.tongTien) + " VND"}
          </strong>
        </h8>
        <h8>
          Tiền cọc:{" "}
          <strong>
            {valueCTHD == null ? "" : themPhayVaoSo(valueCTHD.tienCoc) + " VND"}
          </strong>
        </h8>
        <h8>
          Tiền phát sinh:{" "}
          <strong>
            {valueCTHD == null
              ? ""
              : themPhayVaoSo(valueCTHD.tienPhatSinh) + " VND"}
          </strong>
        </h8>
        <h8>
          Tiền khách đưa:{" "}
          <strong>
            {valueCTHD == null
              ? ""
              : themPhayVaoSo(valueCTHD.tienKhachDua) + " VND"}
          </strong>
        </h8>
        <h8>
          Tiền thối lại:{" "}
          <strong>
            {valueCTHD == null
              ? ""
              : themPhayVaoSo(valueCTHD.tienThoi) + " VND"}
          </strong>
        </h8>
        <h8>
          VAT: <strong>{valueCTHD == null ? "" : valueCTHD.vat}</strong>{" "}
        </h8>
      </div>

      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Dịch vụ
      </Divider>
      <Table
        columns={columnsDV}
        dataSource={dataTableDV}
        pagination={false}
        size={"small"}
      />

      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Sảnh tiệc
      </Divider>
      <Table
        columns={columnsST}
        dataSource={dataTableST}
        pagination={false}
        size={"small"}
      />

      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thực đơn
      </Divider>
      <div class="chitiet">
        <h8>Mã thực đơn: {valueTD?.maThucDon}</h8>
        <h8>Tên thực đơn: {valueTD?.tenThucDon}</h8>
        <h8>Set thực đơn: {valueTD?.setThucDon}</h8>
        <h8>
          Đơn giá:{" "}
          <strong>
            {valueTD?.donGia == null
              ? ""
              : themPhayVaoSo(valueTD?.donGia) + " VND"}
          </strong>
        </h8>
      </div>
      <Table
        columns={columnsMA}
        dataSource={dataTableMA}
        pagination={false}
        size={"small"}
      />
      <h2 style={{ fontWeight: "bold" }}>II. DỊCH VỤ KHUYẾN MÃI BÊN A</h2>
      <h4 style={{ textAlign: "left" }}>
        -Áp dụng chương trình đặt 10 bàn tặng 1 bàn.<br></br>
        -Dịch vụ MC, cổng hoa trước phòng tiệc được nhà hàng cung cấp hoàn toàn
        miễn phí.
      </h4>
      <h2 style={{ fontWeight: "bold" }}>III. TRÁCH NHIỆM CỦA MỖI BÊN</h2>
      <h3 style={{ fontWeight: "bold" }}>BÊN A:</h3>
      <h4 style={{ textAlign: "left" }}>
        -Bảo đảm chất lượng vệ sinh an toàn thực phẩm.<br></br>
        -Phục vụ khách hàng văn minh, lịch sự, an toàn trong thời gian khách đến
        dự tiệc tại nhà hàng.
      </h4>
      <h3 style={{ fontWeight: "bold" }}>BÊN B:</h3>
      <h4 style={{ textAlign: "left" }}>
        -Tổ chức và mời khách đến dự tiệc tại nhà hàng của{" "}
        <strong>Bên A</strong> lịch sự văn minh theo đúng thỏa thuận.<br></br>
        -Cử người đại diện theo dõi và ký xác nhận các khoản phát sinh trong và
        sau buổi tiệc.<br></br>
        -Trường hợp đã đặt tiệc mà khách của <strong>Bên B</strong> không đến đủ
        thì <strong>Bên B</strong> vẫn phải thanh toán toàn bộ chi phí các
        khoảng đã thỏa thuận và sử dụng trong buổi tiệc.<br></br>
        -Chịu trách nhiệm bồi thường hoàn toàn bộ giá trị các vật dụng bể vỡ xảy
        ra trong buổi tiệc (Nếu có).
      </h4>
      <h2 style={{ fontWeight: "bold" }}>IV. HÌNH THỨC THANH TOÁN: Tiền mặt</h2>
      <h4 style={{ textAlign: "left" }}>
        -<strong>Lần 1</strong>: Sau khi đã xác nhận thực đơn sảnh tiệc (trước
        tiệc 7 ngày)<strong> Bên B</strong> phải đặt cọc cho{" "}
        <strong>Bên A </strong>
        50% tổng giá trị được ước tính cho bữa tiệc.<br></br>
        -Số tiền là:{" "}
        <strong>
          {valueCTHD?.tienCoc == null ? "" : themPhayVaoSo(valueCTHD?.tienCoc)}
        </strong>{" "}
        (Bằng chữ: {valueCTHD?.tienCoc == null ? "" : docso(valueCTHD?.tienCoc)}
        ) (đã thanh toán).<br></br>-<strong>Lần 2</strong>: Sau khi bữa tiệc
        hoàn thành<strong> Bên B</strong> phải thanh toán cho{" "}
        <strong>Bên A </strong>
        50% tổng giá trị được ước tính còn lại và chi phí phát sinh (nếu có) cho
        bữa tiệc.<br></br>
        -Số tiền phát sinh là:{" "}
        <strong>
          {valueCTHD?.tienPhatSinh == null
            ? ""
            : themPhayVaoSo(valueCTHD?.tienPhatSinh)}
        </strong>{" "}
        (Bằng chữ:{" "}
        {valueCTHD?.tienPhatSinh == null ? "" : docso(valueCTHD?.tienPhatSinh)})
        (đã thanh toán).<br></br>
        -Số tiền phải trả còn lại là:{" "}
        <strong>
          {valueCTHD?.tienCoc == null
            ? ""
            : themPhayVaoSo(valueCTHD?.thanhTien * 0.5)}
        </strong>{" "}
        (Bằng chữ:{" "}
        {valueCTHD?.tienCoc == null ? "" : docso(valueCTHD?.thanhTien * 0.5)})
        (đã thanh toán).<br></br>
        -Số tiền tổng là:{" "}
        <strong>
          {valueCTHD?.tongTien == null
            ? ""
            : themPhayVaoSo(valueCTHD?.tongTien)}
        </strong>{" "}
        (Bằng chữ:{" "}
        {valueCTHD?.tongTien == null ? "" : docso(valueCTHD?.tongTien)}) (đã
        thanh toán).<br></br>
        -Số tiền phải trả còn lại là:{" "}
        <strong>
          {valueCTHD?.tienCoc == null
            ? ""
            : themPhayVaoSo(
                valueCTHD?.thanhTien * 0.5 + valueCTHD?.tienPhatSinh
              )}
        </strong>{" "}
        (Bằng chữ:{" "}
        {valueCTHD?.tienCoc == null
          ? ""
          : docso(valueCTHD?.thanhTien * 0.5 + valueCTHD?.tienPhatSinh)}
        ) (đã thanh toán).<br></br>
      </h4>
      <h2 style={{ fontWeight: "bold" }}>V. XÁC NHẬN CỦA HAI BÊN</h2>
      <Row>
        <Col span={8}>
          <div style={{ float: "left", marginLeft:"50px",textAlign: "center"}}>
            <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
              Khách hàng đặt cọc
            </h5>
            <h5 style={{ textAlign: "center", textDecoration: "italic" }}>
              (Ký và ghi rõ họ tên)
            </h5>
          </div></Col>
          <Col span={8}>
          <div style={{ float: "center", textAlign: "center" }}>
            <h5 style={{ fontWeight: "bold" }}>Khách hàng thanh toán</h5>
            <h5 style={{ textAlign: "center", textDecoration: "italic" }}>
              (Ký và ghi rõ họ tên)
            </h5>
          </div></Col>
          <Col span={7}>
          <div style={{ float: "right", textAlign: "center" }}>
            <h5 style={{ fontWeight: "bold" }}>Đại diện nhà hàng</h5>
            <h5 style={{ textAlign: "center", textDecoration: "italic" }}>
              (Ký và ghi rõ họ tên)
            </h5>
          </div>
        </Col>
      </Row>
    </div>
  );
}
