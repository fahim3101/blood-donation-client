import axios from 'axios';

// Uploads an image file to ImageBB and returns the hosted image URL
export const uploadImageToImgbb = async (imageFile) => {
  if (!imageFile) throw new Error('No image file selected');
  if (imageFile.size > 5 * 1024 * 1024) throw new Error('Image must be under 5MB');
  if (!imageFile.type?.startsWith('image/')) throw new Error('Only image files are allowed');

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) throw new Error('Image upload is not configured. Missing VITE_IMGBB_API_KEY');

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    if (!data?.success) throw new Error(data?.error?.message || 'Image upload failed');
    return data?.data?.display_url;
  } catch (err) {
    throw new Error(err?.response?.data?.error?.message || err.message || 'Image upload failed');
  }
};
