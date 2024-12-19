require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./DB/ConnectDb')

const YearSchema = require('./Models/Years')
const MonthSchema = require('./Models/Month')
const ExpenseCategorySchema = require('./Models/ExpesnseCategory')
const StockSchema = require('./Models/StockSchema')
const CustomSchema = require('./Models/Custom')
const UserSchema = require('./Models/Users')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.post('/AddUser', (req, res) => {
    const { username, password } = req.body;
    UserSchema.create({ username, password }) // Create the user with username and password
        .then(user => res.json(user))
        .catch(error => res.json(error));
});


app.post('/CheckUser', (req, res) => {
    const { username, password } = req.body;
    UserSchema.findOne({ username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ message: 'Login Successful' });
                } else {
                    res.status(401).json({ message: 'Incorrect Password' }); // Adjust status code and message
                }
            } else {
                res.status(404).json({ message: 'User Not Found' }); // Adjust status code and message
            }
        })
        .catch(error => res.status(500).json({ message: 'Internal Server Error' })); // Adjust status code and message
});




app.post("/AddNewYear", (req, res) => {
    YearSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating feedback:', error);
            res.json(error);
        });
});

app.get('/GetYear', (req, res) => {
    YearSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.get('/GetYear/:id', (req, res) => {
    const id = req.params.id;
    YearSchema.findById({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.put('/EditYearInfo/:id', (req, res) => {
    const id = req.params.id;
    const { Year, Link } = req.body;
    YearSchema.findByIdAndUpdate({ _id: id }, {
        Year,
        Link
    })
        .then(result => res.json(result))
        .catch(error => res.json(error))
});


app.delete('/DeleteYear/:id', (req, res) => {
    const id = req.params.id;
    YearSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewMonth", (req, res) => {
    MonthSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating feedback:', error);
            res.json(error);
        });
});

app.get('/GetMonth', (req, res) => {
    MonthSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteMonth/:id', (req, res) => {
    const id = req.params.id;
    MonthSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewExpenseCategory", (req, res) => {
    ExpenseCategorySchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating feedback:', error);
            res.json(error);
        });
});

app.get('/GetExpenseCategory', (req, res) => {
    ExpenseCategorySchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteExpenseCategory/:id', (req, res) => {
    const id = req.params.id;
    ExpenseCategorySchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddNewStock", (req, res) => {
    StockSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating feedback:', error);
            res.json(error);
        });
});

app.get('/GetStocksData', (req, res) => {
    StockSchema.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error))
});

app.delete('/DeleteStocksData/:id', (req, res) => {
    const id = req.params.id;
    StockSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post("/AddCustomPlan", (req, res) => {
    CustomSchema.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error creating custom plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/GetCustomPlans', (req, res) => {
    CustomSchema.find({})
        .then(plans => res.json(plans))
        .catch(error => {
            console.error('Error fetching custom plans:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.delete('/DeleteCustomPlan/:id', (req, res) => {
    const id = req.params.id;
    CustomSchema.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(error => {
            console.error('Error deleting custom plan:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

const start = async () => {
    try {
        await ConnectDB();
        app.listen(PORT, () => {
            console.log('Server Connected');
        })
    } catch (error) {
        console.log(error);
    }
}

start();

module.exports = app;