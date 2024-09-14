import styled from 'styled-components';
import MovieComponent from './Components/MovieComponent';
import MovieInfoComponent from './Components/MovieInfoComponent';
import { useState } from 'react';
import axios from 'axios';
const API_KEY='89a4a352';
const Container =styled.div`
display:flex;
flex-direction:column;
`;
const Header =styled.div`
display :flex;
flex-direction:row;
background-color: black;
justify-content:space-between;
color:white;
padding:10px;
align-items: center;
font-size: 25px;
font-weoght: bold;
box-shadow: 0 3px 6px 0 #555;
`;
const Appname =styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;
const MOvieIcon=styled.img`
width: 48px;
height: 48px;
margin: 15px;
 `;
 const SearchBox=styled.div`
 display: flex;
 flex-direction:row;
 padding: 10px 10px;
 background-color: white;
 border-radius: 6px;
 margin-left:20px;
 width: 50%;
 align-items:center;
 `;
 const SearchIcon=styled.img`
  
 width: 35px;
 height: 35px;
 `;
 const SearchInput =styled.input`
 color:black;
 font-size:16px;
 font-weight: bold;
 border: none;
 outline:none;
 margin-left: left 20px;
 `;
 const Movielistcontainer=styled.div`
  display: flex;
  flex-direction: row;
  flex: wrap;
  padding:30px;
  justify-content= space-evenly;
 `;
 const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return <Container>
    <Header>
      <Appname>
        <MOvieIcon src='movieIcon.svg'/>Cinemaify App</Appname>
        <SearchBox>
          <SearchIcon src='searchicon.svg'/>
          <SearchInput placeholder='Search movies'value={searchQuery}
            onChange={onTextChange}/>
          </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <Movielistcontainer>
    {movieList?.length ? (
          movieList.map((movie, index) => (
     <MovieComponent
     key={index}
     movie={movie}
     onMovieSelect={onMovieSelect}/>
    ))
  ) : (
    <Placeholder src="/react-movie-app/movie-icon.svg" />
  )}
    </Movielistcontainer>
  </Container>;
}

export default App;
