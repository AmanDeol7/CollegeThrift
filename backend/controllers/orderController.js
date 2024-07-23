import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"

//util func

const calcPrice = (orderItems) => {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const  taxRate = 15/100
    const taxPrice = (taxRate* itemsPrice).toFixed(2) //15%

    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2)

    return {itemsPrice: itemsPrice.toFixed(2), shippingPrice, taxPrice, totalPrice}


}

const createOrder = async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body
        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No order items")
            
        }
        const itemsFromDb = await Product.find({_id: {$in: orderItems.map(item => item.product)}})
        const dbOrderItems = orderItems.map((itemFromClient)=> {
            const matchingItemFromDb = itemsFromDb.find(itemFromDb => itemFromDb._id.toString() === itemFromClient._id.toString())
            if(!matchingItemFromDb){
                res.status(400)
                throw new Error(`Product not found ${itemFromClient._id}`)


            
            }
            return {
                ...itemFromClient, 
                product:itemFromClient._id,
                price: matchingItemFromDb.price,
                _id: undefined

            }
        })

        const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calcPrice(dbOrderItems)
        const order = new Order({
            user: req.user._id,
            orderItems: dbOrderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)


   
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id username")
        res.json(orders)
    } catch (error) {
            res.status(500).json({error: error.message})
    }
   

   
}

const getUserOrders = async(req,res) => {
    try {
        const userOrders = await Order.find({user: req.user._id})
        res.json(userOrders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const countTotalOrders = async (req, res) => {
    try {
      const totalOrders = await Order.countDocuments();
      res.json({ totalOrders });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const calculateTotalSales = async (req, res) => {
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0)
        res.json({totalSales}) 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}  

const calcualteTotalSalesByDate = async (req, res) => {
    try {
      const salesByDate = await Order.aggregate([
        {
          $match: {
            isPaid: true,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
            },
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]);
  
      res.json(salesByDate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "username email"
      );
  
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const markOrderAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
    
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
          };
    
          const updateOrder = await order.save();
          res.status(200).json(updateOrder);
        } else {
          res.status(404);
          throw new Error("Order not found");
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  const markOrderAsDelivered = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
  
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error("Order not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  

export {createOrder , getAllOrders , getUserOrders ,countTotalOrders, calculateTotalSales, calcualteTotalSalesByDate , findOrderById, markOrderAsPaid, markOrderAsDelivered}