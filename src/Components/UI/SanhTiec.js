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
      title: "S???NH",
      dataIndex: "sanh",
      key: "sanh",
    },
    {
      title: "K??CH TH?????C",
      dataIndex: "kichthuoc",
      key: "kichthuoc",
    },
    {
      title: "DI???N T??CH",
      dataIndex: "dientich",
      key: "dientich",
    },
    {
      title: "QU???Y TRI???N L??M (2.4X3M)",
      dataIndex: "quaytrienlam",
      key: "quaytrienlam",
    },
    {
      title: "KI???U B??N TR??N",
      dataIndex: "kieubantron",
      key: "kieubantron",
    },
    {
      title: "KI???U B??N D??I",
      dataIndex: "kieubandai",
      key: "kieubandai",
    },
    {
      title: "KI???U L???P H???C",
      dataIndex: "kieulophoc",
      key: "kieulophoc",
    },
    {
      title: "KI???U R???P H??T",
      dataIndex: "kieuraphat",
      key: "kieuraphat",
    },
    {
      title: "V??? TR??",
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
        <h1 className="titlemenu">S???nh ti???c</h1>
      </div>
      <Divider orientation="center">
        TRUNG T??M H???I NGH??? - TI???C C?????I
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
                alt="nh?? h??ng t??? ch???c ti???c c?????i tr???n g??i t???i tphcm"
              />
            </span>
          </a>
          <div class="textContent">
            <div class="titBox">
              <img src={logo} alt="S???NH TI???C" />
              <a href="" class="tit">
                <h2>
                  S???NH TI???C <strong style={{color:"orange"}}>HI???N ?????I</strong> & <strong> HO??NH TR??NG</strong>
                </h2>
              </a>
            </div>
            <p class="ell">
              <div>
                T???a l???c t???i v??? tr?? s???m u???t, giao thoa nhi???u qu???n huy???n v?? cung
                ???????ng huy???t m???ch c???a th??nh ph???, The LUCKY Center l?? trung t??m
                ch??nh v???i di???n t??ch l???n nh???t, c??ng nh?? s??? h???u c?? s??? v???t ch???t
                h??ng ?????u ???????c nhi???u c??c doanh nghi???p trong n?????c v?? qu???c t??? uy
                t??n l???a ch???n l?? n??i ghi d???u nh???ng s??? ki???n th??nh c??ng c???a m??nh.
                The LUCKY Center c?? t???ng gi?? tr??? ?????u t??, di???n t??ch v?? quy m?? l???n
                nh???t trong th??? tr?????ng y???n ti???c t??nh ?????n th???i ??i???m hi???n t???i.
              </div>
            </p>

          </div>
        </div>
      </div> */}
      <div className="promotionTabs">
        <div className="pagewrap">
          <a href="" class="item">
            S???NH TI???C HI???N ?????I & HO??NH TR??NG
          </a>
        </div>
      </div>
      <div className="contentThucDon">
        <div className="pagewrap">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="quangcaodaubep">
                T???a l???c t???i v??? tr?? s???m u???t, giao thoa nhi???u qu???n huy???n v?? cung
                ???????ng huy???t m???ch c???a th??nh ph???, The LUCKY Center l?? trung t??m
                ch??nh v???i di???n t??ch l???n nh???t, c??ng nh?? s??? h???u c?? s??? v???t ch???t
                h??ng ?????u ???????c nhi???u c??c doanh nghi???p trong n?????c v?? qu???c t??? uy
                t??n l???a ch???n l?? n??i ghi d???u nh???ng s??? ki???n th??nh c??ng c???a m??nh.
                The LUCKY Center c?? t???ng gi?? tr??? ?????u t??, di???n t??ch v?? quy m?? l???n
                nh???t trong th??? tr?????ng y???n ti???c t??nh ?????n th???i ??i???m hi???n t???i.
              </div>
            </Col>
            <Col span={12}>
              <div className="quangcaodaubep">
                T???a l???c t???i v??? tr?? s???m u???t, giao thoa nhi???u qu???n huy???n v?? cung
                ???????ng huy???t m???ch c???a th??nh ph???, The LUCKY Center l?? trung t??m
                ch??nh v???i di???n t??ch l???n nh???t, c??ng nh?? s??? h???u c?? s??? v???t ch???t
                h??ng ?????u ???????c nhi???u c??c doanh nghi???p trong n?????c v?? qu???c t??? uy
                t??n l???a ch???n l?? n??i ghi d???u nh???ng s??? ki???n th??nh c??ng c???a m??nh.
                The LUCKY Center c?? t???ng gi?? tr??? ?????u t??, di???n t??ch v?? quy m?? l???n
                nh???t trong th??? tr?????ng y???n ti???c t??nh ?????n th???i ??i???m hi???n t???i.
              </div>
            </Col>
          </Row>
          <div className="setThucDonYeuThich">
            <div
              class="slogan"
              style={{ marginTop: "40px", paddingBottom: "50px" }}
            >
              <span>S???nh ti???c r???c r??? d??nh cho b???n</span>
            </div>
            <h3>Tr???i nghi???m tinh t??? b???ng m???t tr???n v???n</h3>
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
      <Divider orientation="left">S?? ????? T???NG</Divider>
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
