const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Sample quiz questions
const questions = [
    {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris'
    },
    {
        id: 2,
        question: 'Who is the president of the USA?',
        options: ['Joe Biden', 'Donald Trump', 'Barack Obama', 'George Bush'],
        correctAnswer: 'Joe Biden'
    },
    {
        id: 3,
        question: 'What is 5 + 3?',
        options: ['5', '8', '7', '10'],
        correctAnswer: '8'
    }
];

// GET endpoint for a random question
app.get('/api/question', (req, res) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json(randomQuestion);
});

// POST endpoint to submit an answer and check if it's correct
app.post('/api/submit', (req, res) => {
    const { questionId, answer } = req.body;

    if (!questionId || !answer) {
        return res.status(400).json({ message: 'Question ID and answer are required.' });
    }

    const question = questions.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({ message: 'Question not found.' });
    }

    if (question.correctAnswer.toLowerCase() === answer.toLowerCase()) {
        res.json({ message: 'Correct!' });
    } else {
        res.json({ message: 'Incorrect. Try again!' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Quiz API is running on http://localhost:${port}`);
});
