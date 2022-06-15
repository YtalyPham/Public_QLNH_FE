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
export default function AdminNguyenLieu() {
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
      title: "Tên nguyên liệu",
      dataIndex: "tennguyenlieu",
      key: "tennguyenlieu",
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
              placeholder="Nhập tên nguyên liệu cần tìm"
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
        return record.tennguyenlieu.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tennguyenlieu.localeCompare(b.tennguyenlieu),
    },
    {
      title: "Kg",
      dataIndex: "kg",
      key: "kg",
      sorter: (a, b) => a.kg - b.kg,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngayhethan",
      key: "ngayhethan",
      sorter: (a, b) => a.ngayhethan - b.ngayhethan,
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
      tennguyenlieu: item?.tenNguyenLieu,
      ngayhethan: item?.ngayHetHan,
      kg: item?.kg,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailNguyenLieuAdmin(item?.maNguyenLieu)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteNguyenLieuAdmin(item?.maNguyenLieu)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditNguyenLieuAdmin(item?.maNguyenLieu)}
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
    await get(`/nguyenlieu/`)
      .then((response) => {
        setDulieuNL(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailNLAdmin = async (e) => {
    await get(`/nguyenlieu/${e}`)
    .then((response) => {
      setIsNLDetail(response?.data?.data);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };


  const showDetailNguyenLieuAdmin = async (e) => {
    handleDetailNLAdmin(e);
    setModalDetailNLAdmin(true);
  };

  const handleDeleteNLAdmin = async (e) => {
    const nldel=localStorage.getItem("idnldel");
    await del(`/nguyenlieu/${nldel}`)
    .then((response) => {
      localStorage.removeItem("idnldel");
      setModalDeleteNLAdmin(false);
      fetchNL();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  


  const handleUpdateNLAdmin = async (e) => {
    
    const nlput=localStorage.getItem("idnlput");
    const detailInput = {
       maNguyenLieu: nlput,
       tenNguyenLieu: e?.tennguyenlieu,
       kg: parseFloat(e?.kg),
       donGiaMua: parseInt(e?.dongiamua),
       ngayHetHan: e['ngayhethan'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayNhap: e['ngaynhap'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ghiChu: e?.ghichu,
      };
    localStorage.removeItem("idnlput");
    await put(`/nguyenlieu/`,detailInput)
    .then((response) => {
       
       console.log("updatesuccess",response?.data?.data);
     localStorage.removeItem("idnlput");
      setModalEditNLAdmin(false);
      fetchNL();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showDeleteNguyenLieuAdmin = async (e) => {
    localStorage.setItem("idnldel", e);
    setModalDeleteNLAdmin(true);

    
  };

  const showEditNguyenLieuAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailNLAdmin(e);
    localStorage.setItem("idnlput", e);
     
    setModalEditNLAdmin(true);
  };

  const handleCreateNLAdmin = async (e) => {
    const detailInput = {
       tenNguyenLieu: e?.tennguyenlieu,
       kg: parseFloat(e?.kg),
       donGiaMua: parseInt(e?.dongiamua),
       ngayHetHan: e['ngayhethan'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ngayNhap: e['ngaynhap'].format('YYYY-MM-DD') + 'T00:00:00.000Z',
       ghiChu: e?.ghichu,
      };  
    console.log(detailInput);
    await post(`/nguyenlieu/`,detailInput)
    .then((response) => {
        console.log("createsuccess",response?.data?.data);
        setModalAddNLAdmin(false);
        fetchNL();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateNguyenLieuAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddNLAdmin(true);
    
    
  };


  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Nguyên liệu
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchNL()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateNguyenLieuAdmin()}
        >
         Tạo mới nguyên liệu
        </Button>,
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsNL} dataSource={dataTableNL} />

      <Modal
          title="Xóa nguyên liệu"
          visible={modalDeleteNLAdmin}
          onCancel={() => setModalDeleteNLAdmin(false)}
          width={600}
          onOk={handleDeleteNLAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa nguyên liệu ?</h1>
      </Modal>

      <Modal
        title="Chi tiết nguyên liệu"
        visible={modalDetailNLAdmin}
        onCancel={() => setModalDetailNLAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã nguyên liệu: {isNLDetail?.maNguyenLieu}</h3>

          <h3>Tên nguyên liệu: {isNLDetail?.tenNguyenLieu}</h3>

          <h3>Ngày nhập: {isNLDetail?.ngayNhap}</h3>

          <h3>Ngày hết hạn: {isNLDetail?.ngayHetHan}</h3>
          
          <h3>Kg : {isNLDetail?.kg}</h3>

          <h3>
            Đơn giá:{" "}
            {isNLDetail?.donGiaMua != null ? isNLDetail?.donGiaMua + " VNĐ" : ""}
          </h3>

          <h3>Ghi chú: {isNLDetail?.ghiChu}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật nguyên liệu"
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
                name="tennguyenlieu"
                label="Tên nguyên liệu"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên nguyên liệu" }]}
              >
                <Input
                  placeholder={isNLDetail?.tenNguyenLieu}
                  defaultValue={isNLDetail?.tenNguyenLieu}
                />
              </Form.Item>
              <Form.Item
              name="ngaynhap"
              label="Ngày nhập"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày nhập của nguyên liệu",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item
              name="ngayhethan"
              label="Ngày hết hạn"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày hết hạn của nguyên liệu",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}} showTime format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
              name="kg"
              label="Kg"
              rules={[
                  {
                    required: true,
                    message: "Nhập kg của nguyên liệu",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập kg"
                    defaultValue={isNLDetail?.kg}
                  />
              </Form.Item>
              <Form.Item
              name="dongiamua"
              label="Đơn giá mua"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá mua của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder="Đơn giá mua" defaultValue={isNLDetail?.donGiaMua} />
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của nguyên liệu",
                },
              ]}
              
            >
              <Input placeholder="Nhập ghi chú"  defaultValue={isNLDetail?.ghiChu} />
            </Form.Item>  
          </Form>

        </Modal>
        <Modal
          title="Tạo mới nguyên liệu"
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
                name="tennguyenlieu"
                label="Tên nguyên liệu"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên nguyên liệu" }]}
              >
                <Input
                  placeholder="Nhập tên nguyên liệu"
                />
              </Form.Item>
              <Form.Item
              name="ngaynhap"
              label="Ngày nhập"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày nhập của nguyên liệu",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}}  showTime format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
              name="ngayhethan"
              label="Ngày hết hạn"
              rules={[
                  {
                    required: true,
                    message: "Nhập ngày hết hạn của nguyên liệu",
                  },
                ]}
                
              >
              <DatePicker style={{float: 'left'}} showTime format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
              name="kg"
              label="Kg"
              rules={[
                  {
                    required: true,
                    message: "Nhập kg của nguyên liệu",
                  },
                ]}
                
              >
                  <Input type="number" min={0}
                    placeholder="Nhập kg"
                  />
              </Form.Item>
              <Form.Item
              name="dongiamua"
              label="Đơn giá mua"
              rules={[
                {
                  required: true,
                  message: "Nhập đơn giá mua của dịch vụ",
                },
              ]}
              
            >
              <Input type="number" min={1} placeholder="Đơn giá mua"/>
            </Form.Item>
            <Form.Item
              name="ghichu"
              label="Ghi chú"
              rules={[
                {
                  required: true,
                  message: "Nhập ghi chú của nguyên liệu",
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
