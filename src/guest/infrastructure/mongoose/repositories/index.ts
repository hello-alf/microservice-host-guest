import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { GuestModelSchema } from '../schemas/guest.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GuestRepository {
  constructor(
    @InjectModel(GuestModelSchema.name)
    private readonly guestModel: Model<GuestModelSchema>,
  ) {}

  save = async (guest: any): Promise<any> => {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(guest.password, saltOrRounds);

    const newGuest = new this.guestModel({
      _id: new ObjectId(),
      name: guest.name,
      lastname: guest.lastname,
      city: guest.city,
      country: guest.country,
      email: guest.email,
      password: hash,
      isHost: false,
      isGuest: true,
    });

    newGuest.save();

    return newGuest;
  };

  findById = (id: string): Promise<GuestModelSchema> => {
    return this.guestModel.findById(id).exec();
  };

  findByEmail = (emailToFind: string): Promise<GuestModelSchema> => {
    return this.guestModel.findOne({ email: emailToFind }).exec();
  };

  findAll = (): Promise<GuestModelSchema[]> => {
    return this.guestModel.find().exec();
  };
}
