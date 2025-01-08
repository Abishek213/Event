import Category from '../model/categories.schema.js';

const categories = [
  'Food',
  'Festival',
  'Wedding',
  'Education',
  'Political',
  'Concert',
  'Sports',
  'Gaming',
];

const seedCategories = async () => {
  for (const categoryName of categories) {
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      console.log(`Category '${categoryName}' already exists.`);
    } else {
      const newCategory = new Category({ categoryName });
      await newCategory.save();
      console.log(`Category '${categoryName}' created.`);
    }
  }
};

export default seedCategories;
