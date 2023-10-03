import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import "./Profile.css";

const Profile = () => {
  // const navigate = useNavigate();


  const {user } = useSelector((state) => state.user);




  return (
    <Fragment>
     
        <Fragment>
          {/* <MetaData title={`${user.fullName}`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user.fullName} />
              <Link to="/profile/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.fullName}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
    </Fragment>
  );
};

export default Profile;
