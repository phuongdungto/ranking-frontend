import { useEffect, useState } from 'react';
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from '../../services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faScrewdriverWrench,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Notify, Roles } from '../../core/constant';
import cookies from 'react-cookies';
import { validateFull } from '../../core/utils/validate';
import { handelNotify, handleError } from '../../core/utils/req';
import { ToastContainer } from 'react-toastify';
import './userAdmin.scss';

function UserAdmin() {
  const token = cookies.load('Token');
  const limit = 10;
  const [search, setSearch] = useState({
    limit: limit,
    page: 1,
  });
  const [repairuser, setRepairuser] = useState({
    username: '',
    fullname: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  });
  const [adduser, setAdduser] = useState({
    username: '',
    password: '',
    fullname: '',
    role: 'user',
  });
  const [users, setUsers] = useState({});
  const [pagination, SetPagination] = useState('');
  const getListUser = async (list) => {
    try {
      const res = await getUsersService(list);
      const data = res && res.data ? res.data : [];
      console.log(data);
      SetPagination(selectPagination(data.totalPage));
      setUsers(data.users);
    } catch (error) {}
  };
  const selectPagination = (page) => {
    let content = [];
    console.log(page);
    for (let i = 1; i <= page; i++) {
      content.push({
        pageNumber: i,
      });
    }
    return content;
  };
  const handelChange = (i) => {
    setSearch({
      ...search,
      page: i,
    });
  };
  const [showAdd, setshowAdd] = useState(false);
  const handleClodeAdd = () => setshowAdd(false);
  const [showDetail, setshowDetail] = useState(false);
  const handleCloseDetail = () => setshowDetail(false);
  const handleshowDetail = async (e) => {
    try {
      let data = await getUserByIdService(e);
      console.log(data);
      setRepairuser(data.data);
      setshowDetail(true);
      console.log(repairuser);
    } catch (error) {
      console.log(error);
    }
  };
  const [addValidate, SetAddValidate] = useState('');
  const handleChangeRole = (e) => {
    setAdduser({
      ...adduser,
      role: e.value,
    });
  };
  const handleChangeUpdateRole = (e) => {
    setRepairuser({
      ...repairuser,
      role: e.value,
    });
  };
  const handleshowAdd = () => {
    SetAddValidate('');
    setFile('');
    setshowAdd(true);
  };
  const handleChangeAdduser = (e) => {
    const value = e.target.value;
    setAdduser({
      ...adduser,
      [e.target.name]: value,
    });
  };
  const [file, setFile] = useState();
  const handleChangeImage = (e) => {
    if (e.target && e.target.files[0]) {
      setFile({
        file: e.target.files[0],
      });
    }
  };
  const handleClickAddUser = async () => {
    const isValid = validateFull(adduser);
    SetAddValidate(isValid);
    if (Object.keys(isValid).length > 0) return;
    try {
      const formData = new FormData();
      Object.keys(adduser).forEach((key) => {
        formData.append(key, adduser[key]);
      });
      if (file && file.file) {
        formData.append('image', file.file);
      }
      const data = await createUserService(formData, token);
      const req = handleError(data.request);
      console.log(data);
      handleClodeAdd();
      handelNotify('success', 'Thêm tài khoản thành công');
      setSearch({
        ...search,
        limit: limit,
        page: 1,
      });
    } catch (error) {
      const req = handleError(error.request);
      handelNotify('error', req);
    }
  };
  const [showRepair, setShowRepair] = useState(false);
  const [repairValidate, SetRepairValidate] = useState('');
  const handleCloseRepair = () => setShowRepair(false);
  const handleShowRepair = async (e) => {
    SetRepairValidate('');
    setFile('');
    try {
      let data = await getUserByIdService(e, token);
      setRepairuser(data.data);
    } catch (error) {}
    console.log(repairuser);
    setShowRepair(true);
  };
  const handleChangeRepairuser = (e) => {
    const value = e.target.value;
    setRepairuser({
      ...repairuser,
      [e.target.name]: value,
    });

    console.log(repairuser);
  };
  const [showAlertCf, setShowAlertCf] = useState({
    open: false,
    valirant: '',
    text: '',
    title: '',
    backdrop: '',
  });
  const handelShowCfRepairUser = (e) => {
    const isValid = validateFull(repairuser);
    SetRepairValidate(isValid);
    if (Object.keys(isValid).length > 0) return;
    setShowAlertCf({
      open: true,
      variant: Notify.WARNING,
      text: 'Bạn có chắc chắn muốn sửa tài khoản này không?',
      title: 'Xác nhận',
      backdrop: 'static',
      onClick: () => handleClickRepairUser(e),
    });
  };
  const handleClickRepairUser = async (user) => {
    try {
      const formData = new FormData();
      const update = repairuser;
      const userId = update.id;
      delete update.username;
      delete update.createdAt;
      delete update.updatedAt;
      delete update.deletedAt;
      delete update.id;
      delete update.image;
      Object.keys(update).forEach((key) => {
        formData.append(key, update[key]);
      });
      if (file && file.file) {
        formData.append('image', file.file);
      }
      const data = await updateUserService(userId, formData, token);
      const req = handleError(data.request);
      handleCloseRepair();
      setShowAlertCf({
        open: false,
      });
      handelNotify('success', 'Sửa tài khoản ' + req);
      setSearch({
        ...search,
        limit: limit,
        page: 1,
      });
    } catch (e) {
      const req = handleError(e.request);
      setShowAlertCf({
        open: false,
      });
      handelNotify('error', req);
    }
  };
  const handelShowCfDelete = (e) => {
    setShowAlertCf({
      open: true,
      variant: Notify.WARNING,
      text: 'Bạn có chắc chắn muốn khóa tài khoản này không?',
      title: 'Xác nhận',
      backdrop: 'static',
      onClick: () => handelDelete(e),
    });
  };
  const handelDelete = async (user) => {
    try {
      const data = await deleteUserService(user, token);
      setShowAlertCf({
        open: false,
      });
      setSearch({
        ...search,
        fullname: '',
        gender: '',
        address: '',
        sort: '',
        sortBy: '',
      });
      const req = handleError(data.request);
      handelNotify('success', 'Khóa tài khoản ' + req);
    } catch (error) {
      const req = handleError(error.request);
      setShowAlertCf({
        open: false,
      });
      handelNotify('error', req);
    }
  };
  const [typeSearch, setTypeSearch] = useState('fullname');
  const handelChangeSearch = (e) => {
    const value = e.target.value;
    setTypeSearch(value);
    console.log(value);
    document.getElementById('search-product-text').value = '';
    setSearch({
      limit: limit,
      page: 1,
      sort: '',
      sortBy: '',
    });
  };
  const handelUserSearch = (e) => {
    const value = e.target.value;
    let tmp = typeSearch;
    setSearch({
      [tmp]: value,
      limit: limit,
      page: 1,
      sort: '',
      sortBy: '',
    });
  };
  useEffect(() => {
    getListUser(search);
  }, [search]);
  const optionsRoles = [
    { value: Roles.ADMIN, label: Roles.ADMIN },
    { value: Roles.USER, label: Roles.USER },
  ];
  const optionsSearch = [
    { value: 'fullname', label: 'Họ và tên' },
    { value: 'username', label: 'Địa chỉ Email' },
  ];
  return (
    <>
      <ToastContainer />
      <Modal
        show={showAlertCf.open}
        onHide={() => setShowAlertCf({ open: false })}
        backdrop={showAlertCf.backdrop}
        keyboard={false}
      >
        <Modal.Header
          style={{ backgroundColor: showAlertCf.variant }}
          closeButton
        >
          <Modal.Title>{showAlertCf.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showAlertCf.text}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAlertCf({ open: false })}
          >
            Hủy
          </Button>
          <Button onClick={showAlertCf.onClick} variant="primary">
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <div id="main-content">
        <div className="page-heading">
          <div className="col-sm-6">
            <div id="search-user-form" name="search-user-form">
              <div className="form-group position-relative has-icon-right row">
                <div className="form-group position-relative has-icon-right col-9">
                  <input
                    onChange={handelUserSearch}
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
                  onChange={handelChangeSearch}
                >
                  {optionsSearch &&
                    optionsSearch.length > 0 &&
                    optionsSearch.map((item) => {
                      return <option value={item.value}>{item.label}</option>;
                    })}
                </select>
                <div className="row table-name">
                  <label>
                    <h3>Danh sách người dùng</h3>
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-5 order-md-2 order-first">
                <div className=" loat-start mb-2">
                  <button
                    onClick={handleshowAdd}
                    id="btn-createaccount"
                    className="btn btn-primary"
                  >
                    <i className="bi bi-plus"></i> Thêm tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                              !((index + 1) % 2) ? 'table-info' : 'table-light'
                            }
                          >
                            <td>{item.id}</td>
                            <td className="text-break">{item.username}</td>
                            <td className="text-break">{item.fullname}</td>
                            <td className="text-break">
                              <pre>
                                <button
                                  onClick={(e) => handleshowDetail(item.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="fa-icon"
                                  />
                                </button>
                                <span> </span>
                                <button
                                  onClick={(e) => handleShowRepair(item.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faScrewdriverWrench}
                                    className="fa-icon"
                                  />
                                </button>
                                <span> </span>
                                <button
                                  onClick={(e) => handelShowCfDelete(item.id)}
                                >
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
                  >
                    {pagination &&
                      pagination.length > 0 &&
                      pagination.map((item) => {
                        return (
                          <li class="page-item" active>
                            <button
                              onClick={(e) => handelChange(item.pageNumber)}
                              class="page-link"
                            >
                              {item.pageNumber}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className="ModalSua" show={showRepair} onHide={handleCloseRepair}>
        <Modal.Header className="ModalSuaHeader" closeButton>
          <Modal.Title>Sửa người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Địa chỉ Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                readOnly="readOnly"
                defaultValue={repairuser.username}
                autoFocus
              />
              {repairValidate.username && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {repairValidate.username}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh đại diện:</Form.Label>
              <Form.Control
                onChange={handleChangeImage}
                type="file"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Họ Tên:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ tên"
                name="fullname"
                defaultValue={repairuser.fullname}
                onChange={handleChangeRepairuser}
                autoFocus
              />
              {repairValidate.fullname && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {repairValidate.fullname}
                </p>
              )}
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Label>Quyền:</Form.Label>
                <Select
                  onChange={handleChangeUpdateRole}
                  name="role"
                  defaultValue={
                    repairuser && repairuser.role === optionsRoles[0].value
                      ? optionsRoles[0]
                      : optionsRoles[1]
                  }
                  options={optionsRoles}
                />
                {/* <Form.Control
                  type="text"
                  placeholder="Quyền"
                  defaultValue={repairuser.role}
                  autoFocus
                />
                {repairValidate.role && (
                  <p
                    style={{ color: 'red' }}
                    className="text-red-400 text-xs italic"
                  >
                    {repairValidate.role}
                  </p>
                )} */}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRepair}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handelShowCfRepairUser(repairuser.id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal className="ModalThem" show={showAdd} onHide={handleClodeAdd}>
        <Modal.Header className="ModalThemHeader" closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh đại diện:</Form.Label>
              <Form.Control
                onChange={handleChangeImage}
                type="file"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Địa chỉ Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="username"
                onChange={handleChangeAdduser}
                autoFocus
              />
              {addValidate.username && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {addValidate.username}
                </p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mật Khẩu:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangeAdduser}
              />
              {addValidate.password && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {addValidate.password}
                </p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Họ Tên:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ tên"
                name="fullname"
                onChange={handleChangeAdduser}
              />
              {addValidate.fullname && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {addValidate.fullname}
                </p>
              )}
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Label>Quyền:</Form.Label>
                <Select
                  onChange={handleChangeRole}
                  name="role"
                  options={optionsRoles}
                  defaultValue={optionsRoles[1]}
                />
              </div>
              {addValidate.role && (
                <p
                  style={{ color: 'red' }}
                  className="text-red-400 text-xs italic"
                >
                  {addValidate.role}
                </p>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClodeAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickAddUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="ModalChitiet"
        show={showDetail}
        onHide={handleCloseDetail}
      >
        <Modal.Header className="ModalChitietHeader" closeButton>
          <Modal.Title>Xem chi tiết người dùng</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseDetail}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserAdmin;
