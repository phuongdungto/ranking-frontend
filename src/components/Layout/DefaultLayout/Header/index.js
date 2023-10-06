import Brand from './Brand';
import Sidebar from './Sidebar';

function Header({ children }) {
  const mystyle = {
    border: '0px',
    width: '100%',
    display: 'block',
    zIndex: '15',
  };
  window.addEventListener('scroll', function () {
    var header = this.document.getElementById('sidebar-menu');
    header.classList.toggle('sticky', this.window.scrollY > 39);
  });
  return (
    <>
      <Brand />
      <div style={mystyle}>
        <Sidebar />
      </div>
    </>
  );
}

export default Header;
