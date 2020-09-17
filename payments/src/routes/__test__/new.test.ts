import { OrderStatus } from '@twtickets/common'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/order'

const path = '/api/payments'

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post(path)
    .set('Cookie', global.signup())
    .send({ token: 'asdf', orderId: mongoose.Types.ObjectId().toHexString() })
    .expect(404)
})

it('returns as 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 10,
    status: OrderStatus.Created,
  })
  await order.save()

  await request(app).post(path).set('Cookie', global.signup()).send({ token: 'asdf', orderId: order.id }).expect(401)
})

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString()

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 10,
    status: OrderStatus.Cancelled,
  })
  await order.save()

  await request(app)
    .post(path)
    .set('Cookie', global.signup(userId))
    .send({ token: 'asdf', orderId: order.id })
    .expect(400)
})
