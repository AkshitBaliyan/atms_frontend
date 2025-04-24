import axiosClient, { getCsrfToken } from '@/utils/axiosClient';

export const login = async (email, password) => {
  await getCsrfToken();
  const res = await axiosClient.post('/login', { email, password });
  // return res.data;
  return res;
};

export const register = async (name, email, password, password_confirmation) => {
  await getCsrfToken();
  const res = await axiosClient.post('/register', {
    name,
    email,
    password,
    password_confirmation,
  });
  return res.data;
};

export const logout = async () => {
  const res = await axiosClient.post('/logout');
  return res.data;
};

export const getCurrentUser = async () => {
  try {
    // axiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    const res = await axiosClient.get('/user', {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withXSRFToken : true,
    });
    return res.data;
  } catch(error) {
    console.error('Error fetching current user:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
  // const res = await axiosClient.get('/user');
  // return res;
};
