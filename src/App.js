import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import { publicRoutes } from './router';
import { Fragment, useEffect, useState } from 'react';
import './assets/css/sb-admin-2.min.css';

function App() {
  const [routerArr, setRouterArr] = useState();
  useEffect(() => {
    setRouterArr(publicRoutes);
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          {routerArr &&
            routerArr.length > 0 &&
            routerArr.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
