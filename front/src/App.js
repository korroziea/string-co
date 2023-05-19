import { Routes, Route } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, PostsByTags, Resumes, Application } from "./pages";
import React from 'react';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume/:id" element={<FullPost />} />
          <Route path="/resume/:id/edit" element={<AddPost />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/add-resume" element={<AddPost />} />
          <Route path="/resume/application" element={<Application />} />
          <Route path="/tags/:name" element={<PostsByTags />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
