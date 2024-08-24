import { loginToCodeforces, makeFriend, closeBrowser, dbStudentToOurStudent } from '../helperFn/handlers/codeforcesHandler';
import { getStudents } from '../helperFn/student';
import { Page } from 'puppeteer';
let page: Page | null = null;
const makeUsersFriend = async (): Promise<void> => {
    if (!page) {
        await loginToCodeforces();
    }

    let students = await getStudents();
    let mappedStudents = students.map((student) => dbStudentToOurStudent(student));
    
    for (const student of mappedStudents) {
        if (student.cpProfiles.codeforces) {
            console.log(`Adding friend for ${student.cpProfiles.codeforces}`);
            makeFriend(student.cpProfiles.codeforces);
        }   
    }
    await closeBrowser();
};
makeUsersFriend();