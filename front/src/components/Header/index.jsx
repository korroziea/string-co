import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth, selectIsAdmin } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  //const isAdmin = useSelector(selectIsAdmin);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>String co.</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? ( 
              <>
                <Link to="/resumes">
                  <Button variant="contained">Просмотреть заявки</Button>
                </Link>
                <Link to="/add-resume">
                  <Button variant="contained">Создать заявку</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) /*: isAuth && isAdmin ? (
              <>
                <Link to="/add-vacancy">
                  <Button variant="contained">Просмотреть заявки</Button>
                </Link>
                <Link to="/add-vacancy">
                  <Button variant="contained">Создать вакансию</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button> 
              </>
            )*/ : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};