import { useEffect, useState } from "react";
import axios from "axios";

function Companies() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>API Users</h1>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>
            {user.firstName} {user.lastName}
          </h3>

          <p>Email: {user.email}</p>

          <p>Company: {user.company?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Companies;