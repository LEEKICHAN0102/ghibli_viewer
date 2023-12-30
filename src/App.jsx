import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAllFilms } from './api/films';
import Card from './components/Card';
import Detail from './components/Detail';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';
import Join from './Join';
import { useEffect, useState } from 'react';

function App() {
  const [films, setFilms] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const result = await getAllFilms();
        setFilms(result);
        console.log(result);
      }catch(error){
        console.error("Error Fetching films api",error);
      }
    }
    fetchData();
  },[])

  return (
    <Router>
      <Header userData={userData}/>
        <Routes>
          <Route path="/" element={<Card films={films} />} />
          <Route path={`/detail/:filmId`} element={<Detail films={films} />} />
          <Route path={`/login`} element={<Login setUserData={setUserData} />} />
          <Route path={`/join`} element={<Join />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;