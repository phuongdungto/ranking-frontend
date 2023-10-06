import React, { useEffect, useState } from 'react';
import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardItem from '../../components/items/card.item';
import {
  getRankMonthlyService,
  getRankYearlyService,
  getUserService,
} from '../../services/user.service';

function Home() {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [search, setSearch] = useState({
    limit: 100,
    page: 1,
  });
  const getUsers = async () => {
    const value = await getRankYearlyService();
    console.log(value);
    setUsers(value.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="container-fluid home-container-fuild">
        <div className="card shadow mb-4">
          <div className="card-body">
            <h2>USER RANKING</h2>
            <p>Top 100 Users</p>
            <span>icon Your current ranking: </span>
            <div className="card-body-ranking row mt-4">
              {users && users.length >= 2 && (
                <div class="card-body-ranking-item col-4">
                  <div className="user-ranking">
                    <p>icon</p>
                    <p>No.2</p>
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
                </div>
              )}
              {users && users.length >= 1 && (
                <div class="card-body-ranking-item col-4">
                  <div className="user-ranking ">
                    <p>icon</p>
                    <p>No.1</p>
                    <div className="user-ranking-img user-top1">
                      <img src={'http://localhost:3004/' + users[0].image} />
                    </div>
                    <p className="user-name mt-3">{users[0].fullname}</p>
                    <div className="ranking-count-posts">
                      <small className="user-post-count">
                        {users[0].postCount}
                      </small>
                      <small className="user-post"> post</small>
                    </div>
                  </div>
                </div>
              )}
              {users && users.length >= 3 && (
                <div class="card-body-ranking-item col-4">
                  <div className="user-ranking">
                    <p className="user-icon">icon</p>
                    <p className="raking">No.3</p>
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
                </div>
              )}
            </div>
          </div>
          {/* <div className="card-body">
              <p>
                SB Admin 2 makes extensive use of Bootstrap 4 utility
                classNamees in order to reduce CSS bloat and poor page
                performance. Custom CSS classNamees are used to create custom
                components and custom utility classNamees. SB Admin 2 makes
                extensive use of Bootstrap 4 utility classNamees in order to
                reduce CSS bloat and poor page performance. Custom CSS
                classNamees are used to create custom components and custom
                utility classNamees. SB Admin 2 makes extensive use of Bootstrap
                4 utility classNamees in order to reduce CSS bloat and poor page
                performance. Custom CSS classNamees are used to create custom
                components and custom utility classNamees. SB Admin 2 makes
                extensive use of Bootstrap 4 utility classNamees in order to
                reduce CSS bloat and poor page performance. Custom CSS
                classNamees are used to create custom components and custom
                utility classNamees. SB Admin 2 makes extensive use of Bootstrap
                4 utility classNamees in order to reduce CSS bloat and poor page
                performance. Custom CSS classNamees are used to create custom
                components and custom utility classNamees. SB Admin 2 makes
                extensive use of Bootstrap 4 utility classNamees in order to
                reduce CSS bloat and poor page performance. Custom CSS
                classNamees are used to create custom components and custom
                utility classNamees. SB Admin 2 makes extensive use of Bootstrap
                4 utility classNamees in order to reduce CSS bloat and poor page
                performance. Custom CSS classNamees are used to create custom
                components and custom utility classNamees. SB Admin 2 makes
                extensive use of Bootstrap 4 utility classNamees in order to
                reduce CSS bloat and poor page performance. Custom CSS
                classNamees are used to create custom components and custom
                utility classNamees. SB Admin 2 makes extensive use of Bootstrap
                4 utility classNamees in order to reduce CSS bloat and poor page
                performance. Custom CSS classNamees are used to create custom
                components and custom utility classNamees.
              </p>
              <p className="mb-0">
                Before working with this theme, you should become familiar with
                the Bootstrap framework, especially the utility classNamees.
              </p>
            </div> */}
        </div>
      </div>
      <div className="container-fuild">
        <div className="list-user-ranking">
          {users &&
            users.length >= 4 &&
            users.map((item, index) => {
              if (index >= 3)
                return <CardItem user={item} index={index}></CardItem>;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
