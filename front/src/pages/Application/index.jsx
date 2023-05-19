import React from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';

import styles from "./Application.module.scss";

import { selectIsAuth } from "../../redux/slices/auth";
import { fetchSendApplication, send } from "../../redux/slices/vacancies";

export const Application = () => {
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }
   } = useForm({
    defaultValues: {
      fullName: 'Gleb Rubashenko',
      email: 'braginez.gr61@gmail.com',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
     const data = await dispatch(fetchSendApplication(values));
     
     if (!data.payload) {
       return alert('Не удалось отправить ответ пользователю');
     }

     if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
     } 
  };

  // const onClickSend = () => {
  //   if (window.confirm('Вы действительно хотите отправить сообщение?')) {
  //     dispatch(send());
  //   }
  // };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Ответ пользователю
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
          className={styles.field} 
          label="Ваше имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите ваше имя' })} 
          fullWidth 
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <Button disabled={!isValid} /*onClick={onClickSend}*/ type="submit" size="large" variant="contained" fullWidth>
          Отправить
        </Button>
      </form>
    </Paper>
  );
};
