module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.model("users", schema);
  return User;
};
