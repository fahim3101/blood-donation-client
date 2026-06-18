import axios from 'axios';

// Uploads an image file to ImageBB and returns the hosted image URL
export const uploadImageToImgbb = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

  return data?.data?.display_url;
};
