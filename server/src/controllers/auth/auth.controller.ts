import { Request, Response } from "express";
import { signupUser, loginUser } from "../../services/auth/auth-service";

interface AuthControllerPayload {
    email: string;
    password: string;
}

export const signupController = async (req: Request, res: Response) => {
        try {
            const payload: AuthControllerPayload = req.body;
            const { email, password } = payload;

            // Validate payload
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const result = await signupUser(payload);

            return res.status(201).json({
                token: result.token,
                user: result.user,
                message: "User created successfully",
            })
            
        } catch (error) {
           if (error instanceof Error) {
            if (error.message === "User already exists") {
                return res.status(400).json({ message: error.message });
            } 
            if (error.message === "Invalid password") {
                return res.status(400).json({ message: error.message });
            } 
            if (error.message === "User not found") {
                return res.status(400).json({ message: error.message });
            }
           }
           return res.status(500).json({ message: "Internal server error" });
        }
}



export const loginController = async (req: Request, res: Response) => {
        try {
            const payload: AuthControllerPayload = req.body;
            const { email, password } = payload;

            // Validate payload
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const result = await loginUser(payload);

            return res.status(200).json({
                token: result.token,
                user: result.user,
                message: "Login successful",
            })
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Invalid password") {
                    return res.status(400).json({ message: error.message });
                }
                if (error.message === "User not found") {
                    return res.status(400).json({ message: error.message });
                } 
                if (error.message === "User already exists") {
                    return res.status(400).json({ message: error.message });
                }
            }
           return res.status(500).json({ message: "Internal server error" });
        }
}

   
