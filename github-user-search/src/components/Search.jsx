// src/components/Search.jsx
import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      if (username && !location && !minRepos) {
        // Basic user search
        const data = await fetchUserData(username);
        if (data) setResults([data]);
        else setError("Looks like we can't find the user");
      } else {
        // Advanced search
        const data = await searchUsers({ username, location, minRepos });
        if (data.length > 0) setResults(data);
        else setError("Looks like we can't find the user");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mb-2"
            />
            <h3 className="font-bold">{user.login}</h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Profile
            </a>
            {user.location && <p>Location: {user.location}</p>}
            {user.public_repos !== undefined && (
              <p>Repos: {user.public_repos}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
