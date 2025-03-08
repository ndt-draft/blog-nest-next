import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div>
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
        <Button className="btn btn-primary">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default App;
