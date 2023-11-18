import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { GuestModelSchema } from '../schemas/guest.schema';

@Injectable()
export class GuestRepository {
  constructor(
    @InjectModel(GuestModelSchema.name)
    private readonly guestModel: Model<GuestModelSchema>,
  ) {}

  save = (guest: any): any => {
    const newGuest = new this.guestModel({
      _id: new ObjectId(),
      name: guest.name,
      lastname: guest.lastname,
      city: guest.city,
      country: guest.country,
    });

    newGuest.save();

    return newGuest;
  };

  findById = (id: string): Promise<GuestModelSchema> => {
    return this.guestModel.findById(id).exec();
  };

  findAll = (): Promise<GuestModelSchema[]> => {
    return this.guestModel.find().exec();
  };
}
