require('dotenv').config();
const app = require('./app');
const bcrypt = require('bcryptjs'); // Using bcryptjs instead of bcrypt

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
