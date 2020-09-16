import Queue from 'bull'

interface Payload {
  orderId: string
}

const expiratinQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
})

expiratinQueue.process(async job => {
  console.log('I want to publish an expiration:complete event for orderId', job.data.orderId)
})

export { expiratinQueue }
