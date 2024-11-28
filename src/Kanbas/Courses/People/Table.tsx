import React, { useState, useMemo } from "react";
import { FaUserCircle, FaSort } from "react-icons/fa";

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

  const handleSort = (key: SortKey) => {
    setSortOrder(sortOrder === "asc" && sortKey === key ? "desc" : "asc");
    setSortKey(key);
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-people-table">
      <h3>People in Course: </h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
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
            {users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
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