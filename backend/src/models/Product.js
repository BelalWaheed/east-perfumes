import mongoose from 'mongoose';

// NFC code sub-document
const nfcCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    used:  { type: String, enum: ['0', '1'], default: '0' },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price:       { type: Number, required: true, min: 0 },
    discount:    { type: Number, default: 0, min: 0, max: 100 },
    image:       { type: String, default: '' },
    category:    { type: String, required: true, trim: true },
    gender:      { type: String, enum: ['men', 'women', 'kids', ''], default: '' },
    nfcCode:     { type: [nfcCodeSchema], default: [] },
    audioURL:    { type: [String], default: [] },
  },
  {
    timestamps: true,
    // Expose _id as "id" (string) in all JSON responses — mirrors MockAPI behaviour
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

export const Product = mongoose.model('Product', productSchema);
