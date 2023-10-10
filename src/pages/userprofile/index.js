import 'bootstrap/dist/css/bootstrap.min.css';
import './userprofile.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import cookies from 'react-cookies';
import {
  updateUserProfileService,
  updateUserService,
} from '../../services/user.service';
import { userLogin } from '../../store/action/userAction';
import { Notify } from '../../core/constant';
import { handelNotify } from '../../core/utils/req';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const token = cookies.load('Token');
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({
    fullname: user.fullname,
    image: user.image,
  });
  const [file, setFile] = useState();
  const [repair, setRepair] = useState(true);
  const [showAlertCf, setShowAlertCf] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setUserProfile({
      ...userProfile,
      [e.target.name]: value,
    });
  };
  const handleChangeImage = (e) => {
    if (e.target && e.target.files[0]) {
      setFile({
        file: e.target.files[0],
      });
    }
  };
  const handleOnclickEdit = () => {
    setRepair(false);
  };
  const handleOnclickSave = () => {
    setShowAlertCf({
      open: true,
      variant: Notify.WARNING,
      text: 'Bạn chắc chắc thay đổi thông tin cá nhân',
      title: 'Xác nhận',
      backdrop: 'static',
      onClick: () => handleclickSaveCf(),
    });
    // setRepair(true)
  };
  const handleclickSaveCf = async () => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('fullname', userProfile.fullname);
      bodyFormData.append('image', file.file);
      console.log(bodyFormData);
      console.log(file.file);

      const res = await updateUserProfileService(bodyFormData, token);
      const data = res && res.data ? res.data : '';
      console.log(data);
      cookies.save('user', data);
      dispatch(userLogin(data));
      setUserProfile(data);
      setRepair(true);
      setShowAlertCf({ open: false });
      handelNotify('success', 'Sửa thông tin thành công');
    } catch (error) {}
  };
  const handleCancelUpdate = () => {
    setUserProfile({
      fullname: user.fullname,
      image: user.image,
    });
    setShowAlertCf({ open: false });
    setRepair(true);
  };
  useEffect(() => {}, [user]);
  let pathBtn = (
    <input
      type="button"
      className="btn btn-secondary"
      onClick={handleOnclickEdit}
      name="btnAddMore"
      value="Edit Profile"
    />
  );
  let pathFullname = <p>{userProfile.fullname}</p>;
  if (!repair) {
    pathBtn = (
      <input
        type="button"
        className="btn btn-success"
        onClick={handleOnclickSave}
        name="btnAddMore"
        value="Save"
      />
    );
    pathFullname = (
      <input
        type="text"
        name="fullname"
        onChange={handleChange}
        className="form-control inputProfile"
        value={userProfile.fullname}
      />
    );
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Modal
        show={showAlertCf.open}
        onHide={handleCancelUpdate}
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
          <Button variant="secondary" onClick={handleCancelUpdate}>
            trở lại
          </Button>
          <Button onClick={showAlertCf.onClick} variant="primary">
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <form method="post">
          <div className="row ">
            <div className="emp-profile col-8 offset-2">
              <h3 className="titleGiohang">Thông tin tài khoản</h3>
              <div className="row p-5">
                <div className="col-md-2 mb-3">{pathBtn}</div>
                <div className="row">
                  <div class="col-12">
                    <div class="profile-img">
                      <img
                        src={'http://localhost:3004/' + userProfile.image}
                        alt=""
                      />
                      {!repair && (
                        <div class="file btn btn-lg btn-primary">
                          Change Photo
                          <input type="file" onChange={handleChangeImage} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <div
                        className="tab-content profile-tab"
                        id="myTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="home"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="row">
                            <div className="col-md-5">
                              <label>Name:</label>
                            </div>
                            <div className="col-md-4">{pathFullname}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
