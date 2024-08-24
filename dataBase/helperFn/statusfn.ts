// import { PrismaClient } from '@prisma/client';
import { Platform, Question, Status, Student } from '../../types';
import { handleCodeforces } from './handlers/codeforcesHandler';   
// import { makeUsersFriend } from './handlers/codeforcesHandler'; 

// const prisma = new PrismaClient();

const handleCodeforcesStatus = async (student: Student, question: Question): Promise<Status> => {
  // Scrape the profile of the student from Codeforces and determine the status
  const result = await handleCodeforces(question.link, student.cpProfiles.codeforces as string);
  
  // Example logic to determine the status based on the result
  return result.includes('accepted') ? Status.Attempted : Status.Unattempted;
};

const getStatus = async (student: Student, question: Question): Promise<Status> => {
  if (student.cpProfiles[question.platform] === undefined) {
    return Status.Unattempted;
  }

  switch (question.platform) {
    case Platform.codeforces:
      return handleCodeforcesStatus(student, question);
    case Platform.codechef:
      // handleCodechef(student, question);
      break;
    case Platform.atcoder:
      // handleAtcoder(student, question);
      break;
    case Platform.cses:
      // handleCses(student, question);
      break;
    default:
      throw new Error(`Invalid platform: ${question.platform}`);
  }

  return Status.Unattempted;
};
// makeUsersFriend();

// export const updateQuestionStatus = async (student: Student, question: Question): Promise<void> => {
//   try {
//     const status = await getStatus(student, question);

//     // Find the question by the link
//     const questionRecord = await prisma.question.findUnique({
//       where: {
//         questionLink: question.link,
//       },
//     });
//     if (!questionRecord) {
//       throw new Error(`Question not found: ${question.link}`);
//     }

//     // Find the student by the roll number
//     const studentRecord = await prisma.student.findUnique({
//       where: {
//         rollNumber: student.rollNumber,
//       },
//     });
//     if (!studentRecord) {
//       throw new Error(`Student not found: ${student.rollNumber}`);
//     }

//     // Check if the question status entry already exists for the student and question
//     let questionStatus = await prisma.questionStatus.findFirst({
//       where: {
//         studentId: studentRecord.id,
//         questionId: questionRecord.id,
//       },
//     });

//     if (questionStatus) {
//       // Update existing status
//       questionStatus = await prisma.questionStatus.update({
//         where: {
//           id: questionStatus.id,
//         },
//         data: {
//           status: 
//         },
//       });
//       console.log(`Updated status to ${status} for question ${question.link} and student ${student.rollNumber}`);
//     } else {
//       // Create a new status entry
//       questionStatus = await prisma.questionStatus.create({
//         data: {
//           studentId: studentRecord.id,
//           questionId: questionRecord.id,
//           status: Status[status as Status],
//         },
//       });
//       console.log(`Created new status entry for question ${question.link} and student ${student.rollNumber}`);
//     }

//   } catch (error) {
//     console.error(`Failed to update question status: ${error.message}`);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// };
