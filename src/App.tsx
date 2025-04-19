import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import ManagingUI01 from './exercises/01.managing-ui-state/01.problem.use-state'
import ManagingUI02 from './exercises/01.managing-ui-state/02.problem.control'
import ManagingUI03 from './exercises/01.managing-ui-state/03.problem.derive'
import ManagingUI04 from './exercises/01.managing-ui-state/04.problem.init'
import ManagingUI05 from './exercises/01.managing-ui-state/05.problem.cb'

import SideEffects01 from './exercises/02.side-effects/01.problem.effects'
import SideEffects02 from './exercises/02.side-effects/02.problem.cleanup'

import LiftingState01 from './exercises/03.lifting-state/01.problem.lift'
import LiftingState02 from './exercises/03.lifting-state/02.problem.lift-array'
import LiftingState03 from './exercises/03.lifting-state/03.problem.colocate'

import Dom01 from './exercises/04.dom/01.problem.ref'
import Dom02 from './exercises/04.dom/02.problem.deps'
import Dom03 from './exercises/04.dom/03.problem.primitives'

import UniqueId from './exercises/05.unique-ids/01.problem.use-id'

import TicTacTes01 from './exercises/06.tic-tac-toe/01.problem.set-state-callback'
import TicTacTes02 from './exercises/06.tic-tac-toe/02.problem.local-storage'
import TicTacTes03 from './exercises/06.tic-tac-toe/03.problem.history'

const routes = [
  { path: "/managing-ui-state/usestate", element: <ManagingUI01 /> },
  { path: "/managing-ui-state/controlling-input", element: <ManagingUI02 /> },
  { path: "/managing-ui-state/derive-state", element: <ManagingUI03 /> },
  { path: "/managing-ui-state/initialize-state", element: <ManagingUI04 /> },
  { path: "/managing-ui-state/init-callback", element: <ManagingUI05 /> },
  { path: "/effect/use-effect", element: <SideEffects01 /> },
  { path: "/effect/effect-clean-up", element: <SideEffects02 /> },
  { path: "/lifting-state/lift-state", element: <LiftingState01 /> },
  { path: "/lifting-state/more-state", element: <LiftingState02 /> },
  { path: "/lifting-state/colocate-state", element: <LiftingState03 /> },
  { path: "/dom-effect/refs", element: <Dom01 /> },
  { path: "/dom-effect/dependencies", element: <Dom02 /> },
  { path: "/dom-effect/primitive-dependency", element: <Dom03 /> },
  { path: "/unique-ids/use-id", element: <UniqueId /> },
  { path: "/tictactos/setstate", element: <TicTacTes01 /> },
  { path: "/tictactos/preserve-state", element: <TicTacTes02 /> },
  { path: "/tictactos/history", element: <TicTacTes03 /> },
];

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 flex-1">
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
