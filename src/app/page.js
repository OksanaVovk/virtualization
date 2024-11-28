"use client";
import { List } from "react-virtualized";
import { useState } from "react";
import { generateUsers } from "./utils/data";
import dynamic from "next/dynamic";

const Home = dynamic(
  () => {
    return Promise.resolve(() => {
      const [itemPerPage, setItemPerPage] = useState(5);
      const [indexToScroll, setIndexToScroll] = useState(0);

      const users = generateUsers(100000);

      const selectOptions = (e) => {
        setItemPerPage(e.target.value);
      };

      const findUser = (e) => {
        if (e.target.value.length > 5) {
          const index = users.findIndex((item) => item.name === e.target.value);
          setIndexToScroll(index >= 0 ? index : 0);
        }
      };

      return (
        <div className="container">
          <h1>User List with Virtualization</h1>
          <div className="controls">
            <label htmlFor="perPage">Items per page:</label>
            <select id="perPage" onChange={selectOptions}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>
          <input
            onInput={findUser}
            type="text"
            placeholder="Search by name..."
          />
          <div>
            <List
              width={600}
              rowHeight={50}
              rowCount={users.length}
              height={itemPerPage * 50}
              scrollToIndex={indexToScroll}
              scrollToAlignment="center"
              rowRenderer={({ index, key, style }) => {
                const user = users[index];
                return (
                  <div
                    key={user.id || index}
                    style={style}
                    className="user-row"
                  >
                    <p>
                      <strong>{user.name}</strong>
                    </p>
                    <p>{user.email}</p>{" "}
                  </div>
                );
              }}
            />
          </div>
        </div>
      );
    });
  },
  { ssr: false }
);
export default Home;
