import React, { useState, useEffect } from "react";
import { Divider, Table,Row,Col,Image,List,Card } from "antd";
import { get } from "../../httpHelper";
import logo from "../img/logo/logosmall.png";
import mc from "../img/content/mc.jpg";
const datahinhanh =[
  {
    image: "https://asiana-plaza.com/wp-content/uploads/2021/03/sanh-cuoi-dep-va-tot-nhat-1.jpg",
  },{
    image: "https://asiana-plaza.com/wp-content/uploads/2021/03/trang-tri-sanh-tiec-cuoi-dep-3.jpg",
  },{
    image:  "https://themirahotel.com.vn/wp-content/uploads/2019/09/Phongcachcuoi1-653x526.jpg",
  },{
    image: "https://whitelotus.com.vn/wp-content/uploads/2021/05/BIT_2967-1024x683.jpg",
  },{
    image: "https://voan.vn/wp-content/uploads/2019/04/trang-tri-sanh-tiec-cuoi-voi-hoa.jpg",
  },{
    image: "https://tochuctieccuoi.net/wp-content/uploads/2019/02/9.jpg",
  },{
    image: "https://kientrucroman.com.vn/wp-content/uploads/Cac-mau-sanh-tiec-trung-tam-tiec-cuoi-dep-li-tuong-cho-moi-cap-doi-2.jpg",
  },{
    image: "https://capellagallery.com/wp-content/uploads/2018/10/nha-hang-tiec-cuoi-sang-trong-nhat-tphcm-1.jpg",
  },{
    image: "https://grandpalace.com.vn/multidata/lnom1899_1.jpg",
  },{
    image: "https://i.imgur.com/lkPOcpZ.jpg",
  },{
    image: "https://asiana-plaza.com/wp-content/uploads/2021/03/trang-tri-sanh-cuoi-dep-va-sang-trong-1.jpg",
  },{
    image: "https://asiana-plaza.com/wp-content/uploads/2021/03/cach-trang-tri-tiec-cuoi-tai-nha-hang-1.jpg",
  },{
    image: "https://i.imgur.com/L8jscnB.jpg",
  },{
    image: "https://www.metropole.com.vn/uploads/news/362b55990548c3-3dff8f6fef152fview5.jpeg",
  },{
    image: "https://afamilycdn.com/150157425591193600/2020/7/21/10753656414323951169715494400285729160246129o-15953228874201126119583.jpg",
  },{
    image: "https://i.imgur.com/13ucMrl.jpg",
  },{
    image: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/dungtv/anh-bai-blog/top10nhahangtieccuoisangtrongtaihanoi/top-nha-hang-tiec-cuoi-sang-trong-ha-noi-2.jpg",
  },{
    image: "https://lh6.googleusercontent.com/sk-vDHleofi-7hLtzlqekzOCulWxnXz2zq8Uqur3ejnA746XKSk85ITRxdX1-3YERLiztpUX2X-Iynemd9qrteakwU44iX6m2eRFeNo6kxwC2HrkxnIVczwKS6zB5nlgnu6zSqgQ",
  },{
    image: "https://www.queenbee.com.vn/wp-content/uploads/S%E1%BA%A3nh-ti%E1%BB%87c-t%E1%BA%A7ng-2-queen-bee-2.jpg",
  },{
    image: "https://kientrucroman.com.vn/wp-content/uploads/Cac-mau-sanh-tiec-trung-tam-tiec-cuoi-dep-li-tuong-cho-moi-cap-doi-1.jpg",
  }
]
export default function SanhTiec() {
  const [valueST, setValueST] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  
  const columnsST = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "SẢNH",
      dataIndex: "sanh",
      key: "sanh",
    },
    {
      title: "KÍCH THƯỚC",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
    },
    {
      title: "DIỆN TÍCH",
      dataIndex: "dientich",
      key: "dientich",
    },
    {
      title: "QUẦY TRIỂN LÃM (2.4X3M)",
      dataIndex: "quaytrienlam",
      key: "quaytrienlam",
    },
    {
      title: "KIỂU BÀN TRÒN",
      dataIndex: "kieubantron",
      key: "kieubantron",
    },
    {
      title: "KIỂU BÀN DÀI",
      dataIndex: "kieubandai",
      key: "kieubandai",
    },
    {
      title: "KIỂU LỚP HỌC",
      dataIndex: "kieulophoc",
      key: "kieulophoc",
    },
    {
      title: "KIỂU RẠP HÁT",
      dataIndex: "kieuraphat",
      key: "kieuraphat",
    },
    {
      title: "VỊ TRÍ",
      dataIndex: "vitri",
      key: "vitri",
    },
  ];

  useEffect(() => {
    fetchST();
  }, []);

  const fetchST = () => {
    get(`/sanhtiec/`)
      .then((response) => {
        console.log(response?.data?.data);
        setValueST(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err ST: ", err);
      });
  };

  useEffect(() => {
    const _data = valueST?.map((item, index) => ({
      stt: index + 1,
      sanh: item?.tenSanhTiec,
      kichthuoc: item?.kichThuoc,
      dientich: item?.dienTich,
      quaytrienlam: item?.quayTrienLam,
      kieubantron: item?.kieuBanTron,
      kieubandai: item?.kieuBanDai,
      kieulophoc: item?.kieuLopHoc,
      kieuraphat: item?.kieuRapHat,
      vitri: item?.viTri,
    }));
    setDataTableST(_data);
  }, [valueST]);

  return (
    <div className="pagewrap">
      <div
        className="bannerchucnang"
        style={{
          backgroundImage:
            "url(https://www.theadora.vn/skin/front/adora/images/cac-trung-tam/gioi-thieu-cover-adora-center.jpg)",
        }}
      >
        <h1 className="titlemenu">Sảnh tiệc</h1>
      </div>
      <Divider orientation="center">
        TRUNG TÂM HỘI NGHỊ - TIỆC CƯỚI
        <p style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}>
          THE LUCKY CENTER
        </p>
      </Divider>

      <div class="clr"></div>
      {/* <div class="contentOne">
        <div class="pagewrap">
          <a href="" class="imgTwo">
            <span class="thumb">
              <img
                src={mc}
                alt="nhà hàng tổ chức tiệc cưới trọn gói tại tphcm"
              />
            </span>
          </a>
          <div class="textContent">
            <div class="titBox">
              <img src={logo} alt="SẢNH TIỆC" />
              <a href="" class="tit">
                <h2>
                  SẢNH TIỆC <strong style={{color:"orange"}}>HIỆN ĐẠI</strong> & <strong> HOÀNH TRÁNG</strong>
                </h2>
              </a>
            </div>
            <p class="ell">
              <div>
                Tọa lạc tại vị trí sầm uất, giao thoa nhiều quận huyện và cung
                đường huyết mạch của thành phố, The LUCKY Center là trung tâm
                chính với diện tích lớn nhất, cũng như sở hữu cơ sở vật chất
                hàng đầu được nhiều các doanh nghiệp trong nước và quốc tế uy
                tín lựa chọn là nơi ghi dấu những sự kiện thành công của mình.
                The LUCKY Center có tổng giá trị đầu tư, diện tích và quy mô lớn
                nhất trong thị trường yến tiệc tính đến thời điểm hiện tại.
              </div>
            </p>

          </div>
        </div>
      </div> */}
      <div className="promotionTabs">
        <div className="pagewrap">
          <a href="" class="item">
            SẢNH TIỆC HIỆN ĐẠI & HOÀNH TRÁNG
          </a>
        </div>
      </div>
      <div className="contentThucDon">
        <div className="pagewrap">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="quangcaodaubep">
                Tọa lạc tại vị trí sầm uất, giao thoa nhiều quận huyện và cung
                đường huyết mạch của thành phố, The LUCKY Center là trung tâm
                chính với diện tích lớn nhất, cũng như sở hữu cơ sở vật chất
                hàng đầu được nhiều các doanh nghiệp trong nước và quốc tế uy
                tín lựa chọn là nơi ghi dấu những sự kiện thành công của mình.
                The LUCKY Center có tổng giá trị đầu tư, diện tích và quy mô lớn
                nhất trong thị trường yến tiệc tính đến thời điểm hiện tại.
              </div>
            </Col>
            <Col span={12}>
              <div className="quangcaodaubep">
                Tọa lạc tại vị trí sầm uất, giao thoa nhiều quận huyện và cung
                đường huyết mạch của thành phố, The LUCKY Center là trung tâm
                chính với diện tích lớn nhất, cũng như sở hữu cơ sở vật chất
                hàng đầu được nhiều các doanh nghiệp trong nước và quốc tế uy
                tín lựa chọn là nơi ghi dấu những sự kiện thành công của mình.
                The LUCKY Center có tổng giá trị đầu tư, diện tích và quy mô lớn
                nhất trong thị trường yến tiệc tính đến thời điểm hiện tại.
              </div>
            </Col>
          </Row>
          <div className="setThucDonYeuThich">
            <div
              class="slogan"
              style={{ marginTop: "40px", paddingBottom: "50px" }}
            >
              <span>Sảnh tiệc rực rỡ dành cho bạn</span>
            </div>
            <h3>Trải nghiệm tinh tế bằng mắt trọn vẹn</h3>
          </div>
          <List
            grid={{ gutter: [16, 0], column: 4 }}
            dataSource={datahinhanh}
            renderItem={(item) => (
              <List.Item>
                <Card style={{ border: "none" }}>
                  <Image
                    style={{ objectFit: "cover" }}
                    width={250}
                    height={250}
                    src={item.image}
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Divider orientation="left">SƠ ĐỒ TẦNG</Divider>
      <div
        className="hinhbanner"
        style={{
          backgroundImage:
            "url(https://www.theadora.vn/skin/front/adora/images/cac-trung-tam/so-do-adora-center.jpg)",
        }}
      ></div>
      <Divider orientation="left">CAPACITY/ SET-UP</Divider>
      <Table columns={columnsST} dataSource={dataTableST} />
    </div>
  );
}
