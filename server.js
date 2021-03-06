const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect db
connectDB();
//init middleware
app.use(express.json({ extended: false }));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/contests', require('./routes/chef'));
app.use('/calendar', require('./routes/calendar'));
app.use('/gauth', require('./routes/google'));
app.use('/api/addcontest', require('./routes/addcontest'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

//Set Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
