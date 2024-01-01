import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAllFilms } from './api/films';
import Card from './components/Card';
import Detail from './components/Detail';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';
import Join from './Join';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [films, setFilms] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFilms();
        setFilms(result);

        // 세션 정보 받아오기
        const sessionResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, { withCredentials: true });
        setUserData(sessionResponse.data.user);

        console.log(result);
      } catch (error) {
        console.error("로그인 하쇼", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/logout",{}, { withCredentials: true });
      if (response.status === 200) {
        console.log("로그아웃 성공");
        setUserData(null);
      } else {
        console.error("로그아웃 실패", response.statusText);
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  }

  return (
    <Router>
      <Header userData={userData} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Card films={films} />} />
          <Route path={`/detail/:filmId`} element={<Detail films={films} userData={userData} />} />
          <Route path={`/login`} element={<Login setUserData={setUserData} />} />
          <Route path={`/join`} element={<Join />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;