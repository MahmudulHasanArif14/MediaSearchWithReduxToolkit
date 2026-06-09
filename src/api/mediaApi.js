import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const KLIPY_KEY=import.meta.env.VITE_KLIPY_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;


export const fetchUnsplashImages = async (query,page=1,per_page=12) => {
    const response =await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
            query,
            page,
            per_page
        },
        headers: {
            'Authorization': `Client-ID ${UNSPLASH_KEY}`
        },
    });
    console.log("Response from Unsplash API:", response);
    return response.data.results;
}


export const fetchPexelsVideos = async (query, page = 1, per_page = 12) => {
    const response = await axios.get(`https://api.pexels.com/videos/search`, {
        params: {
            query,
            page,
            per_page
        },
        headers: {     'Authorization': PEXELS_KEY},
    });
    console.log("Response from Pexels API:", response);
    return response.data.videos;
}   

export const fetchKlipyGifs = async (query, per_page = 12) => {
    const response = await axios.get(
      `https://api.klipy.com/api/v1/${KLIPY_KEY}/gifs/search`,
      {
        params: {
          query,
          per_page,
        },
      },
    );
    console.log("Response from Klipy API:", response);
    return response.data.data;
}
