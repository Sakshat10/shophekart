import { Router } from "express"
import { validateSchema } from "../middlewares"
import { getSingleUserSchema, registerUserSchema } from "../validation/user"
import { registerUser, getSingleUser, getNonce, SiweAuthController, getProfile, logout, deleteLoggedInUser } from "../controllers/user"
import verifyNonceParamsSchema from "../validation/user/verifyNonce.user.validation"
import updateDescription from "../controllers/user/updateDescription.user.controller"
import updateName from "../controllers/user/updateName.user.controller"

const router: Router = Router()

router.route("/register").post(validateSchema(registerUserSchema), registerUser)

router.route("/").get(validateSchema(getSingleUserSchema), getSingleUser)

router.route("/nonce").get(getNonce)

router.route("/profile").get(getProfile)

router.route("/verify").post(validateSchema(verifyNonceParamsSchema), SiweAuthController)

router.route("/logout").post(logout)
router.route("/update-description").post(updateDescription)
router.route("/update-name").post(updateName)
router.route("/me").delete(deleteLoggedInUser)

// TODO: Route for admin to delete user

export default router
