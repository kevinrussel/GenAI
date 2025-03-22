import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ example: "hello from React!" })
    })
      .then(response => response.json())
      .then(data => console.log("Response from Flask:", data))
      .catch(error => console.error("Error:", error));
  }, []);

  return <h1>Check the console for Flask response!</h1>;
}

export default App;