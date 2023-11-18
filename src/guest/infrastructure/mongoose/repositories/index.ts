import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { HostModelSchema } from '../schemas/guest.schema';

@Injectable()
export class HostRepository {
  constructor(
    @InjectModel(HostModelSchema.name)
    private readonly hostModel: Model<HostModelSchema>,
  ) {}

  save = (host: any): any => {
    const newHost = new this.hostModel({
      _id: new ObjectId(),
      name: host.name,
      lastname: host.lastname,
      city: host.city,
      country: host.country,
    });

    newHost.save();

    return newHost;
  };

  findById = (id: string): Promise<HostModelSchema> => {
    return this.hostModel.findById(id).exec();
  };

  findAll = (): Promise<HostModelSchema[]> => {
    return this.hostModel.find().exec();
  };
}
