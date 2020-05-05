import React, { useRef, useState, useEffect } from "react";
// import "./App.css";

// the whole show!
function App() {
  const REACT_APP_API_URL = "http://localhost:3000/admin/api";
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const query = `{
      allEpisodes {
        id
        title
        posted
        path_to_audio_file
        description {
          document
        }
        length
        filesize
      }
    }`;

    fetch(`${REACT_APP_API_URL}/episodes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((result) => result.json())
      .then((result) => {
        setEpisodes(result.data.allEpisodes);
      });
  }, []);

  // useEffect(() => {
  //   const GET_ALL_USERS = `
  //   query GetUsers {
  //     allUsers {
  //       name
  //       id
  //     }
  //   }`;

  //   fetch(`${REACT_APP_API_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       query: GET_ALL_USERS,
  //     },
  //   }).then((result) => {
  //     console.log(result);
  //     result.json();
  //   });
  // }, []);

  // no results interface
  const NoResults = (props) => {
    return (
      <section>
        <h2>No {props.label}</h2>
      </section>
    );
  };

  // has results interface
  const HasContent = () => {
    return (
      <section>
        <h2>Title</h2>
        <ul>{EpisodeListItems}</ul>
      </section>
    );
  };

  // map items to interface
  const EpisodeListItems = episodes.map((episode, key) => {
    return (
      <li key={key} className={`list__item`}>
        <a href={`${episode.slug}`}> {episode.title}</a>
      </li>
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Podcast episodes</h1>
      </header>
      <main>
        {episodes && episodes.length > 0 ? (
          <HasContent content={episodes} />
        ) : (
          <NoResults label="episodes" />
        )}
      </main>
    </div>
  );
}

export default App;
