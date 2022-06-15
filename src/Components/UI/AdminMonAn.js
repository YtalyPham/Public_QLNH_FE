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
  Select,
} from "antd";
import { post, get, del, put } from "../../httpHelper";
import {
  SearchOutlined,
  RedoOutlined
} from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
export default function AdminMonAn() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [dulieuMA, setDulieuMA] = useState([]);
  const [dataTableMA, setDataTableMA] = useState([]);
  const [modalAddMAAdmin, setModalAddMAAdmin] = useState(false);
  const [modalEditMAAdmin, setModalEditMAAdmin] = useState(false);
  const [modalDetailMAAdmin, setModalDetailMAAdmin] = useState(false);
  const [modalDeleteMAAdmin, setModalDeleteMAAdmin] = useState(false);
  const [isMADetail, setIsMADetail] = useState();

// lay danh sanh loai mon an
  const [lhsk,setLhsk]=useState([]);
  const fetchLhskList = () => {
    get("/nguyenlieu/")
      .then((response) => {
        // console.log(response.data);
        setLhsk(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchLhskList();
    
  }, []);


  const columnsMA = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên món ăn",
      dataIndex: "tenmonan",
      key: "tenmonan",
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
              placeholder="Nhập tên món ăn cần tìm"
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
        return record.tenmonan.toLowerCase().includes(value.toLowerCase());
        
      },
      sorter: (a, b) => a.tenmonan.localeCompare(b.tenmonan),
    },
    {
      title: "Loại món ăn",
      dataIndex: "loaiMonAn",
      key: "loaiMonAn",
      sorter: (a, b) => a.loaiMonAn.localeCompare(b.loaiMonAn),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "donGia",
      key: "donGia",
      sorter: (a, b) => a.donGia - b.donGia,
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
    const _data = dulieuMA?.map((item, index) => ({
      stt: index + 1,
      tenmonan: item?.tenMonAn,
      donGia: item?.donGia==null?"":themPhayVaoSo(item?.donGia),
      loaiMonAn: handleLoaiMonAn(item?.loaiMonAn),
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailMonAnAdmin(item?.maMonAn)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteMonAnAdmin(item?.tenMonAn)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditMonAnAdmin(item?.tenMonAn)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableMA(_data);
  }, [dulieuMA]);

  useEffect(() => {
    fetchMA();
    
  }, []);

  const fetchMA = async (e) => {
    await get(`/monan/khongtrung`)
      .then((response) => {
        setDulieuMA(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailMAAdmin = async (e) => {
    await get(`/monan/${e}`)
    .then((response) => {
      setIsMADetail(response?.data?.data);
      handleDetailNguyenLieuMonAn(e,response?.data?.data.tenMonAn);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

   
  const [manglieu, setManglieu] = useState(
    {
    listid: [],
  })

  let mangNguyenLieu = [];

  const [mangnguyenLieu2,setMangNguyenLieu2] = useState([mangNguyenLieu])



  const handleDetailNguyenLieuMonAn = async (e,a) => {
    const detailInput = {
        name: a,
    }
    await post(`/monan/manguyenlieu`,detailInput)
    .then((response) => {
      handleDetailNguyenLieuMonAnTen(e,response?.data?.data)
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });

    
  };
  let mangtemp;
  const handleDetailNguyenLieuMonAnTen = async (e,a) => {
    
    const detailInput = {
      listid: a,
  }
  console.log(detailInput)
    await post(`/nguyenlieu/timnguyenlieutheomonan`,detailInput)
    .then((response) => {
      mangtemp = response?.data?.data;
      mangNguyenLieu = [];
      mangtemp.forEach(mangtemps => {mangNguyenLieu.push(mangtemps.tenNguyenLieu);})
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
    console.log(mangNguyenLieu)
    setMangNguyenLieu2(mangNguyenLieu);
  };



  const showDetailMonAnAdmin = async (e) => {
    handleDetailMAAdmin(e);
    
    setModalDetailMAAdmin(true);
  };

  const handleDeleteMAAdmin = (e) => {
    const madel=localStorage.getItem("tenmadel");
    const detailInput={
      name:madel
    }
    //console.log("mama",detailInput);
    post(`/monan/listmamonan/`,detailInput)
    .then((response) => {
        const detailInput2={
          listid:response?.data?.data
        }
        console.log("listid",response?.data?.data);
        post(`/monan/deletenhieu/`,detailInput2)
        .then((response) => {
         // console.log("delnhieumasuccess");
          setModalDeleteMAAdmin(false);
          localStorage.removeItem("tenmadel");
          fetchMA();
        })
        .catch((err) => {
          console.log("Err delete nhieu: ", err);
        });
       
    })
    .catch((err) => {
      console.log("Err layidmonan: ", err);
    });
   
  };

  


  const handleUpdateMAAdmin =  (e) => {
    
    const tenput=localStorage.getItem("tenmaput");
    const detailInput ={
      name: tenput
    }
     post(`/monan/listmamonan/`,detailInput)
     .then((response) => {
       const detailInput2={
        tenMonAn:e?.tenMonAn,
        loaiMonAn: e?.loaiMonAn,
        donGia:parseFloat(e?.donGia),
        listid:response?.data?.data
       }
      put(`/monan/updatenhieu/`,detailInput2)
      .then((response) => {
         
        console.log("updatesuccess");
        localStorage.removeItem("tenmaput");
        setModalEditMAAdmin(false);
        fetchMA();
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
     })
     .catch((err) => {
       console.log("Err nH: ", err);
     });
  };

  const showDeleteMonAnAdmin = (e) => {
    localStorage.setItem("tenmadel", e);
    setModalDeleteMAAdmin(true);

    
  };

  const showEditMonAnAdmin = (e) => {
    formUpdate.resetFields();
    handleDetailMAAdmin(e);
    localStorage.setItem("tenmaput", e);
     
    setModalEditMAAdmin(true);
  };

  const handleCreateMAAdmin = async (e) => {
    const detailInput = {
       tenMonAn: e?.tenMonAn,
       loaiMonAn: e?.loaiMonAn,
       donGia: parseFloat(e?.donGia),
       maNhieuNguyenLieu: e?.maNhieuNguyenLieu,
       maHinhAnh: 2,
      };  
    await post(`/monan/luunhieu/`,detailInput)
    .then((response) => {
        console.log("createsuccess",response?.data?.data);
        setModalAddMAAdmin(false);
        fetchMA();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateMonAnAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddMAAdmin(true);
    
    
  };
  const handleCloseDelete =()=>{
    localStorage.removeItem("tenmadel");
    setModalDeleteMAAdmin(false);

  }
  const handleCloseEdit=()=>{
    formUpdate.resetFields();
    localStorage.removeItem("tenmaput");
    setModalEditMAAdmin(false);
  }

  const handleLoaiMonAn = (e) => {
    switch(e) {
      case "KHAI_VI": 
        return "Khai vị"
        break;
      case "MON_CHINH_1": 
        return "Món chính 1"
        break;
      case "MON_CHINH_2": 
        return "Món chính 2"
        break;
      case "MON_CHINH_3": 
        return "Món chính 3"
        break;
      case "MON_CHINH_4": 
        return "Món chính 4"
        break;
      case "MON_CHINH_5": 
        return "Món chính 5"
        break;
      case "TRANG_MIENG": 
        return "Tráng miệng"
        break;
      default:
        return "Món ăn mới"
        break;
    }
  }

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Món ăn
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchMA()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateMonAnAdmin()}
        >
         Tạo mới món ăn
        </Button>
       
      <Table locale={{ 
          triggerDesc: 'Sắp xếp giảm dần',
          triggerAsc: 'Sắp xếp tăng dần', 
          cancelSort: 'Hủy sắp xếp'
      }} scroll={{ y: 350 }} size={"small"} columns={columnsMA} dataSource={dataTableMA} />

      <Modal
          title="Xóa món ăn"
          visible={modalDeleteMAAdmin}
          onCancel={() => handleCloseDelete()}
          width={600}
          onOk={handleDeleteMAAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa món ăn ?</h1>
      </Modal>

      <Modal
        title="Chi tiết món ăn"
        visible={modalDetailMAAdmin}
        onCancel={() => setModalDetailMAAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã món ăn: {isMADetail?.maMonAn}</h3>

          <h3>Tên món ăn: {isMADetail?.tenMonAn}</h3>

          <h3>Đơn giá: {isMADetail?.donGia}</h3>
          
          <h3>Loại món ăn : {handleLoaiMonAn(isMADetail?.loaiMonAn)}</h3>

          <h3>Nguyên liệu: {mangnguyenLieu2.join(", ")}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật món ăn"
          visible={modalEditMAAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formUpdate.submit}
          okText="Cập nhật"
          cancelText="Hủy"
          onCancel={() => handleCloseEdit()}
          width={600}
          
        >
         <Form 
          {...formItemLayout}
          form={formUpdate}
          name="formUpdate"
          align="center"
          onFinish={handleUpdateMAAdmin}>
            <Form.Item
                name="tenMonAn"
                label="Tên món ăn"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên món ăn" }]}
              >
                <Input
                  placeholder="Nhập tên món ăn"
                />
              </Form.Item>

              <Form.Item
              name="donGia"
              label="Đơn giá"
              rules={[
                  {
                    required: true,
                    message: "Nhập đơn giá của món ăn",
                  },
                ]}
                
              >
                  <Input type="number" min={1}  placeholder="Nhập đơn giá"/>
              </Form.Item>
              <Form.Item
              name="loaiMonAn"
              label="Loại món ăn"
              rules={[
                  {
                    required: true,
                    message: "Nhập loaiMonAn của món ăn",
                  },
                ]}
                
              >
            <Select placeholder="Nguyên liệu">
                    <Option value="KHAI_VI">Khai vị</Option>
                    <Option value="MON_CHINH_1">Món chinh 1</Option>
                    <Option value="MON_CHINH_2">Món chinh 2</Option>
                    <Option value="MON_CHINH_3">Món chinh 3</Option>
                    <Option value="MON_CHINH_4">Món chinh 4</Option>
                    <Option value="MON_CHINH_5">Món chính 5</Option>
                    <Option value="TRANG_MIENG">Tráng miệng</Option>
            </Select>
              </Form.Item>
           
          </Form>

        </Modal>
        <Modal
          title="Tạo mới món ăn"
          visible={modalAddMAAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddMAAdmin(false)}
          width={600}
          
        >
         <Form 
          {...formItemLayout}
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateMAAdmin}>
             <Form.Item
                name="tenMonAn"
                label="Tên món ăn"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên món ăn" }]}
              >
                <Input
                  placeholder="Nhập tên món ăn"
                />
              </Form.Item>

              <Form.Item
              name="donGia"
              label="Đơn giá"
              rules={[
                  {
                    required: true,
                    message: "Nhập tình trạng của món ăn",
                  },
                ]}
                
              >
                  <Input type="number" min={0}  placeholder="Nhập đơn giá"/>
              </Form.Item>
              <Form.Item
              name="loaiMonAn"
              label="Loại món ăn"
              rules={[
                  {
                    required: true,
                    message: "Nhập loaiMonAn của món ăn",
                  },
                ]}
                
              >
            <Select placeholder="Nguyên liệu">
                    <Option value="KHAI_VI">Khai vị</Option>
                    <Option value="MON_CHINH_1">Món chinh 1</Option>
                    <Option value="MON_CHINH_2">Món chinh 2</Option>
                    <Option value="MON_CHINH_3">Món chinh 3</Option>
                    <Option value="MON_CHINH_4">Món chinh 4</Option>
                    <Option value="MON_CHINH_5">Món chính 5</Option>
                    <Option value="TRANG_MIENG">Tráng miệng</Option>
            </Select>
              </Form.Item>
            <Form.Item name="maNhieuNguyenLieu" label="Nguyên liệu">
            <Select placeholder="Nguyên liệu" mode="multiple">
                    {lhsk?.map((item) => (
                    <Option value={item?.maNguyenLieu}>{item?.tenNguyenLieu}</Option>
                    ))}
            </Select>
            </Form.Item>  
          </Form>

        </Modal>
    </div>
  );
}