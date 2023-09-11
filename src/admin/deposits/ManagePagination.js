import React, { useState } from 'react'
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
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



    const approveProof = async (proofID) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/approve_task/${proofID}/approved`);
            console.log(res.data);
            if (res.data.success) {
                swal({
                    title: 'Approve Proof',
                    text: 'Proof approved',
                    icon: 'success',
                    timer: 2000
                })
                    .then((res) => {
                        window.location.reload();
                    })

            } else {
                swal({
                    title: 'Approve Proof',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Approve Proof',
                text: error.message,
                icon: 'error',
            })
        }
    }

    const rejectProof = async (proofID, reason) => {
        try {
            let data = {
                proofID: proofID,
                reason: reason,
            }
            const res = await axios.post(`${hook.endpoint}/admin/proof/reject`, data);
            if (res.data.success) {
                swal({
                    title: 'Reject Proof',
                    text: 'Proof rejected!',
                    icon: 'success',
                })
                    .then((res) => {
                        window.location.reload();
                    })
            } else {
                swal({
                    title: 'Reject Proof',
                    text: res.data.error,
                    icon: 'error',
                })
            }
        } catch (error) {
            swal({
                title: 'Reject Proof',
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
                                    <th>Amount (USD)</th>
                                    <th>Amount (CRYPTO)</th>
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
                                    <th>Amount (CRYPTO)</th>
                                    <th>Currency</th>
                                    <th>Status</th>
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
