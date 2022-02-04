import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import UserListPage from './pages/user-list-page/user-list-page';
import PostListPage from './pages/post-list-page/post-list-page';

const App: FC = () => {
  return (
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/user-list' element={<UserListPage />} />
          <Route path='/post-list' element={<PostListPage />} />
      </Routes>
  );
}

export default App;
