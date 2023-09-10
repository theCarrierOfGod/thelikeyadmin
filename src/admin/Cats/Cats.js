import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../pagination.css'
import swal from 'sweetalert';
import axios from 'axios';
import { useHook } from '../../contexts/Hook';

const Cats = ({ items, perpage }) => {
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
                    window.location.reload();
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
                    alert(res.data.success)
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
                    alert(res.data.success)
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

    const deleteSub = async (id) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/delete/sub/${id}`);
            if (res.data) {

            } else {

            }
        } catch (error) {

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
            <section className='row'>
                {currentItems.map((user, index) => (
                    <>
                        <div className='col-sm-9 col-md-6 mb-3 mt-2'>
                            <div className='card'>
                                <div className='card-header'>
                                    <strong>
                                        {user[0].name} &nbsp; <small>({user['sub'].length})</small>
                                    </strong>
                                </div>
                                <div className='card-body p-3'>
                                    <p>
                                        Sub-Categories
                                    </p>
                                    <table className='table table-stripped'>
                                        {user['sub'].map((small, index) => (
                                            <>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <th>{index + 1}.</th>
                                                    <td>
                                                        {small.V}
                                                    </td>
                                                    <td>
                                                        <button className='button is-danger p-1'
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete this sub category?')) {
                                                                    deleteSub(small.id)
                                                                } else {
                                                                    alert('Cancelled by user');
                                                                }
                                                            }}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div >
                    </>
                ))}
            </section >

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

export default Cats

