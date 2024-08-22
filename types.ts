type Student = {
    id: string;
    cpProfiles: {
        codeforces: string;
        codechef: string;
        atcoder: string;
    };
};

type Question = {
    id: string;
    platform: string;
    link: string;
};

type QuestionStatus = {
    studentId: string;
    questionId: string;
    status: "accepted" | "attempted" | "unattempted";
};

export { Student, Question, QuestionStatus };


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