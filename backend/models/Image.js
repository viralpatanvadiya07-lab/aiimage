import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true }, // base64 string
  shareUrl: { type: String }, // direct pollination url
  style: { type: String, default: 'Photorealistic' },
  aspectRatio: { type: String, default: '1:1' },
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
export default Image;
