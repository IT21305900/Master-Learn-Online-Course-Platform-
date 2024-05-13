import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Appstyle.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

function Reports() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  
    return (
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <h1>Hi</h1>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home />
      </div>
    )
}

export default Reports