import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpDto } from 'src/auth/dto/singnUp.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}
    async findUser(email: string){
        return this.userRepository.findUser(email)
    }

    async CreateUser(signupDto: SignUpDto){
        return this.userRepository.CreateUser(signupDto)
    }
}
