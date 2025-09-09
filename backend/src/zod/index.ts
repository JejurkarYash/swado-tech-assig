
import { z } from 'zod';

export const studentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
});

export const courseSchema = z.object({
    course_name: z.string().min(1, 'Course name is required'),
    duration: z.string().min(1, 'Duration is required'),
});

export const studentIdSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
});


export const enrollStudentSchema = z.object({
    student_id: z.number(),
    course_id: z.number()
});


