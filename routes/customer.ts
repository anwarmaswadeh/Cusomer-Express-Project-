import { Router, Response, Request, NextFunction  } from "express";
import { Customer } from "../db/entities/Customer.js";
import { createCustomer, editCustomer, getAllCustomers, getCustomer, removeCustomer } from "../Controller/customer.js";

const router = Router()

router.post("/", async (req:Request, res:Response, next:NextFunction)=>{

    const payload:Customer = req.body;

    if(!payload.customerName || !payload.mobilePhone || !payload.balance ){
        res.status(400).json({
            message:"Some felids are missing",
            success: false
        })
        return;
    }
    try {
        await createCustomer(payload)

        res.status(201).json({
            messege:"Customer created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number (req.params.id);

    try {
        await removeCustomer(id)

        res.status(200).json({
            message:"Customer deleted successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.put("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number(req.params.id);
    const payload:Customer = req.body;

    try {
        await editCustomer(id, payload)

        res.status(200).json({
            message:"Customer updated successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const customer = await getCustomer(id)

        res.json({
            message: "Customer information's: ",
            customer: customer
        })

    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})

router.get("/", getAllCustomers)

export default router