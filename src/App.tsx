import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ElementOptimization from './exercises/01.element-optimization'
import OptimizeContext from './exercises/02.optimize-context'
import ConcurrentRendering from './exercises/03.concurrent-rendering'
import CodeSplitting from './exercises/04.code-splitting'
import ExpensiveCalculations from './exercises/05.expensive-calculations'
import OptimizeRendering from './exercises/06.optimize-rendering'
import Windowing from './exercises/07.windowing'

const routes = [
  { path: "/element-optimization", element: <ElementOptimization /> },
  { path: "/optimize-context", element: <OptimizeContext /> },
  { path: "/concurrent-rendering", element: <ConcurrentRendering /> },
  { path: "/code-splitting", element: <CodeSplitting /> },
  { path: "/expensive-calculations", element: <ExpensiveCalculations /> },
  { path: "/optimize-rendering", element: <OptimizeRendering /> },
  { path: "/windowing", element: <Windowing /> },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex">
        <div style={{ display: sidebarOpen ? 'none' : 'block' }} >
          <Sidebar />
        </div>
        <main className={`p-6 flex-1 ${sidebarOpen ? 'ml-0' : 'ml-64'} transition-all duration-300 ease-in-out`}>
          <button
            className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
