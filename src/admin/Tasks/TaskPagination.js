import React, { useState } from 'react'
import '../pagination.css'
import axios from 'axios';
import { useHook } from '../../contexts/Hook';
import { Link } from 'react-router-dom';

const TaskPagination = ({ items, perpage }) => {
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

    return (
        <>
            <div>
                <div className={total !== 0 ? "d-none" : "col-lg-12 mt-4 text-center"}>
                    <div className="alert alert-info">
                        No data
                    </div>
                </div>
            </div>
            {/* <div className="table-responsive">
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th><abbr title="Serial Number">#</abbr></th>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Achieved</th>
                            <th>Approved</th>
                            <th>Target</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>CPU</th>
                            <th>Total Cost</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th><abbr title="Serial Number">#</abbr></th>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Achieved</th>
                            <th>Approved</th>
                            <th>Target</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>CPU</th>
                            <th>Total Cost</th>
                            <th>Link</th>
                        </tr>
                    </tfoot>
                    <tbody style={{ fontFamily: 'monospace', textTransform: 'capitalize' }}>
                        {currentItems.map((user, index) => (
                            <>
                                <tr>
                                    <th>{user.unique_id}</th>
                                    <td>
                                        <strong>
                                            {user.title}
                                        </strong>
                                    </td>
                                    <td>{user.created_by}</td>
                                    <td>{user.achieved}</td>
                                    <td>{user.approved}</td>
                                    <td>{user.target}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        {user.location}
                                    </td>
                                    <td>{user.cpu}</td>
                                    <td>{user.total_cost}</td>
                                    <td>{user.link}</td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div className='card-columns'>
                {currentItems.map((user, index) => (
                    <div class="card">
                        <header class="card-header bg-info">
                            <p class="card-header-title" style={{ textTransform: 'uppercase'}}>
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
                                    <Link to={user.link}>{user.link}</Link>
                                </div>
                            </div>
                            <div class="content">
                                {user.description}
                            </div>
                        </div>
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

