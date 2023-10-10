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

// export const getRankMonthlyService = () => {
//   return request.get('ranks/monthly');
// };

// export const getRankYearlyService = () => {
//   return request.get('ranks/yearly');
// };

// export const updatepostProfileService = async (post, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return await request.put('posts/me', post, config);
// };

// export const updatepostService = async (id, post, token) => {
//   const config = {
//     headers: { Authorization: `Bearer ${token}` },
//   };
//   const bodyParameters = {
//     ...post,
//   };
//   return await request.put('posts/' + id, bodyParameters, config);
// };
