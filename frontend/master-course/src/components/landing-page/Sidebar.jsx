import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> LMS
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/landingpage/courses">
            <BsFillArchiveFill className='icon' /> Courses
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/landingpage/progress">
            <BsFillGrid3X3GapFill className='icon' /> Progress
          </Link>
        </li>
        {/* <li className='sidebar-list-item'>
            <Link to="/customers">
                <BsPeopleFill className='icon'/> Customers
            </Link>
        </li> */}
        <li className='sidebar-list-item'>
          <Link to="/landingpage/inventory">
            <BsListCheck className='icon' /> Inventory
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/landingpage/reports">
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings">
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
