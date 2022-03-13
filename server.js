const express = require('express'); // express import
const PORT = process.env.PORT || 3000;
const app = express();
const apiRoutes = require('./routes/apiRoutes');

// middle ware 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes); // prepends /api to all url routes

// app.listen is always last
app.listen(PORT, () => {
    console.log(gradient.instagram(`API server now on port ${PORT} || http://localhost:${PORT}`));
})