import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
//import * as db from "../Database";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      setError(""); // Clear any previous errors
      if (!credentials.username || !credentials.password) {
        setError("Please enter both username and password");
        return;
      }
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid credentials. Please try again.");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (e) {
      setError("Sign in failed. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signin();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header bg-white">
              <h3 className="text-center">Sign in</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <input
                defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="form-control mb-3"
                placeholder="Username"
                id="wd-username"
                onKeyPress={handleKeyPress}
              />
              <input
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-control mb-3"
                placeholder="Password"
                type="password"
                id="wd-password"
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={signin}
                id="wd-signin-btn"
                className="btn btn-primary w-100"
                style={{ backgroundColor: '#6c63ff' }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}