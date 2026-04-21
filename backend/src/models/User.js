import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name:               { type: String, required: true, trim: true },
    email:              { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:           { type: String, required: true },
    role:               { type: String, enum: ['user', 'admin'], default: 'user' },
    purchasedProducts:  { type: [String], default: [] },
    totalPoints:        { type: Number, default: 0 },
    usedPoints:         { type: Number, default: 0 },
    availablePoints:    { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const User = mongoose.model('User', userSchema);
