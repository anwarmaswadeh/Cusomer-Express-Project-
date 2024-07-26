import { Customer } from "../db/entities/Customer.js"
import { AppError } from "../Errors/AppError.js"
import {Request, Response } from "express"

const createCustomer = async (payload: Customer) => {
    const customer = await Customer.findOne({
        where: {
            mobilePhone: payload.mobilePhone,
        }
    })

    if(customer){
        throw new AppError("customer already exits", 409, true)
    }

    const newCustomer = Customer.create(payload)
    return newCustomer.save()
}


const removeCustomer = async( id: number)=>{
    const customer = await Customer.findOne({
        where:{
            id: id
        }
    })

    if(!customer){
        throw new AppError("Customer not found ", 404, true)
    }

    return customer.remove()
}

const editCustomer = async( id: number, payload: Customer)=>{
    const customer = await Customer.findOne({
        where:{
            id: id
        }
    })

    if(!customer){
        throw new AppError("Customer not found ", 404, true)
    }

    if(payload.customerName){
        customer.customerName = payload.customerName
    }

    if(payload.mobilePhone){
        customer.mobilePhone = payload.mobilePhone
    }

    if(payload.balance){
        customer.balance = payload.balance
    }

    return customer.save()
}

const getCustomer = async(id: number)=>{
    const customer = await Customer.findOne({
        where: {
            id: id
            }})

        if(!customer){
            throw new AppError("Customer not found ", 404, true)
        }
    return customer
}

const getAllCustomers = async (req:Request, res:Response)=>{
    try {
        const customers = await Customer.find();
        res.json({
            message: "Getting all customers",
            customers: customers
        });
    } catch (error) {
        throw new AppError("Error retrieving customers", 500, true);
    }
}

export {createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers}