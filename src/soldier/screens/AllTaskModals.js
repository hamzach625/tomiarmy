import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import moment from 'moment'
import axios from 'axios';
import { API_URL } from '../../utils/ApiUrl';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import Loader from '../../hooks/loader';

const AllTaskModals = ({ showtask, setShowtask, settaskdetail, taskdetail,getData }) => {

  const handleClosetask = () => setShowtask(false);
  const [loader, setLoader] = useState(false);
  const { account } = useWeb3React()
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageModal, setImageModal] = useState(false)
  const handleImageClose = () => setImageModal(false);
  const setProfilePic = (evt) => {
    setProfilePicture(evt.target.files[0]);
  }

  const [powUrl, setPowUrl] = useState("");
  const [opTask, SetOpTask] = useState(null);


  // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };
  // const handleRemoveClick = index => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };
  // const handleAddClick = () => {
  //   setInputList([...inputList, { firstName: "", lastName: "" }]);
  // };


  const [inputs, setInputs] = useState({})

  const SubmitWork = () => {

    if ((multiplemages[0]?.multorimg != '' || inputs?.name)) {
      var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      var t = inputs?.name;
      var m = '';
      if (t === undefined) {
      }
      else if (t.match(regex)) {
        m = inputs?.name;
      }
      else {
        var t = inputs?.name;
        m = 'https://' + t
      }
      let dumarr = []
      if (multiplemages[0]?.multorimg != '')
        for (let i = 0; i < multiplemages.length; i++) {
          if (multiplemages[i]?.multorimg != '') {
            dumarr.push(multiplemages[i]?.multorimg)
          }
        }
      // setShowpow(false);
      // window.$("#exampleModalworkproof").modal("hide")
      let tok = localStorage.getItem("accessToken");
      var data = ({
        ...(inputs?.name && { url: m }),
        ...(dumarr.length > 0 && { image: dumarr }),
      });
      // if (account) {
        setLoader(true);
        axios.defaults.headers.post[
          "Authorization"
        ] = `Bearer ${tok}`;
        var config = {
          method: "post",
          url: `${API_URL}/tasks/${taskdetail?._id}/work-proof`,
          data: data
        };

        axios(config)
          .then(async (response) => {
            setLoader(false);
            getData()
            setShow1(false)
            setShow2(true)
            // window.$("#exampleModalworkproof").modal("hide");
            // toast.success("Work submitted successfully")
            // setcheckmodal('');
            // setProfilePicture(null);
            // setShowpow(false);
            // setShowdetail0(false)
            // setShowdetail(false);
            // GetTasks();
            // GetTaskss();
            setInputs({
              name: ''
            })
            setmultiplemages([
              {
                multorimg: ""
              }
            ])
            // GetUserProfiledata();
            // window.location.reload();
            // setOperations(response?.data?.data?.operation);
          })
          .catch(function (error) {
            setProfilePicture(null)
            setInputs({
              name: ''
            })
            if (error.response.data.statusCode == 409) {
              toast.error("Proof of work for mention task for User already exists")
            }
            else if (error.response.data.statusCode == 422) {
              toast.error("General can't create Proof of Work")
            }
            else if (error.response.data.statusCode == 400) {
              toast.error(error.response.data?.message)
            }
            // GetUserProfiledata();
            setLoader(false);
          });
      // }
    } else {
      toast.error("Atleast send URL or Image of work")
    }

  }


  const [multiplemages, setmultiplemages] = useState
    ([
      {
        multorimg: ""
      }
    ]);

  //  Task Here Start
  const handleInputChange = async (e, index) => {
    const file = e.target.files[0];
    if (file.size >= 10000000) {
      toast.error("File cannot be greater than 10mbs")
    } else {
      let tok = localStorage.getItem("accessToken");
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${tok}`;
      var data = new FormData();
      data.append("image", file);
      if (file) {
        const responses = await axios.post(
          `${API_URL}/tasks/metadata/upload-image`,
          data
        );
        const list = [...multiplemages];
        list[index].multorimg = responses?.data?.url;
        setmultiplemages(list);
        e.target.value = null;
      }
    }
  };

  const handleRemoveClick = index => {
    const list = [...multiplemages];
    list.splice(index, 1)
    setmultiplemages(list);
  };
  const handleAddClick = () => {
    setmultiplemages([...multiplemages,
    {
      multorimg: ""
    }
    ]);
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  var result=taskdetail?.attachment?.split("_")?.pop();

  return (
    <>
    {loader && <Loader/>}
      <Modal className='detailmodal' show={showtask} onHide={handleClosetask} centered>
        <Modal.Header closeButton>
          <Modal.Title>task details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='innercard'>
            <p className='head'>Task Title</p>
            <h6 className='head1'>{taskdetail?.name}</h6>
            <h3 className='discription'>Task Description</h3>
            <h6 className='head1'>{taskdetail?.description}</h6>
            <div className='parent'>
              {taskdetail?.relatedLink &&
                <div className='left'>
                  <p className='link'>Related link</p>
                  <a href={taskdetail?.relatedLink} target="_blank" >
                    <h6 className='point underliness'>{taskdetail?.relatedLink}</h6>
                  </a>
                </div>
              }
              <div className='right'>
                <p className='link'>Points</p>
                <h6 className='point'>{taskdetail?.reward}</h6>
              </div>
            </div>
            <div className='parent mt-3'>
              <div className='left'>
                <p className='link'>Start Date</p>
                <h6 className='point'>{moment(taskdetail?.createdate).format("DD-MM-YYYY")}</h6>
              </div>
              {taskdetail?.expirationDate &&
                <div className='right'>
                  <p className='link'>End Date</p>
                  <h6 className='point'>{moment(taskdetail?.expirationDate).format("DD-MM-YYYY")}</h6>
                </div>
              }
            </div>
            {taskdetail?.attachment &&
              <>
                <p className='attachment'>attachment</p>
                <div className='taskdetail'>
                  <a href={taskdetail?.attachment} target="_blank" >
                    <p>
                      <img src='\Group.svg' alt='img' className='img-fluid' />{result}</p>
                  </a>
                </div>
              </>
            }
            {taskdetail?.image &&
              <div onClick={()=>setImageModal(true)}>
                <p className='link'>Image</p>
                <img src={taskdetail?.image} alt='img' className='img-fluid' />
              </div>
            }

          </div>
          
          <div className='endbtn'>
            <button className='btn-blackk' onClick={()=>handleClosetask()}><span><img src='\Subtract.svg' alt='img' className='img-fluid' /></span>Cancel</button>
            <button className={`btn-pinkk ${taskdetail?.taskSubmitted || taskdetail?.taskApproval ? "sadascav" : ""}`} onClick={() => {
              handleShow1();
              handleClosetask();
            }}><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <path d="M12.6478 1H6.35967C3.62831 1 2 2.736 2 5.648V12.344C2 15.264 3.62831 17 6.35967 17H12.6403C15.3717 17 17 15.264 17 12.352V5.648C17.0075 2.736 15.3792 1 12.6478 1ZM6.85492 6.584L9.10604 4.184C9.15857 4.128 9.2186 4.088 9.28613 4.056C9.4212 3.992 9.57878 3.992 9.71384 4.056C9.78138 4.088 9.84141 4.128 9.89393 4.184L12.1451 6.584C12.3627 6.816 12.3627 7.2 12.1451 7.432C12.0325 7.552 11.8899 7.608 11.7474 7.608C11.6048 7.608 11.4622 7.552 11.3497 7.432L10.059 6.056V11.008C10.059 11.336 9.80389 11.608 9.49623 11.608C9.18858 11.608 8.93345 11.336 8.93345 11.008V6.056L7.64281 7.432C7.4252 7.664 7.06502 7.664 6.84742 7.432C6.62981 7.2 6.63731 6.824 6.85492 6.584ZM14.1861 13.176C12.6778 13.712 11.0945 13.984 9.50374 13.984C7.91295 13.984 6.32966 13.712 4.82141 13.176C4.52876 13.072 4.37118 12.728 4.46873 12.416C4.56628 12.104 4.88894 11.928 5.18159 12.04C7.97298 13.032 11.042 13.032 13.8334 12.04C14.126 11.936 14.4487 12.104 14.5463 12.416C14.6363 12.736 14.4787 13.072 14.1861 13.176Z" fill="white"/>
          </svg>Submit proof of work</button>
          </div>
        </Modal.Body>

      </Modal>

      <Modal className='detailmodal' show={show1} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='heading'>
              <h4>submit proof of work</h4>
              <p>upload at least one of the below items</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='maininput'>
            <p>POW URL</p>
            <input type='text' value={inputs?.name ? inputs?.name :''} name="name" onChange={(e)=>handleChange1(e)}  placeholder='Enter POW URL....' />
          </div>
          {/* <div className="upload-parent">
            <p className='uehyuj'>Upload Proof of Work Image</p>
            <div className="upload">
              {
                profilePicture ? <label htmlFor="upload">
                  {" "}
                  <img
                    src={profilePicture ? URL?.createObjectURL(profilePicture) : ""}
                    alt="img"
                    className="img-fluid"
                  />
                </label> : <label htmlFor="upload">
                  {" "}
                  <img
                    src="\uploadimage.svg"
                    alt="img"
                    className="img-fluid"
                  />
                  <p className='dropimage'>Drop your image here, or<span>browse</span> </p>
                  <p className='support'>Supports: JPG, JPEG, PNG</p>
                </label>
              }
              <input type="file" className="d-none" id="upload" onChange={(e) => setProfilePic(e)} />
            </div>
            <div className="others-upload">
              {multiplemages?.map((x, i) => {
                return (
                  <>
                    <div className="upload">
                      <label htmlFor="upload">+</label>
                      {inputList.length !== 1 && <button
                        className="btn-remove"
                        onClick={() => handleRemoveClick(i)}>x</button>}
                    </div>
                    {inputList.length - 1 === i && inputList.length < 4 ? 
                      <button onClick={handleAddClick} className='btn-addmore'>Add More</button> : ""}
                  </>
                );
              })}
            </div>
            </div> */}
          <div className="sfdsfadsfdfdsf">
            {multiplemages?.map((x, i) => {
              return (
                <div key={i} className={i > 0 ? "sdfdsfdsf" : " sdfdsfdsfdfdf"}>
                  <div className="upload-parent">
                    <div className={i > 0 ? "upload dfhsdfhdshdsfh" : "upload  dfhsdfhdshdsfhdfdf"}>
                      {
                        x?.multorimg ? <label htmlFor={i} className="labelimagess">
                          {" "}
                          <img
                            src={x?.multorimg ? x?.multorimg : ""}
                            alt="img"
                            className="img-fluid"
                          />
                        </label> : <label htmlFor={i}>
                          {" "}
                          <img
                            src="\generalassets\icons\upload-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                          {i > 0 ? "" : <h6><label htmlFor="upload">browse</label></h6>}
                          {i > 0 ? "" : <p className="text">Supports: JPG, JPEG, PNG</p>}
                        </label>
                      }
                      <input type="file"
                        accept=".png, .jpeg, .jpg"
                        className="d-none" id={i} onChange={e => handleInputChange(e, i)} />
                    </div>
                    <div className="ergergkmvurvldscm">
                      {multiplemages.length !== 1 && <button
                        className="jsdbfsdbfdsbfh btn-remove"
                        onClick={() => handleRemoveClick(i)}>x</button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {multiplemages?.map((x, i) => {
            return (
              <div>
                {multiplemages?.length >= 5 ?
                  ""
                  :
                  <div className="btn-box">
                    {multiplemages.length - 1 === i && <button className="btn-addmore" onClick={handleAddClick}>
                      <p className="mb-0 dsfdshbfdshsdgsdkzcjxvk">{i > 0 ? 'Add More Images' : 'Add More Images'}</p>
                    </button>}
                  </div>
                }
              </div>
            );
          })}

          <div className='endbtn'>
            <button className='btn-blackk'><span><img src='\Subtract.svg' alt='img' className='img-fluid' /></span>Cancel</button>
            <button className='btn-pinkk'
            onClick={SubmitWork}
             ><img src='\send-square.svg' alt='img' className='img-fluid'  />Submit proof of work</button>
          </div>
        </Modal.Body>

      </Modal>

      <Modal className='detailmodal' show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            submit proof of work
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>

          <div className='arrowimg'>
            <img src='\arrowmodal.svg' alt='img' className='img-fluid' />
            <p>proof of work successfully submitted</p>
          </div>

        </Modal.Body>

      </Modal>

            {/* Image detail modal */}
            <Modal className="createdsuccess-modal global-modal-style powmodal scsdvsdvrverberbrtnsvdrbrt" show={imageModal} onHide={handleImageClose} centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>proof of work</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className="approvemain">
                        <img src={taskdetail?.image} alt="approveimg" className="approveimg img-fluid" />
                        {/* <p className="approvetext">operation proof of work approved</p> */}
                    </div>
                </Modal.Body>
            </Modal>
    </>
  )
}

export default AllTaskModals
