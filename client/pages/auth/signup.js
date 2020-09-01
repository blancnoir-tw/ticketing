import { useState } from 'react'
import { useRouter } from 'next/router'

import useRequest from '../../hooks/use-request'

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { errors, doRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  })

  const onSubmit = async event => {
    event.preventDefault()
    doRequest()
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="form-control"
          name="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
          name="password"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  )
}

export default SignUp
