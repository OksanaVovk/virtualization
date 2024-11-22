"use client";
import { generateUsers } from "./utils/data";

export default function Home() {
  const users = generateUsers(100000);

  return (
    <div className="container">
      <h1>User List with Virtualization</h1>
      <div className="controls">
        <label htmlFor="perPage">Items per page:</label>
        <select id="perPage">
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>
      <input type="text" placeholder="Search by name..." />
      <div>
        {users.map((user, index) => (
          <div key={user.id || index} className="user-row">
            <p>
              <strong>{user.name}</strong>
            </p>
            <p>{user.email}</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
