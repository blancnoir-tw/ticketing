import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import StripeChckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request'

const OrderShow = ({ order, currentUser }) => {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => router.push('/orders'),
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [order])

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeChckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_mBTOvztVN7rq7W9wyeV6LMXR"
        amount={order.ticket.price}
        currency="JPY"
        email={currentUser.email}
      />
      {errors}
    </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query
  const { data } = await client.get(`/api/orders/${orderId}`)

  return { order: data }
}

export default OrderShow
