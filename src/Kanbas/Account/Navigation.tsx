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
    <div 
      id="wd-account-navigation" 
      className="list-group fs-5 rounded-0"
      style={{ maxWidth: '300px' }}
    >
      {!currentUser && (
        <>
          <Link
            id="wd-account-signin-link"
            className={`list-group-item ${active('Signin')} border border-0`}
            to="/Kanbas/Account/Signin"
            style={{ 
              backgroundColor: active('Signin') ? '#6c63ff' : 'white',
              color: active('Signin') ? 'white' : '#2d3b45',
              padding: '12px 20px',
              transition: 'all 0.2s ease'
            }}
          >
            Signin
          </Link>
          <Link
            id="wd-account-signup-link"
            className={`list-group-item ${active('Signup')} border border-0`}
            to="/Kanbas/Account/Signup"
            style={{ 
              backgroundColor: active('Signup') ? '#6c63ff' : 'white',
              color: active('Signup') ? 'white' : '#2d3b45',
              padding: '12px 20px',
              transition: 'all 0.2s ease'
            }}
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
          style={{ 
            backgroundColor: active('Profile') ? '#6c63ff' : 'white',
            color: active('Profile') ? 'white' : '#2d3b45',
            padding: '12px 20px',
            transition: 'all 0.2s ease'
          }}
        >
          Profile
        </Link>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          id="wd-account-users-link"
          className={`list-group-item ${active('Users')} border border-0`}
          to="/Kanbas/Account/Users"
          style={{ 
            backgroundColor: active('Users') ? '#6c63ff' : 'white',
            color: active('Users') ? 'white' : '#2d3b45',
            padding: '12px 20px',
            transition: 'all 0.2s ease'
          }}
        >
          Users
        </Link>
      )}
    </div>
  );
}