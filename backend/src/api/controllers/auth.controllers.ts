import { Request, Response } from "express";
import logger from "../../library/logger";
import prisma from "../../db/prisma";
import bcryptjs from "bcryptjs"
import UserToken from "../../utils/gen.user.token";
import { passwordStrength } from 'check-password-strength'

export default class AuthControllers {

    private UserToken;

    constructor() {
        this.UserToken = new UserToken()
    }

    //*********************************/
    // @desc       Register User
    // @route      POST - /api/v1/auth/login
    // @access     Public
    async registerUser(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body;

            // __ INIT-Check fields__
            if (!email || !password || !confirmPassword) {
                return res.status(400).json({ error: "Please fill in all fields." });
            }
            

            // __ INIT-Validate-Email__
            const emailArr = email.split("");
            const validateEmail = email.charAt(email.indexOf("@"));
            if (!emailArr.includes(validateEmail)) {
                return res.status(400).json({ error: "Invalid email." });
            }
            
            //__ INIT-Validate-Password__
            if (password.length < 6) {
                return res.status(400).json({ error: "Password needs at least 6 chars." });
            }

            // __ INIT-Check-Match-Password__
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Password doesn't match." });
            }

            const user = await prisma.user.findUnique({ where: { email } });

            if (user) {
                return res.status(400).json({ error: "Email already exist. Use another or Login." });
            }

            // Hash password
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(password, salt);

            // Generate username
            const genUsername = email.charAt(email.indexOf("@")) + email.slice(0, email.indexOf("@"));

            const newUser = await prisma.user.create({
                data: {
                    email,
                    username: genUsername,
                    password: hashPassword,
                }
            })

            if (newUser) {
                // generate register token
                const token = this.UserToken.generateToken(newUser.id, res);

                // get new user who just signed
                res.status(201).json({
                    result: {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username
                    },
                    token
                })
        } else {
            res.status(400).json({ error: "Invalid user data." });
        }
            
        } catch (error: any) {
            logger.info("Error in register controller", error.message);
            res.status(500).json({ error: "Internal Server Error." });
        }
    }
    
    //*********************************/
    // @desc       Login user
    // @route      POST - /api/v1/auth/login
    // @access     Public
    async loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: "Please fill in all fields." });
            }

            // __ INIT-Validate-Email__
            const emailArr = username.split("");
            const validateEmail = username.charAt(username.indexOf("@"));
            if (!emailArr.includes(validateEmail)) {
                return res.status(400).json({ error: "Invalid username." });
            }

            const user = await prisma.user.findUnique({ where: { username } });
    
            if (!user) {
                return res.status(400).json({ error: "Invalid credentials." });
            }
    
            const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid credentials." });
            }

            // Generate login token
            const token = this.UserToken.generateToken(user.id, res);
    
            res.status(200).json({
                result: {
                    id: user.id,
                    username: user.username
                },
                token
            })
    
        } catch (error: any) {
            console.log("Error from login controller", error.message);
            res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Logout User
    // @route      POST - /api/v1/auth/logout
    // @access     Public
    async logoutUser(req: Request, res: Response) {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            res.status(200).json({ message: "Logged out successfully." });
    
        } catch (error: any) {
            logger.info("Error from login controller", error.message);
            res.status(500).json({ error: "Internal Server Error." });
        }
    }

    //*********************************/
    // @desc       Get User profile
    // @route      GET - /api/v1/auth/profile
    // @access     Private - protected
    async playerAuth(req: Request, res: Response) {
        try {
            const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
            if (!user) {
                return res.status(404).json({ error: "User not found."})
            }
    
            // const { id, username, } = user;
    
            res.status(200).json({
                id: user.id,
                username: user.username,
            })
    
        } catch (error: any) {
            logger.info("Error from player Auth controller", error.message);
            res.status(500).json({ error: "Internal Server Error." });
        }
    }

}