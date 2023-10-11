import request from '../core/utils/axios';

export const getPostsService = (post) => {
  let s = '';
  if (post.limit) {
    s += '?limit=' + post.limit + '';
  } else {
    s += '?limit=10';
  }
  if (post.title && post.title !== '') {
    s += '&title=' + post.title + '';
  }
  if (post.content && post.content !== '') {
    s += '&content=' + post.content + '';
  }
  if (post.sortBy) {
    s += '&sortBy=' + post.sortBy + '';
  }
  if (post.sort) {
    s += '&sort=' + post.sort + '';
  }
  if (post.page) {
    s += '&page=' + post.page + '';
  }

  console.log(s);
  return request.get('posts' + s);
};

export const createPostService = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await request.post('posts', post, config);
};

export const deletePostService = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await request.delete('posts/' + postId, config);
};

export const updatePostService = async (postId, post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  delete post.id;
  return await request.put('posts/' + postId, post, config);
};
