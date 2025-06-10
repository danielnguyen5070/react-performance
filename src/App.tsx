import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ManagingUI from './exercises/01.managing-ui-state'
import SideEffects from './exercises/02.side-effects'
import LiftingState from './exercises/03.lifting-state'
import Dom from './exercises/04.dom'
import TicTacTes from './exercises/05.tic-tac-toe'

const routes = [
  { path: "/managing-ui-state/usestate", element: <ManagingUI /> },
  { path: "/effect/use-effect", element: <SideEffects /> },
  { path: "/lifting-state/lift-state", element: <LiftingState /> },
  { path: "/dom-effect/refs", element: <Dom /> },
  { path: "/tictactos/setstate", element: <TicTacTes /> },
];

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 flex-1 bg-gray-50">
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
