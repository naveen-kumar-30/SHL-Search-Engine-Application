import Search from "./Search";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      {/* SHL-style Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-name">SHL</span>
            <span className="brand-sub">Assessment Recommendation Platform</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        <Search />
      </main>

      {/* SHL-style Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p>
            © 2025 SHL Assessment Recommendation Platform | Developed by
            <strong> Naveen</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
