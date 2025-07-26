import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/singnUp.dto';
import { UserService } from 'src/user/user.service';
import { UtilsService } from 'src/utils/utils.service';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly utilsService: UtilsService
  ) {}

  async signUp(singnUpDto: SignUpDto){
    const existuser = await this.userService.findUser(singnUpDto.email)
    if(existuser){
      throw new ConflictException('User already exist');
    }
    const encryptPassword = this.utilsService.encryptPassword(singnUpDto.password)
    singnUpDto.password = await encryptPassword;
    return this.userService.CreateUser(singnUpDto)

  }

  async signIn(signInDto: SignInDto){
    const existuser = await this.userService.findUser(signInDto.email)
     if(!existuser){
      throw new NotFoundException('User not Exist');
    }
    const passwordMatch = await this.utilsService.comparePassword(signInDto.password, existuser.password)
    if(!passwordMatch) throw new UnauthorizedException('Password did not match')
    const payload = {
      _id: existuser?._id,
      email: existuser?.email,
      name: existuser?.name
    }
    const token = await this.utilsService.createToken(payload)
    return {
      email: existuser.email,
      name: existuser.name,
      token: token
    }

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
