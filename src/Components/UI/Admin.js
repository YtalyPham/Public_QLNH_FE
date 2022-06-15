import React from 'react'
import { Layout, Menu, Breadcrumb, Row, Col, Divider } from 'antd';
import { SolutionOutlined,UserOutlined, LaptopOutlined, NotificationOutlined,HomeOutlined,
  CustomerServiceOutlined,CoffeeOutlined , AppstoreOutlined, UsergroupAddOutlined,AreaChartOutlined,
  BankOutlined,RobotOutlined } from '@ant-design/icons';
import AdminMainContent from './AdminMainContent';
import { Route, Router, Routes, Link, useLocation } from 'react-router-dom';
import AdminSanhTiec from './AdminSanhTiec';
import AdminDichVu from './AdminDichVu';
import AdminUser from './AdminUser';
import AdminKhachHang from './AdminKhachHang';
import AdminNhaHang from './AdminNhaHang';
import AdminNguyenLieu from './AdminNguyenLieu';
import AdminLoaiNhanVien from './AdminLoaiNhanVien';
import AdminNhanVien from './AdminNhanVien';
import AdminThongKe from './AdminThongKe';
import AdminPDT from './AdminPDT';
import AdminThucDon from './AdminThucDon';
import AdminTaiSan from './AdminTaiSan';
import AdminMonAn from './AdminMonAn';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const breadcrumbNameMap = {
  '/admin': 'Trang chủ',
  '/admin/user': 'Người dùng',
  '/admin/dichvu': 'Dịch vụ',
  '/admin/sanhtiec': 'Sảnh tiệc',
  '/admin/nhahang': 'Nhà hàng',
  '/admin/nguyenlieu': 'Nguyên liệu',
  '/admin/loainhanvien': 'Loại nhân viên',
  '/admin/nhanvien': 'Nhân viên',
  '/admin/khachhang': 'Khách hàng',
  '/admin/taisan': 'Tài sản',
  '/admin/monan': 'Món ăn',
  '/admin/thucdon': 'Thực đơn',
  '/admin/thongke': 'Thống kê',
  '/admin/pdt': 'Quản lý hóa đơn',
};
export default function Admin() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
  ].concat(extraBreadcrumbItems);
  return (
    <Layout style={{minHeight: "100vh"}}>
    <Header className="header">
      <div id='logoslogan' style={{float: 'left', marginLeft: '-27px'}}>LUCKY CENTER ADMIN</div>
      <Menu theme="dark" mode="horizontal" >
        <Menu.Item key="2"><Link to="../hosonhanvien">Hồ sơ</Link></Menu.Item>
        <Menu.Item key="3" onClick={() => {localStorage.clear(); window.location.href= "../../loginadmin"}}>Đăng xuất</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['']}
          defaultOpenKeys={['']}
          style={{ height: '100%', borderRight: 0 }}
        >
          
          {/* <Menu.Item icon={<UserOutlined />}><Link to="./user">Người dùng</Link></Menu.Item> */}
          <Menu.Item icon={<HomeOutlined />}><Link to="./">Trang chủ</Link></Menu.Item>
          <Menu.Item icon={<CustomerServiceOutlined />}><Link to="./dichvu">Dịch vụ</Link></Menu.Item>
          <Menu.Item icon={<BankOutlined />}><Link to="./sanhtiec">Sảnh tiệc</Link></Menu.Item>
          <Menu.Item icon={<CoffeeOutlined />}><Link to="./nhahang">Nhà hàng</Link></Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />}><Link to="./nguyenlieu">Nguyên liệu</Link></Menu.Item>
          <Menu.Item icon={<UsergroupAddOutlined />}><Link to="./loainhanvien">Loại nhân viên</Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />}><Link to="./nhanvien">Nhân viên</Link></Menu.Item>
          <Menu.Item icon={<UserOutlined />}><Link to="./khachhang">Khách hàng</Link></Menu.Item>
          <Menu.Item icon={<SolutionOutlined />}><Link to="./pdt">Quản lý hóa đơn</Link></Menu.Item>
          <Menu.Item icon={<AreaChartOutlined />}><Link to="./thongke">Thống kê</Link></Menu.Item>
          <Menu.Item icon={<RobotOutlined />}><Link to="./taisan">Tài sản</Link></Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />}><Link to="./monan">Món ăn</Link></Menu.Item>
          <Menu.Item icon={<AppstoreOutlined />}><Link to="./thucdon">Thực đơn</Link></Menu.Item>
          {/* <SubMenu key="sub2" icon={<LaptopOutlined />} title="Sảnh tiệc">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="Đơn đặt">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<NotificationOutlined />} title="Dịch vụ">
            <Menu.Item key="13">Quản lý dịch vụ</Menu.Item>
            <Menu.Item key="14">option10</Menu.Item>
           
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route exact path="/" element={<AdminMainContent/>}/>
            <Route exact path="/user" element={<AdminUser/>}/>
            <Route exact path="/sanhtiec" element={<AdminSanhTiec/>}/>
            <Route exact path="/dichvu" element={<AdminDichVu/>}/>
            <Route exact path="/khachhang" element={<AdminKhachHang/>}/>
            <Route exact path="/nhahang" element={<AdminNhaHang/>}/>
            <Route exact path="/nguyenlieu" element={<AdminNguyenLieu/>}/>
            <Route exact path="/loainhanvien" element={<AdminLoaiNhanVien/>}/>
            <Route exact path="/nhanvien" element={<AdminNhanVien/>}/>
            <Route exact path="/khachhang" element={<AdminKhachHang/>}/>
            <Route exact path="/taisan" element={<AdminTaiSan/>}/>
            <Route exact path="/monan" element={<AdminMonAn/>}/>
            <Route exact path="/thucdon" element={<AdminThucDon/>}/>
            <Route exact path="/pdt" element={<AdminPDT/>}/>
            <Route exact path="/thongke" element={<AdminThongKe/>}/>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}
