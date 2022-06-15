import React from 'react'
import { List, Card, Button, Image, Modal } from 'antd';

const { Meta } = Card;
const datahinh = [
  {
    image: 'https://floweraura-blog-img.s3.ap-south-1.amazonaws.com/Flower-Gift/dazzle-up-summer-wedding-with-beautiful-flower-decore-cover-picture.jpg',
  },
  {
    image: 'https://cungxuan.vn/wp-content/uploads/2020/08/4.jpg',
  },
  {
    image: 'https://bvhttdl.mediacdn.vn/291773308735864832/2021/5/11/168d5130629t471l6-7-1-1620726078417-16207260793881874006997.jpg',
  },
  {
    image: 'https://i.ytimg.com/vi/4dsTzKN2Z64/maxresdefault.jpg',
  },
  {
    image: 'https://image.thanhnien.vn/1200x630/Uploaded/2022/uqvpvowk/2021_01_11/vov_2666_cjve.jpg',
  },
  {
    image: 'https://minhvumedia.vn/wp-content/uploads/cho-thue-phong-bat-min.jpg',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvmYERvT_4nhn9EcUPNcIF6csg0PhU4PXgyw&usqp=CAU',
  },
  {
    image: 'https://cungxuan.vn/wp-content/uploads/2020/08/4.jpg',
  },
  {
    image: 'https://leanhtien.net/wp-content/uploads/2020/12/108.jpg',
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-1.jpg',
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-2.jpg',
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-3.jpg',
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-4.jpg'
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-5.jpg'
  },
  {
    image: 'https://anhvienmimosa.com/wp-content/uploads/2020/12/san-khau-dam-cuoi-6.jpg'
  },


  {
    image: 'https://riversidepalace.vn/resizemultidata/2-574.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/3-149.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/4-623.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/5-962.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/8-182.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/10-580.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/45163617_2564689183560318_2834244310130491392_n.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/45134456_2564687483560488_7139114666843701248_n.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/01-599.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/03-650.jpg',
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/44981039_2564688910227012_3331709580089491456_n.jpg'
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/riverside-7881.png'
  },
  {
    image: 'https://riversidepalace.vn/resizemultidata/riverside-7881.png'
  },
]

export default function Thuvien() {
  return (
    <div>
      <div className='bannerchucnang' style={{backgroundImage: "url(https://riversidepalace.vn/multidata/1-621.jpg)"}}>
          <h1 className='titlemenu'>Thư viện</h1>
      </div>
      <div className='promotionTabs'>
        <div className='pagewrap'>
          <a href="" class="item">Hình ảnh tại Lucky Center</a>
        </div>
      </div>
      <div className='pagewrap'>
      <List
          style={{margin: '0 -10px'}}
          grid={{ gutter: [12,30], column: 3 }}
          dataSource={datahinh}
          renderItem={item => (
            <List.Item>
              <Image width={"27em"} height={"20em"} src={item.image}/>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
