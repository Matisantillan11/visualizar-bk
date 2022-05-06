import axios from "axios";

export const multimediaAPI = axios.create({
  baseURL: process.env.MULTIMEDIA_API_URL || 'https://multimedia-api.herokuapp.com',
})