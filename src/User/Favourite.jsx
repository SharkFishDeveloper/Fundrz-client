import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContx/UserContext';
import LoginComponentError from '../Components/LoginComponentError';
import axios from 'axios';
import FavouriteCampInfo from "./FavouriteCampInfo.jsx";
import NothingPage from "../Components/NothingPage.jsx";
import deployedIp from '../IP.js';

const Favourite = () => {
    const { userInfo } = useContext(UserContext);
    const [campInfo,setCampInfo] = useState(null);

    useEffect(()=>{
        const fetchFavourites =async ()=>{
           try {
            const config = {
                withCredentials: true,
              };
            
            const answer = await axios.get(`http://${deployedIp}:4000/user/favourites`,config);
            setCampInfo(answer.data.message);
           } catch (error) {
            console.log("error fav",error);
            alert(error.response.data.message);
           }
        }
        fetchFavourites();
    },[]);
    console.log("set",campInfo);
    return (
        <>
          {userInfo === "foundUser" ? (
             campInfo && campInfo.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {/* Render your campaignInfo data */}
                {campInfo.map((campaign, index) => (
                    <FavouriteCampInfo campaign={campaign}/>
                ))}
              </div>
            ) : (
              <NothingPage/> //* nithignpage
            )
          ) : (
            <LoginComponentError />
          )}
        </>
      );
}

export default Favourite;