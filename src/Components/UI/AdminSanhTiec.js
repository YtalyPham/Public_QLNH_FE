import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Divider,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,RedoOutlined
  
} from "@ant-design/icons";
export default function AdminSanhTiec() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [test, setTest] = useState({});
  const [dulieuST, setDulieuST] = useState([]);
  const [valueST, setValueST] = useState([]);
  const [dataTableST, setDataTableST] = useState([]);
  const [modalAddSTAdmin, setModalAddSTAdmin] = useState(false);
  const [modalEditSTAdmin, setModalEditSTAdmin] = useState(false);
  const [modalDetailSTAdmin, setModalDetailSTAdmin] = useState(false);
  const [modalDeleteSTAdmin, setModalDeleteSTAdmin] = useState(false);
  const [isSTDetail, setIsSTDetail] = useState();
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
              autoFocus
              placeholder="Nhập tên sảnh tiệc cần tìm"
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
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
    },
    {
      title: "Diện tích",
      dataIndex: "dientich",
      key: "dientich",
      sorter: (a, b) => a.dientich - b.dientich,
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    const _data = dulieuST?.map((item, index) => ({
      stt: index + 1,
      tensanhtiec: item?.tenSanhTiec,
      dientich: item?.dienTich,
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia),
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailSanhTiecAdmin(item?.maSanhTiec)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteSanhTiecAdmin(item?.maSanhTiec)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditSanhTiecAdmin(item?.maSanhTiec)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableST(_data);
  }, [dulieuST]);

  useEffect(() => {
    fetchST();
    
  }, []);

  const fetchST = async (e) => {
    await get(`/sanhtiec/`)
      .then((response) => {
        // console.log(response?.data?.data);
        setDulieuST(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err dV: ", err);
      });
  };

  const handleDetailSTAdmin = async (e) => {
    await get(`/sanhtiec/${e}`)
    .then((response) => {
      // console.log(response?.data?.data);
      setIsSTDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };


  const showDetailSanhTiecAdmin = async (e) => {
    handleDetailSTAdmin(e);
    setModalDetailSTAdmin(true);
  };

  const handleDeleteSTAdmin = async (e) => {
    const stdel=localStorage.getItem("idstdel");
    // console.log(stdel);
    
    await del(`/sanhtiec/${stdel}`)
    .then((response) => {
       
    //   console.log("delsuccess",response?.data?.data);
      localStorage.removeItem("idstdel");
      setModalDeleteSTAdmin(false);
      fetchST();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  


  const handleUpdateSTAdmin = async (e) => {
    
    const stput=localStorage.getItem("idstput");
    const detailInput = {
       maSanhTiec: stput,
       tenSanhTiec: e?.tensanhtiec,
       donGia: parseFloat(e?.dongia) ,
       dienTich: parseInt(e?.dientich) ,
       viTri: e?.vitri,
       kichThuoc: e?.kichthuoc,
       quayTrienLam: e.quaytrienlam,
       kieuBanTron: e?.kieubantron,
       kieuBanDai: e?.kieubandai,
       kieuLopHoc: e?.kieulophoc,
       kieuRapHat: e?.kieuraphat,
       maHinhAnh: 6,
      };
    // console.log("detailup ",detailInput);
    localStorage.removeItem("idstput");
    await put(`/sanhtiec/`,detailInput)
    .then((response) => {
       
      // console.log("updatesuccess",response?.data?.data);
     localStorage.removeItem("idstput");
      setModalEditSTAdmin(false);
      fetchST();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  const showDeleteSanhTiecAdmin = async (e) => {
    localStorage.setItem("idstdel", e);
    setModalDeleteSTAdmin(true);

    
  };

  const showEditSanhTiecAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailSTAdmin(e);
    localStorage.setItem("idstput", e);
     
    setModalEditSTAdmin(true);
  };

  const handleCreateSTAdmin = async (e) => {
    
    //const stput=localStorage.getItem("idstput");
    const detailInput = {
       tenSanhTiec: e?.tensanhtiec,
       donGia: parseFloat(e?.dongia) ,
       dienTich: parseInt(e?.dientich) ,
       viTri: e?.vitri,
       kichThuoc: e?.kichthuoc,
       quayTrienLam: e.quaytrienlam,
       kieuBanTron: e?.kieubantron,
       kieuBanDai: e?.kieubandai,
       kieuLopHoc: e?.kieulophoc,
       kieuRapHat: e?.kieuraphat,
       maHinhAnh: 6,
      };
   // console.log("detailcreate ",detailInput);
     
    await post(`/sanhtiec/`,detailInput)
    .then((response) => {
        console.log("createsuccess",response?.data?.data);
        setModalAddSTAdmin(false);
        fetchST();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  const showCreateSanhTiecAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddSTAdmin(true);
    
    
  };

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Sảnh tiệc
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchST()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateSanhTiecAdmin()}
        >
         Tạo mới sảnh tiệc
        </Button>,
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsST} dataSource={dataTableST} />

      <Modal
          title="Xóa sảnh tiệc"
          visible={modalDeleteSTAdmin}
          onCancel={() => setModalDeleteSTAdmin(false)}
          width={600}
          onOk={handleDeleteSTAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa sảnh tiệc ?</h1>
      </Modal>

      <Modal
        title="Chi tiết Sảnh Tiệc"
        visible={modalDetailSTAdmin}
        onCancel={() => setModalDetailSTAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã sảnh tiệc: {isSTDetail?.maSanhTiec}</h3>

          <h3>Tên sảnh tiệc: {isSTDetail?.tenSanhTiec}</h3>

          <h3>
            Đơn giá:{" "}
            {isSTDetail?.donGia != null ? isSTDetail?.donGia + " VNĐ" : ""}
          </h3>

          <h3>Diện tích : {isSTDetail?.dienTich}</h3>

          <h3>Vị trí: {isSTDetail?.viTri}</h3>

          <h3>Kích thước: {isSTDetail?.kichThuoc}</h3>

          <h3>Quầy triển lãm: {isSTDetail?.quayTrienLam}</h3>

          <h3>Kiểu bàn tròn: {isSTDetail?.kieuBanTron}</h3>

          <h3>Kiểu bàn dài: {isSTDetail?.kieuBanDai}</h3>

          <h3>Kiểu lớp học: {isSTDetail?.kieuLopHoc}</h3>

          <h3>Kiểu rạp hát: {isSTDetail?.kieuRapHat}</h3>
        </div>
      </Modal>
      <Modal
          title="Cập nhật sảnh tiệc"
          visible={modalEditSTAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditSTAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateSTAdmin}>
             <Form.Item
                name="tensanhtiec"
                label="Tên sảnh tiệc"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên sảnh tiệc" }]}
              >
                <Input
                  placeholder={isSTDetail?.tenSanhTiec}
                />
              </Form.Item>
            <Form.Item
              name="dongia"
              label="Đơn giá"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá của sảnh tiệc",
                },
              ]}
              
            >
              <Input type="number" min={1}  placeholder={isSTDetail?.donGia}  />
            </Form.Item>
            <Form.Item
              name="dientich"
              label="Diện tích"
              rules={[
                {
                  required: true,
                  message: "Nhập diện tích của sảnh tiệc",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder={isSTDetail?.dienTich} />
            </Form.Item>
            <Form.Item
              name="vitri"
              label="Vị trí"
              rules={[
                {
                  required: true,
                  message: "Nhập vị trí của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.viTri}  />
            </Form.Item>

            <Form.Item
              name="kichthuoc"
              label="Kích thước"
              rules={[
                {
                  required: true,
                  message: "Nhập kích thước của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.kichThuoc}  />
            </Form.Item>

            <Form.Item
              name="quaytrienlam"
              label="Quầy triển lãm"
              rules={[
                {
                  required: true,
                  message: "Nhập quầy triển lãm của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.quayTrienLam}  />
            </Form.Item>

            <Form.Item
              name="kieubantron"
              label="Kiểu bàn tròn"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu bàn tròn của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.kieuBanTron}  />
            </Form.Item>

            <Form.Item
              name="kieubandai"
              label="Kiểu bàn dài"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu bàn dài của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.kieuBanDai}  />
            </Form.Item>

            <Form.Item
              name="kieulophoc"
              label="Kiểu lớp học"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu lớp học của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.kieuLopHoc}  />
            </Form.Item>

            <Form.Item
              name="kieuraphat"
              label="Kiểu rạp hát"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu rạp hát của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder={isSTDetail?.kieuRapHat}  />
            </Form.Item>
          </Form>

        </Modal>
        <Modal
          title="Tạo mới sảnh tiệc"
          visible={modalAddSTAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddSTAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateSTAdmin}>
             <Form.Item
                name="tensanhtiec"
                label="Tên sảnh tiệc"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên sảnh tiệc" }]}
              >
                <Input
                  placeholder="Nhập tên sảnh tiệc"
                />
              </Form.Item>
            <Form.Item
              name="dongia"
              label="Đơn giá"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá của sảnh tiệc",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder="Nhập đơn giá" />
            </Form.Item>
            <Form.Item
              name="dientich"
              label="Diện tích"
              rules={[
                {
                  required: true,
                  message: "Nhập diện tích của sảnh tiệc",
                },
              ]}
              
            >
              <Input type="number" min={1}  placeholder="Nhập diện tích" />
            </Form.Item>
            <Form.Item
              name="vitri"
              label="Vị trí"
              rules={[
                {
                  required: true,
                  message: "Nhập vị trí của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập vị trí"  />
            </Form.Item>

            <Form.Item
              name="kichthuoc"
              label="Kích thước"
              rules={[
                {
                  required: true,
                  message: "Nhập kích thước của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập kích thước"  />
            </Form.Item>

            <Form.Item
              name="quaytrienlam"
              label="Quầy triển lãm"
              rules={[
                {
                  required: true,
                  message: "Nhập quầy triển lãm của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập quầy triển lãm"  />
            </Form.Item>

            <Form.Item
              name="kieubantron"
              label="Kiểu bàn tròn"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu bàn tròn của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập kiểu bàn tròn"  />
            </Form.Item>

            <Form.Item
              name="kieubandai"
              label="Kiểu bàn dài"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu bàn dài của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập kiểu bàn dài"  />
            </Form.Item>

            <Form.Item
              name="kieulophoc"
              label="Kiểu lớp học"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu lớp học của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập kiểu lớp học"  />
            </Form.Item>

            <Form.Item
              name="kieuraphat"
              label="Kiểu rạp hát"
              rules={[
                {
                  required: true,
                  message: "Nhập kiểu rạp hát của sảnh tiệc",
                },
              ]}
              
            >
              <Input   placeholder="Nhập kiểu rạp hát"  />
            </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
