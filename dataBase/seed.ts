import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Student } from '../../types';
import { addStudent } from './helperFn/student';


const seedCSV = async () => {
  const filePath = path.join(__dirname, 'seed.csv'); // Path to your CSV file
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        for (const result of results) {
            // extract the rollNumber from the email name.23bsc10109@ms.sst.scaler.com"
            const rollNumber = result.email.split('@')[0].split('.')[1];
            const student: Student = {
                name: result.name,
                email: result.email,
                rollNumber: rollNumber,
                cpProfiles: {
                    codeforces: result.codeforces_username,
                    codechef: result.codechef_username,
                    atcoder: result.atcoder_username,
                    cses: result.cses_username,
                }
            };
            // console.log(student);
            await addStudent(student);
        }        
    });
};

seedCSV();
