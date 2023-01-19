import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material'
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos ,ChannelCard} from './';
import zIndex from '@mui/material/styles/zIndex';

// reusable content 

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos,setVideos]=useState([]);
  const { id } = useParams();
  console.log(channelDetail,videos);
  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=>setVideos(data?.items));
  },[id])
 
  return (<>
  <Box minHeight="55vh" >
    <Box>
      <div style={{
        height:"300px",
        background: '#000000',
        background: '-webkit-linear-gradient(to right, #e74c3c, #000000)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #e74c3c, #000000)',/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        zIndex:10
      }}>

      </div>
      <ChannelCard channelDetail={channelDetail} marginTop="-110px" fontSize="17px" />
    </Box>
  </Box>
  <Box display="flex" p="2">
    <Box sx={{
      mr: {
        sm:'100px'
      }
    }} />
      <Videos videos={videos} />
   

  </Box>
  </>
  )
}

export default ChannelDetail