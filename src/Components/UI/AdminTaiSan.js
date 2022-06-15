import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Divider,
  DatePicker,
  Radio,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,RedoOutlined
  
} from "@ant-design/icons";
export default function AdminTaiSan() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [dulieuNL, setDulieuNL] = useState([]);
  const [dataTableNL, setDataTableNL] = useState([]);
  const [modalAddNLAdmin, setModalAddNLAdmin] = useState(false);
  const [modalEditNLAdmin, setModalEditNLAdmin] = useState(false);
  const [modalDetailNLAdmin, setModalDetailNLAdmin] = useState(false);
  const [modalDeleteNLAdmin, setModalDeleteNLAdmin] = useState(false);
  const [isNLDetail, setIsNLDetail] = useState();
  const columnsNL = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên tài sản",
      dataIndex: "tentaisan",
      key: "tentaisan",
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
              placeholder="Nhập tên tài sản cần tìm"
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
        return record.tentaisan.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tentaisan.localeCompare(b.tentaisan),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      sorter: (a, b) => a.soLuong - b.soLuong,
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      key: "tinhTrang",
      sorter: (a, b) => a.tinhTrang.localeCompare(b.tinhTrang),
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
    const _data = dulieuNL?.map((item, index) => ({
      stt: index + 1,
      tentaisan: item?.tenTaiSan,
      tinhTrang: item?.tinhTrang == true ? "Bình thường" : "Hỏng",
      soLuong: item?.soLuong,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailTaiSanAdmin(item?.maTaiSan)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteTaiSanAdmin(item?.maTaiSan)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditTaiSanAdmin(item?.maTaiSan)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableNL(_data);
  }, [dulieuNL]);

  useEffect(() => {
    fetchNL();
    
  }, []);

  const fetchNL = async (e) => {
    await get(`/taisan/`)
      .then((response) => {
        setDulieuNL(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailNLAdmin = async (e) => {
    await get(`/taisan/${e}`)
    .then((response) => {
      setIsNLDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailTaiSanAdmin = async (e) => {
    handleDetailNLAdmin(e);
    setModalDetailNLAdmin(true);
  };

  const handleDeleteNLAdmin = async (e) => {
    const nldel=localStorage.getItem("idnldel");
    await del(`/taisan/${nldel}`)
    .then((response) => {
      localStorage.removeItem("idnldel");
      setModalDeleteNLAdmin(false);
      
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  


  const handleUpdateNLAdmin = async (e) => {
    
    const nlput=localStorage.getItem("idnlput");
    const detailInput = {
      maTaiSan: nlput,
      tenTaiSan: e?.tentaisan,
      soLuong: parseFloat(e?.soLuong),
      maNhahang: parseInt(e?.manhahang),
      tinhTrang: e?.tinhTrang == "true" ? true : false,
     maHinhAnh: 2,
      ghiChu: e?.ghichu,
     };  
    console.log(detailInput)
    await put(`/taisan/`,detailInput)
    .then((response) => {
       
      // console.log("updatesuccess",response?.data?.data);
      localStorage.removeItem("idnlput");
      setModalEditNLAdmin(false);
      fetchNL();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteTaiSanAdmin = async (e) => {
    localStorage.setItem("idnldel", e);
    setModalDeleteNLAdmin(true);

    
  };

  const showEditTaiSanAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailNLAdmin(e);
    localStorage.setItem("idnlput", e);
     
    setModalEditNLAdmin(true);
  };

  const handleCreateNLAdmin = async (e) => {
    const detailInput = {
       tenTaiSan: e?.tentaisan,
       soLuong: parseFloat(e?.soLuong),
       maNhaHang: parseInt(e?.manhahang),
       tinhTrang: e?.tinhTrang == "true" ? true : false,
      maHinhAnh: 2,
       ghiChu: e?.ghichu,
      };  
    console.log(detailInput);
    await post(`/taisan/`,detailInput)
    .then((response) => {
       // console.log("createsuccess",response?.data?.data);
        setModalAddNLAdmin(false);
        fetchNL();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateTaiSanAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddNLAdmin(true);
    
    
  };


  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Tài sản
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchNL()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateTaiSanAdmin()}
        >
         Tạo mới tài sản
        </Button>,
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsNL} dataSource={dataTableNL} />

      <Modal
          title="Xóa tài sản"
          visible={modalDeleteNLAdmin}
          onCancel={() => setModalDeleteNLAdmin(false)}
          width={600}
          onOk={handleDeleteNLAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa tài sản ?</h1>
      </Modal>

      <Modal
        title="Chi tiết tài sản"
        visible={modalDetailNLAdmin}
        onCancel={() => setModalDetailNLAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã tài sản: {isNLDetail?.maTaiSan}</h3>

          <h3>Tên tài sản: {isNLDetail?.tenTaiSan}</h3>

          <h3>Tình trạng: {isNLDetail?.tinhTrang}</h3>
          
          <h3>Số lượng : {isNLDetail?.soLuong}</h3>

          <h3>Ghi chú: {isNLDetail?.ghiChu}</h3>

          <h3>ma: {isNLDetail?.maNhahang}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật tài sản"
          visible={modalEditNLAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => setModalEditNLAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateNLAdmin}>
             <Form.Item
                name="tentaisan"
                label="Tên tài sản"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên tài sản" }]}
              >
                <Input
                  placeholder={isNLDetail?.tenTaiSan}
                />
              </Form.Item>

              <Form.Item
              name="tinhTrang"
              label="Tình trạng"
              rules={[
                  {
                    message: "Nhập tình trạng của tài sản",
                  },
                ]}
                
              >
              <Radio.Group defaultValue="true">
                <Radio value="true">Hỏng</Radio>
                <Radio value="false">Bình thường</Radio>
              </Radio.Group>
              </Form.Item>
              <Form.Item
              name="soLuong"
              label="Số lượng"
              rules={[
                  {
                    required: true,
                    message: "Nhập soLuong của tài sản",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder={isNLDetail?.soLuong}
                  />
              </Form.Item>
              <Form.Item
              name="manhahang"
              label="Mã nhà hàng"
              rules={[
                {
                  required: true,
                  message: "Nhập mã nhà hang của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={0}  placeholder={isNLDetail?.maNhaHang}/>
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của tài sản",
                },
              ]}
              
            >
              <Input placeholder={isNLDetail?.ghiChu} />
            </Form.Item> 
          </Form>

        </Modal>
        <Modal
          title="Tạo mới tài sản"
          visible={modalAddNLAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddNLAdmin(false)}
          width={600}
          
        >
         <Form 
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateNLAdmin}>
             <Form.Item
                name="tentaisan"
                label="Tên tài sản"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên tài sản" }]}
              >
                <Input
                  placeholder="Nhập tên tài sản"
                />
              </Form.Item>

              <Form.Item
              name="tinhTrang"
              label="Tình trạng"
              rules={[
                  {
                    required: true,
                    message: "Nhập tình trạng của tài sản",
                  },
                ]}
                
              >
              <Radio.Group defaultValue="true">
                <Radio value="true">Hỏng</Radio>
                <Radio value="false">Bình thường</Radio>
              </Radio.Group>
              </Form.Item>
              <Form.Item
              name="soLuong"
              label="Số lượng"
              rules={[
                  {
                    required: true,
                    message: "Nhập soLuong của tài sản",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập soLuong"
                  />
              </Form.Item>
              <Form.Item
              name="manhahang"
              label="Mã nhà hàng"
              rules={[
                {
                  required: true,
                  message: "Nhập mã nhà hang của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={0} placeholder="Mã nhà hàng"/>
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của tài sản",
                },
              ]}
              
            >
              <Input placeholder="Nhập ghi chú" />
            </Form.Item>
          </Form>

        </Modal>
    </div>
  );
}
