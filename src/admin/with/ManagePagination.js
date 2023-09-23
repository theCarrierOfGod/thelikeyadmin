import React, { useState } from 'react'
import './pagination.css'
import swal from 'sweetalert';
import axios from 'axios';
import { useHook } from '../../contexts/Hook';

const ManagePagination = ({ items, perpage, type }) => {
    const hook = useHook();
    const itemPerPage = perpage;
    const total = items.length;
    const pageCount = Math.ceil(total / itemPerPage);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemPerPage)
    const [currentPage, setCurrentPage] = useState(1);
    const currentItems = items.slice(itemOffset, endOffset);


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

    const approveDeposit = async (transaction_id) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/with/${transaction_id}/approved`);
            console.log(res.data);
            if (res.data.success) {
                swal({
                    title: 'Approve Deposit',
                    text: 'Deposit approved',
                    icon: 'success',
                    timer: 2000
                })
                    .then((res) => {
                        window.location.reload();
                    })

            } else {
                swal({
                    title: 'Approve Deposit',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Approve Deposit',
                text: error.message,
                icon: 'error',
            })
        }
    }

    const rejectDeposit = async (transaction_id) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/with/${transaction_id}/rejected`);
            if (res.data.success) {
                swal({
                    title: 'Reject Deposit',
                    text: 'Deposit rejected!',
                    icon: 'success',
                })
                    .then((res) => {
                        window.location.reload();
                    })
            } else {
                swal({
                    title: 'Reject Deposit',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Reject Deposit',
                text: error.message,
                icon: 'error',

                buttons: false,
            })
        }
    }
    return (
        <>
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"}>
                <button onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'prevButton btn-info mr-3'} title={'Previous Page'} ></button>
                <button onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'nextButton btn-info'} title={'Next Page'}></button>
            </div>

            <div>
                <div className={total !== 0 ? "d-none" : "col-lg-12 mt-4 text-center"}>
                    <div className="notification is-info is-light">
                        No data
                    </div>
                </div>
            </div>

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
                                    <th>Amount (USDT)</th>
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
                                    <th>Amount (USDT)</th>
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
                                            <td>{user.amount}</td>
                                            <td>{user.currency}</td>
                                            <td>{user.status}</td>
                                            <td>
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
                                            </td>
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
        </>
    )
}

export default ManagePagination
