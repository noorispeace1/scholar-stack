import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: false, // Not required for Google OAuth users
      minlength: [6, 'Password must be at least 6 characters'],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },
    location: {
      type: String,
      default: '',
    },
    coverPhoto: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
