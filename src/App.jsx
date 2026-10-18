import React, { useState } from 'react';
import Loader from './components/Loader';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <main
        className="min-h-screen bg-slate-950"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Portfolio content will go here */}
        <div className="flex items-center justify-center h-screen">
          <p className="text-white/50 text-lg font-mono tracking-wider">
            Portfolio content goes here
          </p>
        </div>
      </main>
    </>
  );
}

export default App;