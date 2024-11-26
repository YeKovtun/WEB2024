// const express = require('express');
// var bodyParser = require('body-parser');

// const app = express();
// const userRoutes = require('./routes/userRoutes');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');
// app.use('/', userRoutes);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Review = require('./models/Review');

const app = express();

// Підключення до MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/carBlogDB')
    .then(() => console.log('Підключено до MongoDB'))
    .catch(err => console.error('Помилка підключення до MongoDB:', err));

// Налаштування
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Головна сторінка: загальний список
app.get('/', async (req, res) => {
    const reviews = await Review.find().sort({ date: -1 });
    res.render('index', { reviews });
});

// Сторінка детальної інформації про елемент
app.get('/item/:id', async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).send('Огляд не знайдено');
    }
    res.render('item', { review });
});

app.get('/create', (req, res) => {
    res.render('create');
});

// Маршрут для обробки форми додавання
app.post('/create', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newReview = new Review({ title, content, date: new Date() });
        await newReview.save();
        res.redirect('/'); // Повертає на головну після збереження
    } catch (error) {
        console.error('Помилка під час створення огляду:', error);
        res.status(500).send('Виникла помилка під час створення огляду.');
    }
});

І

app.get('/privacy', (req, res) => {
    res.render('privacy');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
