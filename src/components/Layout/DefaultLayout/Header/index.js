import Brand from './Brand';
import Sidebar from './Sidebar';

function Header({ children }) {
  const mystyle = {
    border: '0px',
    width: '100%',
    display: 'block',
    zIndex: '15',
  };
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
