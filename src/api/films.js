import axios from "axios";

const baseURL = "https://ghibliapi.vercel.app/films";

export async function getAllFilms(){
  try {
    const response = await axios.get(`${baseURL}`);
    const films = response.data;
    return films
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}