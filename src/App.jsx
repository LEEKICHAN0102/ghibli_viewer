import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAllFilms } from './api/films';
import Card from './components/Card';
import Detail from './components/Detail';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [films, setFilms] = useState([]);

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
      <Header />
      <Routes>
        <Route path="/" element={<Card films={films} />} />
        <Route path={`/detail/:filmId`} element={<Detail films={films} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;