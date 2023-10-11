const CardCurrentItem = ({
  user,
  index,
  className,
  showCurrent,
  postCount,
}) => {
  return (
    <>
      {user && (
        <div
          style={showCurrent ? { display: 'none' } : { display: 'block' }}
          className={className && className}
        >
          <div className={'col-12 mb-2'}>
            <div
              style={className && { backgroundColor: 'orange' }}
              className="card bg-warning text-black shadow"
            >
              <div className="card-body">
                <div className="rank-item row">
                  <div className="col-1">
                    <div className="ranking current-ranking">
                      <span style={{ color: 'white' }}>{index}</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="user-avatar current-avatar">
                      <img src={'http://localhost:3004/' + user.image} />
                    </div>
                  </div>
                  <div className="col-8 user-name current-name">
                    <p>{user.fullname}</p>
                    <small
                      style={{ color: 'white' }}
                      className="user-post-count current-post-count"
                    >
                      {postCount}
                    </small>
                    <small> posts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardCurrentItem;
