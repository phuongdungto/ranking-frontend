const CardItem = ({ user }) => {
  return (
    <>
      <div class="col-lg-12 mb-4">
        <div class="card bg-light text-black shadow">
          <div class="card-body">
            {user.fullname}
            <div class="text-black-50 small">#f8f9fc</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
