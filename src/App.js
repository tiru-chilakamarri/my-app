import { useState, useEffect } from "react";
import "./App.css";

const query = `
{
  blogPostCollection {
    items {
      title
      image {
        url
      }
    }
  }
}
`;

function App() {
  const [page, setPage] = useState(null);
  
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/kzg3llu8wx9t/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 3GEqLiW5Gotm6wn7zTGJ_SXIj5Q7p0smU7DKytSeWvk",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

       setPage(data.blogPostCollection.items[0]);
       console.log("Data from the object"+data.blogPostCollection);
        console.log("Data::"+data.blogPostCollection.items[0].title);
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      <header className="App-header">
        <img src={page.image.url} className="App-logo" alt="logo" />
        <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;