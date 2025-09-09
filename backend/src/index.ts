

import express from 'express';
import type { Request, Response } from "express";
import dotenv from 'dotenv';
import db from "./db.ts";
import { migrate } from "./migrate.ts";
import { studentSchema, courseSchema, studentIdSchema, enrollStudentSchema } from "./zod/index.ts";
import { ZodError } from 'zod';
dotenv.config();
const app = express();


// json parser 
app.use(express.json());


// checking if the migrations is done for first time or not 
let migrationDone = true;

async function runMigrationOnce() {
    if (!migrationDone) {
        await migrate();
        migrationDone = false;
    }
}

runMigrationOnce();



// Add new student
app.post("/student", async (req: Request, res: Response) => {
    try {
        const data = studentSchema.parse(req.body);
        const result = await db.query(
            'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
            [data.name, data.email]
        );
        res.status(201).json(result.rows[0]);
    } catch (e: any) {
        if (e instanceof ZodError) {
            res.status(400).json({
                message: "Provide Valid Credentials",
                error: e
            });
        } else if (e.code === '23505') { // unique violation
            res.status(409).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});




// Add new course
app.post("/course", async (req: Request, res: Response) => {
    try {
        const data = courseSchema.parse(req.body);
        const result = await db.query(
            'INSERT INTO courses (course_name, duration) VALUES ($1, $2) RETURNING *',
            [data.course_name, data.duration]
        );
        res.status(201).json(result.rows[0]);
    } catch (e: any) {
        if (e instanceof ZodError) {
            res.status(400).json({
                message: "Provide Valid Credentials",
                error: e
            });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// enroll a students for a course 
app.post("/enroll-students", async (req: Request, res: Response) => {
    try {
        const data = enrollStudentSchema.parse(req.body);
        // Check if student exists
        const studentResult = await db.query('SELECT id FROM students WHERE id = $1', [data.student_id]);
        if (studentResult.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Check if course exists
        const courseResult = await db.query('SELECT id FROM courses WHERE id = $1', [data.course_id]);
        if (courseResult.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // Enroll student
        const enrollResult = await db.query(
            'INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *',
            [data.student_id, data.course_id]
        );
        res.status(201).json(enrollResult.rows[0]);
    } catch (e: any) {
        if (e instanceof ZodError) {
            res.status(400).json({
                message: "Provide Valid student_id and course_id",
                error: (e as any).errors
            });
        } else if (e.code === '23505') { // unique violation
            res.status(409).json({ message: 'Student already enrolled in this course' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// Get all students 
app.get("/students", async (req: Request, res: Response) => {
    try {
        const result = await db.query(
            'SELECT * FROM students'
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Students not found' });
        } else {
            res.json(result.rows);
        }
    } catch (e: any) {
        if (e) {
            res.status(400).json({
                message: "Something went wrong",
                error: e
            });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// get all course 
app.get("/courses", async (req: Request, res: Response) => {
    try {

        const result = await db.query(
            ` SELECT * FROM courses `
        )

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Students not found' });
        } else {
            res.json(result.rows);
        }


    } catch (e: any) {
        if (e) {
            res.status(400).json({
                message: "Something went wrong",
                error: e
            });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }

    }


})

// Get all students with their enrolled courses
app.get("/enrollments", async (req: Request, res: Response) => {
    try {
        const result = await db.query(`
            SELECT s.id as student_id, s.name as student_name, s.email,
                   c.id as course_id, c.course_name, c.duration
            FROM students s
            LEFT JOIN enrollments e ON s.id = e.student_id
            LEFT JOIN courses c ON e.course_id = c.id
            ORDER BY s.id;
        `);

        // Group courses by student
        const studentsMap: Record<number, any> = {};
        for (const row of result.rows) {
            if (!studentsMap[row.student_id]) {
                studentsMap[row.student_id] = {
                    id: row.student_id,
                    name: row.student_name,
                    email: row.email,
                    courses: []
                };
            }
            if (row.course_id) {
                studentsMap[row.student_id].courses.push({
                    id: row.course_id,
                    course_name: row.course_name,
                    duration: row.duration
                });
            }
        }
        res.json(Object.values(studentsMap));
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});









app.listen(process.env.PORT, () => {
    console.log("server is listening on port ", process.env.PORT);
})

