import React from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [result, setResult] = React.useState({});

  async function fetchData() {
    try {
      // setIsLoading(true);
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
  if(isLoading) return <div>Loading</div>
  if(isError) return <div>An error occurred</div>

  const topics = result['topic_list']['topics'];
  const users = result['users'];
  return (
    <div className="container">
      {topics.map((item, i) =>{
        const postersId = [];
        item['posters'].map((posters) => postersId.push(posters['user_id']))
        return(
          <div key={i}>
            <span>{item["title"]}</span>&nbsp;<span>{item["reply_count"]}</span>&nbsp;<span>{item["views"]}</span>&nbsp;
            <span>{item["created_at"]}</span>&nbsp;<span>{users.map((user, i) => {
              if(postersId.includes(user["id"])) {
                return <img key={i} src={`https://freecodecamp.org/forum${user.avatar_template.replace('{size}', 13)}`} alt="avatar" />
              }
            }) }</span>
          </div>
        )
        // console.log(postersId)
      })}
      {/* {console.log(result['users'])} */}
      {/* {console.log(result['topic_list']['topics'])} */}
      hello
    </div>
  );
}

export default App;
