import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilsService {
    async encryptPassword(password: string): Promise<string> {
        try {
            return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        } catch (error) {
            console.log("error in encrypt password", error)
            throw error;
        }
    }

    async comparePassword(
        password: string,
        dbEncryptedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, dbEncryptedPassword);
    }


    verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.jwtSecretKey);
        } catch (error: any) {
            switch (error.name) {
                case 'TokenExpiredError':
                    throw new UnauthorizedException('Token has expired');
                case 'JsonWebTokenError':
                    throw new UnauthorizedException('Invalid token');
                default:
                    throw new UnauthorizedException('Token verification failed');
            }
        }
    }

    async createToken(
        data: Record<string, unknown> | Buffer,
        expiresIn?: string | number,
    ) {
        if (!expiresIn)
            return jwt.sign(data, process.env.jwtSecretKey, { expiresIn: '7d' });
        else return jwt.sign(data, process.env.jwtSecretKey, { expiresIn });
    }
    async createRefreshToken(
        data: Record<string, unknown> | Buffer,
        expiresIn?: string | number,
    ) {
        if (!expiresIn)
            return jwt.sign(data, process.env.jwtSecretKey, { expiresIn: '7d' });
        else return jwt.sign(data, process.env.jwtSecretKey, { expiresIn });
    }
}
