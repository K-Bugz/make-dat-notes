const path = require('path');
const router = express.Router();

router.get('/', (req, res) => { // landing page
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/notes', (req, res) => { // /notes page
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('*', (req, res) => { // * is a catch for any other search. 
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;