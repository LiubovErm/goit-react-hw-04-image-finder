import axios from "axios";
import { toast } from 'react-toastify';

export const fetchPictures = async(query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '29948630-157933f0e62faad2f834f63f1';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
 
  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  if (response.data.hits.length === 0) {
    toast.error('Sorry, there are no images matching your search query. Please try again.', { theme: "colored" });
    throw new Error(`Нічого не знайдено`);
  }
  return response.data;
}