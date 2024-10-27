import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import deployedIp from '../IP';

const CampaignDetailsPage = () => {
    const [showParticipants, setShowParticipants] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [textAreaComment,setTextAreaComment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { singledatacampaign } = location.state;
    console.log("asadad",location);
    console.log(singledatacampaign.fundingReceived);
    if(!singledatacampaign){
         alert("Internal error ");
         navigate("/campaigns");
    }

    const textAreaHandler = () => {
        setShowCommentForm(!showCommentForm);
      };
      const toggleComments = () => {
        setShowComments((prev) => !prev);
      };

    const toggleParticipants = () => {
        setShowParticipants(!showParticipants);
      };

      const commentHandler = async(e)=>{
        e.preventDefault();
        if(textAreaComment.length >=60){
            return alert("Comment can not be tool long !!");
        }
        try {
            const config = {
                withCredentials: true,
              };
              
            const answer = await axios.put(`${deployedIp}/campaign/edit/comment`,
            {textAreaComment,campaignId:singledatacampaign._id},
            config);

            alert(answer.data.message);
        } catch (error) {
            if(error.response.data.message==="JWT not provided" || error.response.data.message === "Log in to continue"){
              alert(error.response.data.message);
                navigate("/login");
            }
            
        }
      }

      const fundHandler = ()=>{
        console.log("nav",singledatacampaign);
        if(singledatacampaign.fundingReceived === singledatacampaign.donationTarget){
          return alert("Fundings are full, cannot donate now ");
        }
        else{
          navigate("/campaign/fund",{state:{campaignId:singledatacampaign._id,
            fundingReceived: singledatacampaign.donationTarget - singledatacampaign.fundingReceived,
            name:singledatacampaign.campaignName
          }});
        }
      }

      return (
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-md overflow-hidden shadow-md my-4 ">
          <img className=" mx-auto w-auto h-25 object-cover rounded-md" src={singledatacampaign.imageUrl} alt={singledatacampaign.campaignName} />
          
            <div className="p-6">
            <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold mb-2 ">
            Campaign name - {singledatacampaign.campaignName}
            </h2>
            <button
          className="bg-green-500 text-black font-bold px-4 py-2 rounded-md flex items-center focus:outline-none" onClick={()=>fundHandler()}>
          <FaDollarSign className="mr-2" size={20}/>
          Donate
          </button>
            </div>

            <p className="text-gray-600">
            Campaign subject - {singledatacampaign.campaignSubject}
            </p>
            <p className="text-gray-700 ">
            Campaign description - {singledatacampaign.description}
            </p>
    
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Owner Details:</h3>
              <p className="text-gray-700">
                <span className="font-semibold">Owner:</span> {singledatacampaign.ownerName}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {singledatacampaign.ownerEmail}
              </p>
             
            </div>
    
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Campaign Location:</h3>
              <p className="text-gray-700">
                <span className="font-semibold">Country:</span> {singledatacampaign.selectedCountry}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">State:</span> {singledatacampaign.selectedState}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> Moia Peru
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Funds:</h3>
              <p className="text-gray-700">
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Funding target - </span> {singledatacampaign.donationTarget}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Funding recieved - </span> {singledatacampaign.fundingReceived  ? (
                     <span>{singledatacampaign.fundingReceived}</span>
                ):(<span>0</span>)}
              </p>
             {/* fundingRecived */}
            </div>

            <div className="mt-6">
            <p className="text-lg font-semibold">Help email : {singledatacampaign.helpEmail}</p>
            </div>
            <p className="text-gray-700 mt-5 ">
                <span className="font-semibold">Upvotes - {singledatacampaign.upvotes}</span> 
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Downvotes - {singledatacampaign.downvotes}</span> 
              </p>
            <div className="mt-6">
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded-md focus:outline-none"
        onClick={textAreaHandler}
      >
        Add a comment
      </button>

      {showCommentForm && (
        <div className="mt-4 space-y-4">
            <p className="text-gray-400 ">
            Disclaimer - Your previous comment would be edited
            </p>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            onChange={(e)=>setTextAreaComment(e.target.value)}
            // You can add onChange and value props to handle user input
          ></textarea>

          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md focus:outline-none"
            onClick={commentHandler}
          >
            Submit Comment
          </button>
        </div>
      )}
    </div>


            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
                onClick={toggleParticipants}
              >
                {showParticipants ? 'Hide Participants' : 'Show Participants'}
              </button>
            </div>
    
            {showParticipants && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Participants:</h3>
                <ul className="list-disc pl-6">
                  {singledatacampaign.participants.map((participant) => (
                    <li key={participant._id} className="text-gray-700">
                      {participant.name} - {participant.email} 
                    </li>
                  ))}
                </ul>
              </div>
            )}
             <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={toggleComments}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
        {showComments && (
        <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments:</h3>
        <ul className="list-disc pl-6 text-lightGray bg-lightGray p-4 rounded-md  ">
          {singledatacampaign.comments.map((comment) => (
            <li key={comment._id} className="text-gray-700 border-b border-gray-300 pb-2 mb-3 shadow-md rounded-md bg-gray-200 p-4" >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{comment.name}</span>
                <span className="text-gray-500">{comment.date.substring(0, 10)}</span>
              </div>
              <div className="ml-2 text-gray-400">{comment.text}</div>
            </li>
          ))}
        </ul>
      </div>
      )
      }
      
      </div>
          </div>
        </div>
      );
}

export default CampaignDetailsPage;