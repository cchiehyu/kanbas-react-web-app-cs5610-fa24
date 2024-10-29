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

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => 
    state.accountReducer
  );
  const { pathname } = useLocation();
  
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <Link 
            id="wd-account-signin-link" 
            className={`list-group-item ${pathname.includes('Signin') ? 'active' : ''} border border-0`}
            to="/Kanbas/Account/Signin"
          >
            Signin
          </Link>
          <Link 
            id="wd-account-signup-link" 
            className={`list-group-item ${pathname.includes('Signup') ? 'active' : ''} border border-0`}
            to="/Kanbas/Account/Signup"
          >
            Signup
          </Link>
        </>
      )}
      {currentUser && (
        <Link 
          id="wd-account-profile-link" 
          className={`list-group-item ${pathname.includes('Profile') ? 'active' : ''} border border-0`}
          to="/Kanbas/Account/Profile"
        >
          Profile
        </Link>
      )}
    </div>
  );
}