import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  role: string;
  section: string;
  loginId?: string;
  lastActivity?: Date;
  totalActivity?: string;
}

export default function PeopleDetails() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [editing, setEditing] = useState(false);
  const isNewUser = uid === "new";

  const fetchUser = async () => {
    if (!uid || isNewUser) return;
    try {
      const fetchedUser = await client.findUserById(uid);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (isNewUser) {
      setEditing(true);
      setUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        role: "STUDENT",
        section: "",
        password: ""
      } as User);
    } else {
      fetchUser();
    }
  }, [uid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveUser = async () => {
    try {
      let savedUser;
      if (isNewUser) {
        savedUser = await client.createUser(user);
      } else {
        savedUser = await client.updateUser(user);
      }
      setUser(savedUser);
      setEditing(false);
      navigate(-1);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUser = async (uid: string) => {
    try {
      await client.deleteUser(uid);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!uid) {
    return null;
  }


  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      <h4>{isNewUser ? "Create New User" : "User Details"}</h4>

      {!isNewUser && !editing && (
        <FaPencil 
          onClick={() => setEditing(true)} 
          className="float-end fs-5 mt-2 wd-edit" 
        />
      )}

      {(editing || isNewUser) ? (
        <div className="mb-3">
          <div className="form-group mb-2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={user.firstName || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={user.lastName || ''}
              onChange={handleInputChange}
            />
          </div>
          {isNewUser && (
            <>
              <div className="form-group mb-2">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password || ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          <div className="form-group mb-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label>Role</label>
            <select
              className="form-control"
              name="role"
              value={user.role || ''}
              onChange={handleInputChange}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
              <option value="TA">Teaching Assistant</option>
            </select>
          </div>
          <div className="form-group mb-2">
            <label>Section</label>
            <input
              type="text"
              className="form-control"
              name="section"
              value={user.section || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="text-danger fs-4 wd-name">{user.firstName} {user.lastName}</div>
          <b>Roles:</b> <span className="wd-roles">{user.role}</span><br />
          <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span><br />
          <b>Section:</b> <span className="wd-section">{user.section}</span><br />
          <b>Email:</b> <span>{user.email}</span><br />
          <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
        </div>
      )}
      
      <hr />
      {isNewUser || editing ? (
        <>
          <button onClick={saveUser} className="btn btn-success float-end">
            {isNewUser ? "Create User" : "Save Changes"}
          </button>
          <button
            onClick={() => {
              setEditing(false);
              if (isNewUser) navigate(-1);
            }}
            className="btn btn-secondary float-start"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={() => deleteUser(uid!)} className="btn btn-danger float-end wd-delete">
            Delete
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-secondary float-start me-2 wd-cancel">
            Close
          </button>
        </>
      )}
    </div>
  );
}