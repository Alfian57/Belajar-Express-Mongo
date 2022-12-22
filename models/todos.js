module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      todo: String,
      is_done: Boolean,
    },
    {
      timestamps: true,
    }
  );

  const Todo = mongoose.model("posts", schema);
  return Todo;
};
