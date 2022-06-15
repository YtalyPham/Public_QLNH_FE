import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Divider,
  DatePicker,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,RedoOutlined
  
} from "@ant-design/icons";
export default function AdminLoaiNhanVien() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [dulieuLNV, setDulieuLNV] = useState([]);
  const [dataTableLNV, setDataTableLNV] = useState([]);
  const [modalAddLNVAdmin, setModalAddLNVAdmin] = useState(false);
  const [modalEditLNVAdmin, setModalEditLNVAdmin] = useState(false);
  const [modalDetailLNVAdmin, setModalDetailLNVAdmin] = useState(false);
  const [modalDeleteLNVAdmin, setModalDeleteLNVAdmin] = useState(false);
  const [isLNVDetail, setIsLNVDetail] = useState();
  const columnsLNV = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên loại nhân viên",
      dataIndex: "tenloainhanvien",
      key: "tenloainhanvien",
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
              placeholder="Nhập tên loại nhân viên cần tìm"
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
        return record.tenloainhanvien.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tenloainhanvien.localeCompare(b.tenloainhanvien),
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
    const _data = dulieuLNV?.map((item, index) => ({
      stt: index + 1,
      tenloainhanvien: item?.tenLoai,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailLoaiNhanVienAdmin(item?.maLoaiNhanVien)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteLoaiNhanVienAdmin(item?.maLoaiNhanVien)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditLoaiNhanVienAdmin(item?.maLoaiNhanVien)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableLNV(_data);
  }, [dulieuLNV]);

  useEffect(() => {
    fetchLNV();
    
  }, []);

  const fetchLNV = async (e) => {
    await get(`/loainhanvien/`)
      .then((response) => {
        setDulieuLNV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailLNVAdmin = async (e) => {
    await get(`/loainhanvien/${e}`)
    .then((response) => {
      setIsLNVDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailLoaiNhanVienAdmin = async (e) => {
    handleDetailLNVAdmin(e);
    setModalDetailLNVAdmin(true);
  };

  const handleDeleteLNVAdmin = async (e) => {
    const lnvdel=localStorage.getItem("idlnvdel");
    await del(`/loainhanvien/${lnvdel}`)
    .then((response) => {
      localStorage.removeItem("idlnvdel");
      setModalDeleteLNVAdmin(false);
      fetchLNV();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  


  const handleUpdateLNVAdmin = async (e) => {
    
    const lnvput=localStorage.getItem("idlnvput");
    const detailInput = {
       maLoaiNhanVien: lnvput,
       tenLoai: e?.tenloainhanvien,
      };
    localStorage.removeItem("idlnvput");
    await put(`/loainhanvien/`,detailInput)
    .then((response) => {
       
      // console.log("updatesuccess",response?.data?.data);
      localStorage.removeItem("idlnvput");
      setModalEditLNVAdmin(false);
      fetchLNV();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteLoaiNhanVienAdmin = async (e) => {
    localStorage.setItem("idlnvdel", e);
    setModalDeleteLNVAdmin(true);

    
  };

  const showEditLoaiNhanVienAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailLNVAdmin(e);
    localStorage.setItem("idlnvput", e);
     
    setModalEditLNVAdmin(true);
  };

  const handleCreateLNVAdmin = async (e) => {
    const detailInput = {
       tenLoai: e?.tenloainhanvien,
      };  
    console.log(detailInput);
    await post(`/loainhanvien/`,detailInput)
    .then((response) => {
        //console.log("createsuccess",response?.data?.data);
        setModalAddLNVAdmin(false);
        fetchLNV();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateLoaiNhanVienAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddLNVAdmin(true);
    
    
  };


  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Loại nhân viên
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchLNV()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateLoaiNhanVienAdmin()}
        >
         Tạo mới loại nhân viên
        </Button>,
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsLNV} dataSource={dataTableLNV} />

      <Modal
          title="Xóa loại nhân viên"
          visible={modalDeleteLNVAdmin}
          onCancel={() => setModalDeleteLNVAdmin(false)}
          width={600}
          onOk={handleDeleteLNVAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa loại nhân viên ?</h1>
      </Modal>

      <Modal
        title="Chi tiết loại nhân viên"
        visible={modalDetailLNVAdmin}
        onCancel={() => setModalDetailLNVAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã loại nhân viên: {isLNVDetail?.maLoaiNhanVien}</h3>

          <h3>Tên loại nhân viên: {isLNVDetail?.tenLoai}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật loại nhân viên"
          visible={modalEditLNVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditLNVAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateLNVAdmin}>
             <Form.Item
                name="tenloainhanvien"
                label="Tên loại nhân viên"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên loại nhân viên" }]}
              >
                <Input
                  defaultValue={isLNVDetail?.tenLoai}
                />
              </Form.Item>
          </Form>

        </Modal>
        <Modal
          title="Tạo mới loại nhân viên"
          visible={modalAddLNVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddLNVAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateLNVAdmin}>
             <Form.Item
                name="tenloainhanvien"
                label="Tên loại nhân viên"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên loại nhân viên" }]}
              >
                <Input
                  placeholder="Nhập tên loại nhân viên"
                />
              </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
