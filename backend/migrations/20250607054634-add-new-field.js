const User = require("../models/users/userSchema");

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db
      .collection("users")
      .updateMany(
        { subsciptionRemainderSent: { $exists: false } },
        { $set: { subsciptionRemainderSent: false } }
      );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {},
};
