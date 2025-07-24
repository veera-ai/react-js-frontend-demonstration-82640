import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { sendPromptToOpenAI } from './openaiApi';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // State for OpenAI demo
  const [prompt, setPrompt] = useState('');
  const [openaiResponse, setOpenaiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOpenaiResponse('');
    try {
      const result = await sendPromptToOpenAI(prompt);
      setOpenaiResponse(result);
    } catch (err) {
      setError(err.message || 'Error contacting OpenAI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        {/* OpenAI demo */}
        <div style={{
          marginTop: 32,
          width: '100%',
          maxWidth: 420,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          padding: 24,
          boxSizing: 'border-box'
        }}>
          <h3>OpenAI Chat (Demo)</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              style={{
                fontSize: 16,
                padding: 8,
                width: "100%",
                borderRadius: 6,
                border: "1px solid var(--border-color)",
                marginBottom: 12
              }}
              value={prompt}
              placeholder="Type a prompt for OpenAI..."
              onChange={e => setPrompt(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
                border: "none",
                borderRadius: 6,
                padding: "10px 18px",
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600
              }}
              disabled={loading || !prompt}
            >
              {loading ? "Sending..." : "Send to OpenAI"}
            </button>
          </form>
          {error &&
            <div style={{ color: "#DB4437", marginTop: 12, fontWeight: 500 }}>
              {error}
            </div>
          }
          {openaiResponse &&
            <div style={{
              marginTop: 16,
              background: "#fff",
              color: "#111",
              padding: 16,
              borderRadius: 6,
              fontSize: 15,
              boxShadow: "0 2px 8px 0 rgba(180,180,180,0.08)",
              textAlign: "left"
            }}>
              <strong>OpenAI says:</strong>
              <div style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{openaiResponse}</div>
            </div>
          }
        </div>
        {/* End OpenAI demo */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
