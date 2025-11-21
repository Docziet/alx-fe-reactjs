import { useState } from "react";

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const data = await onSearch(username);

    if (!data) {
      setNotFound(true);
      setUser(null);
    } else {
      setNotFound(false);
      setUser(data);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {notFound && (
        <p>Looks like we cant find the user</p>
      )}

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={user.login} />
          <h3>{user.login}</h3>
        </div>
      )}
    </div>
  );
};

export default Search;
