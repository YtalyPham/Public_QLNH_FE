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
  SearchOutlined,RedoOutlined
  
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
export default function AdminThucDon() {
  const [formUpdate] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [dulieuTD, setDulieuTD] = useState([]);
  const [dataTableTD, setDataTableTD] = useState([]);
  const [modalAddTDAdmin, setModalAddTDAdmin] = useState(false);
  const [modalEditTDAdmin, setModalEditTDAdmin] = useState(false);
  const [modalDetailTDAdmin, setModalDetailTDAdmin] = useState(false);
  const [modalDeleteTDAdmin, setModalDeleteTDAdmin] = useState(false);
  const [isTDDetail, setIsTDDetail] = useState();
  const [dulieuKV, setDulieuKV] = useState([]);
  const [dulieuC1, setDulieuC1] = useState([]);
  const [dulieuC2, setDulieuC2] = useState([]);
  const [dulieuC3, setDulieuC3] = useState([]);
  const [dulieuLau, setDulieuLau] = useState([]);
  const [dulieuTM, setDulieuTM] = useState([]);

// lay danh sanh loai mon an
  const [lhsk,setLhsk]=useState([]);
  const fetchLhskList = () => {
    get("/monan/khongtrung")
      .then((response) => {
        setLhsk(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchLhskList();
    
  }, []);


  const columnsTD = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên thực đơn",
      dataIndex: "tenthucdon",
      key: "tenthucdon",
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
              placeholder="Nhập tên thực đơn cần tìm"
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
        return record.tenthucdon.toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.tenthucdon.localeCompare(b.tenthucdon),
    },
    {
      title: "Loại thực đơn",
      dataIndex: "setThucDon",
      key: "setThucDon",
      sorter: (a, b) => a.setThucDon - b.setThucDon,
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
    const _data = dulieuTD?.map((item, index) => ({
      stt: index + 1,
      tenthucdon: item?.tenThucDon,
      donGia: item?.donGia==null?"":themPhayVaoSo(item?.donGia),
      setThucDon: item?.setThucDon,
      detail: (
        <Button
          type="dashed"
          primary
          onClick={(e) => showDetailThucDonAdmin(item?.maThucDon)}
        >
          Chi tiết
        </Button>
      ),
      action: [
        <Button
          type="danger"
          onClick={(e) => showDeleteThucDonAdmin(item?.tenThucDon)}
        >
          Xóa
        </Button>,
        <Button
          type="primary"
          onClick={(e) => showEditThucDonAdmin(item?.tenThucDon)}
        >
          Cập nhật
        </Button>,
      ],
    }));
    setDataTableTD(_data);
  }, [dulieuTD]);

  useEffect(() => {
    fetchTD();
    fetchKV();
    fetchC1();
    fetchC2();
    fetchC3();
    fetchLau();
    fetchTM();
  }, []);

  const fetchKV = async (e) => {
    const detailInput = {
      name: "KHAI_VI",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuKV(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };
  
  const fetchC1 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_1",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC1(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };
  
  const fetchC2 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_2",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC2(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };
  
  const fetchC3 = async (e) => {
    const detailInput = {
      name: "MON_CHINH_3",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuC3(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };
  
  const fetchLau = async (e) => {
    const detailInput = {
      name: "LAU",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuLau(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };
  
  const fetchTM = async (e) => {
    const detailInput = {
      name: "TRANG_MIENG",
    };
    await post(`/monan/theoloai/`, detailInput)
      .then((response) => {
        setDulieuTM(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const fetchTD = async (e) => {
    await get(`/thucdon/khongtrung`)
      .then((response) => {
        setDulieuTD(response?.data?.data);
      })
      .catch((err) => {
        console.log("Err nH: ", err);
      });
  };

  const handleDetailTDAdmin = async (e) => {
    await get(`/thucdon/${e}`)
    .then((response) => {
      setIsTDDetail(response?.data?.data);
      handleDetailNguyenLieuMonAn(e,response?.data?.data.tenThucDon);
     
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const [manglieu, setManglieu] = useState();

  const handleDetailNguyenLieuThucDon = async (e,a) => {
    const detailInput = {
        name: a,
    }
    await post(`/thucdon/manguyenlieu`,detailInput)
    .then((response) => {
      handleDetailNguyenLieuThucDonTen(e,response?.data?.data)
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const handleDetailNguyenLieuThucDonTen =(e,a) => {
    const detailInput = {
      listid: a,
  }
    post(`/nguyenlieu/timnguyenlieutheothucdon`,detailInput)
    .then((response) => {
      setManglieu(response?.data?.data);
      
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  let mangNguyenLieu = [];

  const [mangnguyenLieu2,setMangNguyenLieu2] = useState([mangNguyenLieu])



  const handleDetailNguyenLieuMonAn = async (e,a) => {
    const detailInput = {
        name: a,
    }
    await post(`/thucdon/mamonan`,detailInput)
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
    await post(`/monan/timmonantheothucdon`,detailInput)
    .then((response) => {
      mangtemp = response?.data?.data;
      mangNguyenLieu = [];
      mangtemp.forEach(mangtemps => {mangNguyenLieu.push(mangtemps.tenMonAn);})
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
    console.log(mangNguyenLieu)
    setMangNguyenLieu2(mangNguyenLieu);
  };



  const showDetailThucDonAdmin = async (e) => {
    handleDetailTDAdmin(e);
    
    setModalDetailTDAdmin(true);
  };

  const handleDeleteTDAdmin =  (e) => {
    const TDdel=localStorage.getItem("tenTDdel");
    const detailInput={
      name: TDdel,
    }
    post(`/thucdon/listmathucdon/`,detailInput)
    .then((response) => {
      const detailInput2={
        listid: response?.data?.data
      }
      post(`/thucdon/deletelistmathucdon/`,detailInput2)
      .then((response) => {
        localStorage.removeItem("tenTDdel");
        setModalDeleteTDAdmin(false);
        fetchTD();
      })
      .catch((err) => {
        console.log("Err delete: ", err);
      });
    })
    .catch((err) => {
      console.log("Err getlistid: ", err);
    });
  };

  const handleUpdateTDAdmin =  (e) => {
    
    const TDput=localStorage.getItem("tenTDput");
    // const detailInput = {
    //   maThucDon: TDput,
    //   tenThucDon: e?.tenThucDon,
    //   setThucDon: e?.setThucDon,
    //   macDinh: true,
    //   donGia: parseFloat(e?.donGia),
    //   maMonAn: e?.maNhieuMonAn,
    //   maHinhAnh: 2,
    //  };  
  //  console.log(detailInput)
  const detailInput={
    name: TDput,
  }
  post(`/thucdon/listmathucdon/`,detailInput)
  .then((response) => {
    const detailInput2={
      tenThucDon: e?.tenThucDon,
      donGia: parseFloat(e?.donGia),
      listid: response?.data?.data
    }
    put(`/thucdon/updatelistmathucdon`,detailInput2)
    .then((response) => {
       
      // console.log("updatesuccess");
     localStorage.removeItem("tenTDput");
      setModalEditTDAdmin(false);
       fetchTD();
    })
    .catch((err) => {
      console.log("Err updatenhieu: ", err);
    });
  })
  .catch((err) => {
    console.log("Err getlistid: ", err);
  });
   
  };

  const showDeleteThucDonAdmin = async (e) => {
    localStorage.setItem("tenTDdel", e);
    setModalDeleteTDAdmin(true);

    
  };

  const showEditThucDonAdmin = async (e) => {
    formUpdate.resetFields();
    handleDetailTDAdmin(e);
    localStorage.setItem("tenTDput", e);
     
    setModalEditTDAdmin(true);
  };

  const handleCreateTDAdmin = async (e) => {
    var fruits = e?.maMonKhaiVi + ","+ e?.maMonChinh1 + ","+ e?.maMonChinh2 + ","+ e?.maMonChinh3 +","+ e?.maMonLau + ","+ e?.maMonTrangMieng ;
    var ar = fruits.split(',');
    const detailInput = {
       tenThucDon: e?.tenThucDon,
       setThucDon: e?.setThucDon,
       macDinh: true,
       donGia: parseFloat(e?.donGia),
       maNhieuMonAn: ar,
       maHinhAnh: 2,
      };  
      console.log(detailInput);
    await post(`/thucdon/luunhieu/`,detailInput)
    .then((response) => {
        console.log("createsuccess",response?.data?.data);
        setModalAddTDAdmin(false);
        fetchTD();
    })
    .catch((err) => {
      console.log("Err nH: ", err);
    });
  };

  const showCreateThucDonAdmin = async (e) => {
    formCreate.resetFields();
    setModalAddTDAdmin(true);
    
    
  };

  const handleCloseDelete=()=>{
    localStorage.removeItem("tenTDdel");
    setModalDeleteTDAdmin(false);
  }

  const handleCloseEdit=()=>{
    localStorage.removeItem("tenTDput");
    setModalEditTDAdmin(false)
  }

  const themPhayVaoSo = (e) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div >
      <Divider orientation="left" style={{ fontWeight: "bold" }}>
        Thực đơn
      </Divider>
      <Button type="dashed" icon={<RedoOutlined />} onClick={(e) => fetchTD()}></Button>
      <Button
          type="primary"
          onClick={(e) => showCreateThucDonAdmin()}
        >
         Tạo mới thực đơn
        </Button>,
      <Table
      locale={{ 
        triggerDesc: 'Sắp xếp giảm dần',
        triggerAsc: 'Sắp xếp tăng dần', 
        cancelSort: 'Hủy sắp xếp'
    }}
       scroll={{ y: 350 }} size={"small"} columns={columnsTD} dataSource={dataTableTD} />

      <Modal
          title="Xóa thực đơn"
          visible={modalDeleteTDAdmin}
          onCancel={() => handleCloseDelete()}
          width={600}
          onOk={handleDeleteTDAdmin}
          okText="Xóa"
          cancelText="Hủy"
        >
          <h1>Bạn có chắc chắn muốn xóa thực đơn ?</h1>
      </Modal>

      <Modal
        title="Chi tiết thực đơn"
        visible={modalDetailTDAdmin}
        onCancel={() => setModalDetailTDAdmin(false)}
        width={600}
        footer={false}
      >
        <div>
          <h3>Mã thực đơn: {isTDDetail?.maThucDon}</h3>

          <h3>Tên thực đơn: {isTDDetail?.tenThucDon}</h3>

          <h3>Đơn giá: {isTDDetail?.donGia}</h3>
          
          <h3>Loại thực đơn : {isTDDetail?.setThucDon}</h3>

          <h3>Món ăn: {mangnguyenLieu2.join(", ")}</h3>

        </div>
      </Modal>
      <Modal
          title="Cập nhật thực đơn"
          visible={modalEditTDAdmin}
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
          onFinish={handleUpdateTDAdmin}>
              <Form.Item
                name="tenThucDon"
                label="Tên thực đơn"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên thực đơn" }]}
              >
                <Input
                  placeholder="Nhập tên thực đơn"
                />
              </Form.Item>
            
              <Form.Item
              name="donGia"
              label="Đơn giá"
              rules={[
                  {
                    required: true,
                    message: "Nhập tình trạng của thực đơn",
                  },
                ]}
                
              >
                  <Input type="number" min={1}  placeholder="Nhập đơn giá"/>
              </Form.Item>
           
          </Form>

        </Modal>
        <Modal
          title="Tạo mới thực đơn"
          visible={modalAddTDAdmin}
          okButtonProps={{form:'insertuser', key: 'submit', htmlType: 'submit'}}
          onOk={formCreate.submit}
          okText="Tạo mới"
          cancelText="Hủy"
          onCancel={() => setModalAddTDAdmin(false)}
          width={600}
          
        >
         <Form 
          {...formItemLayout}
          form={formCreate}
          name="formCreate"
          align="center"
          onFinish={handleCreateTDAdmin}>
           <Form.Item
                name="tenThucDon"
                label="Tên thực đơn"
                rules={[
                  {
                    pattern:
                    /^[a-zA-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                    message: "Không nhập kí tự đặt biệt hoặc số",
                  },
                  { required: true, message: "Nhập tên thực đơn" }]}
              >
                <Input
                  placeholder="Nhập tên thực đơn"
                />
              </Form.Item>
              <Form.Item
                name="setThucDon"
                label="Set thực đơn"
                rules={[{ required: true, message: "Nhập set thực đơn" }]}
              >
                <Input
                  placeholder="Nhập set thực đơn"
                />
              </Form.Item>
              <Form.Item
              name="donGia"
              label="Đơn giá"
              rules={[
                  {
                    required: true,
                    message: "Nhập tình trạng của thực đơn",
                  },
                ]}
                
              >
                  <Input min={1} type="number"  placeholder="Nhập đơn giá"/>
              </Form.Item>
            <Form.Item name="maMonKhaiVi" label="Món khai vị" rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món khai vị" >
                    {dulieuKV?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>
            <Form.Item name="maMonChinh1" label="Món chính 1 " rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món chính 1">
                    {dulieuC1?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>    
            <Form.Item name="maMonChinh2" label="Món chính 2" rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món chính 2">
                    {dulieuC2?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>
            <Form.Item name="maMonChinh3" label="Món chính 3" rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món chính 3" >
                    {dulieuC3?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>    
            <Form.Item name="maMonLau" label="Món lẩu" rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món lẩu" >
                    {dulieuLau?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>  
            <Form.Item name="maMonTrangMieng" label="Món tráng miệng" rules={[{ required: true, message: "Nhập món ăn" }]}>
            <Select placeholder="Món tráng miệng" >
                    {dulieuTM?.map((item) => (
                    <Option value={item?.maMonAn}>{item?.tenMonAn}</Option>
                    ))}
            </Select>
            </Form.Item>  
          </Form>

        </Modal>
    </div>
  );
}