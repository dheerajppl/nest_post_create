import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas'
import { Model } from 'mongoose';
import { SignUpDto } from '../auth/dto/singnUp.dto';

@Injectable()
export class UserRepository {

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>
  ) { }

  async findUser(email: string) {
    try {
      return await this.UserModel.findOne({ email: email })
    } catch (err) {
      console.log("error creating user", err)
      throw err
    }
  }
  async CreateUser(singnUpDto: SignUpDto) {
    try{
      return await this.UserModel.create(singnUpDto)
    }catch(error){
      throw error
    }
  }

}
