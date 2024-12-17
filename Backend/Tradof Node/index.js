const express = require('express');
const cors = require('cors');


app.use(express.json());
app.use(cors());


// Middleware
app.use(express.json({ extended: false }));


// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
