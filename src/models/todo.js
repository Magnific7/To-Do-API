import mongoose from 'mongoose'

const requireString = {
  type: String,
  required: true
};
const TodoSchema = mongoose.Schema(
    {
      title: requireString,
      description: requireString,
      priority: {
        type: String,
        required: true,
        enum: ['HIGH','MEDIUM','LOW']
      },
    },
    {
      toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
          delete ret._id;
          delete ret.__v;
          return ret;
        }
      },
      timestamps: true
    }
  );
  
  const Todo = mongoose.model('Todo', TodoSchema)
  
  export default Todo