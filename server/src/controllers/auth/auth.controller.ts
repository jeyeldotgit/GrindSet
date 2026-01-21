import { Request, Response } from "express";
import { signupUser, loginUser, getUser, logoutUser, generateAccessToken } from "../../services/auth/auth-service";
import { AuthMiddlewareRequest } from "../../middlewares/auth.middleware";
import { handleControllerError } from "../../utils/helpers";
import { User } from "../../generated/prisma/client";

interface AuthControllerPayload {
    email: string;
    password: string;
}

interface AuthControllerResponse {
    user: Omit<User, "password" | "createdAt" | "updatedAt">;
    message: string;
}

/**
 * Sign up controller
 * @route POST /auth/signup
 * @param req - Authenticated request with email and password in body
 * @param res - Express response object
 * @returns 200 OK with user data and message */
export const signUpController = async (req: Request, res: Response): Promise<Response<AuthControllerResponse>> => {
    try {
        const { email, password } = req.body as AuthControllerPayload;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await signupUser({ email, password });
        return res.status(200).json({ user: {id: user.user.id, email: user.user.email}, message: "User signed up successfully" });
    } catch (error) {
        return handleControllerError(error, res);
    }
}


/**
 * Login controller
 * @route POST /auth/login
 * @param req - Request object with email and password in body
 * @param res - Express response object
 * @returns 200 OK with access token and user data and message
 */
export const loginController = async (req: Request, res: Response): Promise<Response<AuthControllerResponse>> => {
    try {

        const { email, password } = req.body as AuthControllerPayload;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await loginUser({ email, password });
        res.cookie("refreshToken", user.refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 1000 * 60 * 60 * 24 * 7 });
        return res.status(200).json({ accessToken: user.accessToken, user: {id: user.user.id, email: user.user.email}, message: "User logged in successfully" });
    } catch (error) {
        return handleControllerError(error, res);
    }
}

/**
 * Logout controller
 * @route POST /auth/logout
 * @param req - Request object with refresh token in cookies
 * @param res - Express response object
 * @returns 200 OK with message
 */

export const logoutController = async (req: Request, res: Response): Promise<Response<AuthControllerResponse>> => {
    try {
        const refreshToken = req.cookies.refreshToken as string;
        await logoutUser(refreshToken);
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return handleControllerError(error, res);
    }
}


/**
 * Refresh token controller
 * @route POST /auth/refresh-token
 * @param req - Request object with refresh token in cookies
 * @param res - Express response object
 * @returns 200 OK with access token and message
 */
export const refreshTokenController = async (req: Request, res: Response): Promise<Response<AuthControllerResponse>> => {
    try {
        const refreshToken = req.cookies.refreshToken as string;
        
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token not provided" });
        }

        const result = await generateAccessToken(refreshToken);
        return res.status(200).json({ accessToken: result.accessToken, message: "Access token generated successfully" });
    } catch (error) {
        return handleControllerError(error, res);
    }
}

/**
 * Get user controller
 * @route GET /auth/me
 * @param req - Authenticated request with user ID in params
 * @param res - Express response object
 * @returns 200 OK with user data and message
 */
export const getUserController = async (req: AuthMiddlewareRequest, res: Response): Promise<Response<AuthControllerResponse>>    => {
    try {
        const userId = req.userId as string;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const user = await getUser(userId);
        return res.status(200).json({ user, message: "User found successfully" });
    } catch (error) {
        return handleControllerError(error, res);
    }
}
