import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schemas'
import mongoose, { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationRepository {

    constructor(
        @InjectModel(Notification.name) private NotificationModel: Model<Notification>
    ) { }


    async create(createNotificationDto: CreateNotificationDto, senderId: string) {
        try {
            let payload = {
                ...createNotificationDto,
                receiverId: new mongoose.Types.ObjectId(createNotificationDto.userId),
                senderId: new mongoose.Types.ObjectId(senderId)
            }
            const post = await this.NotificationModel.create(payload);
            return post;

        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            
        } catch (err) {
            console.log("error creating user", err)
            throw err
        }
    }

}
