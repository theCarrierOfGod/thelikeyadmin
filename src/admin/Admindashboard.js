import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { useHook } from '../contexts/Hook'
import { useUser } from '../contexts/User'
import { useWallet } from '../contexts/Wallet'
import Adminheader from './Adminheader'
import Adminsidebar from './Adminsidebar'
import axios from 'axios'
import Footer from '../user/Footer'

const Admindashboard = () => {
    const userHook = useUser();
    const hook = useHook();
    const auth = useAuth();
    const location = useLocation();
    const walletHook = useWallet();
    const [ad, setAd] = useState()
    const [users, setUsers] = useState(0);
    const [fundings, setFundings] = useState(0)
    const [withdrawals, setWithdrawals] = useState(0);
    const [proofs, setProofs] = useState(0)

    const countUsers = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/count/users`);
            setUsers(res.data.users)
            setWithdrawals(res.data.withdrawals)
            setFundings(res.data.withdrawals)
            setProofs(res.data.proofs)
        } catch (error) {
            setUsers(0);
            setFundings(0)
            setWithdrawals(0)
            setProofs(0)
        }
    }

    const getNow = () => {
        countUsers();
        setAd(hook.pickAd())
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
                                <div className="col-sm-3 col-6  stretch-card grid-margin">
                                    <div className="card bg-primary card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">Users
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {users}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6 stretch-card grid-margin">
                                    <div className="card bg-danger card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">Fundings
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {fundings}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6 stretch-card grid-margin">
                                    <div className="card bg-info card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">Withdrawals
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {withdrawals}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6 stretch-card grid-margin">
                                    <div className="card bg-info card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <img src="/assets/images/dashboard/circle.svg" className="card-img-absolute" alt="CCC" />
                                            <h4 className="font-weight-normal mb-3 text-right">Proofs
                                            </h4>
                                            <h2 className="mb-2 text-right" style={{ fontSize: '1.5rem' }}>
                                                {proofs}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
                {/* </div> */}
            </div>
        </>
    )
}

export default Admindashboard