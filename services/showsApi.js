const BASE_URL = "http://atms.test/api";

export const getAllShows = async () => {
  const response = await fetch(`${BASE_URL}/shows`);

  if (!response.ok) {
    throw new Error('Failed to fetch shows');
  }

  return await response.json();
};

