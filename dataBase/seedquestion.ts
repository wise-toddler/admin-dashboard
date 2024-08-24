import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { addQuestion } from './helperFn/questionfn';
import { Question, Platform } from '../types';

// make a dictionary of platform names and their respective links 
const dictionary = {
    codeforces: 'codeforces.com',
    codechef: 'codechef.com',
    atcoder: 'atcoder.jp',
    cses: 'cses.fi',
};
console.log(dictionary);
const platformname = (questionLink: string) => {
    for (const platform in Platform) {
        if (questionLink.includes(dictionary[platform as Platform] as string)) {
            return platform;
        }
    }
    throw new Error('Platform not found');
} 

const seedquestion = async () => 
{
    const filePath = path.join(__dirname, 'seedquestion.csv'); // Path to your CSV file
    // const results: any[] = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            // Assuming the question links are in a column named 'questionLink'
            console.log(data);
            const questionLink = data.questionLink;
            const platform = platformname(questionLink);
            console.log(platform);
            const question: Question = {
                platform: Platform[platform as Platform],
                link: questionLink,
            };
            addQuestion(question);
        })
}
seedquestion();