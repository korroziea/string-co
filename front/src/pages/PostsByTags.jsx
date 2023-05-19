import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPostsByTags } from '../redux/slices/vacancies';

export const PostsByTags = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { vacancies } = useSelector((state) => state.vacancies);

  const isVacanciesLoading = vacancies.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPostsByTags());
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isVacanciesLoading ? [...Array(5)] : vacancies.items).map((obj, index) => 
            isVacanciesLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
            ),
          )}
        </Grid>
      </Grid>
    </>
  );
};
