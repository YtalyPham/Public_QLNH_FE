import { Col, Row } from "antd";
import React from "react";
import { List, Card, Button, Image, Modal } from "antd";
const datahinh = [
  {
    image: "https://riversidepalace.vn/resizemultidata/b.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/a.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/1-101.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/c.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/d.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/e.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/banh-kem-huong-nhan.png",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/chocolate-fondant.png",
  },

  {
    image: "https://riversidepalace.vn/resizemultidata/b.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/a.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/1-101.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/c.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/d.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/e.jpg",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/banh-kem-huong-nhan.png",
  },
  {
    image: "https://riversidepalace.vn/resizemultidata/chocolate-fondant.png",
  },
];

export default function Thucdon() {
  return (
    <div>
      <div
        className="bannerchucnang"
        style={{
          backgroundImage:
            "url(https://riversidepalace.vn/multidata/1-621.jpg)",
        }}
      >
        <h1 className="titlemenu">Thực đơn</h1>
      </div>
      <div className="promotionTabs">
        <div className="pagewrap">
          <a href="" class="item">
            Thực đơn tiệc cưới phong phú
          </a>
        </div>
      </div>
      <div className="contentThucDon">
        <div className="pagewrap">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="quangcaodaubep">
                Trung tâm hội nghị tiệc cưới LuckyCenter nơi hội tự những đầu
                bếp giàu kinh nghiệm, tay nghề cao, tâm huyết sẽ mang đến cho
                buổi tiệc của bạn những món ăn ngon, hấp dẫn, đẳng cấp nhât.
                Không ngừng sáng tạo, đội ngũ đầu bếp tại LuckyCenter luôn tìm
                ra những công thức mới tạo nên sự đa dạng trong cách bày trí
                cũng như hương vì của từng món ăn.
              </div>
            </Col>
            <Col span={12}>
              <div className="quangcaodaubep">
                Trung tâm hội nghị tiệc cưới LuckyCenter nơi hội tự những đầu
                bếp giàu kinh nghiệm, tay nghề cao, tâm huyết sẽ mang đến cho
                buổi tiệc của bạn những món ăn ngon, hấp dẫn, đẳng cấp nhât.
                Không ngừng sáng tạo, đội ngũ đầu bếp tại LuckyCenter luôn tìm
                ra những công thức mới tạo nên sự đa dạng trong cách bày trí
                cũng như hương vì của từng món ăn.
              </div>
            </Col>
          </Row>
          <div className="setThucDonYeuThich">
            <div
              class="slogan"
              style={{ marginTop: "40px", paddingBottom: "50px" }}
            >
              <span>Set Thực đơn yêu thích của bạn</span>
            </div>
            <h3>Trải nghiệm tinh tế bằng mắt trọn vẹn</h3>
          </div>
          <List
            grid={{ gutter: [16, 0], column: 4 }}
            dataSource={datahinh}
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
    </div>
  );
}
