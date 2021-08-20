import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import users from './models/user';
import './config/db'

dotenv.config()

const app = express()
const port = process.env.PORT
const router = express.Router()

app.use(express.static('./src/views'))

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views', '/index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname, './views', '/style.css');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname, './views', '/script.js');
});

router.post('/message', async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body

    if(fullName === '') {
      return res.status(422).json({
        status: 'error',
        message: 'Full name is required'
      })
    };
    if(email === '') {
      return res.status(422).json({
        status: 'error',
        message: 'Email is required'
      })
    };
    if(phone === '') {
      return res.status(422).json({
        status: 'error',
        message: 'Phone is required'
      })
    };
    if(message === '') {
      return res.status(422).json({
        status: 'error',
        message: 'Message is required'
      })
    };

    const newUser = await users.create({
      fullName,
      email,
      phone,
      message
    })

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully',
      user: newUser
    })

  } catch (error) {
    res.json({
      message: error
    })
  }
})

app.use(express.json())
app.use('/', router)
app.use(cors())

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})