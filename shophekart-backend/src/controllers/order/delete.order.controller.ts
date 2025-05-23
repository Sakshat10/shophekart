import { NextFunction, Request, Response } from "express"
import { asyncHandler, httpError, httpResponse } from "../../utils"
import { TDeleteOrder } from "../../validation/order/delete.order.validation"
import { deleteOrderService } from "../../services/order"
import { Types } from "mongoose"
import responseMessage from "../../constants/responseMessage"
import updateProductStockService from "../../services/product/updateStock.product.service"

const deleteOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params as TDeleteOrder["params"]

    const deletedOrder = await deleteOrderService(new Types.ObjectId(orderId))

    if (!deletedOrder) {
        httpError(next, new Error(responseMessage.NOT_FOUND("Order")), req, 404)
        return
    }

    const { productId } = deletedOrder
    await updateProductStockService({ productId, quantity: 1 })

    httpResponse(req, res, 200, responseMessage.DELETED_SUCCESSFULLY("Order"), deletedOrder)
})

export default deleteOrder
