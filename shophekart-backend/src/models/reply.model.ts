
import { model, Schema } from "mongoose";
import IReplyDocument from "../types/reply.type";
import Review from "./review.model";
import User from "./user.model";

const replySchema: Schema<IReplyDocument> = new Schema<IReplyDocument>({
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: Review,
    required: true,
  },
  replierId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  verifiedPurchase: {
    type: Boolean,
    required: true,
  },
  replyText: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Store ID of users who liked
  dislikedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Store ID of users who disliked
});

export default model<IReplyDocument>("Reply", replySchema);
