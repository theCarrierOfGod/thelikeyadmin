import React, { useEffect } from 'react'
import Adminheader from './Adminheader'
import Footer from '../user/Footer'
import { Helmet } from 'react-helmet'
import Adminsidebar from './Adminsidebar'
import { useState } from 'react'
import axios from 'axios'
import { useHook } from '../contexts/Hook'
import swal from 'sweetalert'
import { Link, useLocation } from 'react-router-dom'
import Cats from './Cats/Cats'

const Categories = () => {
    const hook = useHook();
    const location = useLocation();
    const [adding, setAdding] = useState('');
    const [type, setType] = useState('promotion');
    const [categories, setCategories] = useState([]);

    const allUsers = async () => {
        try {
            const res = await axios.get(`${hook.endpoint}/admin/categories/${type}`);
            if (res.data) {
                setCategories(res.data);
            } else {
                setCategories([])
            }
        } catch (error) {
            setCategories([])
        }
    }

    const getNow = () => {
        allUsers();
    }

    useEffect(() => {
        getNow();

        return () => {
            return true;
        }
    }, [location.key, type])

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
                                    </span> TASK N PROMOTION CATEGORIES
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="page-header">
                                <h3 className="page-title">
                                    <Link to="/categories" className='button is-link' style={{ textDecoration: 'none' }}>Add New</Link>
                                </h3>
                                <div className='page-title'>
                                    <label htmlFor='type'>
                                        Category Type
                                    </label>
                                    <select className='form-select' id='type' onChange={(e) => setType(e.target.value)} defaultChecked={type}>
                                        <option value={'promotion'} selected={type === 'promotion'}>Promotion</option>
                                        <option value={'task'} selected={type === 'task'}>Task</option>
                                    </select>
                                </div>
                            </div>



                            <div className="row justify-content-center">

                                <div className="col-md-12 stretch-card grid-margin">
                                    <div className="card card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <section className=''>
                                                {categories.length === 0 ? "" : (
                                                    <>
                                                        <Cats items={categories} perpage={3} />
                                                    </>
                                                )}
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Categories