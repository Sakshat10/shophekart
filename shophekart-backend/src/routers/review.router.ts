import { Router } from "express"
import { validateSchema } from "../middlewares"
import createReviewController from "../controllers/review/review.controller"
import createReviewSchema from "../validation/review/review.validation"
import deleteReviewController from "../controllers/review/deleteReviewController"
import getReviewsController from "../controllers/review/getReviewsController"
import { dislikeController, likeController } from "../controllers/review/likesAndDislikeController"

const reviewRouter: Router = Router()

reviewRouter.post("/create", validateSchema(createReviewSchema), createReviewController)
reviewRouter.delete("/delete/:reviewId", deleteReviewController)
reviewRouter.get("/target/:targetId", getReviewsController)
reviewRouter.patch("/increase-like/:reviewId", likeController)
reviewRouter.patch("/increase-dislike/:reviewId", dislikeController)

export default reviewRouter
