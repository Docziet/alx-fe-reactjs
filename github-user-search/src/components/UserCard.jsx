const UserCard = ({ user }) => {
  return (
    <div style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      <img
        src={user.avatar_url}
        alt={user.login}
        width="50"
        height="50"
        style={{ borderRadius: "50%" }}
      />
      <div>
        <h3>{user.login}</h3>
        {user.location && <p>Location: {user.location}</p>}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
