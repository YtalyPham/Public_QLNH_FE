import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
  Upload,
  message,
  Table,
  Tag,
  Space,
  AutoComplete,
  Radio,
  Typography,
  Avatar,
  Modal,
  Divider,
  Tooltip,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,RedoOutlined
  
} from "@ant-design/icons";
export default function AdminDichVu() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [test, setTest] = useState({});
  const [dulieuDV, setDulieuDV] = useState([]);
  const [valueDV, setValueDV] = useState([]);
  const [dataTableDV, setDataTableDV] = useState([]);
  const [modalAddDVAdmin, setModalAddDVAdmin] = useState(false);
  const [modalEditDVAdmin, setModalEditDVAdmin] = useState(false);
  const [modalDetailDVAdmin, setModalDetailDVAdmin] = useState(false);
  const [modalDeleteDVAdmin, setModalDeleteDVAdmin] = useState(false);
  const [isDVDetail, setIsDVDetail] = useState();
  const columnsDV = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "tendichvu",
      key: "tendichvu",
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
              placeholder="Nhập tên dịch vụ cần tìm"
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
        return record.tendichvu.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tendichvu.localeCompare(b.tendichvu),
      
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "dongia",
      sorter: (a, b) => a.dongia - b.dongia,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
      sorter: (a, b) => a.soluong - b.soluong,
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
    const _data = dulieuDV?.map((item, index) => ({
      stt: index + 1,
      tendichvu: item?.tenDichVu,
      soluong: item?.soLuong,
      dongia: item?.donGia==null?"":themPhayVaoSo(item?.donGia),
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailDichVuAdmin(item?.maDichVu)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteDichVuAdmin(item?.maDichVu)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditDichVuAdmin(item?.maDichVu)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableDV(_data);
  }, [dulieuDV]);

  useEffect(() => {
    fetchDV();
    
  }, []);

  const fetchDV = async (e) => {
    await get(`/dichvu/`)
      .then((response) => {
        // console.log(response?.data?.data);
        setDulieuDV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err dV: ", err);
      });
  };

  const handleDetailDVAdmin = async (e) => {
    await get(`/dichvu/${e}`)
    .then((response) => {
      // console.log(response?.data?.data);
      setIsDVDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };


  const showDetailDichVuAdmin = async (e) => {
    handleDetailDVAdmin(e);
    setModalDetailDVAdmin(true);
  };

  const handleDeleteDVAdmin = async (e) => {
    const dvdel=localStorage.getItem("iddvdel");
    // console.log(dvdel);
    
    await del(`/dichvu/${dvdel}`)
    .then((response) => {
       
    //   console.log("delsuccess",response?.data?.data);
      localStorage.removeItem("iddvdel");
      setModalDeleteDVAdmin(false);
      fetchDV();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  


  const handleUpdateDVAdmin = async (e) => {
    
    const dvput=localStorage.getItem("iddvput");
    const detailInput = {
       maDichVu: dvput,
       tenDichVu: e?.tendichvu,
       donGia: parseFloat(e?.dongia) ,
       soLuong: parseInt(e?.soluong) ,
       ghiChu: e?.ghichu,
       maHinhAnh: null,
      };
    // console.log("detailup ",detailInput);
    localStorage.removeItem("iddvput");
    await put(`/dichvu/`,detailInput)
    .then((response) => {
       
      //console.log("updatesuccess",response?.data?.data);
      localStorage.removeItem("iddvput");
      setModalEditDVAdmin(false);
      fetchDV();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  const showDeleteDichVuAdmin = async (e) => {
    localStorage.setItem("iddvdel", e);
    setModalDeleteDVAdmin(true);

    
  };

  const showEditDichVuAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailDVAdmin(e);
    localStorage.setItem("iddvput", e);
     
    setModalEditDVAdmin(true);
  };

  const handleCreateDVAdmin = async (e) => {
    
    //const dvput=localStorage.getItem("iddvput");
    const detailInput = {
       tenDichVu: e?.tendichvu,
       donGia: parseFloat(e?.dongia) ,
       soLuong: parseInt(e?.soluong) ,
       ghiChu: e?.ghichu,
       maHinhAnh: null,
      };
   // console.log("detailcreate ",detailInput);
     
    await post(`/dichvu/`,detailInput)
    .then((response) => {
        console.log("createsuccess",response?.data?.data);
        setModalAddDVAdmin(false);
        fetchDV();
    })
    .catch((err) => {
      console.log("Err dV: ", err);
    });
  };

  const showCreateDichVuAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddDVAdmin(true);
    
  };

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Dịch vụ
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchDV()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateDichVuAdmin()}
        >
         Tạo mới dịch vụ
        </Button>,
      <Table       locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsDV} dataSource={dataTableDV} />

      <Modal
          title="Xóa dịch vụ"
          visible={modalDeleteDVAdmin}
          onCancel={() => setModalDeleteDVAdmin(false)}
          width={600}
          onOk={handleDeleteDVAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa dịch vụ ?</h1>
      </Modal>

      <Modal
        title="Chi tiết Dịch Vụ"
        visible={modalDetailDVAdmin}
        onCancel={() => setModalDetailDVAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã dịch vụ: {isDVDetail?.maDichVu}</h3>

          <h3>Tên dịch vụ: {isDVDetail?.tenDichVu}</h3>

          <h3>
            Đơn giá:{" "}
            {isDVDetail?.donGia != null ? isDVDetail?.donGia + " VNĐ" : ""}
          </h3>

          <h3>Số lượng : {isDVDetail?.soLuong}</h3>

          <h3>Ghi chú: {isDVDetail?.ghiChu}</h3>
        </div>
      </Modal>
      <Modal
          title="Cập nhật dịch vụ"
          visible={modalEditDVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditDVAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateDVAdmin}>
             <Form.Item
                name="tendichvu"
                label="Tên dịch vụ"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên dịch vụ" }]}
              >
                <Input
                  placeholder={isDVDetail?.tenDichVu}
                />
              </Form.Item>
            <Form.Item
              name="dongia"
              label="Đơn giá"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder={isDVDetail?.donGia}  />
            </Form.Item>
            <Form.Item
              name="soluong"
              label="Số lượng"
              rules={[
                {
                  required: true,
                  message: "Nhập số lượng của dịch vụ",
                },
              ]}
              
            >
              <Input type="number"  min={1} placeholder={isDVDetail?.soLuong} />
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của dịch vụ",
                },
              ]}
              
            >
              <Input   placeholder={isDVDetail?.ghiChu}  />
            </Form.Item>
          </Form>

        </Modal>
        <Modal
          title="Tạo mới dịch vụ"
          visible={modalAddDVAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddDVAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateDVAdmin}>
             <Form.Item
                name="tendichvu"
                label="Tên dịch vụ"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên dịch vụ" }]}
              >
                <Input
                  placeholder="Nhập tên dịch vụ"
                />
              </Form.Item>
            <Form.Item
              name="dongia"
              label="Đơn giá"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder="Nhập đơn giá" />
            </Form.Item>
            <Form.Item
              name="soluong"
              label="Số lượng"
              rules={[
                {
                  required: true,
                  message: "Nhập số lượng của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={1}  placeholder="Nhập số lượng" />
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của dịch vụ",
                },
              ]}
              
            >
              <Input   placeholder="Nhập ghi chú"  />
            </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
