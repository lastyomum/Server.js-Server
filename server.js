const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const PORT = 3000;

const dbIN = "mongodb+srv://admin:ih8usomuch@serverjsmain.jn7nbq7.mongodb.net/serverjs?retryWrites=true&w=majority&appName=serverJSmain"

const app = express();

const Info = require('./modules/Info');
const User = require('./modules/user')

app.use(express.json());
app.use(cors());


mongoose.connect(dbIN)
.then(() => console.log("✅Connected To DB✅"))

app.get('/info', async (req,res) => {
    const infos = await Info.findOne()
    res.json(infos)
})

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const { user, pass, pfp, credit, sus } = req.body;
    let existingUser = await User.findOne({ user });

    if (existingUser) {
      // Update existing user
      existingUser.pass = pass;
      existingUser.pfp = pfp;
      existingUser.credit = credit;
      existingUser.sus = sus;
      await existingUser.save();

      return res.status(200).json({ message: 'User updated', user: existingUser });
    }

    // Create new user
    const newUser = new User({ user, pass, pfp, credit, sus });
    await newUser.save();

    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.post('/info', async (req,res) => {
    const {version, wip, DN, LN} = req.body;

    const infos = await Info.findOne();

    infos.version = version;
    infos.wip = wip;
    infos.LN = LN;
    infos.DN = DN;
    await infos.save()
})

app.listen(PORT, () => {
    console.log("✅Server Successfully Hosted✅");
})