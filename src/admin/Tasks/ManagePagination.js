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

    const rejectProof = async (proofID) => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/proof/reject/${proofID}`);
            console.log(res.data);
        } catch (error) {
            setProofs([]);
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
                    <div className="alert alert-info">
                        No data
                    </div>
                </div>
            </div>
            {currentItems.map((proof) => (
                <>
                    <div className='col-sm-5 mt-4'>
                        <div className='card' style={{ overflow: 'hidden' }}>
                            <div className='card-body p-2'>
                                <p>
                                    <strong>Proof BY: </strong> {proof.proofBy}
                                </p>
                                <p>
                                    <strong>Task ID: </strong> {proof.taskID}
                                </p>
                                <p>
                                    <strong>Task Status: </strong> {proof.taskStatus}
                                </p>
                                <strong>Task Description:</strong>
                                <div dangerouslySetInnerHTML={{ __html: proof.description }}></div>
                                {type === "pending" ? (
                                    <>
                                        <button
                                            className='button is-success is-light'

                                        >
                                            Approve
                                        </button>
                                        &nbsp; &nbsp;
                                        <button
                                            className='button is-warning is-light'
                                            onClick={() => {
                                                swal({
                                                    title: "Reason for rejection",
                                                    icon: 'warning',
                                                    content: {
                                                        element: "input",
                                                        attributes: {
                                                            placeholder: "Specify reason for rejection",
                                                            type: "text",
                                                        },
                                                        showCancelButton: true,
                                                        closeOnConfirm: false,
                                                        animation: "slide-from-top",
                                                    },
                                                })
                                                    .then((value) => {
                                                        if (value.length === 0) {
                                                            swal({
                                                                text: 'Process Teminated',
                                                                icon: 'error'
                                                            })
                                                        } else {
                                                            rejectProof(proof.proofID)
                                                            swal({
                                                                text: value,
                                                                icon: "success",
                                                            })
                                                        }
                                                    })
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : null}
                            </div>
                            {JSON.parse(proof.proofURL).map((image) => (
                                <div className='card-img'>
                                    <img src={image} style={{ width: '100%' }} alt={'proof '} />
                                </div>
                            ))}
                        </div>
                    </div >
                </>
            ))
            }
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
