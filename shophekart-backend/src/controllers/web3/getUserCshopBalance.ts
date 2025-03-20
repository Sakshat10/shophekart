import { Request, Response } from "express"
import { asyncHandler, httpResponse } from "../../utils"
import responseMessage from "../../constants/responseMessage"

const getUserCshopBalance = asyncHandler((req: Request, res: Response) => {
    // const { userData } = req.session as IMySessionData

    // if (!userData?.address) {
    //     httpError(next, new Error(responseMessage.UNAUTHORIZED_ACCESS), req, 401)
    // }

    // const balance = await readContract(wagmiConfig, {
    //     address: "0x1Ba1c8C5E4F2CB9cb2Ee116BeB5f185C59523A35",
    //     abi: USDT_ABI,
    //     functionName: "balanceOf",
    //     args: ["0x7Ff52db4Ad12B420fAa59b98F4defE2c7e424CeD"]
    // })

    httpResponse(req, res, 200, responseMessage.DATA_RETRIEVED_SUCCESSFULLY("User's CSHOP Balance"), null)
})

export default getUserCshopBalance
