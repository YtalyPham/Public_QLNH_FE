import React from 'react'
import { List, Avatar, Space,Card } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '',
    title: `Tin tức ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const listDataTinTuc = [
  {
    href: '../../tintuc01',
    title: 'CHỌN THỰC ĐƠN TIỆC CƯỚI HỢP KHẨU VỊ KHÁCH MỜI',
    content: 'Một trong những yếu tố để gây ấn tượng cho khách mời trong tiệc cưới đó chính là thực đơn. Thực đơn tiệc cưới đóng vai trò quan trọng xuyên suốt quá trình diễn ra lễ cưới của đôi bạn. Chính vì vậy, cô dâu chú rể cần cân nhắc chọn những món cho thật phù hợp với khẩu vị chung của các quan khách nhé.',
    img: 'https://riversidepalace.vn/multidata/thuc-doi-tiec-cuoi-riversideplace1-0.jpg',
  },
  {
    href: '../../tintuc02',
    title: 'TỔ CHỨC TIỆC CƯỚI THEO PHONG CÁCH NHẸ NHÀNG VỚI HOA BABY',
    content: 'Trong những địa điểm tổ chức tiệc cưới, cô dâu thường yêu thích những loài hoa tinh khôi và thuần khiết nhưng vẫn đậm vẻ ngọt ngào, điển hình là loài hoa baby, với chiếc bông màu trắng nhỏ xíu, tạo nên vẻ nên thơ và nhẹ nhàng cho ngày trọng đại.',
    img: 'https://riversidepalace.vn/multidata/hoa-baby-1-hc.jpg',
  },
  {
    href: '../../tintuc03',
    title: 'TỔ CHỨC TIỆC CƯỚI THEO PHONG CÁCH MÀU TÍM LẴNG MẠNG',
    content: 'Các cô dâu thường có những sở thích đặc biệt và mong muốn được áp dụng trong tiệc cưới của mình, điển hình là sự yêu thích màu sắc, loài hoa và con vật. Về màu sắc, có một màu rất dễ gây nghiện cho các cô gái có cá tính đặc biệt, đó chính là màu tím.',
    img: '	https://riversidepalace.vn/multidata/tiec-cuoi-mau-tim.jpg',
  },
  {
    href: '../../tintuc04',
    title: 'MỘT SỐ LOẠI HOA TRANG TRÍ TRONG DỊP ĐẶT TIỆC CƯỚI MÙA XUÂN',
    content: 'Mùa xuân là mùa đẹp nhất năm bởi trăm hoa khoe sắc, những sự kiện tươi vui thường được diễn ra vào mùa này trong năm, trong đó không thể không nhắc đến mùa cưới. Với mùa xuân , các cặp đôi có thể dễ dàng lựa chọn loại hoa trang trí chủ đạo bởi vào đây là mùa hoa nở nhiều nhất trong năm. Vậy những loài hoa nào được áp dụng cho tổ chức tiệc cưới mùa xuân? Hãy cùng nhà hàng tiệc cưới LuckyCenter xem những gợi ý...',
    img: 'https://riversidepalace.vn/multidata/tiec-cuoi-mua-xuan-2-hc.jpg',
  },
  {
    href: '../../tintuc05',
    title: 'NHỮNG GAM MÀU NỔI BẬT DÀNH CHO TIỆC CƯỚI MÙA XUÂN',
    content: 'Với không khí tươi tắn và rựa rỡ của mùa xuân nên nhiều cặp đôi lựa chọn sẽ tổ chức tiệc cưới vào thời điểm này trong năm. Như bắt đầu một cuộc sống mới vào điểm khởi đầu một năm đầy hân hoan.',
    img: 'https://riversidepalace.vn/multidata/gam-mau-noi-bat-4-hc.jpg',
  },
  {
    href: '../../tintuc06',
    title: 'TRANG TRÍ NHÀ HÀNG TIỆC CƯỚI VỚI MÀU TRẮNG SANG TRỌNG',
    content: 'Hôm nay nhà hàng tiệc cưới Riverside Palace sẽ giới thiệu đến các bạn một gam màu luôn luôn được sử dụng trong những sự kiện quan trọng, toát lên vẻ đơn giản nhưng không kém phần thanh lịch và quý phái. Đó chính là màu trắng.',
    img: 'https://riversidepalace.vn/multidata/trang-tri-tiec-cuoi-mau-trang.jpg',
  },
  {
    href: '../../tintuc07',
    title: 'TỔ CHỨC TIỆC CƯỚI HÀI HÒA CÙNG HOA LÁ',
    content: 'Tiệc cưới ngoài trời hiện nay đang được rất nhiều cặp đôi ưa chuộng và lựa chọn, tuy nhiên không phải ai cũng có đủ khả năng về tài chính cũng như phụ thuộc những yếu tố khách quan, ví dụ như ảnh hưởng của thời tiết vào thời điểm tổ chức tiệc cưới.',
    img: 'https://riversidepalace.vn/multidata/1-319.jpg',
  },
  {
    href: '../../tintuc08',
    title: 'TỔ CHỨC TIỆC CƯỚI VỚI SẮC ĐỎ QUYẾN RŨ TẠI NHÀ HÀNG TIỆC CƯỚI TP.HCM',
    content: 'Trong ngày trọng đại của các cặp đôi, màu đỏ sử dụng cho bữa tiệc cưới được xem như là màu là của sự may mắn và thịnh vượng. Chính vì điều đó mà việc sử dụng màu đỏ cho bữa tiệc tại các nhà hàng tiệc cưới Tp.HCM không còn xa lạ đối với các cặp đôi.',
    img: '	https://riversidepalace.vn/multidata/sac-do-quyen-ru-4-hc.jpg',
  },
  {
    href: '../../tintuc09',
    title: 'XU HƯỚNG TRANG TRÍ TIỆC CƯỚI THEO PHONG CÁCH RUSTIC MỘC MẠC',
    content: 'Phong cách tiệc cưới Rustic đang có xu hướng thịnh hành trong những năm gần đây, với hình thức mộc mạc, đơn giản nhưng vẫn toát lên vẻ tinh khôi, trong lành cho bữa tiệc cưới của bạn.',
    img: 'https://riversidepalace.vn/multidata/tiec-cuoi-rustic.jpg',
  },
  {
    href: '../../tintuc10',
    title: 'NHỮNG PHỤ KIỆN LÀM KHÔNG GIAN TIỆC CƯỚI TRỞ NÊN LỘNG LẪY HƠN',
    content: 'Tổ chức tiệc cưới luôn là sự kiện trọng đại của đời người, chính vì vậy để giúp cô dâu chú rể có được những khoảnh khắc và hình ảnh trọn vẹn cho ngày vui của mình, các nhà hàng tiệc cưới HCM luôn cố gắng trang hoàng cho không gian diễn ra buổi lễ thật lộng lẫy.',
    img: 'https://riversidepalace.vn/multidata/img_1926-[max-width-1024-max-height-768].jpg',
  },
]

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Tintuc() {
  return (
    <div>
      <div className='bannerchucnang' style={{backgroundImage: "url(https://riversidepalace.vn/multidata/1-621.jpg)"}}>
          <h1 className='titlemenu'>Tin tức</h1>
      </div>
      <div className='pagenews' style={{textAlign: 'left'}}>
        <div className='pagewrap'>
          <div className='listNews'>
            <List
              style={{padding: '0'}}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={listDataTinTuc}
              footer={
                <div>
                </div>
              }
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={
                    <a href={item.href}>
                      <img
                        width={272}
                        alt="logo"
                        src={item.img}
                      />
                    </a>

                  }
                >
                  <div className='newscontent'>
                  <a href={item.href} >{item.title}</a>
                  <p>{item.content}</p>
                  </div>

                </List.Item>
              )}
            />,
          </div>
        </div>
      </div>
    </div>
  )
}
