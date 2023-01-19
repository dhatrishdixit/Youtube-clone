// check this code once again 
// import React,{ useState,useEffect} from 'react';
// import { Link, useParams } from 'react-router-dom';
// import ReactPlayer from 'react-player';
// import { Typography,Box,Stack } from '@mui/material';
// import { CheckCircle } from '@mui/icons-material';

// import { Videos } from './';
// import { fetchFromAPI } from '../utils/fetchFromAPI';

// const VideoDetail = () => {
//   const { id } = useParams();
//   const [videoDetail, setVideoDetail] = useState(null);
//   useEffect(() => {
//     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data)=>setVideoDetail(data.items[0]))
//   }, [id]);
//    if (!videoDetail?.snippet) return 'loading...';  
//   const { snippet:{title,channelId,channelTitle},statistics:{viewCount,likeCount}} = videoDetail ;
//   return (
//     <Box minHeight="95vh">
//       <Stack direction={{
//         xs:'column',
//         md:'row'
//       }} >
//         <Box flex={1}>
//           <Box sx ={{
//             width:'100%',
//             position :'sticky',
//             top:'86px'
                       
//         }}>
// <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
// <Typography color="#fff" variant ="h5" fontweight ="bold" p={2}>
//   {title}
// </Typography>
// <stack direction ="row" justifyContent ="space-between" sx={{
//   color:'#fff'
// }}py={1} px={2} >
//   {/* <link to = {`channel/${channelId}`}>
//     <Typography variant ={{
//       sm:'subtitle1',
//       md:'h6'
//     }} color="#fff">{ChannelTitle}</Typography>
    
//   </link> */}
//     <Link to={`/channel/${channelId}`}>
//                 <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" p={2}>
//                   {channelTitle}
//                   <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
//                 </Typography>
//               </Link>
//               <stack direction="row" gap="20px" alignItems="center">
//                 <Typography variant="body1" color="#fff" sx={{
//                   opacity:0.7
//                   // done to get numbers readable using parseInt and to locale string 
//                 }}>{parseInt(viewCount).toLocaleString()} views</Typography>
//                 <Typography variant="body1"  color="#fff" sx={{
//                   opacity:0.7
//                   // done to get numbers readable using parseInt and to locale string 
//                 }}>{parseInt(likeCount).toLocaleString()} likes</Typography>
//               </stack>
//                 </stack>
//         </Box>
//         </Box>
//       </Stack>
//     </Box>
//   )
// }

// export default VideoDetail


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos,Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if(!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} marginTop="-9px">
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
         {/* important to use props to make the direction variable  */}
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
