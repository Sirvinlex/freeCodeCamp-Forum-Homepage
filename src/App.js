import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState({});

  async function fetchData() {
    try {
      const response = await fetch("https://forum-proxy.freecodecamp.rocks/latest");
      const data = await response.json();
      setResult(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }
  React.useEffect(() =>{
    fetchData();
  }, [])
  if(isLoading) return <div style={{textAlign:'center', fontSize:'20px'}}><h1>Loading...</h1></div>
  if(isError) return <div style={{textAlign:'center', fontSize:'20px'}}><h1>Oops! An error occurred.</h1></div>
  const topics = result['topic_list']['topics'];
  const users = result['users'];
  return (
    <div className="container">
      <p className='title'>Freecodecamp forum page</p>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th className='hd1'>#</th>
              <th className='hd2'>Topics</th>
              <th className='hd3'>Posters</th>
              <th className='hd4'>Replies</th>
              <th className='hd5'>views</th>
              <th className='hd6'>Activity</th>
            </tr>
          </thead>
            <tbody>
              {topics.map((item, i) =>{
              const postersId = [];
              const postLink = `https://forum.freecodecamp.org/t/${item["slug"]}`
              item['posters'].map((posters) => postersId.push(posters['user_id']));
              return(
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td><a href={postLink} target='_blank' className='post-link'>{item["title"]}</a></td>
                  <td>{users.map((user, i) => {
                    if(postersId.includes(user["id"])) {
                      const userLink = `https://forum.freecodecamp.org/u/${user["username"]}`
                      return (
                        <a className='user-link' href={userLink} target='_blank' key={i}>
                          <img className='poster-img' src={`https://freecodecamp.org/forum${user.avatar_template.replace('{size}', 13)}`} alt="avatar" />
                        </a>
                      )
                    }
                  }) }</td>
                  <td>{item["reply_count"]}</td>
                  <td>{item["views"]}</td>
                  <td><Moment fromNow ago>{item["created_at"]}</Moment></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>  
    </div>
  );
}

export default App;
