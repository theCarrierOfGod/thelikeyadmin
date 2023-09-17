import React, { useState } from 'react'
import './pagination.css'
import axios from 'axios';
import { useHook } from '../contexts/Hook';
import { useUser } from '../contexts/User';

const Userpagination = ({ items, perpage }) => {
    const hook = useHook();
    const userHook = useUser();
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

    const changeStatus = async (value) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/change/status`);
            if (res.data.success) {
                alert(res.data.success)
            } else {
                alert(res.data.error)
            }
        } catch (error) {
            alert('error.message')
        }
    }

    const activateAccount = async (username) => {
        if (window.confirm('Are you sure you want to ACTIVATE account?')) {
            try {
                const res = await axios.get(`${hook.endpoint}/admin/activate_account/${username}`);
                if (res.data.success) {
                    alert(res.data.success)
                    userHook.setUserS(1223)
                } else {
                    alert(res.data.error)
                }
            } catch (error) {
                alert('error.message')
            }
        } else {
            return false;
        }
    }

    const suspendAccount = async (username) => {
        if (window.confirm('Are you sure you want to SUSPEND account?')) {
            try {
                const res = await axios.get(`${hook.endpoint}/admin/suspend_account/${username}`);
                if (res.data.success) {
                    alert(res.data.success);
                    userHook.setUserS(1243);
                } else {
                    alert(res.data.error)
                }
            } catch (error) {
                alert('error.message')
            }
        } else {
            return false;
        }
    }

    const reactivateAccount = async (username) => {
        if (window.confirm('Are you sure you want to REACTIVATE account?')) {
            try {
                const res = await axios.get(`${hook.endpoint}/admin/reactivate_account/${username}`);
                if (res.data.success) {
                    alert(res.data.success);
                    userHook.setUserS(2335)
                } else {
                    alert(res.data.error)
                }
            } catch (error) {
                alert('error.message')
            }
        } else {
            return false;
        }
    }
    return (
        <>
            <div>
                <div className={total !== 0 ? "d-none" : "col-lg-12 mt-4 text-center"}>
                    <div className="alert alert-info">
                        No data
                    </div>
                </div>
            </div>
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 grid-margin"} style={{ color: 'black', fontFamily: 'monospace', textAlign: 'right'}}>
                {total} result(s)
            </div>
            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"} style={{ textAlign: 'right' }}>
                <span onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'button btn-info mr-3 p-1'} title={'Previous Page'} >Previous page</span>
                <span onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'button btn-info p-1'} title={'Next Page'}>Next page</span>
                <br />
                <span style={{ color: 'black' }}>
                    {currentPage} of {pageCount} page(s)
                </span>
            </div>
            <div className="table-responsive">
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th><abbr title="Serial Number">#</abbr></th>
                            <th></th>
                            <th>Username</th>
                            <th><abbr title="Email address">Email</abbr></th>
                            <th><abbr title="Phone number">Phone</abbr></th>
                            <th>Location</th>
                            <th>Earned</th>
                            <th>Deposited</th>
                            <th>Referral ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><abbr title="Serial Number">#</abbr></th>
                            <th></th>
                            <th>Username</th>
                            <th><abbr title="Email address">Email</abbr></th>
                            <th><abbr title="Phone number">Phone</abbr></th>
                            <th>Location</th>
                            <th>Earned</th>
                            <th>Deposited</th>
                            <th>Referral ID</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                    <tbody style={{ fontFamily: 'monospace'}}>
                        {currentItems.map((user, index) => (
                            <>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img src={user.display_picture} width={75} height={75} alt="user" />
                                    </td>
                                    <td>
                                        <strong>
                                            {user.username}
                                        </strong>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phonenumber}</td>
                                    <td>
                                        {user.location}
                                    </td>
                                    <td>{user.earned}</td>
                                    <td>{user.deposited}</td>
                                    <td>{user.referee !== "" ? user.referee : 'admin'}</td>
                                    <td>
                                        <button className={user.verified === '0' ? 'button is-link is-light' : 'd-none'} onClick={() => { activateAccount(user.username) }}>
                                            Activate
                                        </button>
                                        <button className={user.verified === '1' ? 'button is-link is-light' : 'd-none'} onClick={() => { suspendAccount(user.username) }}>
                                            Suspend
                                        </button>
                                        <button className={user.verified === '2' ? 'button is-link is-light' : 'd-none'} onClick={() => { reactivateAccount(user.username) }}>
                                            Reactivate
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"} style={{ textAlign: 'right' }}>
                <span onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'button btn-info mr-3 p-1'} title={'Previous Page'} >Previous page</span>
                <span onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'button btn-info p-1'} title={'Next Page'}>Next page</span>
                <br />
                <span style={{ color: 'black' }}>
                    {currentPage} of {pageCount} page(s)
                </span>
            </div>
        </>
    )
}

export default Userpagination

