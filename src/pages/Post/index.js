import './post.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Linkify from 'linkify-react';
import { Image, NavDropdown, Dropdown } from 'react-bootstrap';
import { getPostsService } from '../../services/post.service';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({
    limit: 5,
    page: 1,
  });
  const getPosts = async () => {
    const value = await getPostsService(search);
    const data = value.data;
    console.log(data);
    setPosts(data);
  };
  const handleLoadMore = () => {
    setSearch({
      ...search,
      limit: search.limit + 5,
    });
  };
  useEffect(() => {
    getPosts();
  }, [search]);
  return (
    <>
      <div className="container mt-5 mb-5">
        {posts.posts &&
          posts.posts.length > 0 &&
          posts.posts.map((item, index) => {
            const day = moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss');
            return (
              <div class="row mt-5 d-flex align-items-center justify-content-center">
                <div class="col-md-6">
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
                      <div class="d-flex flex-row mt-1 ellipsis">
                        {' '}
                        <small class="mr-2">{day}</small>{' '}
                        <i class="fa fa-ellipsis-h"></i>{' '}
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
