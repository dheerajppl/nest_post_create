import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserService } from 'src/user/user.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly userService: UserService,
    private readonly notificationRepository: NotificationRepository,
    private readonly firebaseService: FirebaseService
  ){}
  async create(createNotificationDto: CreateNotificationDto, user_id:string) {
    const user = await this.userService.finUserById(createNotificationDto.userId)
    if(!user?.fcmToken){
      throw new NotFoundException('Fcm Token not found')
    }
    const saved = await this.notificationRepository.create(
      createNotificationDto,
      user_id
    )

    return this.firebaseService.sendPushNotification(
      user?.fcmToken,
      createNotificationDto.title,
      createNotificationDto.message
    )
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
