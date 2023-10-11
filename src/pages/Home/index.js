import React, { useEffect, useRef, useState } from 'react';
import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardItem from '../../components/items/card.item';
import {
  getRankMonthlyService,
  getRankYearlyService,
  getUserService,
} from '../../services/user.service';
import { ReactSVG } from 'react-svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import CardCurrentItem from '../../components/items/cardCurrent.item';

function Home() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [users, setUsers] = useState();
  const [scurrentRank, setScurrentRank] = useState(1);
  const [currentUser, setCurrentUser] = useState(0);
  const [term, setTerm] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  let currentRank = 1;
  let count = 1;
  const [currentPostion, setCurrentPosition] = useState(true);
  let currentPostCount = 0;
  const getUsers = async () => {
    let value = {};
    if (location.pathname === '/yearly') {
      value = await getRankYearlyService();
    } else {
      value = await getRankMonthlyService();
    }
    const data = value.data;
    if (user) {
      if (user.username === data[0].username) {
        currentRank = 1;
        currentPostCount = data[0].postCount;
        setCurrentPosition(false);
        setCurrentUser(data[0].postCount);
      } else {
        for (let i = 1; i < data.length; i++) {
          if (data[i - 1].postCount > data[i].postCount) {
            ++count;
          }
          if (data[i].username === user.username) {
            console.log(data[i].username);
            currentRank = count;
            currentPostCount = data[i].postCount;
            setCurrentUser(data[i].postCount);
            if (i <= 2) {
              setCurrentPosition(false);
            }
          }
        }
      }
      setScurrentRank(currentRank);
    }

    setUsers(value.data);
  };
  const termShow = () => {
    if (term === true) {
      setTerm(false);
    } else {
      setTerm(true);
    }
    console.log(term);
  };
  useEffect(() => {
    getUsers();
  }, [location]);
  const activeLink = ' active-statistic';
  const normalLink = ' link-statistic';
  let tmp = 1;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const windowHeight = useRef(window.innerHeight);
  let elem = document.getElementsByClassName('demo')[0];
  useEffect(() => {
    if (user) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      if (elem) {
        var screenPosition = elem.getBoundingClientRect();
        if (
          screenPosition.top <= windowHeight.current &&
          screenPosition.bottom >= 0
        ) {
          setShowCurrent(true);
        } else {
          setShowCurrent(false);
        }
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollPosition]);
  return (
    <>
      <div className={'container-fluid home-container-fuild'}>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="statistic" id="po">
              <NavLink
                to="/monthly"
                className={({ isActive }) =>
                  isActive
                    ? activeLink + ' statistic-item'
                    : normalLink + ' statistic-item'
                }
              >
                <strong>MONTHLY</strong>
              </NavLink>
              <NavLink
                to="/yearly"
                className={({ isActive }) =>
                  +isActive
                    ? activeLink + ' statistic-item'
                    : normalLink + ' statistic-item'
                }
              >
                <strong>YEARLY</strong>
              </NavLink>
            </div>
            <img
              className="crown-icon-raking mt-3 mb-1"
              src={require('../../assets/img/ranking_gradient.svg').default}
            />
            <h2>USER RANKING</h2>
            <p>Top 100 Users</p>
            {user && (
              <>
                <span>
                  {' '}
                  <img
                    className="crown-icon"
                    src={
                      require('../../assets/img/currect ranking.svg').default
                    }
                  />{' '}
                  Your current ranking:{' '}
                </span>{' '}
                <span className="current-ranking">{scurrentRank}th</span>
              </>
            )}

            <div className="card-body-ranking row mt-4">
              <div class="card-body-ranking-item col-4">
                {users && users.length >= 2 && (
                  <div className="user-ranking">
                    <img
                      className="crown-icon"
                      src={
                        require('../../assets/img/icon_score_master_sliver-45.svg')
                          .default
                      }
                    />
                    {users &&
                    users.length >= 2 &&
                    users[0].postCount > users[1].postCount ? (
                      <p>No.{++tmp}</p>
                    ) : (
                      <p>No.{tmp}</p>
                    )}

                    <div className="user-ranking-img">
                      <img src={'http://localhost:3004/' + users[1].image} />
                    </div>
                    <p className="user-name mt-3">{users[1].fullname}</p>
                    <div className="ranking-count-posts">
                      <small className="user-post-count">
                        {users[1].postCount}
                      </small>
                      <small className="user-post"> post</small>
                    </div>
                  </div>
                )}
              </div>
              <div class="card-body-ranking-item col-4">
                {users && users.length >= 1 && (
                  <div className="user-ranking">
                    <img
                      className="crown-icon"
                      src={
                        require('../../assets/img/icon_score_master_gold-45.svg')
                          .default
                      }
                    />
                    <p>No.1</p>
                    <div className="user-ranking-img user-top1">
                      <img
                        className={currentPostion ? '' : 'demo'}
                        src={'http://localhost:3004/' + users[0].image}
                      />
                    </div>
                    <p className="user-name mt-3">{users[0].fullname}</p>
                    <div className="ranking-count-posts">
                      <small className="user-post-count">
                        {users[0].postCount}
                      </small>
                      <small className="user-post"> post</small>
                    </div>
                  </div>
                )}
              </div>
              <div class="card-body-ranking-item col-4">
                {users && users.length >= 3 && (
                  <div className="user-ranking">
                    <img
                      className="crown-icon"
                      src={
                        require('../../assets/img/icon_score_master_bronze-45.svg')
                          .default
                      }
                    />
                    {users &&
                    users.length >= 3 &&
                    users[1].postCount > users[2].postCount ? (
                      <p>No.{++tmp}</p>
                    ) : (
                      <p>No.{tmp}</p>
                    )}
                    <div className="user-ranking-img">
                      <img src={'http://localhost:3004/' + users[2].image} />
                    </div>
                    <p className="user-name mt-3">{users[2].fullname}</p>
                    <div className="ranking-count-posts">
                      <small className="user-post-count">
                        {users[2].postCount}
                      </small>
                      <small className="user-post"> post</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fuild">
        <div className="list-user-ranking">
          {users &&
            users.length >= 4 &&
            users.map((item, index) => {
              if (index >= 3) {
                if (users[index].postCount < users[index - 1].postCount) {
                  ++tmp;
                }
                if (user && item.username === user.username) {
                  return (
                    <CardItem current={true} user={item} index={tmp}></CardItem>
                  );
                } else {
                  return <CardItem user={item} index={tmp}></CardItem>;
                }
              }
            })}
        </div>
      </div>
      <div className="container-fuild mt-5">
        <div class="card mb-4">
          <div class="card-header" onClick={termShow}>
            Term of Use {term ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
          </div>
          {term && (
            <div class="card-body card-body-Term">
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h6>Point 1</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
          )}
        </div>
      </div>
      <CardCurrentItem
        showCurrent={showCurrent}
        className="current-user-item"
        user={user}
        index={scurrentRank}
        postCount={currentUser}
      />
    </>
  );
}

export default Home;
