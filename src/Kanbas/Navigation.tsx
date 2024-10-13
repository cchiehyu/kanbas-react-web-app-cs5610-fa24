import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kanbas/Courses",   icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kanbas/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Kanbas/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];

  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* Northeastern Link */}
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
        rel="noreferrer"
      >
        <img src="/images/NEU.png" alt="NEU logo" width="75px" />
      </a>

      {/* Account Link */}
      <Link
        to="/Kanbas/Account"
        className={`list-group-item text-center border-0 ${
          pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </Link>

      {/* Dynamic Links */}
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item text-center border-0 ${
            pathname.includes(link.path.split("/")[2]) ? "bg-white text-danger" : "bg-black text-white"
          }`}
        >
          <link.icon className="fs-1" />
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
