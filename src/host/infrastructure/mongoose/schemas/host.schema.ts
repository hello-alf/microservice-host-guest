import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Schema({ collection: 'hosts' })
export class HostModelSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

export const HostSchema = SchemaFactory.createForClass(HostModelSchema);
