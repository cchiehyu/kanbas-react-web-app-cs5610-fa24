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
    <div id="wd-people-table">
      <PeopleDetails />
      <h3>People: </h3>
      {displayUsers .length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
            <th onClick={() => handleSort("lastName")}>
                _id <FaSort />
              </th>
              <th onClick={() => handleSort("lastName")}>
                Name <FaSort />
              </th>
              <th onClick={() => handleSort("loginId")}>
                Login ID <FaSort />
              </th>
              <th onClick={() => handleSort("section")}>
                Section <FaSort />
              </th>
              <th onClick={() => handleSort("role")}>
                Role <FaSort />
              </th>
              <th onClick={() => handleSort("lastActivity")}>
                Last Activity <FaSort />
              </th>
              <th onClick={() => handleSort("totalActivity")}>
                Total Activity <FaSort />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayUsers .map((user) => (
              <tr key={user._id}>
                    <td className="text-nowrap">
                    <small className="text-muted">ID: {user._id}</small>
                  </td>
                <td className="wd-full-name text-nowrap">
                  <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">

                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}