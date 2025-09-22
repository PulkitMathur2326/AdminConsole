import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
 
const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <ul>
        <li>
          <Link to="/configure">Configure Parameters</Link>
        </li>
        <li>
          <Link to="/add-trigger">Add Trigger</Link>
        </li>
      </ul>
    </div>
  );
};
 
export default Sidebar;