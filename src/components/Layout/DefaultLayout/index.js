import Header from './Header';
import Footer from './Footer';

function DefaultLayout({ children }) {
  const mystyle = {
    border: '0px',
    width: '100%',

    position: 'fixed',
    display: 'block',
    zIndex: '15',
    top: 0,
  };
  return (
    <div style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
      <div style={mystyle}>
        <Header />
      </div>
      <div className="content mt-6">{children}</div>
    </div>
  );
}

export default DefaultLayout;
