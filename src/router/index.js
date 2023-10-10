import Post from '../pages/Post';
import DefaultLayout from '../components/Layout/DefaultLayout';
import Home from '../pages/Home';
import Login from '../pages/login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import UserProfile from '../pages/userprofile';
import Follow from '../pages/Follow';
import UserAdmin from '../admin/userAdmin';
import AdminLayout from '../components/Layout/AdminLayout';

const publicRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/posts', component: Post, layout: DefaultLayout },
  { path: '/login', component: Login, layout: DefaultLayout },
  { path: '/signup', component: Register, layout: DefaultLayout },
  { path: '/monthly', component: Home, layout: DefaultLayout },
  { path: '/yearly', component: Home, layout: DefaultLayout },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    layout: DefaultLayout,
  },
  {
    path: '/reset-password/:uid/:token',
    component: ResetPassword,
    layout: DefaultLayout,
  },
  { path: '/profile', component: UserProfile, layout: DefaultLayout },
  { path: '/follows', component: Follow, layout: DefaultLayout },
  { path: '/admin/users', component: UserAdmin, layout: AdminLayout },
];
const privateRouters = [];

export { publicRoutes };
