import React from 'react';
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
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
        id="wd-account-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>

      {/* Dashboard Link */}
      <Link
        to="/Kanbas/Dashboard"
        id="wd-dashboard-link"
        className="list-group-item text-center border-0 bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </Link>

      {/* Courses Link */}
      <Link
        to="/Kanbas/Courses"
        id="wd-course-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>

       {/* Labs Link */}
        <Link
        to="/Labs"
        id="wd-labs-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Labs
      </Link>

      {/* Add spacing for better readability */}
      <Link
        to="/Kanbas/Calendar"
        id="wd-calendar-link"
        className="list-group-item text-center border-0 bg-black text-white mb-2"
      >
        <IoCalendarOutline className="fs-1 text-white" />
        <br />
        Calendar
      </Link>

      <Link
        to="/Kanbas/Inbox"
        id="wd-inbox-link"
        className="list-group-item text-center border-0 bg-black text-white"
      >
        <FaInbox className="fs-1 text-white" />
        <br />
        Inbox
      </Link>
    </div>
  );
}
