import './post.scss';
import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Linkify from 'linkify-react';
// import validator from 'validator';
import { Image, NavDropdown, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';
// import { getUserService } from '../../service/authService';
const Post = () => {
  const [posts, setPosts] = useState([]);
  const user = 'dung';
  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((item) => {
          const day = moment(item.updatedAt).format('DD/MM/YYYY HH:mm:ss');
          if (!user) {
            return (
              <div class="status-field-container write-post-container">
                <div class="user-profile-box">
                  <div class="user-profile">
                    <img
                      src={
                        'http://localhost:3004/static/avatar/image/' +
                        item.user.image
                      }
                      alt=""
                    />
                    <div>
                      <p> {item.user.fullname}</p>
                      <small>{day}</small>
                    </div>
                  </div>
                  <div>
                    <a href="#">
                      <i class="fas fa-ellipsis-v"></i>
                    </a>
                  </div>
                </div>
                <div class="status-field">
                  <Linkify as="p">{item.content}</Linkify>
                  {item.images &&
                    item.images.length > 0 &&
                    item.images.map((img) => {
                      return (
                        <img
                          src={
                            'http://localhost:3004/static/post/image/' +
                            img.name
                          }
                          alt=""
                        />
                      );
                    })}
                </div>
                <div class="post-reaction">
                  <div class="activity-icons">
                    <div
                      style={{ cursor: 'pointer' }}
                      // onClick={(e) => {
                      //   getPostHandel(item.id);
                      //   handleOpen(item.id);
                      // }}
                      className="mt-3"
                    >
                      Comment
                    </div>
                  </div>
                  <div class="post-profile-picture">
                    {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                  </div>
                </div>
              </div>
            );
          } else {
            if (user.id == item.userId) {
              return (
                <div class="status-field-container write-post-container">
                  <NavDropdown
                    id="dropdown-basic-button"
                    // title={UserMenu}
                    key="end"
                    drop="end"
                  >
                    {/* <Dropdown.Item
                      onClick={(e) => handleDeletePost(item)}
                      className="dropdowDot"
                    >
                      Delete
                    </Dropdown.Item> */}
                  </NavDropdown>
                  <div class="user-profile-box">
                    <div class="user-profile">
                      <img
                        src={
                          'http://localhost:3004/static/avatar/image/' +
                          item.user.image
                        }
                        alt=""
                      />
                      <div>
                        <p> {item.user.fullname}</p>
                        <small>{day}</small>
                      </div>
                    </div>
                    <div>
                      <a href="#">
                        <i class="fas fa-ellipsis-v"></i>
                      </a>
                    </div>
                  </div>
                  <div class="status-field">
                    <Linkify as="p">{item.content}</Linkify>
                    {item.images &&
                      item.images.length > 0 &&
                      item.images.map((img) => {
                        return (
                          <img
                            src={
                              'http://localhost:3004/static/post/image/' +
                              img.name
                            }
                            alt=""
                          />
                        );
                      })}
                  </div>
                  <div class="post-reaction">
                    <div class="activity-icons">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          // getPostHandel(item.id);
                          // handleOpen(item.id);
                        }}
                        className="mt-3"
                      >
                        {/* <img
                          src={require('../../assets/home/images/comments.png')}
                          alt=""
                        /> */}
                        Comment
                      </div>
                    </div>
                    <div class="post-profile-picture">
                      {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div class="status-field-container write-post-container">
                  <div class="user-profile-box">
                    <div class="user-profile">
                      <img
                        src={
                          'http://localhost:3004/static/avatar/image/' +
                          item.user.image
                        }
                        alt=""
                      />
                      <div>
                        <p> {item.user.fullname}</p>
                        <small>{day}</small>
                      </div>
                    </div>
                    <div>
                      <a href="#">
                        <i class="fas fa-ellipsis-v"></i>
                      </a>
                    </div>
                  </div>
                  <div class="status-field">
                    <Linkify as="p">{item.content}</Linkify>
                    {item.images &&
                      item.images.length > 0 &&
                      item.images.map((img) => {
                        return (
                          <img
                            src={
                              'http://localhost:3004/static/post/image/' +
                              img.name
                            }
                            alt=""
                          />
                        );
                      })}
                  </div>
                  <div class="post-reaction">
                    <div class="activity-icons">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          // getPostHandel(item.id);
                          // handleOpen(item.id);
                        }}
                        className="mt-3"
                      >
                        Comment
                      </div>
                    </div>
                    <div class="post-profile-picture">
                      {/* <img src={require("../../assets/home/images/profile-pic.png ")} alt="" /> <i class=" fas fa-caret-down"></i> */}
                    </div>
                  </div>
                </div>
              );
            }
          }
        })}

      <button
        // onClick={(e) => handleLoadMore()}
        type="button"
        class="btn-LoadMore"
        onclick="LoadMoreToggle()"
      >
        Load More
      </button>
      {/* </div> */}
    </>
  );
};

export default Post;
