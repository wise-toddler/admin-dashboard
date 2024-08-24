// add question to db
// delete question from db
import { PrismaClient } from '@prisma/client';
import { Question } from '../../types';
const prisma = new PrismaClient();

const addQuestion = async (question: Question) => {
    console.log(question,"question");
    try {
        const newQuestion = await prisma.question.create({
            data: {
                platform: question.platform,
                questionLink: question.link
            },
        });
        // console.log(newQuestion,"newQuestion");
        return newQuestion;
    } catch (error: any) {
        if(error.code === 'P2002'){
            return;// question already exists
        }
        throw new Error(`Failed to add question: ${error.message}`);
    }
};

export const deleteQuestion = async (question: Question) => {
    try {
        const deletedQuestion = await prisma.question.delete({
            where: {
                questionLink: question.link
            }
        });
        return deletedQuestion;
    } catch (error: any) {
        throw new Error(`Failed to delete question: ${error.message}`);
    }
}

export const getQuestions = async () => {
    try {
        const questions = await prisma.question.findMany();
        return questions;
    } catch (error: any) {
        throw new Error(`Failed to get questions: ${error.message}`);
    }
}

export { addQuestion };