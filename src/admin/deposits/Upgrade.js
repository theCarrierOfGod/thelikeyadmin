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



const Upgrade = () => {
    const hook = useHook();
    const location = useLocation();

    const [proofs, setProofs] = useState([]);

    const Upgrade = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/upgrades`);
            setProofs(res.data)
        } catch (error) {
            setProofs([]);
        }
    }

    const getNow = () => {
        Upgrade();
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key])
    const itemPerPage = 5;
    const total = proofs.length;
    const pageCount = Math.ceil(total / itemPerPage);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemPerPage)
    const [currentPage, setCurrentPage] = useState(1);
    const currentItems = proofs.slice(itemOffset, endOffset);


    const handleNext = () => {
        if (pageCount !== currentPage) {
            setCurrentPage(currentPage + 1);
            setItemOffset(itemOffset + itemPerPage);
            setEndOffset(endOffset + itemPerPage)
        }
    }
    const handlePrevious = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setItemOffset(itemOffset - itemPerPage);
            setEndOffset(endOffset - itemPerPage)
        }
    }

    return (
        <div>
            <Helmet>
                <title>
                    Upgrades | Administrator | The LIKEY
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
                                    </span> Upgrades
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
                                            {/* <ManagePagination items={proofs} perpage={12} type={'pending'} /> */}

                                            {total === 0 ? null : (
                                                <>
                                                    <div className="table-responsive">
                                                        <table className='table table-stripped'>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>TransactionID</th>
                                                                    <th>Wallet To</th>
                                                                    <th>Credits</th>
                                                                    <th>User</th>
                                                                    <th>Amount (USD)</th>
                                                                    <th>Amount</th>
                                                                    <th>Currency</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tfoot>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>TransactionID</th>
                                                                    <th>Wallet To</th>
                                                                    <th>Credits</th>
                                                                    <th>User</th>
                                                                    <th>Amount (USD)</th>
                                                                    <th>Amount</th>
                                                                    <th>Currency</th>
                                                                    <th>Status</th>
                                                                    <th>
                                                                        <i className='fa fa-edit'></i>
                                                                    </th>
                                                                </tr>
                                                            </tfoot>
                                                            <tbody>
                                                                {currentItems.map((user, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <th>{index + 1}</th>
                                                                            <td>
                                                                                <strong>
                                                                                    {user.transaction_id}
                                                                                </strong>
                                                                            </td>
                                                                            <td>{user.wallet_to}</td>
                                                                            <td>{user.credits}</td>
                                                                            <td>
                                                                                {user.username}
                                                                            </td>
                                                                            <td>{user.amount_usd}</td>
                                                                            <td>{user.amount_crypto}</td>
                                                                            <td>{user.currency}</td>
                                                                            <td>{user.status}</td>
                                                                            {/* <td>
                                                                                {user.status === "processing" ? (
                                                                                    <>
                                                                                        <div className='d-flex justify-content-center p-3'>
                                                                                            <button
                                                                                                className='button is-success'
                                                                                                onClick={() => {
                                                                                                    swal({
                                                                                                        title: 'Approve Deposit',
                                                                                                        text: 'Do you really want to proceed?',
                                                                                                        icon: 'warning',
                                                                                                        buttons: ["Stop", "Yes, Proceed!"],
                                                                                                    })
                                                                                                        .then((res) => {
                                                                                                            if (res) {
                                                                                                                approveDeposit(user.transaction_id)
                                                                                                            } else {
                                                                                                                swal({
                                                                                                                    title: 'Approve Deposit',
                                                                                                                    text: 'Cancelled by user',
                                                                                                                    icon: 'error',
                                                                                                                    timer: 2000
                                                                                                                })
                                                                                                            }
                                                                                                        })
                                                                                                }}
                                                                                            >
                                                                                                Approve
                                                                                            </button>
                                                                                            <span style={{ width: '10px', height: '10px' }}></span>
                                                                                            <button
                                                                                                className='button is-warning'
                                                                                                onClick={() => {
                                                                                                    swal({
                                                                                                        title: 'Reject Deposit',
                                                                                                        text: 'Do you really want to cancel it?',
                                                                                                        icon: 'warning',
                                                                                                        buttons: ["Stop", "Yes, Cancel!"],
                                                                                                    })
                                                                                                        .then((res) => {
                                                                                                            if (res) {
                                                                                                                rejectDeposit(user.transaction_id)
                                                                                                            } else {
                                                                                                                swal({
                                                                                                                    title: 'Reject Deposit',
                                                                                                                    text: 'Cancelled by user',
                                                                                                                    icon: 'error',
                                                                                                                    timer: 2000
                                                                                                                })
                                                                                                            }
                                                                                                        })
                                                                                                }}
                                                                                            >
                                                                                                Reject
                                                                                            </button>
                                                                                        </div>
                                                                                    </>
                                                                                ) : null}
                                                                            </td> */}
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </>
                                            )}

                                            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"}>
                                                <button onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'prevButton btn-info mr-3'} title={'Previous Page'} ></button>
                                                <button onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'nextButton btn-info'} title={'Next Page'}></button>
                                                <br />
                                                <span>
                                                    {currentPage} of {pageCount} page(s)
                                                </span>
                                            </div>
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

export default Upgrade
