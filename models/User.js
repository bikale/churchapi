const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Shopitem',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  role: {
    type: String,
    default: 'user',
  },
});

userSchema.methods.addItemToCart = async function (itemId) {
  const userId = this._id;
  await this.model('User')
    .updateOne(
      { _id: ObjectId(this._id), 'cart.items.productId': itemId },
      {
        $inc: {
          'cart.items.$.quantity': 1,
        },
      }
    )
    .then(async (result) => {
      if (result.n == 0) {
        await this.model('User').updateOne(
          { _id: ObjectId(userId) },
          {
            $push: {
              'cart.items': { productId: ObjectId(itemId), quantity: 1 },
            },
          }
        );
      }
    });
};

userSchema.methods.deleteItemFromCart = async function (itemId) {
  const userId = this._id;
  await this.model('User')
    .findOne({ _id: ObjectId(userId) })
    .then(async (userDetail) => {
      userDetail.cart.items = userDetail.cart.items.filter((item) => {
        if (item.productId == itemId) {
          if (item.quantity == 1) {
            return false;
          } else item.quantity -= 1;
        }
        return item;
      });
      await userDetail.save();
    });
};

module.exports = mongoose.model('User', userSchema);
