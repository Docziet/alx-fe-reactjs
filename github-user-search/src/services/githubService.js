import axios from "axios";

const API_URL = import.meta.env.VITE_GITHUB_API_URL;
const API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

// Shared headers
const headers = API_KEY
  ? { Authorization: `token ${API_KEY}` }
  : {};


// Fetch a single user
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};


// Advanced search
export const searchUsers = async ({ username, location, minRepos }) => {
  try {
    let query = username || "";
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(`${API_URL}/search/users`, {
      params: { q: query },
      headers,
    });

    return response.data.items || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
