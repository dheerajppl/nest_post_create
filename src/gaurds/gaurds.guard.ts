import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly utilsService: UtilsService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'];
    const tokenFromHeader = authHeader ? authHeader.substring(7) : null;
    const tokenFromCookie: string = request.cookies['token'];
    const token = tokenFromHeader ? tokenFromHeader : tokenFromCookie;
    console.log("token", token);
    if (!token) {
      throw new UnauthorizedException('Token not found')
    };
    try {
      const decodedToken = this.utilsService.verifyToken(token)
      console.log("decode", decodedToken)
      request['user'] = decodedToken;
      return true
    } catch (err) {
      console.log("error in authorization", err)
      throw err;
    }
  }
}
