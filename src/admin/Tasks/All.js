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

    const [users, setUsers] = useState([]);

    const allUsers = async () => {
        setAd(false)
        try {
            const res = await axios.get(`${hook.endpoint}/admin/all_tasks`);
            if (res.data) {
                setUsers(res.data);
            } else {
                setUsers([])
            }
            setAd(false)
        } catch (error) {
            setUsers([])
            setAd(false)
        }
    }

    const getNow = () => {
        allUsers();
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])

    useEffect(() => {
      getNow();
    
      return () => {
        return true;
      }
    }, []);
    

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
                                <div className="col-md-12 stretch-card grid-margin">
                                    <div className="card card-img-holder text-white">
                                        <div className="card-body p-2">
                                            {users.length === 0 ? (
                                                <>
                                                    <div className='notification is-info is-light text-center subtitle'>
                                                        No data
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <TaskPagination items={users} perpage={15} />
                                                </>
                                            )}
                                            {ad ? (
                                                <>
                                                    <div className='notification is-info is-light text-center'>
                                                        <i className='fa fa-spinner fa-spin'></i>
                                                    </div>
                                                </>
                                            ) : null}
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