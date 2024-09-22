import React from 'react';
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link id="wd-account-signin-link" className="list-group-item active border border-0" to="/Kanbas/Account/Signin">
        Signin
      </Link>
      <Link id="wd-account-signup-link" className="list-group-item active border border-0" to="/Kanbas/Account/Signup">
        Signup
      </Link>
      <Link id="wd-account-profile-link" className="list-group-item active border border-0" to="/Kanbas/Account/Profile">
        Profile
      </Link>
    </div>
  );
}
