import mongoose from 'mongoose';

const institutionsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    bic: {
      type: String,
      required: true,
    },
    transaction_total_days: {
      type: String,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const institutions = mongoose.model('institutions', institutionsSchema);
