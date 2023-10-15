import React from 'react';
import './App.css';

function App() {
  async function logMovies() {
  const response = await fetch("https://forum-proxy.freecodecamp.rocks/latest");
  const movies = await response.json();
  console.log(movies);
}
React.useEffect(() =>{
logMovies();
}, [])
  return (
    <div className="container">
      
      hello
    </div>
  );
}

export default App;
