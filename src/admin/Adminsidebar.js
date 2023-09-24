import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import { useHook } from '../contexts/Hook';
import { useUser } from '../contexts/User';
import '../user/user.css';

const Adminsidebar = () => {
    const auth = useAuth();
    const userHook = useUser();
    const hook = useHook();
    const location = useLocation();
    const [userDP, setUserDP] = useState();
    const [userName, setUserName] = useState();

    const getNow = () => {
        // userHook.getHomeActivities(auth.userOnline);
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location]);


    useEffect(() => {
        setUserDP(userHook.userImage);
        setUserName(userHook.userName)
    }, [userHook.userImage])
    return (
        <>
            <nav className={`${hook.showMenu ? "vw-100 l0 " : "no "} sidebar sidebar-offcanvas`} id="sidebar">
                <ul className="nav">

                    {/* <!-- dashboard  --> */}

                    <li className={`nav-item ${location.pathname === "/" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link " to="/">
                            <i className="mdi mdi-home menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Admin Home</span>
                        </Link>
                    </li>

                    {/* <!-- new promotion  --> */}

                    <li className={`nav-item ${location.pathname === "/users" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="/users">
                            <i className='fa fa-users m-0 p-0 menu-icon'></i> &nbsp; &nbsp;
                            <span className="menu-title">Manage Users</span>
                        </Link>
                    </li>

                    <li class="nav-item border-bottom">
                        <a class={`nav-link ${location.pathname === "/promotion/new" ? "active" : ""}`} data-bs-toggle="collapse" href="#tasks" aria-expanded="false" aria-controls="tasks">
                            <i class="mdi mdi-book-open-page-variant  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span class="menu-title">Tasks</span>
                            <i class="menu-arrow"></i>

                        </a>
                        <div class="collapse" id="tasks">
                            <ul class="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === "/tasks" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/tasks">
                                        <span className="menu-title">All Tasks</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/proofs/pending" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/proofs/pending">
                                        <span className="menu-title">Pending Proofs</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/proofs/rejected" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/proofs/rejected">
                                        <span className="menu-title">Rejected Proofs</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/proofs/approved" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/proofs/approved">
                                        <span className="menu-title">Approved Proofs</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/promotions" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/promotions">
                                        <span className="menu-title">All Promotions</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item border-bottom">
                        <a class={`nav-link ${location.pathname === "/promotion/new" ? "active" : ""}`} data-bs-toggle="collapse" href="#deposits" aria-expanded="false" aria-controls="deposits">
                            <i class="mdi mdi-book-open-page-variant  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span class="menu-title">Deposits</span>
                            <i class="menu-arrow"></i>

                        </a>
                        <div class="collapse" id="deposits">
                            <ul class="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === "/make_money" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/deposit/pending">
                                        <span className="menu-title">Pending</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/task/new" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/deposit/approved">
                                        <span className="menu-title">Approved</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/history/performed" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/deposit/rejected">
                                        <span className="menu-title">Cancelled</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item border-bottom">
                        <a class={`nav-link ${location.pathname === "/promotion/new" ? "active" : ""}`} data-bs-toggle="collapse" href="#with" aria-expanded="false" aria-controls="with">
                            <i class="mdi mdi-book-open-page-variant  menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span class="menu-title">Withdrawals</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="with">
                            <ul class="nav flex-column sub-menu">
                                <li className={`nav-item ${location.pathname === "/withdrawal/processing" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/withdrawal/processing">
                                        <span className="menu-title">Processing</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/withdrawal/approved" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/withdrawal/approved">
                                        <span className="menu-title">Approved</span>
                                    </Link>
                                </li>
                                <li className={`nav-item ${location.pathname === "/withdrawal/rejected" ? "active" : ""}`}>
                                    <Link className="nav-link" to="/withdrawal/rejected">
                                        <span className="menu-title">Cancelled</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* <!-- categories  --> */}

                    <li className={`nav-item ${location.pathname === "/categories" ? "active" : ""} border-bottom`}>
                        <Link className="nav-link" to="/categories">
                            <i className='fa fa-users m-0 p-0 menu-icon'></i> &nbsp; &nbsp;
                            <span className="menu-title">Categories</span>
                        </Link>
                    </li>

                    {/* <!-- signout  --> */}

                    <li className={`nav-item ${location.pathname === "" ? "active" : ""} border-bottom`}>
                        <span className="nav-link isBtn" onClick={() => auth.logOut()}>
                            <i className="mdi mdi-logout-variant menu-icon m-0 p-0"></i> &nbsp; &nbsp;
                            <span className="menu-title">Sign out</span>
                        </span>
                    </li>
                </ul>
            </nav>
            <br />
            <br />
        </>
    )
}

export default Adminsidebar