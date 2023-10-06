import Post from '../pages/Post';
import DefaultLayout from '../components/Layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/login';
import Register from '../pages/Register';

const publicRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/posts', component: Post, layout: DefaultLayout },
  { path: '/login', component: Login, layout: DefaultLayout },
  { path: '/signin', component: Register, layout: DefaultLayout },
];
const privateRouters = [];

export { publicRoutes };
