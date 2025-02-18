import React from "react";
import { Dropdown, Table } from "react-bootstrap";
import dosts from "../../../assets/icons/dots.svg";
import submitIcon from "../../../assets/icons/submitIcon.svg";
import Accordion from 'react-bootstrap/Accordion';
import moment from "moment";

const GeneralTasks = ({ setShowtask, settaskdetail, tasks }) => {

  const SubmitProofOfWork = (elem) => {
    setShowtask(true)
    settaskdetail(elem)
  }

  return (
    <div className="data-box general-tasks-wrapper border-grad1" style={{ minHeight: "420px" }}>
      <h4 className="general">recent tasks from general</h4>
      <Table striped bordered hover responsive className="general-tasks-table display-none-in-mobile ucdvycdvtyvcvdc">
        <thead>
          <tr>
            <th>Task</th>
            <th>Points</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length > 0 ?
            tasks?.slice(0, 5).map((elem, index) => {
              let expiredate = new Date(elem?.expirationDate);
              const ExpireDate = elem?.expirationDate ? moment(expiredate).format("DD-MM-YYYY") : "---";
              let createdate = new Date(elem?.createdAt);
              const createDate = moment(createdate).format("DD-MM-YYYY");
              return (
                <tr onClick={() => SubmitProofOfWork(elem)}>
                  <td>{elem?.name}</td>
                  <td>+{elem?.reward}</td>
                  <td>
                    {
                      elem?.taskSubmitted && !elem?.taskApproval ?
                 
                        <div className="completed" style={{ background: '#FF8936' }}>Pending</div>
                        : elem?.taskApproval === true ?
                          <div className="completed" style={{ background: '#FF0083' }}>Completed</div>
                          :
                          <div className="completed" style={{ background: '#04C453' }}>Availble</div>
                    }
                  </td>
                  <td>{ExpireDate}</td>
                  <td>
                    <div className="tbl-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <img src={dosts} alt="dosts" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="stats-dropdown-menu">
                          <div className="stats-dropdown-bg" onClick={() => SubmitProofOfWork(elem)}>
                            <Dropdown.Item>
                              <img src={submitIcon} alt="submitIcon" />
                              Submit Proof
                            </Dropdown.Item>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              )
            })
            : <h4 className="ascsdvv">No Task Yet.</h4>}
        </tbody>
        <tbody>
          {/* <tr>
            <td>Like our facebook page</td>
            <td>+5</td>
            <td>
              <div className="completed">Completed</div>
            </td>
            <td>12:34 12/12/23</td>
            <td>
              <div className="tbl-dropdown">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <img src={dosts} alt="dosts" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="stats-dropdown-menu">
                    <div className="stats-dropdown-bg">
                      <Dropdown.Item>
                        <img src={submitIcon} alt="submitIcon" />
                        Submit Proof
                      </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </td>
          </tr> */}
        </tbody>
      </Table>
      <div className="mobile-responsive-table d-none display-block-in-mobile">
        <div className="heading-mobile">
          <p>Task</p>
        </div>
        <Accordion defaultActiveKey="">
          {tasks?.slice(0, 5).map((elem, index) => {
            let expiredate = new Date(elem?.expirationDate);
            const ExpireDate = elem?.expirationDate ? moment(expiredate).format("DD-MM-YYYY") : "---";
            let createdate = new Date(elem?.createdAt);
            const createDate = moment(createdate).format("DD-MM-YYYY");
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{elem?.name}</Accordion.Header>
                <Accordion.Body>
                  <div className="inner-fields">
                    <div className="inner-item">
                      <h6>Points</h6>
                      <p>+{elem?.reward}</p>
                    </div>
                    <div className="inner-item">
                      <h6>Status</h6>
                      {
                        elem?.taskSubmitted && !elem?.taskApproval ?
                        
                          <button className="btn-orange">Pending</button>
                          : elem?.taskApproval === true ?
                            <button className="btn-pink">Completed</button>
                            :
                            <button className="btn-green">Available</button>
                      }
                    </div>
                    <div className="inner-item">
                      <h6>Expiry</h6>
                      <p>{ExpireDate}</p>
                    </div>
                    <div className="inner-item">
                      <h6>Actions</h6>
                      <div className="tbl-dropdown">
                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            <img src={dosts} alt="dosts" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="stats-dropdown-menu">
                            <div className="stats-dropdown-bg" onClick={() => SubmitProofOfWork(elem)}>
                              <Dropdown.Item>
                                <img src={submitIcon} alt="submitIcon" />
                                Submit Proof
                              </Dropdown.Item>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* <a href="#"><img src="\assets\btn-more-mobile.svg" alt="img" className="img-fluid" /></a> */}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default GeneralTasks;
