import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    try {
      setFeedback({ type: "", message: "" }); // Clear previous feedback
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      setFeedback({ 
        type: "success", 
        message: "Profile updated successfully!" 
      });
    } catch (e) {
      setFeedback({ 
        type: "danger", 
        message: "Failed to update profile. Please try again." 
      });
    }
  };

  const fetchProfile = useCallback(() => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  }, [currentUser, navigate]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-3">
            <div className="card-header bg-white">
              <h3 className="text-center">Profile</h3>
            </div>
            <div className="card-body">
              {feedback.message && (
                <div className={`alert alert-${feedback.type} mb-3`} role="alert">
                  {feedback.message}
                </div>
              )}
              {profile && (
                <div className="row">
                  <div className="col-12">
                    <input
                      defaultValue={profile.username}
                      id="wd-username"
                      placeholder="Username"
                      className="form-control mb-3"
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                    
                    <input
                      defaultValue={profile.password}
                      id="wd-password"
                      placeholder="Password"
                      type="password"
                      className="form-control mb-3"
                      onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    />
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          defaultValue={profile.firstName}
                          id="wd-firstname"
                          placeholder="First Name"
                          className="form-control"
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          defaultValue={profile.lastName}
                          id="wd-lastname"
                          placeholder="Last Name"
                          className="form-control"
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <input
                      defaultValue={profile.dob}
                      id="wd-dob"
                      type="date"
                      className="form-control mb-3"
                      onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    />
                    
                    <input
                      defaultValue={profile.email}
                      id="wd-email"
                      type="email"
                      placeholder="Email"
                      className="form-control mb-3"
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    
                    <select
                      defaultValue={currentUser.role}
                      id="wd-role"
                      className="form-select mb-4"
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="FACULTY">Faculty</option>
                      <option value="STUDENT">Student</option>
                    </select>
                    
                    <button 
                      onClick={updateProfile}
                      className="btn btn-primary w-100 mb-2"
                      style={{ backgroundColor: '#6c63ff' }}
                    >
                      Update
                    </button>
                    
                    <button
                      onClick={signout}
                      className="btn btn-danger w-100"
                      id="wd-signout-btn"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}