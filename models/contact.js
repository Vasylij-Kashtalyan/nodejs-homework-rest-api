const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name fot contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  add: addSchema,
  update: favoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
