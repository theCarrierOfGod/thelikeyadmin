import React from 'react'
import Adminheader from './Adminheader'
import Footer from '../user/Footer'
import { Helmet } from 'react-helmet'
import Adminsidebar from './Adminsidebar'
import { useState } from 'react'
import axios from 'axios'
import { useHook } from '../contexts/Hook'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const AddCategories = () => {
    const hook = useHook();
    const [adding, setAdding] = useState('')
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const createNew = async (e) => {
        e.preventDefault();
        setAdding(true);
        let data = {
            name: name,
            type: type,
            subcategory: subCategory,
        }

        try {
            const res = await axios.post(`${hook.endpoint}/admin/new/category`, data, {
                headers: {
                    'content-type': 'application/json',
                    'X-CSRF-TOKEN': hook.token
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        swal({
                            title: "New Category",
                            text: "Category Created",
                            icon: "success",
                            button: "Proceed!",
                        })
                            .then(() => {
                                document.getElementById("create-new-form").reset();
                                setName('');
                                setType('');
                                setSubCategory('');
                            })
                    } else {
                        swal({
                            title: "New Category",
                            text: res.data.error,
                            icon: "error",
                        })
                    }
                    console.log(res)
                    setAdding(false)
                })

        } catch (error) {
            // Handle errors
            console.log(error)
            setAdding(false);
            swal({
                title: "New Category",
                text: error.message,
                icon: "error",
            })
        }
    }

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

                            <div className="row justify-content-center">
                                <div className="col-md-12 stretch-card grid-margin">
                                    <div className="card card-img-holder text-white">
                                        <div className="card-body p-2">
                                            <section className='notification is-info is-light'>
                                                NOTE: All input fields will be in lower case <br /> <br />
                                                <Link to="/categories" className='button is-link' style={{ textDecoration: 'none' }}>See All</Link>
                                            </section>
                                            <form onSubmit={e => createNew(e)} id="create-new-form">
                                                <div class="field">
                                                    <label class="label">CATEGORY</label>
                                                    <div class="control">
                                                        <input class="input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" />
                                                    </div>
                                                </div>

                                                <div class="field">
                                                    <label class="label">TYPE</label>
                                                    <div class="control">
                                                        <div class="select">
                                                            <select defaultChecked={type} onChange={(e) => setType(e.target.value)}>
                                                                <option value={''}>Select dropdown</option>
                                                                <option value={'promotion'}>PROMOTION</option>
                                                                <option value="task">TASK</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="field">
                                                    <label class="label">SUBCATEGORY(s)</label>
                                                    <div class="control">
                                                        <textarea class="textarea" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} placeholder="SubCategory(s)"></textarea>
                                                    </div>
                                                    <small className='subtitle is-info' style={{ fontSize: '10px' }} >Separate them with commas</small>
                                                </div>

                                                <div class="field is-grouped">
                                                    <div class="control">
                                                        <button class="button is-primary" disabled={adding}>{adding ? '...' : 'Submit'}</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default AddCategories