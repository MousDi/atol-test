module.exports = mongoose => {
  const Product = mongoose.model(
    "product",
    mongoose.Schema(
      {
        name: String,
        type: String,
        price: Number,
        rating: Number,
        warranty_years: Number,
        available: Boolean
      },
      { timestamps: false }
    )
  );

  return Product;
};