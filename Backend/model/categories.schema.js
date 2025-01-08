import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      enum: [
        'Food', 
        'Festival', 
        'Wedding', 
        'Education', 
        'Political', 
        'Concert', 
        'Sports', 
        'Gaming'
      ],
      unique: true, 
      trim: true,  
    },
  },
  { timestamps: true }
);
categorySchema.index({ categoryName: 1 }, { unique: true });
const Category = mongoose.model("Category", categorySchema);
export default Category;
