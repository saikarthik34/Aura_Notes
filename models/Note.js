import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the note'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the note content'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  colorTag: {
    type: String,
    default: '#ffffff',
  }
}, { timestamps: true });

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
