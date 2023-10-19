import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
import { useHook } from '../../contexts/Hook'
import { useUser } from '../../contexts/User'
import { useWallet } from '../../contexts/Wallet'
import Adminheader from '../Adminheader'
import Adminsidebar from '../Adminsidebar'
import Userpagination from '../Userpagination'
import axios from 'axios'
import swal from 'sweetalert'
import Footer from '../../user/Footer'
import TaskPagination from './TaskPagination'

const All = () => {
    const userHook = useUser();
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const walletHook = useWallet();
    const [ad, setAd] = useState(true);

    const [status, setStatus] = useState('active');
    const [verified, setVerified] = useState(1);

    const getNow = () => {
        hook.allUsers(status, verified);
    }

    useEffect(() => {
        getNow();
    }, [location.key, status, verified]);


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
                                    </span> ALL TASKS
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
                                <div className='col-6 col-md-4 stretch-card grid-margin'>
                                    <div class="select">
                                        <select onChange={(e) => { setStatus(e.target.value) }}>
                                            <option value='active' selected={status === 'active'} >Active</option>
                                            <option value='completed' selected={status === 'completed'} >Completed</option>
                                            <option value='inactive' selected={status === 'inactive'} >Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6 col-md-4 stretch-card grid-margin'>
                                    <div class="select">
                                        <select onChange={(e) => { setVerified(e.target.value) }}>
                                            <option value='1' selected={verified === 1} >Verified</option>
                                            <option value='0' selected={verified === 0} >Unverified</option>
                                        </select>
                                    </div>
                                </div> 
                                <div className="col-md-12 stretch-card grid-margin">
                                    <div className="card card-img-holder text-white">
                                        <div className="card-body p-2">
                                            {hook.ad ? (
                                                <>
                                                    <div className='notification is-info is-light text-center'>
                                                        <i className='fa fa-spinner fa-spin'></i>
                                                    </div>
                                                </>
                                            ) : null}
                                            {hook.users.length === 0 ? null : (
                                                <>
                                                    <TaskPagination items={hook.users} perpage={25} />
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

export default All