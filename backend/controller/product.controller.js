import mongoose from "mongoose"
import Product from "../models/Product.model.js"

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({})
    response.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({ success: false, message: "Server Error" })
  }
}

export const createProducts = async (request, response) => {
  const product = request.body
  if (!product.name || !product.price || !product.image) {
    return response
      .status(400)
      .json({ success: false, message: "Please Give Required Feilds" })
  }
  const newProduct = new Product(product)
  try {
    await newProduct.save()
    response.status(200).json({ success: true, data: newProduct })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({ success: false, message: "Server Error" })
  }
}

export const updateProducts = async (request, response) => {
  const { id } = request.params
  const newProduct = request.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({ success: false, message: "Product Not Found" })
  }

  try {
    await Product.findByIdAndUpdate(id, newProduct, { new: true })
    response.status(200).json({ success: true, data: newProduct })
  } catch (error) {
    response.status(500).json({ success: false, message: error.message })
  }
}

export const deleteProducts = async (request, response) => {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.status(404).json({ success: false, message: "Product Not Found" })
  }

  try {
    await Product.findByIdAndDelete(id)
    response.status(200).json({ success: true, message: "Product Deleted..." })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({ success: false, message: "Server Error" })
  }
}
