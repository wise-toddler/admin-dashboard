type Student = {
    id?: string;
    name: string;
    email: string;
    rollNumber: string;
    cpProfiles: {
        codeforces?: string;
        codechef?: string;
        atcoder?: string;
        cses?: string;
    };
};

type Question = {
    platform: Platform;
    link: string;
};

type QuestionStatus = {
    studentId: string;
    questionId: string;
    status: Status;
};
enum Platform {
    codeforces = "codeforces",
    codechef = "codechef",
    atcoder = "atcoder",
    cses = "cses",
}
enum Status {
    Accepted = "accepted",
    Attempted = "attempted",
    Unattempted = "unattempted",
}

export type { Student,Question,QuestionStatus};
export { Platform,Status };

/*

can u help me with frontend structure??? 



// i want a admin dash for adding student and question which will have a pass to it 
// and a pg which can be viewed by anyone to see the the leaderboard of the students and see the track of the questions of the students
pgs i want are
/admin                  passs locked pg 
/leaderboard            leaderboard of the students
/student/{id}           list of questions solved, unsolved, attempted by the student
/question/{id}          list of students who have solved the question


till now :) 

admin-dashboard
-> database
    -> models
        -> student.ts
        -> question.ts
        -> questionstatus.ts
    -> functions
        -> studentfn.ts
        -> questionfn.ts
        -> questionstatusfn.ts
    -> db.ts
-> src
    -> components
        -> navbar      
        -> AdminDashboard
            -> AddStudent
            -> AddQuestion
        -> Leaderboard
        -> Student
        -> Question
    -> pages
        -> Admin.tsx
        -> Leaderboard.tsx
        -> Student.tsx
        -> Question.tsx
    -> App.tsx
    -> index.tsx
    -> types.ts
    // and no backend server for now we will call the functions directly from the frontend


*/