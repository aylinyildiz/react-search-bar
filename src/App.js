import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }

  return (
    <div className="App">
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>
      <form className="search-form">
        <input
          type="search"
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search == "" ? (
          <p class="no-search"></p>
        ) : (
          <ul className="suggestions">
            {data
              .filter(
                (item) =>
                  item.name.first
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.name.last.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, i) => (
                <li class="list" key={i}>
                  <img src={item.picture.thumbnail}></img>
                  {item.name.first} {item.name.last}
                  <div class="email">{item.email}</div>
                  <div class="address">
                    {item.location.city} / {item.location.country}
                  </div>
                  <div></div>
                </li>
              ))}
          </ul>
        )}
      </form>
    </div>
  );
}
export default App;
