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
export default function AdminNhaHang() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [dulieuNH, setDulieuNH] = useState([]);
  const [dataTableNH, setDataTableNH] = useState([]);
  const [modalAddNHAdmin, setModalAddNHAdmin] = useState(false);
  const [modalEditNHAdmin, setModalEditNHAdmin] = useState(false);
  const [modalDetailNHAdmin, setModalDetailNHAdmin] = useState(false);
  const [modalDeleteNHAdmin, setModalDeleteNHAdmin] = useState(false);
  const [isNHDetail, setIsNHDetail] = useState();
  const columnsNH = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên nhà hàng",
      dataIndex: "tennhahang",
      key: "tennhahang",
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
              placeholder="Nhập tên nhà hàng cần tìm"
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
        return record.tennhahang.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tennhahang.localeCompare(b.tennhahang),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
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
    const _data = dulieuNH?.map((item, index) => ({
      stt: index + 1,
      tennhahang: item?.tenNhaHang,
      dientich: item?.dienTich,
      email: item?.email,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailNhaHangAdmin(item?.maNhaHang)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteNhaHangAdmin(item?.maNhaHang)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditNhaHangAdmin(item?.maNhaHang)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableNH(_data);
  }, [dulieuNH]);

  useEffect(() => {
    fetchNH();
    
  }, []);

  const fetchNH = async (e) => {
    await get(`/nhahang/`)
      .then((response) => {
        setDulieuNH(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailNHAdmin = async (e) => {
    await get(`/nhahang/${e}`)
    .then((response) => {
      setIsNHDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailNhaHangAdmin = async (e) => {
    handleDetailNHAdmin(e);
    setModalDetailNHAdmin(true);
  };

  const handleDeleteNHAdmin = async (e) => {
    const nhdel=localStorage.getItem("idnhdel");
    await del(`/nhahang/${nhdel}`)
    .then((response) => {
      localStorage.removeItem("idnhdel");
      setModalDeleteNHAdmin(false);
      fetchNH();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  


  const handleUpdateNHAdmin = async (e) => {
    
    const nhput=localStorage.getItem("idnhput");
    const detailInput = {
       maNhaHang: nhput,
       tenNhaHang: e?.tennhahang,
       email: e?.email,
       diaChi: e?.diachi,
       sdt: e?.sdt,
       dienTich: parseInt(e?.dientich) ,
       maHinhAnh: 4,
      };
    localStorage.removeItem("idnhput");
    await put(`/nhahang/`,detailInput)
    .then((response) => {
       
       //console.log("updatesuccess",response?.data?.data);
     localStorage.removeItem("idnhput");
      setModalEditNHAdmin(false);
      fetchNH();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteNhaHangAdmin = async (e) => {
    localStorage.setItem("idnhdel", e);
    setModalDeleteNHAdmin(true);

    
  };

  const showEditNhaHangAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailNHAdmin(e);
    localStorage.setItem("idnhput", e);
     
    setModalEditNHAdmin(true);
  };

  const handleCreateNHAdmin = async (e) => {
    const detailInput = {
       tenNhaHang: e?.tennhahang,
       email: e?.email,
       dienTich: parseInt(e?.dientich) ,
       viTri: e?.vitri,
       kichThuoc: e?.kichthuoc,
       quayTrienLam: e.quaytrienlam,
       kieuBanTron: e?.kieubantron,
       kieuBanDai: e?.kieubandai,
       kieuLopHoc: e?.kieulophoc,
       kieuRapHat: e?.kieuraphat,
       maHinhAnh: 4,
      };  
    await post(`/nhahang/`,detailInput)
    .then((response) => {
        //console.log("createsuccess",response?.data?.data);
        setModalAddNHAdmin(false);
        fetchNH();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateNhaHangAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddNHAdmin(true);
    
    
  };


  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Nhà hàng
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchNH()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateNhaHangAdmin()}
        >
         Tạo mới nhà hàng
        </Button>,
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsNH} dataSource={dataTableNH} />

      <Modal
          title="Xóa nhà hàng"
          visible={modalDeleteNHAdmin}
          onCancel={() => setModalDeleteNHAdmin(false)}
          width={600}
          onOk={handleDeleteNHAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa nhà hàng ?</h1>
      </Modal>

      <Modal
        title="Chi tiết Sảnh Tiệc"
        visible={modalDetailNHAdmin}
        onCancel={() => setModalDetailNHAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã nhà hàng: {isNHDetail?.maNhaHang}</h3>

          <h3>Tên nhà hàng: {isNHDetail?.tenNhaHang}</h3>

          <h3>Email : {isNHDetail?.email}</h3>

          <h3>Địa chỉ : {isNHDetail?.diaChi}</h3>

          <h3>SDT: {isNHDetail?.sdt}</h3>

          <h3>Diện tích: {isNHDetail?.dienTich}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật nhà hàng"
          visible={modalEditNHAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditNHAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateNHAdmin}>
             <Form.Item
                name="tennhahang"
                label="Tên nhà hàng"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên nhà hàng" }]}
              >
                <Input
                  placeholder={isNHDetail?.tenNhaHang}
                />
              </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  tyep: 'email',
                  required: true,
                  message: "Nhập email của nhà hàng",
                },
              ]}
              
            >
                <Input
                  placeholder={isNHDetail?.email}
                />
            </Form.Item>

            <Form.Item
              name="diachi"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Nhập địa chỉ của nhà hàng",
                },
              ]}
              
            >
              <Input   placeholder={isNHDetail?.diaChi}  />
            </Form.Item>

            <Form.Item
              name="sdt"
              label="Số điện thoại"
              rules={[ {
                pattern:
                // /^[(09|03|07|08|05)+([0-9]{8})\b]+$/g,
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                message: "Hãy nhập đúng sđt gồm 10 số",
              },
                { required: true }]}
              
            >
              <Input   placeholder={isNHDetail?.sdt}  />
            </Form.Item>

            <Form.Item
              name="dientich"
              label="Diện tích"
              rules={[
                {
                  required: true,
                  message: "Nhập diện tích của nhà hàng",
                },
              ]}
              
            >
              <Input type="number"  placeholder={isNHDetail?.dienTich} />
            </Form.Item>
          </Form>

        </Modal>
        <Modal
          title="Tạo mới nhà hàng"
          visible={modalAddNHAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddNHAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateNHAdmin}>
             <Form.Item
                name="tennhahang"
                label="Tên nhà hàng"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên nhà hàng" }]}
              >
                <Input
                  placeholder="Nhập tên nhà hàng"
                />
              </Form.Item>
              <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email" ,
                  required: true,
                  message: "Nhập email của nhà hàng",
                },
              ]}
              
            >
                <Input
                  placeholder="Nhập email"
                />
            </Form.Item>

            <Form.Item
              name="diachi"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Nhập địa chỉ của nhà hàng",
                },
              ]}
              
            >
              <Input   placeholder="Nhập địa chỉ"  />
            </Form.Item>

            <Form.Item
              name="sdt"
              label="Số điện thoại"
              rules={[ {
                pattern:
                // /^[(09|03|07|08|05)+([0-9]{8})\b]+$/g,
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                message: "Hãy nhập đúng sđt gồm 10 số",
              },
                { required: true }]}
              
            >
              <Input   placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              name="dientich"
              label="Diện tích"
              rules={[
                {
                  required: true,
                  message: "Nhập diện tích của nhà hàng",
                },
              ]}
              
            >
              <Input type="number"  placeholder="Nhập diện tích" />
            </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
