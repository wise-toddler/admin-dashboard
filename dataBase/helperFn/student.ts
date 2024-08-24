import { PrismaClient } from '@prisma/client';
import { Student } from '../../types';
import { makeFriend } from './handlers/codeforcesHandler';

const prisma = new PrismaClient();

const addStudent = async (student: Student) => {
  try {
    const newStudent = await prisma.student.create({
        data: {
            name: student.name,
            email: student.email,
            rollNumber: student.rollNumber,
            codeforces: student.cpProfiles.codeforces,
            codechef: student.cpProfiles.codechef,
            atcoder: student.cpProfiles.atcoder,
            cses: student.cpProfiles.cses,
        },
    });
    console.log(newStudent);
    if(student.cpProfiles.codeforces) {
        makeFriend(student.cpProfiles.codeforces);
    }
    return newStudent;
  } catch (error: any) {
    throw new Error(`Failed to add student: ${error.message}`);
  }
};

const getStudent = async (rollNumber: string) => 
{
    try {
        const student = await prisma.student.findUnique({
        where: {
            rollNumber,
        },
        });
        return student;
    } catch (error: any) {
        throw new Error(`Failed to get student: ${error.message}`);
    }
};
const getStudents = async () => 
{
    try {
        const students = await prisma.student.findMany();
        return students;
    } catch (error: any) {
        throw new Error(`Failed to get students: ${error.message}`);
    }
}  
const updateStudent = async (student: Student) =>
{
    try {
        const updatedStudent = await prisma.student.update({
            where: {
                rollNumber: student.rollNumber,
            },
            data: {
                name: student.name,
                email: student.email,
                codeforces: student.cpProfiles.codeforces,
                codechef: student.cpProfiles.codechef,
                atcoder: student.cpProfiles.atcoder,
                cses: student.cpProfiles.cses,
            },
        });
        return updatedStudent;
    } catch (error: any) {
        throw new Error(`Failed to update student: ${error.message}`);
    }
}
const deleteStudent = async (rollNumber: string) =>
{
    try {
        const deletedStudent = await prisma.student.delete({
            where: {
                rollNumber,
            },
        });
        return deletedStudent;
    } catch (error: any) {
        throw new Error(`Failed to delete student: ${error.message}`);
    }
}
export { getStudent, getStudents, addStudent, updateStudent, deleteStudent };
