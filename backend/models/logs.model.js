module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        log: String
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const logs = mongoose.model("logs", schema);
  return logs;
};
