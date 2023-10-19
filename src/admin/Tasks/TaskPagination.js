import React, { useState } from 'react'
import '../pagination.css'
import axios from 'axios';
import { useHook } from '../../contexts/Hook';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const TaskPagination = ({ items, perpage }) => {
    const hook = useHook();
    const itemPerPage = perpage;
    const total = items.length;
    const pageCount = Math.ceil(total / itemPerPage);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemPerPage)
    const [currentPage, setCurrentPage] = useState(1);
    const currentItems = items.slice(itemOffset, endOffset);
    const [ad, setAd] = useState(false);

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

    const verifyTask = async (uid) => {
        setAd(true)
        try {
            const res = await axios.get(`${hook.endpoint}/admin/task/verify/${uid}`);
            if (res.data) {
                hook.allUsers();
            }
            setAd(false)
        } catch (error) {
            setAd(false)
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

            <div className={total === 0 ? "d-none" : "col-lg-12 mt-4 text-right"} style={{ textAlign: 'right' }}>
                <span onClick={() => handlePrevious()} className={currentPage === 1 ? 'd-none' : 'button btn-info mr-3 p-1'} title={'Previous Page'} >Previous page</span>
                <span onClick={() => handleNext()} className={currentPage === pageCount ? 'd-none' : 'button btn-info p-1'} title={'Next Page'}>Next page</span>
                <br />
                <span style={{ color: 'black' }}>
                    {currentPage} of {pageCount} page(s)
                </span>
            </div>

            <div className='card-columns'>
                {currentItems.map((user, index) => (
                    <div class="card">
                        <header class="card-header bg-info">
                            <p class="card-header-title" style={{ textTransform: 'uppercase' }}>
                                {user.title}
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-6">Created by: {user.created_by}</p>
                                    <p class="subtitle is-6">Quantity: {user.target}</p>
                                    <p class="subtitle is-6">Achieved: {user.achieved}</p>
                                    <p class="title is-6">Approved: {user.approved}</p>
                                    <p class="title is-6">Location: {user.location}</p>
                                    <p class="subtitle is-6">Status: {user.status}</p>
                                    <p class="subtitle is-6">CPU: {user.cpu}</p>
                                    <p>
                                        <Link to={user.link}>{user.link}</Link>
                                    </p>
                                </div>
                            </div>
                            <div class="content" dangerouslySetInnerHTML={{ __html: user.description }}></div>
                        </div>
                        <footer class="card-footer">
                            <button
                                class={`${user.verified === "0" ? 'd-none' : null} card-footer-item button is-primary`}
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to publish this task?')) {
                                        verifyTask(user.unique_id);
                                    } else {
                                        alert("Cancelled by user");
                                    }
                                }}
                            >
                                Publish
                            </button>
                            <button class="card-footer-item button is-warning">Cancel</button>
                            <Link to={`/task/view/${user.unique_id}/admin`} class="card-footer-item button is-info">Proofs</Link>
                        </footer>
                    </div>
                ))}
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

export default TaskPagination

