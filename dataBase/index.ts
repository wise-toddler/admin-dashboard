import express from 'express';
import { addStudent, deleteStudent, getStudent, getStudents, updateStudent } from './helperFn/student';
import { Question, Student } from '../types';
import { addQuestion, deleteQuestion, getQuestions } from './helperFn/questionfn';
import cors from 'cors';


const app = express();
app.use(express.json());
// use cros
app.use(cors());
// Define your routes here
app.get('/api/students', async (req, res) => {
    // Handle GET request for fetching all students
    // Your code here
    const students = await getStudents();
    // console.log(students);
    res.json(students);
    
});

app.get('/api/students/:rollNumber', async (req, res) => {
    // Handle GET request for fetching a specific student by ID
    // Your code here
    const rollNumber = req.params.rollNumber;
    const student = getStudent(rollNumber);
    res.json(student);
});

app.post('/api/students', async (req, res) => {
    // Handle POST request for creating a new student
    // Your code here
    const student = req.body as Student;
    // console.log(student);
    addStudent(student);
});

app.put('/api/students/:rollNumber', async (req, res) => {
    // Handle PUT request for updating a student by ID
    // Your code here
    const student = req.body as Student;
    updateStudent(student);

});

app.delete('/api/students/:rollNumber', async (req, res) => {
    // Handle DELETE request for deleting a student by ID
    // Your code here
    const rollNumber = req.params.rollNumber;
    // console.log(rollNumber);
    deleteStudent(rollNumber);
});

app.get('/api/questions',async  (req, res) => {
    // Handle GET request for fetching all questions
    // Your code here
    const questions = await getQuestions();
    console.log(questions);
    res.json(questions);
});

app.get('/api/questions/:id', async (req, res) => {
    // Handle GET request for fetching a specific question by ID
    // Your code here
});

app.post('/api/questions', async (req, res) => {
    // Handle POST request for creating a new question
    // Your code here
    const question = req.body as Question;
    console.log(question);
    addQuestion(question);
});

app.put('/api/questions/:id', async (req, res) => {
    // Handle PUT request for updating a question by ID
    // Your code here
});

app.delete('/api/questions/', async (req, res) => {
    // Handle DELETE request for deleting a question by ID
    // Your code here
    const question = req.body as Question;
    // console.log(question);
    deleteQuestion(question);
});

app.get('/api/question-status', async (req, res) => {
    // Handle GET request for fetching all question statuses
    // Your code here
});

app.get('/api/question-status/:id', async (req, res) => {
    // Handle GET request for fetching a specific question status by ID
    // Your code here
});

app.post('/api/question-status', async (req, res) => {
    // Handle POST request for creating a new question status
    // Your code here
});

app.put('/api/question-status/:id', async (req, res) => {
    // Handle PUT request for updating a question status by ID
    // Your code here
});

app.delete('/api/question-status/:id', async (req, res) => {
    // Handle DELETE request for deleting a question status by ID
    // Your code here
});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});