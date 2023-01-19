import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material'
const SearchBar = () => {

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const onHandleSubmit = (e) =>{
     e.preventDefault();// to stop browser from reloading every time the search term is changed

     if(search){
      navigate(`search/${search}`);

      setSearch('');
     }
  }
  return (
   <Paper
     component="form"
     onSubmit={onHandleSubmit}
     sx={{
        borderRadius:20,
        border:'1px solid #e3e3e3',
        pl: 2,
        boxShadow:'none',
        mr: { sm:5 }
     }}
   >
    <input  
        className='search-bar'
        placeholder="search"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}   
    />
    <IconButton type="submit"
    sx={{
      p:'10px',
      color:'red'
    }}>
      <Search />
    </IconButton>
   </Paper>
  )
}

export default SearchBar