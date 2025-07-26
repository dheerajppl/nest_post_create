import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schemas'
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {

    constructor(
        @InjectModel(Post.name) private PostModel: Model<Post>
    ) { }


    async create(createPostDto: CreatePostDto) {
        try {
            let payload = {
                ...createPostDto,
                createdBy: new mongoose.Types.ObjectId(createPostDto.createdBy)
            }
            const post = await this.PostModel.create(payload);
            return post;

        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            return await this.PostModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'author',
                    },

                },
                {
                    $unwind: '$author'
                },
                {
                    $project: {
                        "author.name": 1,
                        title: 1,
                        description: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            ]);
        } catch (err) {
            console.log("error creating user", err)
            throw err
        }
    }

}
