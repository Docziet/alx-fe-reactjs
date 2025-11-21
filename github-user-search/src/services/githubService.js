import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

// Basic user fetch
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers: import.meta.env.VITE_APP_GITHUB_API_KEY
        ? { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
        : {},
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Advanced search (username, location, min repos)
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    let query = username || "";
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: { q: query },
      headers: import.meta.env.VITE_APP_GITHUB_API_KEY
        ? { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
        : {},
    });

    return response.data.items || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
