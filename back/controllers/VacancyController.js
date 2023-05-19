import VacancyModel from "../models/Vacancy.js";
import nodemailer from 'nodemailer'; // for email

export const getLastTags = async (req, res) => {
    try {
       const vacancies = await VacancyModel.find().limit(5).exec();

       const tags = vacancies.map(obj => obj.tags).flat().slice(0, 5);
        
       res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить тэги',
        });
    }
};

export const getByName = async (req, res) => {
    try {
        //const tagName = req.params.name;
        
        const vacancies = await VacancyModel.find({ tags: "REST-API" }).populate('user');
        
        res.json(vacancies);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить вакансию',
        });
    }
};

export const getAll = async (req, res) => {
    try {
       const vacancies = await VacancyModel.find().populate('user').exec();
       
       res.json(vacancies);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить вакансию',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const doc = await VacancyModel.findOne({ _id: req.params.id }).populate('user'); 

        if (!doc) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить вакансию',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const vacancyId = req.params.id;
        
/*        VacancyModel.findOneAndDelete(
        {
            _id: vacancyId,
        },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить вакансию',
                    });  
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json({
                    success: true, 
                });
            }
        ); */
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить вакансию',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new VacancyModel({
            title: req.body.title,
            text: req.body.text,
            //imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        }); 

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать вакансию',
        });
    }
};

export const update = async (req, res) => {
    try {
        const vacancyId = req.params.id;

        await VacancyModel.updateOne(
            {
                _id: vacancyId, 
            },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags.split(','),
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить вакансию',
        });
    }
};

export const sendApplication = async (req, res) => {
    try {
      // Получение данных из запроса
      const { fullName, email } = req.body;
      //console.log(fullName);
      //console.log(email);

      // Создание транспорта для отправки письма через SMTP
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Укажите адрес SMTP-сервера
        port: 587, // Укажите порт SMTP-сервера
        secure: false, // Установите значение true, если используется SSL/TLS
        auth: {
          user: '', // Укажите адрес электронной почты отправителя
          pass: '', // Укажите пароль электронной почты отправителя
        },
      });
  
      // Определение параметров письма (адрес отправителя, получателя, тема и текст)
      const mailOptions = {
        from: '',
        to: email, // Укажите адрес электронной почты получателя
        subject: "Приглашение на собеседование от Stirng co.",
        text: "Здравствуйте! Вас приветствует команда String co.",
      };
  
      // Отправка письма
      await transporter.sendMail(mailOptions);
  
      // Отправка успешного ответа на запрос
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      // Отправка ошибки на запрос
      res.status(500).json({ error: 'Ошибка при отправке сообщения на почту' });
    }
  };