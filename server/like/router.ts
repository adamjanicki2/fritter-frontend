import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as userValidator from "../user/middleware";
import LikeCollection from "./collection";
import * as middleware from "../common/middleware";

const router = express.Router();

/**
 * Check if user has liked an item
 *
 * @name GET /api/likes?parentId=id
 * @param {string} parentId the id of the item
 *
 * @return {boolean} - whether the user has liked an item
 * @throws {400} - If parentId is not given
 * @throws {403} if user is not logged in
 * @throws {404} if parent does not exist
 *
 */
router.get(
  "/:parentId?",
  [
    userValidator.isUserLoggedIn,
    middleware.isInfoSupplied("query", ["parentId"]),
    middleware.isInfoValidId("query", ["parentId"]),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId as string;
    const exists = await LikeCollection.findByUserId(
      userId,
      req.query.parentId as string
    );
    res.status(200).json({ exists });
  }
);

router.post(
  "/",
  [
    userValidator.isUserLoggedIn,
    middleware.isInfoSupplied("body", ["parentId"]),
    middleware.isInfoValidId("body", ["parentId"]),
    middleware.isValidParentType("body"),
    middleware.doesParentExist("body"),
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    const { parentId, parentType } = req.body;
    const hasLiked = await LikeCollection.findByUserId(
      userId,
      parentId as string
    );
    const result = hasLiked
      ? await LikeCollection.deleteOne(userId, parentId as string)
      : await LikeCollection.addOne(userId, parentId, parentType);
    if (result) {
      return res.status(201).json({
        message: "You liked the item successfully.",
        increment: hasLiked ? -1 : 1,
      });
    }
    res.status(404).json({
      message: "There was an error liking this item.",
    });
  }
);

export { router as likeRouter };
