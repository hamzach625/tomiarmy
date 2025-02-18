import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { API_URL } from '../../utils/ApiUrl';
import moment from 'moment';
import axios from 'axios';

const Announcements = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  let tok = localStorage.getItem("accessToken");
  const [selecttab, setselecttab] = useState('profile')

  const getAnnouncements = async () => {
    var config = {
      method: "get",
      url: `${API_URL}/notifications/announcements/user-announcements?offset=1&limit=5&isRead=${selecttab === 'profile' ? false : true}`,
      headers: {
        authorization: `Bearer ` + tok
      },
    };
    axios(config)
      .then(function (response) {
        setAnnouncements(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  }

  useEffect(() => {
    getAnnouncements()
  }, [selecttab]);


  const [detail, setDeatils] = useState(null)
console.log("title",detail)
  const getDetail = (elem) => {
    handleShow()
    setDeatils(elem)

  }
  const getDetail1 = (elem) => {
    setShow1(true)
    setDeatils(elem)

  }
  const readAnnuncement = async () => {
    var config = {
      method: "patch",
      url: `${API_URL}/notifications/announcements/user-announcements/${detail?.announcement?.id}`,
      headers: {
        authorization: `Bearer ` + tok
      },
    };
    axios(config)
      .then(function (response) {
        getAnnouncements()
        handleClose()
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  }

  const directReadAnnuncement = async (elem) => {
    var config = {
      method: "patch",
      url: `${API_URL}/notifications/announcements/user-announcements/${elem?.announcement?.id}`,
      headers: {
        authorization: `Bearer ` + tok
      },
    };
    axios(config)
      .then(function (response) {
        getAnnouncements()
        // handleClose()
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  }




  return (
    <>
      <div className="formobile-heading d-none display-block-in-mobile">
        <div className="inner-heading">
          <h6>ANNOUNCEMENTS</h6>
          <p>view your announcements</p>
        </div>
      </div>
      <section className='main-announcement'>
        <div className='container-fluid padd-sm p-0'>
          <div className='row'>
            <div className='col-sm-12 padd-sm p-0'>
              <div className='my-tabs'>
                <Tabs
                  defaultActiveKey="profile"
                  transition={false}
                  id="noanim-tab-example"
                  className="mb-3 border-grad1"
                  onSelect={setselecttab}
                >
                   <Tab eventKey="profile" title={<p>Unread Announcements
                    {/* <img src='\two.svg' alt='img' className='img-fluid' /> */}
                    {/* {selecttab === 'profile' && announcements?.userAnnouncements?.length} */}
                  </p>}>
                    {/* <Sonnet /> */}
                    <div className='maincard border-grad1'>
                      <div className="maintable display-none-in-mobile">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>
                                <p className='headtable'>Announcement Title</p>
                              </th>
                              <th>
                                <p className='headtable'>Date Received</p>
                              </th>
                              <th>
                                <p className='headtable'>Actions</p>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {announcements?.userAnnouncements?.map((elem) => {
                              let createdate = new Date(elem?.createdAt);
                              const createDate = moment(createdate).format("DD-MM-YYYY");
                              return (
                                <tr>
                                  <td>
                                    <p className='paratable'>{elem?.announcement?.title}</p>
                                  </td>
                                  <td>
                                    <p className='paratable'>{createDate}</p>
                                  </td>
                                  <td>
                                    <div className='dropbtn'>
                                      <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                          <img src='\Vectordots.svg' alt='img' className='img-fluid' />

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Dropdown.Item href="#/action-1">
                                            <p onClick={()=>directReadAnnuncement(elem)}><img src='\Vector.svg' alt='img' className='img-fluid' />Make as read</p>
                                          </Dropdown.Item>
                                          <div className='brdr'></div>
                                          <Dropdown.Item href="#/action-1">
                                            <p onClick={() => getDetail(elem)}><img src='\Vectordetail.svg' alt='img' className='img-fluid' />details</p>
                                          </Dropdown.Item>
                                          <div className='brdr'></div>
                                          <Dropdown.Item href="#/action-1">
                                            <p><img src='\trash.svg' alt='img' className='img-fluid' />delete</p>
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
                      <div className="mobile-responsive-table d-none display-block-in-mobile">
                        <div className="heading-mobile">
                          <p>Announcement</p>
                        </div>
                        <Accordion defaultActiveKey="0">
                        {announcements?.userAnnouncements?.map((elem) => {
                            let createdate = new Date(elem?.createdAt);
                            const createDate = moment(createdate).format("DD-MM-YYYY");
                            return (
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>{elem?.announcement?.title}</Accordion.Header>
                                <Accordion.Body>
                                  <div className="inner-fields">
                                    <div className="inner-item">
                                      <h6>Date Received</h6>
                                      <p>{createDate}</p>
                                    </div>
                                    <div className="inner-item">
                                      <h6>Actions</h6>
                                      <div className='dropbtn'>
                                        <Dropdown>
                                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <img src='\Vectordots.svg' alt='img' className='img-fluid' />

                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                              <p><img src='\Vector.svg' alt='img' className='img-fluid' />Submit Proof</p>
                                            </Dropdown.Item>
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p onClick={() => getDetail(elem)}><img src='\Vectordetail.svg' alt='img' className='img-fluid' />details</p>
                                            </Dropdown.Item>
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p><img src='\trash.svg' alt='img' className='img-fluid' />delete</p>
                                            </Dropdown.Item>

                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
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
                  <Tab eventKey="home" title="Read Announcements">
                    {/* <Sonnet /> */}
                    <div className='maincard border-grad1'>
                      <div className='display-none-in-mobile'>
                        <div className="maintable">
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th>
                                  <p className='headtable'>Announcement</p>
                                </th>
                                <th>
                                  <p className='headtable'>Date Received</p>
                                </th>
                                <th>
                                  <p className='headtable'>Actions</p>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {announcements?.userAnnouncements?.map((elem) => {
                                let createdate = new Date(elem?.createdAt);
                                const createDate = moment(createdate).format("DD-MM-YYYY");
                                return (
                                  <tr>
                                    <td>
                                      <p className='paratable'>{elem?.announcement?.title}</p>
                                    </td>
                                    <td>
                                      <p className='paratable'>{createDate}</p>
                                    </td>
                                    <td>
                                      <div className='dropbtn'>
                                        <Dropdown>
                                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <img src='\Vectordots.svg' alt='img' className='img-fluid' />

                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            {/* <Dropdown.Item href="#/action-1">
                                              <p onClick={()=>directReadAnnuncement(elem)}><img src='\Vector.svg' alt='img' className='img-fluid' />Make as Read</p>
                                            </Dropdown.Item> */}
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p onClick={() => getDetail1(elem)}><img src='\Vectordetail.svg' alt='img' className='img-fluid' />details</p>
                                            </Dropdown.Item>
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p><img src='\trash.svg' alt='img' className='img-fluid' />delete</p>
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
                          <p>Announcement</p>
                        </div>
                        <Accordion defaultActiveKey="0">
                          {announcements?.userAnnouncements?.map((elem) => {
                            let createdate = new Date(elem?.createdAt);
                            const createDate = moment(createdate).format("DD-MM-YYYY");
                            return (
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>{elem?.announcement?.title}</Accordion.Header>
                                <Accordion.Body>
                                  <div className="inner-fields">
                                    <div className="inner-item">
                                      <h6>Date Received</h6>
                                      <p>{createDate}</p>
                                    </div>
                                    <div className="inner-item">
                                      <h6>Actions</h6>
                                      <div className='dropbtn'>
                                        <Dropdown>
                                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <img src='\Vectordots.svg' alt='img' className='img-fluid' />

                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">
                                              <p><img src='\Vector.svg' alt='img' className='img-fluid' />Submit Proof</p>
                                            </Dropdown.Item>
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p onClick={() => getDetail(elem)}><img src='\Vectordetail.svg' alt='img' className='img-fluid' />details</p>
                                            </Dropdown.Item>
                                            <div className='brdr'></div>
                                            <Dropdown.Item href="#/action-1">
                                              <p><img src='\trash.svg' alt='img' className='img-fluid' />delete</p>
                                            </Dropdown.Item>

                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
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
     {/* for unread */}
        <Modal className='detailmodal' show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>announcement Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='modalcard'>
              <h4>Title</h4>
              <p>{detail?.announcement?.title}</p>
            </div>
            <div className='modalcard mt-4'>
              <h4>Announcement</h4>
              <p dangerouslySetInnerHTML={{__html: detail?.announcement?.message}}></p>
            </div>
            <div className="twice-date">
            <div className='modalcard mt-4'>
              <h4>Date Received</h4>
              <p>{moment(detail?.createdate).format("DD-MM-YYYY")}</p>
            </div>
            <div className='modalcard mt-4'>
              <h4>To</h4>
              <p>{detail?.announcement?.recipients}</p>
            </div>
            </div>
            <div className='uploadimgann mt-4'>
              <h4>Image/Video</h4>
              <img src={detail?.announcement?.media} alt="img" className='img-fluid' />
            </div>
            <div className='okbtn'>
              <button onClick={readAnnuncement}><span><img src='\checkmarks.svg' alt='img' className='img-fluid' /></span>Okay</button>
            </div>
          </Modal.Body>
        </Modal>
    {/* for read */}
        <Modal className='detailmodal' show={show1} onHide={handleClose1} centered>
          <Modal.Header closeButton>
            <Modal.Title>announcement Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modalcard'>
              <h4>Announcement</h4>
              <p>{detail?.announcement?.message}</p>
            </div>
            <div className='modalcard mt-4'>
              <h4>Date Received</h4>
              <p>{moment(detail?.createdate).format("DD-MM-YYYY")}</p>
            </div>
            <div className='okbtn'>
              <button onClick={handleClose1}><span><img src='\checkmarks.svg' alt='img' className='img-fluid' /></span>Okay</button>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </>
  )
}

export default Announcements