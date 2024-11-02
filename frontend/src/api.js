import axios from 'axios';

export const loginUser = async (credential) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/google', 
      { credential },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If using cookies/sessions
      }
    );
    return response.data;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};
