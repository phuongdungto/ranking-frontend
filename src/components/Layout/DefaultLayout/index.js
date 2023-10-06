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
      <div>
        <Header />
      </div>
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
