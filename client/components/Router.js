import React from 'react';
import { Route, Routes } from 'react-router-dom';

import FrontPage from 'Components/FrontPage';
import MessageView from 'Components/MessageView';

const Router = () => (
  <div className="content">
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route path="/messages" element={<MessageView />} />
    </Routes>
  </div>
);

export default Router;
