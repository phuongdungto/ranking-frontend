const CardItem = ({ user, index }) => {
  return (
    <>
      <div class="col-12 mb-2">
        <div class="card bg-light text-black shadow">
          <div class="card-body">
            <div className="rank-item row">
              <div className="col-1 ranking">
                <p>{index}</p>
              </div>
              <div className="col-3 user-avatar">
                <img src={'http://localhost:3004/' + user.image} />
              </div>
              <div className="col-8 user-name">
                <p>{user.fullname}</p>
                <small className="user-post-count">{user.postCount}</small>
                <small> posts</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
