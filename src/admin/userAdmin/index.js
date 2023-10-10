import { useEffect, useState } from 'react';
import { getUsersService } from '../../services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faScrewdriverWrench,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';

function UserAdmin() {
  const [search, setSearch] = useState({
    limit: 10,
    page: 1,
  });
  const [repairuser, setRepairuser] = useState({
    username: '',
    fullname: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  });
  const [users, setUsers] = useState({});
  const getListUser = async (list) => {
    try {
      const res = await getUsersService(list);
      const data = res && res.data ? res.data : [];
      console.log(data);
      //   SetPagination(selectPagination(data.totalPage));
      setUsers(data.users);
    } catch (error) {}
  };
  useEffect(() => {
    getListUser(search);
  }, [search]);
  return (
    <>
      <div id="main-content">
        <div className="page-heading">
          <div className="col-sm-6">
            <div id="search-user-form" name="search-user-form">
              <div className="form-group position-relative has-icon-right row">
                <div className="form-group position-relative has-icon-right col-9">
                  <input
                    id="search-product-text"
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-7 order-md-1 order-last">
                <label>
                  <h6 style={{ marginLeft: '20px', marginRight: '10px' }}>
                    {' '}
                    Lọc Theo:
                  </h6>
                </label>
                <select
                  className="btn btn btn-primary"
                  name="search-cbb"
                  id="cars-search"
                ></select>
                <div className="row">
                  <label>
                    <h3>Danh sách người dùng</h3>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-5 order-md-2 order-first">
                <div className=" loat-start mb-2">
                  <button id="btn-createaccount" className="btn btn-primary">
                    <i className="bi bi-plus"></i> Thêm tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section className="section">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-danger" id="table1">
                    <thead>
                      <tr className="">
                        <th>Chọn</th>
                        <th>Tài khoản email</th>
                        <th>Họ và tên</th>
                        <th>Tác Vụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.length > 0 &&
                        users.map((item, index) => {
                          return (
                            <tr
                              className={
                                !((index + 1) % 2)
                                  ? 'table-info'
                                  : 'table-light'
                              }
                            >
                              <td>{item.id}</td>
                              <td className="text-break">{item.username}</td>
                              <td className="text-break">{item.fullname}</td>
                              <td className="text-break">
                                <pre>
                                  <button>
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="fa-icon"
                                    />
                                  </button>
                                  <span> </span>
                                  <button>
                                    <FontAwesomeIcon
                                      icon={faScrewdriverWrench}
                                      className="fa-icon"
                                    />
                                  </button>
                                  <span> </span>
                                  <button>
                                    <FontAwesomeIcon
                                      icon={faUnlock}
                                      className="fa-icon"
                                    />
                                  </button>
                                </pre>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <nav className="mt-4">
                    <ul
                      id="pagination"
                      className="pagination justify-content-center"
                    ></ul>
                  </nav>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal className="ModalChitiet">
        <Modal.Header className="ModalChitietHeader" closeButton>
          <Modal.Title>Chi tiết người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Địa chỉ Email:</Form.Label>
              <Form.Control
                readOnly="readOnly"
                placeholder="name@example.com"
                defaultValue={repairuser.username}
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Họ Tên:</Form.Label>
              <Form.Control
                readOnly="readOnly"
                placeholder="Họ tên"
                defaultValue={repairuser.fullname}
              />
            </Form.Group>
            <div className="row">
              <div className="col-6 mb-2">
                <Form.Label>Quyền:</Form.Label>
                <Form.Control
                  readOnly="readOnly"
                  placeholder="Quyền"
                  defaultValue={repairuser.role}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Ngày tạo:</Form.Label>
                  <Form.Control
                    readOnly="readOnly"
                    defaultValue={repairuser.createdAt}
                  />
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Ngày cập nhật gần nhất:</Form.Label>
                  <Form.Control
                    readOnly="readOnly"
                    placeholder="Số điện thoại"
                    defaultValue={repairuser.updatedAt}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserAdmin;
