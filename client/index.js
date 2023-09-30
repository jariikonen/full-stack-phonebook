import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'Assets/custom.scss';
import App from 'Components/App';
import ErrorBoundary from 'Components/ErrorBoundary';

const root = createRoot(document.getElementById('root'));

const refresh = () =>
  root.render(
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  );

refresh();

if (module.hot) {
  module.hot.accept();
}
