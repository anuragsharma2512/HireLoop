import {UserRepository} from "../repositories/user.repository.js";
import {verifyPassword,hashPassword} from "../utils/password.js";

import { RegisterInput, LonginInput} from "../validators/auth.validator.js";

import { createAccessTolken, createRefreshToken,getRefreshTokenExpiry, hashToken } from "../utils/token.js";

import { SessionRepository} from "../repositories/session.repository.js";



export class AuthService {
    private readonly userRepository = new UserRepository();

    private readonly sessionRepository = new SessionRepository();

    async register(input: RegisterInput){
        const existingUser = await this.userRepository.findByEmail(input.email);

        if(existingUser){
            throw new Error("User with this email already exists");
        }

        const passwordHash = await hashPassword(input.password);

        const user = await this.userRepository.create({
            email: input.email,
            passwordHash,
            firstName: input.firstName,
            lastName: input.lastName,
        });

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            emailVerified: user.emailVerified,
        };
    }

    async login( input: LonginInput){
        const user = await this.userRepository.findByEmail(input.email);

        if(!user){
            throw new Error(
                "Invalid email"
            );
        }

        const passwordVaid = await verifyPassword( input.password, user.passwordHash);

        if(!passwordVaid){
            throw new Error("Invalid password")
        }

        if(user.status !== "active"){
            throw new Error("Account is not active");
        }

        const accessToken = createAccessTolken({
            sub: user.id,
            role: user.role,
        })

        const expiresAt = getRefreshTokenExpiry();

        const session = await this.sessionRepository.create({
            userId: user.id,
            expiresAt,
        })

        const refreshToken = createRefreshToken({
            sub: user.id,
            sid: session.id,
        })

        const refreshTokenHash = hashToken(refreshToken);

        await this.sessionRepository.updateRefreshToken(
            session.id,
            refreshTokenHash
        )

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.isDirectModified,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                emailVerfied: user.emailVerified,
            }
        }
    }
}