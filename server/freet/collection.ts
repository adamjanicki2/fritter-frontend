import type { HydratedDocument, Types } from "mongoose";
import type { Freet } from "./model";
import type { MongoIncludesFilter } from "./util";
import FreetModel from "./model";
import UserCollection from "../user/collection";
import FollowerCollection from "../follower/collection";
import GoodSportScoreCollection from "../good_sport_score/collection";

type FreetStat = "likes" | "flags" | "comments";
class FreetCollection {
  /**
   * get a freet by id
   *
   * @param freetId of the freet to find
   * @returns the freet or null if dne
   */
  static async findById(
    freetId: Types.ObjectId | string
  ): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findById(freetId);
    if (freet) {
      return freet.populate("authorId");
    }
    return freet;
  }
  /**
   * Add a freet to the collection
   *
   * @param {string} authorId - The id of the author of the freet
   * @param {string} content - The id of the content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
   */
  static async addOne(
    authorId: Types.ObjectId | string,
    content: string
  ): Promise<HydratedDocument<Freet>> {
    const date = new Date();
    const freet = new FreetModel({
      authorId,
      dateCreated: date,
      content,
      dateModified: date,
      likes: 0,
      comments: 0,
      flags: 0,
    });
    await freet.save(); // Saves freet to MongoDB
    await GoodSportScoreCollection.updateOne(authorId, true, content);
    return freet.populate("authorId");
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(
    freetId: Types.ObjectId | string
  ): Promise<HydratedDocument<Freet>> {
    return FreetModel.findOne({ _id: freetId }).populate("authorId");
  }

  /**
   * Get all the freets in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAll(): Promise<Array<HydratedDocument<Freet>>> {
    // Retrieves freets and sorts them from most to least recent
    return FreetModel.find({}).sort({ dateModified: -1 }).populate("authorId");
  }

  /**
   * Get feed of freets for a user
   *
   * @param userId id of the user
   * @param followerFilter whether to get posts from only followers or only not followers
   * @returns list of feed freets
   */
  static async findByFollowees(
    userId: Types.ObjectId | string,
    followerFilter: MongoIncludesFilter,
    authorId?: string
  ): Promise<Array<HydratedDocument<Freet>>> {
    const followees = (await FollowerCollection.getFollowees(userId)).map(
      (followee) => followee.followee
    );
    followees.push(userId as Types.ObjectId);
    followerFilter === "$nin" && followees.push(userId as Types.ObjectId);
    const documents = await FreetModel.find({
      authorId: { [followerFilter]: followees },
    }).populate("authorId");
    if (authorId) {
      return documents.filter(
        (document) => document.authorId._id.toString() === authorId
      );
    }
    return documents;
  }

  /**
   * Get all the freets in by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUsername(
    username: string
  ): Promise<Array<HydratedDocument<Freet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return FreetModel.find({ authorId: author._id }).populate("authorId");
  }

  /**
   * Update a freet with the new content
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {string} content - The new content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  static async updateOne(
    freetId: Types.ObjectId | string,
    content: string
  ): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findOne({ _id: freetId });
    freet.content = content;
    freet.dateModified = new Date();
    await freet.save();
    return freet.populate("authorId");
  }

  /**
   * Delete a freet with given freetId.
   *
   * @param {string} freetId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
    const freet = await FreetModel.findOneAndDelete({ _id: freetId });
    freet &&
      (await GoodSportScoreCollection.updateOne(
        freet.authorId,
        false,
        freet.content
      ));
    return freet !== null;
  }

  /**
   * Delete all the freets by the given author
   *
   * @param {string} authorId - The id of author of freets
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await FreetModel.deleteMany({ authorId });
  }

  /**
   * Update freet stats
   *
   * @param freetId id of the freet
   * @param stat to increment
   * @param inc 1 or -1
   */
  static async incrementStats(
    freetId: Types.ObjectId | string,
    stat: FreetStat,
    inc: 1 | -1
  ): Promise<void> {
    const freet = await FreetModel.findById(freetId);
    freet[stat] += inc;
    await freet.save();
  }

  /**
   * Get memories for a user
   *
   * @param userId id of the user
   * @returns list of memories
   */
  static async findMemories(
    userId: Types.ObjectId | string
  ): Promise<Array<HydratedDocument<Freet>>> {
    const oneYearAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    )
      .toISOString()
      .split("T")[0];
    const lower = oneYearAgo + "T00:00:00.000Z";
    const upper = oneYearAgo + "T23:59:59.999Z";

    const memories = await FreetModel.find({
      dateCreated: { $gte: lower, $lte: upper },
      authorId: userId,
    }).populate("authorId");
    return memories;
  }
}

export default FreetCollection;
