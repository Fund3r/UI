import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 
 * Login Related API
 * 
*/
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login/', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
}

/**
 * 
 * Projects Related API
 * 
*/
export const createProject = async (projectData: {
  project_name: string;
  tag_line: string;
  description: string;
  logo_img: string;
  project_img: string[];
  email: string;
  owner: string;
  link: {
    x: string;
    github: string;
    telegram: string;
    website: string;
    discord: string;
  };
}) => {
  try {
    const response = await api.post('/project/create/', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

export const fetchProjectList = async () => {
  try {
    const response = await api.get('/project/list');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

export const fetchProjectDetails = async (id: number) => {
  try {
    const response = await api.get(`/project/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

/**
 * 
 * Profile Related API
 * 
*/
export const updateProfile = async (profileData: {
  name: string;
  email: string;
  address: string;
  project_img: string[];
  visible: boolean;
  link: {
    x: string;
    github: string;
    telegram: string;
  };
}) => {
  try {
    const response = await api.post('/profile/update/', profileData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

export const fetchProfileList = async () => {
  try {
    const response = await api.get('/profile/list');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

export const fetchProfileDetails = async (address: string) => {
  try {
    const response = await api.get(`/profile/${address}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data !== null && typeof error.response.data === 'object' && 'error' in error.response.data) {
        const message = (error.response.data as { error: string }).error || "An error occurred during login";
        throw new Error(message);
      }
      throw new Error("The request was made and the server responded with a status code that falls out of the range of 2xx");
    }
    throw new Error("A network error occurred or the request was not made");
  }
};

export default api;
