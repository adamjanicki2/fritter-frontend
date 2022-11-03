import CommentCollection from "../comment/collection";
import FreetCollection from "../freet/collection";
import moment from "moment";
import { Types } from "mongoose";

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
export const formatDate = (date: Date): string => {
  const splitted = date.toString().split(" ");
  const year = `'${splitted[3].substring(2)}`;
  const dayMonth = splitted[1] + " " + splitted[2];
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return (
    dayMonth +
    " " +
    year +
    " @ " +
    `${hour % 12}:${minutes} ${hour < 12 ? "AM" : "PM"}`
  );
};

export const PARENT_TO_INCREMENT_FUNC = {
  comment: CommentCollection.incrementStats,
  freet: FreetCollection.incrementStats,
} as const;

export type DeleteFilter = {
  parentId?: Types.ObjectId | string;
  authorId?: Types.ObjectId | string;
  userId?: Types.ObjectId | string;
};
