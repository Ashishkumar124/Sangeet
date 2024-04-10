import React, {useState } from 'react';

function App(){
  const [keyword, setKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [tracks, setTracks] = useState([])

  const getTracks = async() => {
    setIsLoading(true)
    let data = await fetch(`https://v1.nocodeapi.com/ashishkumar124/spotify/QVtjaqmAZiAFOeKz/search?q=${keyword===""?"trending":keyword}&type=track`);
    let convertedData = await data.json()
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items)
    setIsLoading(false);
  };

  useState(() =>{
getTracks();
  }, [])

    return (
      <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
     <p className="fs-2"  style={{color:"#198754", margin:"15px", borderRadius:"8%",fontWeight:"900", fontFamily:"initial",}}>SangeeT 🎶</p>
    </a>
  
    <div className="collapse navbar-collapse d-flex justify-content-center" 
    id="navbarSupportedContent">
     
        <input 
        value={keyword}
        onChange={(event)=>setKeyword(event.target.value)}
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-success">
          Search
        </button>
    </div>
  </div>
      </nav>

<div className='container'>
<div className={`row ${isLoading ? "" : "d-none"}`}>
  <div className='col-12 py-5 text-center'>
  <div
    className="spinner-border"
    style={{ width: "3rem", height: "3rem" }}
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </div>
  </div>
</div>


  <div className='row'>
{tracks.map((element)=>{
    return (
      <div key={element.id} className='col-lg-3 col-md-6 py-2'>
        <div className="card">
  <img src={element.album.images[0].url} className="card-img-top" alt="" />
  <div className="card-body">
    <h5 className="card-title">{element.name}</h5>
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
