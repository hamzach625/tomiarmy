import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Accordion from 'react-bootstrap/Accordion';
import "./failed.scss"
import { API_URL } from '../../../utils/ApiUrl';
import axios from 'axios';
import moment from 'moment';
import Loader from '../../../hooks/loader';
const FailedClaim = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalData, setModalData] = useState('')
    const [detaildata, setdetaildata] = useState(null)
    console.log("detail data", detaildata)
    const handleShow = (elem) => {
        setModalData(elem)
        setShow(true);
    }

    const [show1, setShow1] = useState(false);
    const [show11, setShow11] = useState(false);
    const handleClose1 = () => {
        setShow1(false);
        setModalData('')
    }
    const handleShow1 = () => setShow1(true);
    const handleClose11 = () => {
        setShow11(false);
        setModalData('')
    }
    const handleShow11 = () => setShow11(true);
    let tok = localStorage.getItem("accessToken");
    const [loader, setLoader] = useState(false);
    const [transactionHistory, setTransactionHostory] = useState([])
    const [selecttab, setselecttab] = useState('home')
    const [loading, setLoading] = useState(false);
    const [transactionHistorydetail, setTransactionHostorydetail] = useState()

    const getTransaction = async (off) => {

        // let valu = null;
        // if (off) {
        //   valu = off;
        // } else {
        //   valu = 1;
        // }
        // if (account) {
        var config = {
            method: "get",
            url: `${API_URL}/auth/transactions/all-transactions-list?offset=1&limit=10000&txStatus=${selecttab === 'home' ? 'pending' : selecttab === 'profile' ? 'refund' : 'refund rejected'}`,
            headers: {
                authorization: `Bearer ` + tok
            },
        };
        axios(config)
            .then(function (response) {
                setLoader(false);
                // setCount(response.data.data.count)
                setTransactionHostory(response?.data?.data)
                // let arr = Array.from(Array(parseInt(response.data.data.pages)).keys());
                // setPages(arr);
                // setCurrentPage(valu)
            })
            .catch(function (error) {
                setLoader(false);

            });
        // }
    }

    const getTransactiondetail = async (wallet) => {

        // let valu = null;
        // if (off) {
        //   valu = off;
        // } else {
        //   valu = 1;
        // }
        // if (account) {
        var config = {
            method: "get",
            url: `${API_URL}/auth/transactions/user-transactions-list?offset=1&limit=100&walletAddress=${wallet}`,
            headers: {
                authorization: `Bearer ` + tok
            },
        };
        axios(config)
            .then(function (response) {
                setLoader(false);
                // setCount(response.data.data.count)
                setTransactionHostorydetail(response?.data?.data)
                // let arr = Array.from(Array(parseInt(response.data.data.pages)).keys());
                // setPages(arr);
                // setCurrentPage(valu)
            })
            .catch(function (error) {
                setLoader(false);

            });
        // }
    }

    const getTransationdetail = async (off) => {

        // let valu = null;
        // if (off) {
        //   valu = off;
        // } else {
        //   valu = 1;
        // }
        // if (account) {
        var config = {
            method: "get",
            url: `${API_URL}/auth/transactions/meta-data`,
            headers: {
                authorization: `Bearer ` + tok
            },
        };
        axios(config)
            .then(function (response) {
                setLoader(false);
                // setCount(response.data.data.count)
                setdetaildata(response?.data?.data)
                // let arr = Array.from(Array(parseInt(response.data.data.pages)).keys());
                // setPages(arr);
                // setCurrentPage(valu)
            })
            .catch(function (error) {
                setLoader(false);

            });
        // }
    }

    const Refunds = async () => {
        if (!loading) {
            setLoading(true);
            setLoader(true)
            var data = ({
                transactionId: modalData?._id
            });
            axios.defaults.headers.post[
                "Authorization"
            ] = `Bearer ${tok}`;
            var config = {
                method: "post",
                url: `${API_URL}/auth/transactions/refund-transaction`,
                data: data
            };
            axios(config)
                .then(function (response) {
                    if (response?.status == 200) {
                        setLoader(false)
                        handleClose()
                        handleShow1()
                        getTransaction()
                    }
                    // setChat(response?.data?.data?.groupMessages);
                })
                .catch(function (error) {
                    setLoader(false)
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    useEffect(() => {
        getTransaction()
    }, [selecttab])

    useEffect(() => {
        getTransationdetail()
    }, [])


    const walletAddressLength = modalData?.walletAddress?.length;

    const denay = async () => {
        if (!loading) {
            setLoading(true);
            setLoader(true)
            var data = ({
                transactionId: modalData?._id
            });
            axios.defaults.headers.post[
                "Authorization"
            ] = `Bearer ${tok}`;
            var config = {
                method: "post",
                url: `${API_URL}/auth/transactions/reject-transaction`,
                data: data
            };
            axios(config)
                .then(function (response) {
                    if (response?.status == 200) {
                        setLoader(false)
                        handleClose()
                        handleShow11()
                        getTransaction()
                    }
                    // setChat(response?.data?.data?.groupMessages);
                })
                .catch(function (error) {
                    setLoader(false)
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        return `${formattedDate}`;
    }

    function convertEpochToDateTime(epoch) {
        const date = new Date(epoch * 1000); // Convert to milliseconds by multiplying with 1000
        return date.toLocaleString(); // Convert to local date time format
    }

    return (
        <>
            {loader && <Loader />}
            <div className="formobile-heading d-none display-block-in-mobile">
                <div className="inner-heading">
                    <h6>Failed Claims</h6>
                    <p>VIEW AND help army to get the lost funds back.</p>
                </div>
            </div>

            <div className='upperbartomi'>
                <div className="card-item border-gradss">
                    <img src="\static-icons\tomi-icon.png" alt="img" className='img-fluid' style={{ width: "50px", height: "50px" }} />
                    <div className="inner-content">
                        <p>TOMI Available in claim contract</p>
                        <h6>{detaildata?.contractBalance} TOMI</h6>
                    </div>
                </div>
                <div className="card-item border-grads">
                    <img src="https://res.cloudinary.com/drt6vurtt/image/upload/v1699950078/Frame_48095514_crgxvh.svg" alt="img" className='img-fluid' style={{ width: "50px", height: "50px" }} />
                    <div className="inner-content">
                        <p>TOMI Claimed till date</p>
                        <h6>{detaildata?.totalTokensClaimed} TOMI</h6>
                    </div>
                </div>
                <div className="card-item border-gradss">
                    <img src="https://res.cloudinary.com/drt6vurtt/image/upload/v1699950079/ddd_j7xfig.svg" alt="img" className='img-fluid' style={{ width: "50px", height: "50px" }} />
                    <div className="inner-content">
                        <p>TOMI Pending Claims </p>
                        <h6>{(detaildata?.redeemablePoints / 100) + detaildata?.claimableTomis} TOMI</h6>
                        <h5>*Including Unredeemed points </h5>
                    </div>
                </div>
            </div>

            <section className='main-task'>
                <div className='container-fluid padd-sm p-0'>
                    <div></div>
                    <div className='row'>
                        <div className='col-sm-12 padd-sm p-0'>
                            <div className='my-tabs'>
                                <Tabs
                                    defaultActiveKey="home"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                    onSelect={setselecttab}
                                >
                                    <Tab eventKey="home" title="Failed Claims">
                                        <div className='maincard'>
                                            <div className='display-none-in-mobile'>
                                                <div className="maintable">
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <p className='headtable'>Date Received</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Username</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Rank</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Wallet Address</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Claimed Amount</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Actions</p>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transactionHistory?.transactions?.map((elem, index) => {
                                                                let createdate = new Date(elem?.createdAt);
                                                                const createDate = moment(createdate).format("DD-MM-YYYY");
                                                                const walletAddressLength = elem?.walletAddress?.length;
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <p className='paratable'>{createDate}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.nickName}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.rank?.name}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>
                                                                                {`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                    walletAddressLength - 8
                                                                                )}`}
                                                                            </p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.amount} TOMI</p>
                                                                        </td>
                                                                        <td>
                                                                            <div className='dropbtn global-dropdown-style'>
                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                                        <img src='\Vectordots.svg' alt='img' className='img-fluid ' />
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item href="#/action-1">
                                                                                            <p onClick={() => { handleShow(elem); getTransactiondetail(elem?.walletAddress) }}><img src='\generalassets\icons\detail.svg' alt='img' className='img-fluid' />Details</p>
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div className="pagi">
                                                    <div className="left">
                                                        <p>Showing 1 to 10 of 57 entries</p>
                                                    </div>
                                                    <div className="right">
                                                        <p>Previous</p>
                                                        <Pagination>
                                                            <Pagination.Item active>{1}</Pagination.Item>
                                                            <Pagination.Item>{2}</Pagination.Item>
                                                            <Pagination.Item >{3}</Pagination.Item>
                                                            <Pagination.Item>{4}</Pagination.Item>
                                                            <Pagination.Item >{5}</Pagination.Item>
                                                            <Pagination.Item>{6}</Pagination.Item>
                                                        </Pagination>
                                                        <p>Next</p>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="mobile-responsive-table d-none display-block-in-mobile">
                                                <div className="heading-mobile">
                                                    <p>Date Received</p>
                                                </div>
                                                <Accordion defaultActiveKey="0">
                                                    {transactionHistory?.transactions?.map((elem, index) => {
                                                        let createdate = new Date(elem?.createdAt);
                                                        const createDate = moment(createdate).format("DD-MM-YYYY");
                                                        const walletAddressLength = elem?.walletAddress?.length;
                                                        return (
                                                            <Accordion.Item eventKey={index}>
                                                                <Accordion.Header>{createDate}</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className="inner-fields">
                                                                        <div className="inner-item">
                                                                            <h6>Username</h6>
                                                                            <p>{elem?.userId?.nickName}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Rank</h6>
                                                                            <p>{elem?.userId?.rank?.name}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Wallet Address</h6>
                                                                            <p>       {`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                walletAddressLength - 8
                                                                            )}`}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Claimed Amount</h6>
                                                                            <p>{elem?.amount} TOMI</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Actions</h6>
                                                                            <a href="#" onClick={() => handleShow(elem)}><img src="\assets\btn-more-mobile.svg" alt="img" className="img-fluid" />Detail</a>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )
                                                    })}
                                                </Accordion>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="profile" title="Refunded Claims">
                                        <div className='maincard'>
                                            <div className='display-none-in-mobile'>
                                                <div className="maintable">
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <p className='headtable'>Date Received</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Username</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Rank</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Wallet Address</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Claimed Amount</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Action</p>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transactionHistory?.transactions?.map((elem, index) => {
                                                                let createdate = new Date(elem?.createdAt);
                                                                const createDate = moment(createdate).format("DD-MM-YYYY");
                                                                const walletAddressLength = elem?.walletAddress?.length;
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <p className='paratable'>{createDate}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.nickName}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.rank?.name}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                walletAddressLength - 8
                                                                            )}`}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.amount} TOMI</p>
                                                                        </td>
                                                                        <td>
                                                                            <button className='btn-claimmyyyy'>{elem?.txStatus ? 'Refunded' : ''}</button>
                                                                        </td>
                                                                        {/* <td>
                                                                            <div className='dropbtn global-dropdown-style'>
                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                                        <img src='\Vectordots.svg' alt='img' className='img-fluid ' />
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item href="#/action-1">
                                                                                            <p onClick={handleShow}><img src='\generalassets\icons\detail.svg' alt='img' className='img-fluid' />Details</p>
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>
                                                                            </div>
                                                                        </td> */}
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div className="pagi">
                                                    <div className="left">
                                                        <p>Showing 1 to 10 of 57 entries</p>
                                                    </div>
                                                    <div className="right">
                                                        <p>Previous</p>
                                                        <Pagination>
                                                            <Pagination.Item active>{1}</Pagination.Item>
                                                            <Pagination.Item>{2}</Pagination.Item>
                                                            <Pagination.Item >{3}</Pagination.Item>
                                                            <Pagination.Item>{4}</Pagination.Item>
                                                            <Pagination.Item >{5}</Pagination.Item>
                                                            <Pagination.Item>{6}</Pagination.Item>
                                                        </Pagination>
                                                        <p>Next</p>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="mobile-responsive-table d-none display-block-in-mobile">
                                                <div className="heading-mobile">
                                                    <p>Date Received</p>
                                                </div>
                                                <Accordion defaultActiveKey="0">
                                                    {transactionHistory?.transactions?.map((elem, index) => {
                                                        let createdate = new Date(elem?.createdAt);
                                                        const createDate = moment(createdate).format("DD-MM-YYYY");
                                                        const walletAddressLength = elem?.walletAddress?.length;
                                                        return (
                                                            <Accordion.Item eventKey={index}>
                                                                <Accordion.Header>{createDate}</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className="inner-fields">
                                                                        <div className="inner-item">
                                                                            <h6>Username</h6>
                                                                            <p>{elem?.userId?.nickName}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Rank</h6>
                                                                            <p>{elem?.userId?.rank?.name}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Wallet Address</h6>
                                                                            <p>{`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                walletAddressLength - 8
                                                                            )}`}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Claimed Amount</h6>
                                                                            <p>{elem?.amount} TOMI</p>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )
                                                    })}
                                                </Accordion>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="deny" title="Rejected Refund">
                                        <div className='maincard'>
                                            <div className='display-none-in-mobile'>
                                                <div className="maintable">
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <p className='headtable'>Date Received</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Username</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Rank</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Wallet Address</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Claimed Amount</p>
                                                                </th>
                                                                <th>
                                                                    <p className='headtable'>Action</p>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transactionHistory?.transactions?.map((elem, index) => {
                                                                let createdate = new Date(elem?.createdAt);
                                                                const createDate = moment(createdate).format("DD-MM-YYYY");
                                                                const walletAddressLength = elem?.walletAddress?.length;
                                                                return (
                                                                    <tr>
                                                                        <td>
                                                                            <p className='paratable'>{createDate}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.nickName}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.userId?.rank?.name}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                walletAddressLength - 8
                                                                            )}`}</p>
                                                                        </td>
                                                                        <td>
                                                                            <p className='paratable'>{elem?.amount} TOMI</p>
                                                                        </td>
                                                                        <td>
                                                                            <button className='btn-denyyyyy'>{elem?.txStatus ? 'Refund Denied' : ''}</button>
                                                                        </td>
                                                                        {/* <td>
                                                                            <div className='dropbtn global-dropdown-style'>
                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                                        <img src='\Vectordots.svg' alt='img' className='img-fluid ' />
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item href="#/action-1">
                                                                                            <p onClick={handleShow}><img src='\generalassets\icons\detail.svg' alt='img' className='img-fluid' />Details</p>
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>
                                                                            </div>
                                                                        </td> */}
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <div className="pagi">
                                                    <div className="left">
                                                        <p>Showing 1 to 10 of 57 entries</p>
                                                    </div>
                                                    <div className="right">
                                                        <p>Previous</p>
                                                        <Pagination>
                                                            <Pagination.Item active>{1}</Pagination.Item>
                                                            <Pagination.Item>{2}</Pagination.Item>
                                                            <Pagination.Item >{3}</Pagination.Item>
                                                            <Pagination.Item>{4}</Pagination.Item>
                                                            <Pagination.Item >{5}</Pagination.Item>
                                                            <Pagination.Item>{6}</Pagination.Item>
                                                        </Pagination>
                                                        <p>Next</p>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="mobile-responsive-table d-none display-block-in-mobile">
                                                <div className="heading-mobile">
                                                    <p>Date Received</p>
                                                </div>
                                                <Accordion defaultActiveKey="0">
                                                    {transactionHistory?.transactions?.map((elem, index) => {
                                                        let createdate = new Date(elem?.createdAt);
                                                        const createDate = moment(createdate).format("DD-MM-YYYY");
                                                        const walletAddressLength = elem?.walletAddress?.length;
                                                        return (
                                                            <Accordion.Item eventKey={index}>
                                                                <Accordion.Header>{createDate}</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className="inner-fields">
                                                                        <div className="inner-item">
                                                                            <h6>Username</h6>
                                                                            <p>{elem?.userId?.nickName}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Rank</h6>
                                                                            <p>{elem?.userId?.rank?.name}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Wallet Address</h6>
                                                                            <p>{`${elem?.walletAddress.slice(0, 8)}...${elem?.walletAddress.slice(
                                                                                walletAddressLength - 8
                                                                            )}`}</p>
                                                                        </div>
                                                                        <div className="inner-item">
                                                                            <h6>Claimed Amount</h6>
                                                                            <p>{elem?.amount} TOMI</p>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                        )
                                                    })}
                                                </Accordion>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal className='detailmodal failedtrans-modal' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Failed transaction detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="inner-card">
                        <div className="inner-text">
                            <h6>Date Received</h6>
                            <p>{formatDateTime(modalData?.createdAt)}</p>
                        </div>
                        <div className="inner-text">
                            <h6>Username</h6>
                            <p>{modalData?.userId?.nickName}</p>
                        </div>
                        <div className="inner-text">
                            <h6>Rank</h6>
                            <p>{modalData?.userId?.rank?.name}</p>
                        </div>
                        <div className="inner-text">
                            <h6>Wallet Address</h6>
                            <p>
                                {`${modalData?.walletAddress?.slice(0, 8)}...${modalData?.walletAddress?.slice(
                                    walletAddressLength - 8
                                )}`}
                            </p>
                        </div>
                        {/* <div className="inner-text">
                            <h6>Claimed Amount</h6>
                            <p>{modalData?.amount} Tomi</p>
                        </div> */}
                    </div>
                    <div className='totalclainedd'>
                        <div className="inner-text jbjhbnjbhjbj">
                            <h6>Total Points Earned</h6>
                            <p>{transactionHistorydetail?.user?.points}</p>
                            <h6 className='pt-2'>Total Tomi Token</h6>
                            <p>~{transactionHistorydetail?.user?.points / 100} TOMI</p>
                        </div>
                        <div className="inner-text jbjhbnjbhjbj">
                            <h6>Lifetime TOMI Claimed</h6>
                            <p>{transactionHistorydetail?.tokensClaimed}</p>
                            <h6 className='pt-2'>Tomi Available In Army</h6>
                            <p>{(transactionHistorydetail?.user?.tomiTokens) + (transactionHistorydetail?.user?.toClaim / 100)}</p>
                        </div>
                        <div className="inner-text jbjhbnjbhjbj">
                            <h6>Refund Claim Amount</h6>
                            <p>{modalData?.amount}</p>
                            <h6 className='pt-2'>Refund Status</h6>
                            <p>{(transactionHistorydetail?.user?.points / 100) >= ((transactionHistorydetail?.user?.tomiTokens) + (transactionHistorydetail?.user?.toClaim / 100) + modalData?.amount + parseFloat(transactionHistorydetail?.tokensClaimed)) ? <h4 className='greennnn'>OK</h4> : <h4 className='redddddd'>suspicious</h4>}</p>
                        </div>
                    </div>
                    <h1 className='asjhasdhjadja'>Claim History</h1>
                    <div className='claimhistorhy'>
                        <div className='headingss'>
                            <h4>Date/Time</h4>
                            <h5>Claimed Amount</h5>
                        </div>
                        <div className='outerrow'>
                            {transactionHistorydetail?.tokensRedeemeds?.map((elem, index) => {
                                return (
                                    <div className='innerrowasas' key={index}>
                                        <h4>{convertEpochToDateTime(elem?.blockTimestamp)}</h4>
                                        <h5>{elem?.amount / 10 ** 18} TOMI</h5>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="bottom-btns">
                        <button
                            onClick={() => {
                                denay()
                            }}
                            className='btn-deny'><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M9.5 1C4.8165 1 1 4.8165 1 9.5C1 14.1835 4.8165 18 9.5 18C14.1835 18 18 14.1835 18 9.5C18 4.8165 14.1835 1 9.5 1ZM12.356 11.455C12.6025 11.7015 12.6025 12.1095 12.356 12.356C12.2285 12.4835 12.067 12.543 11.9055 12.543C11.744 12.543 11.5825 12.4835 11.455 12.356L9.5 10.401L7.545 12.356C7.4175 12.4835 7.256 12.543 7.0945 12.543C6.933 12.543 6.7715 12.4835 6.644 12.356C6.3975 12.1095 6.3975 11.7015 6.644 11.455L8.599 9.5L6.644 7.545C6.3975 7.2985 6.3975 6.8905 6.644 6.644C6.8905 6.3975 7.2985 6.3975 7.545 6.644L9.5 8.599L11.455 6.644C11.7015 6.3975 12.1095 6.3975 12.356 6.644C12.6025 6.8905 12.6025 7.2985 12.356 7.545L10.401 9.5L12.356 11.455Z" fill="white" />
                            </svg>Deny</button>
                        <button onClick={() => {
                            Refunds()
                        }}
                            className='btn-claim'><svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <g clip-path="url(#clip0_2123_36512)">
                                    <path d="M14.9909 4.37699C13.6925 3.03388 12.0121 2.17983 10.1883 1.92002L10.7081 1.4002C10.9141 1.19426 10.9141 0.860378 10.7081 0.654433C10.5022 0.448522 10.1683 0.448522 9.96234 0.654433L8.62686 1.98988C8.42091 2.19579 8.42091 2.5297 8.62686 2.73565L9.9623 4.07109C10.0653 4.17407 10.2002 4.22557 10.3352 4.22557C10.4701 4.22557 10.6051 4.17407 10.708 4.07109C10.914 3.86518 10.914 3.53127 10.708 3.32532L10.4094 3.02667C11.8583 3.31021 13.1871 4.02859 14.2326 5.11C15.5511 6.47392 16.2773 8.27012 16.2773 10.1677C16.2773 14.1806 13.0126 17.4453 8.99976 17.4453C4.98692 17.4453 1.72217 14.1806 1.72217 10.1677C1.72217 8.63648 2.1921 7.17173 3.0812 5.93184C3.95185 4.71765 5.15208 3.81164 6.55225 3.31179C6.82654 3.21384 6.96948 2.91213 6.87157 2.63781C6.77366 2.36352 6.47188 2.22057 6.19759 2.31848C4.59436 2.89086 3.22035 3.92783 2.22406 5.31724C1.20572 6.73741 0.66748 8.41468 0.66748 10.1677C0.66748 12.3934 1.53419 14.4858 3.10796 16.0596C4.68173 17.6332 6.77412 18.5 8.99976 18.5C11.2254 18.5 13.3178 17.6332 14.8916 16.0595C16.4653 14.4857 17.332 12.3933 17.332 10.1677C17.332 7.99513 16.5006 5.93859 14.9909 4.37699Z" fill="white" />
                                    <path d="M3.58154 10.1677C3.58154 13.1552 6.01211 15.5858 8.99968 15.5858C11.9872 15.5858 14.4178 13.1552 14.4178 10.1677C14.4178 7.18014 11.9872 4.74951 8.99968 4.74951C6.01207 4.74951 3.58154 7.18011 3.58154 10.1677ZM9.3234 10.6371C8.56431 10.3687 8.1245 10.1572 7.80543 9.90693C7.41273 9.59893 7.23298 9.06698 7.33627 8.51872C7.44834 7.92395 7.86312 7.45046 8.41876 7.28308C8.42646 7.28076 8.43402 7.2789 8.44168 7.27665V7.0643C8.44168 6.77307 8.67779 6.53696 8.96903 6.53696C9.26026 6.53696 9.49637 6.77307 9.49637 7.0643V7.24307C9.86456 7.32931 10.1216 7.49761 10.2254 7.57527C10.4587 7.74968 10.5064 8.08011 10.3321 8.31341C10.1577 8.5467 9.8273 8.59438 9.59393 8.42004C9.48227 8.33657 9.17409 8.157 8.72297 8.29291C8.45645 8.37321 8.38751 8.63551 8.37271 8.71401C8.34349 8.86905 8.37707 9.01498 8.45627 9.07707C8.73214 9.29339 9.22707 9.48439 9.67486 9.64266C10.494 9.93221 10.9495 10.6911 10.8083 11.5309C10.739 11.9433 10.5315 12.3259 10.2241 12.6083C10.0127 12.8025 9.76641 12.9406 9.49637 13.0185V13.271C9.49637 13.5622 9.26026 13.7983 8.96903 13.7983C8.67779 13.7983 8.44168 13.5622 8.44168 13.271V13.0704C8.09086 13.0291 7.79811 12.9211 7.4044 12.6635C7.16066 12.5041 7.09235 12.1773 7.25179 11.9335C7.41122 11.6897 7.7381 11.6215 7.9818 11.7809C8.34683 12.0197 8.48486 12.0417 8.96551 12.0383C9.43875 12.0352 9.71332 11.6824 9.7682 11.356C9.79506 11.1966 9.80536 10.8074 9.3234 10.6371Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2123_36512">
                                        <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>Refund</button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal className='detailmodal refund-modal' show={show1} onHide={handleClose1} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Refund</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="refund-div">
                        <h2>{modalData?.amount} TOMI</h2>
                        <h6>Refunded successfully.</h6>
                    </div>
                    <div className="bottom-btns">
                        <button className='btn-okay' onClick={handleClose1}>Okay</button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal className='detailmodal refund-modal' show={show11} onHide={handleClose11} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Refund Rejected</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="refund-div">
                        <h2>{modalData?.amount} TOMI</h2>
                        <h6>Refund rejected successfully.</h6>
                    </div>
                    <div className="bottom-btns">
                        <button className='btn-okay' onClick={handleClose11}>Okay</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FailedClaim