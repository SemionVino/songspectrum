import mongoose from "mongoose";
import artistSchema from "../schemas/artistSchema";

export default class Artist {
  constructor(data) {
    const model = mongoose.model("Artist", artistSchema);
    this.instance = new model(data);
  }
  //-----------------------------------------
  async save() {
    try {
      return await this.instance.save();
    } catch (error) {
      console.error(error);
    }
  }

  //-----------------------------------------
  update() {}
  //-----------------------------------------
  static async get(query) {
    try {
      // Retrieve data from the database based on a query
      return await mongoose.model("User", userSchema).find(query);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
}