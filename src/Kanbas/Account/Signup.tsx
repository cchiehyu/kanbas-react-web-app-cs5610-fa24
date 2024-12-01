import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header bg-white">
              <h3 className="text-center">Sign up</h3>
            </div>
            <div className="card-body">
              <input 
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-3" 
                placeholder="Username" 
              />
              <input 
                value={user.password} 
                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                type="password"
                className="wd-password form-control mb-3" 
                placeholder="Password" 
              />
              <button 
                onClick={signup} 
                className="wd-signup-btn btn btn-primary w-100"
                style={{ backgroundColor: '#6c63ff' }}
              > 
                Sign up 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );}
