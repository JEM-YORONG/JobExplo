import logo from './assets/logo.svg';
import './App.css';

function App() {
  return (
    <div className="landing">
      <header className="landing-header">
        <img src={logo} className="landing-logo" alt="JobExplo logo" />
        <h1 className="landing-title">JobExplo</h1>
        <p className="landing-tagline">Discover your next opportunity.</p>
        <a
          className="landing-cta"
          href="https://github.com/JEM-YORONG/JobExplo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </a>
      </header>
    </div>
  );
}

export default App;
