import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface AccountState {
  currentUser: {
    _id: string;
    username: string;
    role: string;
  } | null;
}

interface RootState {
  accountReducer: AccountState;
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { pathname } = useLocation();

  const active = (path: string): string => {
    return pathname.includes(path) ? 'active' : '';
  };

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link
            id="wd-account-signin-link"
            className={`list-group-item ${active('Signin')} border border-0`}
            to="/Kanbas/Account/Signin"
          >
            Signin
          </Link>
          <Link
            id="wd-account-signup-link"
            className={`list-group-item ${active('Signup')} border border-0`}
            to="/Kanbas/Account/Signup"
          >
            Signup
          </Link>
        </>
      )}
      
      {currentUser && (
        <Link
          id="wd-account-profile-link"
          className={`list-group-item ${active('Profile')} border border-0`}
          to="/Kanbas/Account/Profile"
        >
          Profile
        </Link>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          id="wd-account-users-link"
          className={`list-group-item ${active('Users')} border border-0`}
          to="/Kanbas/Account/Users"
        >
          Users
        </Link>
      )}
    </div>
  );
}