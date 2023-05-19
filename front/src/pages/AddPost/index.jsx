import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageUrl = '';
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(true);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const isEditing = Boolean(id);

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        //imageURL,
        tags,
        text,
      };

      const { data } = isEditing 
        ? await axios.patch(`/resume/${id}`, fields) 
        : await axios.post('/resumes', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/resume/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании вакансии!');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/resume/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          //setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении вакансии!');
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {/* {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br /> */}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth 
      />
      <SimpleMDE 
        className={styles.editor} 
        value={text} 
        onChange={onChange}  
        options={options} 
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/resumes">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
