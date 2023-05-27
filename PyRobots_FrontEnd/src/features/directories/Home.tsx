import NavBar from "./NavBar";

import "./Home.css";

export default function Home(): JSX.Element {
  return (
    <div>
      <div>
        <NavBar data-testid="NavBar" />
      </div>
      <div className="bg-image" />
    </div>
  );
}
