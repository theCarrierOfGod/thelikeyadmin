import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useHook } from '../contexts/Hook'
import { useUser } from '../contexts/User'
import { useWallet } from '../contexts/Wallet'
import Adminheader from './Adminheader'
import Adminsidebar from './Adminsidebar'
import Userpagination from './Userpagination'
import axios from 'axios'
import swal from 'sweetalert'
import Footer from '../user/Footer'

const Users = () => {
    const userHook = useUser();
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const walletHook = useWallet();
    const [username, setUsername] = useState('');
    const [ad, setAd] = useState(false);

    const [users, setUsers] = useState([]);

    const getNow = () => {
        userHook.allUsers(username);
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])

    return (
        <>
            <Helmet>
                <title>
                    Administrator | The LIKEY
                </title>
            </Helmet>
            <div className='container-scroller'>
                <Adminheader />
                <div className="container-fluid page-body-wrapper">
                    <Adminsidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">
                                    <span className="page-title-icon bg-info text-white me-2">
                                        <i className="mdi mdi-home"></i>
                                    </span> DASHBOARD
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="row justify-content-center">
                                <div className='col-md-12 strech-card grid-margin'>
                                    <input type='text' placeholder='Username/Email' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <button className='button is-link is-light' onClick={(e) => {
                                        if (username === "") {
                                            return false;
                                        } else {
                                            getNow();
                                        }
                                    }}>
                                        Search
                                    </button> &nbsp;&nbsp;&nbsp;
                                    <button className='button is-link is-light' onClick={(e) => {
                                        setUsername('');
                                        setTimeout(() => {
                                            getNow();
                                        }, 100);
                                    }}>
                                        Clear Filter
                                    </button>
                                </div>
                                <div className={`${userHook.users.length === 0 ? "col-md-12 stretch-card grid-margin" : "d-none"}`}>
                                    <div className="notification is-info w-100 text-center ">
                                        <i className='fa fa-spinner fa-spin'></i> Loading...
                                    </div>
                                </div>
                                <div className={`${userHook.users.length > 0 ? "col-md-12 stretch-card grid-margin" : "d-none"}`}>
                                    <div className="card card-img-holder text-white">
                                        <div className="card-body p-2">
                                            {userHook.users.length === 0 ? null : (
                                                <>
                                                    <Userpagination items={userHook.users} perpage={15} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                <Footer />
            </div>
        </>
    )
}

export default Users