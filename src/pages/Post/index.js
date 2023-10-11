import './post.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Linkify from 'linkify-react';
import {
  Button,
  Dropdown,
  Form,
  Modal,
  NavDropdown,
  SplitButton,
} from 'react-bootstrap';
import {
  createPostService,
  deletePostService,
  getPostsService,
  updatePostService,
} from '../../services/post.service';
import { useSelector } from 'react-redux';
import cookies from 'react-cookies';
import { handelNotify } from '../../core/utils/req';
import { ToastContainer } from 'react-toastify';
import { FaEllipsisVertical } from 'react-icons/fa6';

const Post = () => {
  const user = useSelector((state) => state.user.user);
  const token = cookies.load('Token');
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({
    limit: 5,
    page: 1,
    sort: 'createdAt',
    sortBy: 'desc',
  });
  const getPosts = async () => {
    const value = await getPostsService(search);
    const data = value.data;
    setPosts(data);
  };
  const handleLoadMore = () => {
    setSearch({
      ...search,
      limit: search.limit + 5,
    });
  };
  const [showPost, setShowPost] = useState({
    open: false,
    title: '',
  });
  const handleClose = () => {
    setShowPost({
      open: false,
    });
  };
  const handleOpen = () => {
    setPost({
      title: '',
      content: '',
    });
    setShowPost({
      title: 'Posting',
      open: true,
    });
  };
  const [post, setPost] = useState({
    title: '',
    content: '',
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
    });
    console.log(post);
  };
  const hadleOnclick = async () => {
    try {
      const res = await createPostService(post, token);
      const data = res && res.data ? res.data : '';
      console.log(data);
      setShowPost(false);
      handelNotify('success', 'Đăng bài thành công');
      setSearch({
        ...search,
      });
    } catch (error) {
      console.log(error);
      handelNotify('error', 'Đăng bài thất bại');
    }
  };
  const UserMenu = (
    <img
      className="img-dot"
      src={require('../../assets/img/ellipsis.png')}
      alt=""
    />
  );
  const handleDeletePost = async (postId) => {
    try {
      const res = await deletePostService(postId, token);
      const data = res && res.data ? res.data : '';
      console.log(data);
      setSearch({
        ...search,
      });
      handelNotify('success', 'xóa bài đăng thành công');
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowUpdatePost = (item) => {
    setPost({
      title: item.title,
      content: item.content,
      id: item.id,
    });
    setShowPost({
      open: true,
      title: 'Updating',
    });
  };

  const hadleOnclickUpdate = async () => {
    try {
      const res = await updatePostService(post.id, post, token);
      const data = res && res.data ? res.data : '';
      console.log(data);
      setShowPost(false);
      handelNotify('success', 'Sửa bài đăng thành công');
      setSearch({
        ...search,
      });
    } catch (error) {
      console.log(error);
      handelNotify('error', 'Sửa bài đăng thất bại');
    }
  };
  useEffect(() => {
    getPosts();
  }, [search]);
  return (
    <>
      <ToastContainer />
      <Modal show={showPost.open} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{showPost.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="title"
                type="text"
                autoFocus
                value={post.title}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="content"
                as="textarea"
                rows={3}
                value={post.content}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              showPost.title === 'Posting' ? hadleOnclick : hadleOnclickUpdate
            }
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container mt-5 mb-5">
        {user && (
          <div
            onClick={() => handleOpen()}
            style={{ cursor: 'pointer' }}
            class="col-lg-12 mb-4"
          >
            <div class="card bg-light text-black shadow">
              <div class="card-body">
                <div class="post-upload-textarea">
                  <textarea
                    onClick={() => handleOpen()}
                    style={{ cursor: 'pointer' }}
                    name="content"
                    type="input"
                    placeholder={`What's on your mind, ${user.fullname}`}
                    id=""
                    cols="30"
                    rows="3"
                    readOnly
                  ></textarea>
                  <p
                    style={{ color: 'red' }}
                    className="text-red-400 text-xs italic"
                  ></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {posts.posts &&
          posts.posts.length > 0 &&
          posts.posts.map((item, index) => {
            const day = moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss');
            return (
              <div class="row mt-5 d-flex align-items-center justify-content-center">
                <div style={{ position: 'relative' }} class="col-md-6">
                  {user && user.id === item.user.id && (
                    <>
                      <NavDropdown
                        id="dropdown-basic-button"
                        title={UserMenu}
                        key="end"
                        drop="end"
                        className="img-dot"
                      >
                        <Dropdown.Item
                          onClick={(e) => handleDeletePost(item.id)}
                          className="dropdowDot"
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={(e) => handleShowUpdatePost(item)}
                          className="dropdowDot"
                        >
                          Update
                        </Dropdown.Item>
                      </NavDropdown>
                    </>
                  )}
                  <div class="card">
                    <div class="d-flex justify-content-between p-2 px-3">
                      <div class="d-flex flex-row align-items-center">
                        {' '}
                        <img
                          src={'http://localhost:3004/' + item.user.image}
                          width="40"
                          class="rounded-image"
                        />
                        <div class="d-flex flex-column ml-2">
                          {' '}
                          <span class="font-weight-bold">
                            {item.user.fullname}
                          </span>{' '}
                        </div>
                      </div>
                      <div class="d-flex flex-row mt-3 ellipsis">
                        {' '}
                        <small class="mr-2">{day}</small>
                      </div>
                    </div>{' '}
                    <hr />
                    <div class="p-2">
                      <p class="text-justify title">{item.title}</p>
                    </div>
                    {/* <img src="https://i.imgur.com/xhzhaGA.jpg" class="img-fluid" /> */}
                    <div class="p-2">
                      <p class="text-justify">{item.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <button
        className="mb-3"
        onClick={(e) => handleLoadMore()}
        type="button"
        class="btn-LoadMore"
        onclick="LoadMoreToggle()"
      >
        Load More
      </button>
    </>
  );
};

export default Post;
