const express = require('express'); // express import
const PORT = process.env.PORT || 3000;
const app = express(); // an express object that will do all server/express methods
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
// middle ware creates (a plugin to express some functionality)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect routes from above imports
app.use("/api", apiRoutes);
app.use(htmlRoutes);
// app.listen is always last
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT} || http://localhost:${PORT}`);
})