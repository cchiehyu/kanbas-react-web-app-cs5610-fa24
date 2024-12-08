import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSort } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { findUsersForCourse } from "../client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
}

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

type SortKey = keyof User;


export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("lastName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [courseUsers, setCourseUsers] = useState<User[]>([]); 
  const { cid: courseId } = useParams<{ cid: string }>();

  useEffect(() => {
    const fetchCourseUsers = async () => {
      try {
        if (courseId) {
          const fetchedUsers = await findUsersForCourse(courseId);
          setCourseUsers(fetchedUsers);
        }
      } catch (error) {
        console.error("Error fetching course users:", error);
      }
    };
    fetchCourseUsers();
  }, [courseId]);

  const handleSort = (key: SortKey) => {
    setSortOrder(sortOrder === "asc" && sortKey === key ? "desc" : "asc");
    setSortKey(key);
  };

  const displayUsers = courseId ? courseUsers : users;

  if (!displayUsers) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-people-table" className="container-fluid px-0">
      <PeopleDetails />
      <h3>People: </h3>
      {displayUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-responsive-xl">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="d-none d-md-table-cell" onClick={() => handleSort("lastName")}>
                  <span className="d-flex align-items-center">
                    _id <FaSort className="ms-1" />
                  </span>
                </th>
                <th onClick={() => handleSort("lastName")}>
                  <span className="d-flex align-items-center">
                    Name <FaSort className="ms-1" />
                  </span>
                </th>
                <th className="d-none d-lg-table-cell" onClick={() => handleSort("loginId")}>
                  <span className="d-flex align-items-center">
                    Login ID <FaSort className="ms-1" />
                  </span>
                </th>
                <th className="d-none d-xl-table-cell" onClick={() => handleSort("section")}>
                  <span className="d-flex align-items-center">
                    Section <FaSort className="ms-1" />
                  </span>
                </th>
                <th className="d-none d-lg-table-cell" onClick={() => handleSort("role")}>
                  <span className="d-flex align-items-center">
                    Role <FaSort className="ms-1" />
                  </span>
                </th>
                <th className="d-none d-xl-table-cell" onClick={() => handleSort("lastActivity")}>
                  <span className="d-flex align-items-center">
                    Last Activity <FaSort className="ms-1" />
                  </span>
                </th>
                <th className="d-none d-xl-table-cell" onClick={() => handleSort("totalActivity")}>
                  <span className="d-flex align-items-center">
                    Total Activity <FaSort className="ms-1" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {courseUsers.map((user) => (
                <tr key={user._id}>
                  <td className="d-none d-md-table-cell text-nowrap">
                    <small className="text-muted">ID: {user._id}</small>
                  </td>
                  <td className="wd-full-name">
                    <Link 
                      to={`/Kanbas/Account/Users/${user._id}`} 
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <FaUserCircle className="me-2 fs-3 text-secondary" />
                      <div className="text-break">
                        <span className="wd-first-name">{user.firstName}</span>{" "}
                        <span className="wd-last-name">{user.lastName}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="d-none d-lg-table-cell wd-login-id text-break">
                    {user.loginId}
                  </td>
                  <td className="d-none d-xl-table-cell wd-section">
                    {user.section}
                  </td>
                  <td className="d-none d-lg-table-cell wd-role">
                    {user.role}
                  </td>
                  <td className="d-none d-xl-table-cell wd-last-activity">
                    {user.lastActivity}
                  </td>
                  <td className="d-none d-xl-table-cell wd-total-activity">
                    {user.totalActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}