import Header from '../DefaultLayout/Header';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="row" style={{ backgroundColor: '#f2f7ff' }}>
      <Header />
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="col-9">
        <div className="contentAdmin">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
