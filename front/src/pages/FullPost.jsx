import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from "../redux/slices/auth";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import React from "react";

import { useParams } from "react-router-dom";
import axios from '../axios';
import { Link } from 'react-router-dom'; 

import styles from '../../src/components/Header/Header.module.scss';
import { Post } from "../components/Post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
    .get(`/resume/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        //createdAt={data.createdAt}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
        <div className={styles.root}>
        <br/>
      <Container maxWidth="lg">
        <div className={styles.buttons}>
          <>
            <Link to="/resume/application">
              <Button variant="contained">Ответить на заявку</Button>
            </Link>
          </>
        </div>
      </Container>
    </div>
      </Post>
    </>
  );
};