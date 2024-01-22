import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ collection: 'users' })
export class HostModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  isHost: boolean;

  @Prop({ required: true })
  isGuest: boolean;
}

export const HostSchema = SchemaFactory.createForClass(HostModelSchema);
