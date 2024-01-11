import axios from "axios";

const API_KEY = '3XzZe7peEYktHjbdvwbbXLWCTRfOHPA_fCibBTN2F6E'; 

export const fetchPhotos = async (page: number, category: string): Promise<any[]> => {
  try {
    const response = await axios.get(`https://api.unsplash.com/topics/${category}/photos`, {
      params: {
        page: page,
        client_id: API_KEY, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchTopics = async () => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/topics/?client_id=${API_KEY}&per_page=5`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }

}

 