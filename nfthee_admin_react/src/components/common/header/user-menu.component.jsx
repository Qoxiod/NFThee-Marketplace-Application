import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UserMenu = () => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    setTimeout(() => {
      history.push('/login')
    }, 200)
  };

  return (
    <li className="onhover-dropdown">
      <div className="media  align-items-center">
        <img
          className="align-self-center pull-right mr-2"
          src={require("../../../assets/images/dashboard/user.png")}
          alt="header-user"
        />
        <div className="media-body">
          <h6 className="m-0 txt-dark f-16">
            My Account
            <i className="fa fa-angle-down pull-right ml-2"></i>
          </h6>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div p-20">
        <li>
          <Link
            to={`${process.env.PUBLIC_URL}/applications/users/edit-profile`}
          >
            <i className="icon-user"></i>
            Edit Profile
          </Link>
        </li>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/applications/email-app`}>
            <i className="icon-email"></i>
            Inbox
          </Link>
        </li>
        {/* <li>
          <Link to={`${process.env.PUBLIC_URL}/applications/todo-app`}>
            <i className="icon-check-box"></i>
            Task
          </Link>
        </li> */}
        <li onClick={logOut}>
          <i className="icon-power-off"></i>
          Logout
        </li>
      </ul>
    </li>
  );
};
export default UserMenu;
