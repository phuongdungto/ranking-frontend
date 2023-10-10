import Sidebar from './Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="row" style={{ backgroundColor: '#f2f7ff' }}>
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="col-9">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
