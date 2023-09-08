import React from 'react'
import { Helmet } from 'react-helmet'
import Adminheader from '../Adminheader'
import Adminsidebar from '../Adminsidebar'
import Footer from '../../user/Footer'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHook } from '../../contexts/Hook'
import { useEffect } from 'react'
import axios from 'axios'
import ManagePagination from './ManagePagination'



const RejectedProofs = () => {
    const hook = useHook();
    const location = useLocation();

    const [proofs, setProofs] = useState([]);

    const RejectedProofs = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/proofs/rejected`);
            setProofs(res.data)
        } catch (error) {
            setProofs([]);
        }
    }

    const getNow = () => {
        RejectedProofs();
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])

    return (
        <div>
            <Helmet>
                <title>
                    Proofs | Administrator | The LIKEY
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
                                    </span> REJECTED PROOFS
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
                                        <div className="card-body p-2 table-responsive row justify-content-between">
                                            <ManagePagination items={proofs} perpage={2} type={'pending'} />
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
        </div>
    )
}

export default RejectedProofs
