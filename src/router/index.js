import Post from '../pages/Post';
import DefaultLayout from '../components/Layout/DefaultLayout';
import Home from '../pages/Home';

const publicRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/posts', component: Post, layout: DefaultLayout },
];
const privateRouters = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/posts', component: Post, layout: DefaultLayout },
];

export { publicRoutes };
