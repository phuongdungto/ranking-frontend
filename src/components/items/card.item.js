const CardItem = ({ user, index, current }) => {
  return (
    <>
      {user && (
        <div class={current ? 'col-12 mb-2 demo' : 'col-12 mb-2'}>
          <div class="card bg-light text-black shadow">
            <div class="card-body">
              <div className="rank-item row">
                <div className="col-1">
                  <div className="ranking current-ranking">
                    <span>{index}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="user-avatar current-avatar">
                    <img src={'http://localhost:3004/' + user.image} />
                  </div>
                </div>
                <div className="col-8 user-name current-name">
                  <p>{user.fullname}</p>
                  <small className="user-post-count current-post-count">
                    {user.postCount}
                  </small>
                  <small> posts</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardItem;
