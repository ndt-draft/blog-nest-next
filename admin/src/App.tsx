import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <div>
        <a className="inline-block" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className="inline-block" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold underline">Blog Admin</h1>
      <div className="card">
        <Link className="text-blue-600 ml-2" to="login">
          Login
        </Link>
      </div>
    </>
  );
}

export default App;
