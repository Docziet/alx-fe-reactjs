import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Search from "./components/Search";
import UserList from "./components/UserList";
import { searchUsers } from "./services/githubService";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (params) => {
    setLoading(true);
    setError("");
    const results = await searchUsers(params);
    if (results.length === 0) setError("Looks like we can't find the user");
    setUsers(results);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      <Search />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList users={users} />
    </div>
  );
}

export default App;
