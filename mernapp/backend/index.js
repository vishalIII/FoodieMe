const express = require('express');
const connectToMongo = require('./db');
const bodyParser = require('body-parser');
const Item = require('./models/item'); // Assuming you have defined your Item model
require('dotenv').config();

const app = express();
const port = 3000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(express.json());

const cors = require('cors'); 
app.use(cors()); // Allow all origins (not recommended for production)

// Routes
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
app.use("/", userRoutes);

const loginRoute = require('./routes/login');
app.use('/', loginRoute);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

app.get("/", async (req, res) => {
    res.send("Hello");
});

app.get('/item', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
