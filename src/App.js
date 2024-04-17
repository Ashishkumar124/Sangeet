import React, { useState, useEffect } from 'react';
import "./loader.css";
import favicon from "../public/%PUBLIC_URL%/favicon.ico";
function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const delayedGetTracks = debounce(() => {
    getTracks();
  }, 500);

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/kl52/spotify/DVXBWgYKkwEbORLy/search?q=${keyword === "" ? "trending" : keyword}&type=track`);
    let convertedData = await data.json();
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  };

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-md bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <p
              className="fs-2"
              style={{ color: "#198754", margin: "15px", borderRadius: "8%", fontWeight: "900", fontFamily: "initial" }}
              onClick={() => {
                // Navigate to the home page
                window.location.href = "/";
              }}
            >
              <img src={favicon} height="50px"></img> Sᴀɴɢᴇᴇᴛ 
            </p>
          </a>

          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                delayedGetTracks();
              }}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button onClick={delayedGetTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className='container'>
        {isLoading && (
          <div className='row'>
            <div className='col-12 py-5 text-center'>
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className='row'>
          {tracks.map((element) => {
            return (
              <div key={element.id} className='col-lg-3 col-md-6 py-2'>
                <div className="card h-100">
                  <img
                    src={element.album.images[0].url}
                    className="card-img-top"
                    alt=""
                    style={{ width: "100%", height: "180px" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{element.name}</h6>
                    <p className="card-text">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release date: {element.album.release_date}
                    </p>
                    <audio src={element.preview_url} controls className='w-100'></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
