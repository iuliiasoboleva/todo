const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const { User, Task } = require('./models')

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const loginFromDB = await User.findOne({
    where: { email: 'admin@admin', password: 'admin' },
    raw: true,
  })
  if (email === loginFromDB.email && password === loginFromDB.password) {
    // req.session.Authenticated = true;
    return res.json({ message: true })
  }
  return res.json({ message: false })
})

app.post('/', async (req, res) => {
  const { inputText, status } = req.body;
  const createdTask = await Task.create({text: inputText, status}) 
  if (createdTask) {
    // req.session.Authenticated = true;
    return res.json(createdTask)
  }
})

app.delete('/:id', async (req, res) => {
  const entry = await Task.findOne({ where: { id: req.params.id } });
  await Task.destroy({ where: { id: req.params.id } });
  return res.json({ id: `${entry.id}` });
})

app.put('/:id', async (req, res, next) => {
  const entry = await Task.findOne({ where: { id: req.params.id } });
  const { inputNewText, status } = req.body;
  console.log('это текст', inputNewText, status )
  entry.text = inputNewText;
  entry.status = status;
  entry.save();
  return res.json({ message: true });
});

app.put('/checked/:id', async (req, res, next) => {
  const entry = await Task.findOne({ where: { id: req.params.id } });
  const { status } = req.body;
  console.log('это текст', status )
  entry.status = status;
  entry.save();
  return res.json({ message: true });
});

app.get('/', async (req, res) => {
  const allTasks = await Task.findAll()
    return res.json(allTasks)
})

app.listen(PORT, () => {
  console.log(`Сервер стартовал на ${PORT}`);
})
