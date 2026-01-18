import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

interface AuthServicePayload {
    email: string;
    password: string;
}

export const signupUser = async (payload: AuthServicePayload) => {
    
    // Validate paylaod
    const { email, password } = payload;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({where: {email}});

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({data: {email, password: hashedPassword}});

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
        },
    }
}

export const loginUser = async (payload: AuthServicePayload) => {
    const { email, password } = payload;

    // Find User
    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
        throw new Error("User not found");
    }

    // Verify Password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Invalid password"); }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
        },
    }
}

export const getUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {id: userId}, 
        select: {id: true, email: true}
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}