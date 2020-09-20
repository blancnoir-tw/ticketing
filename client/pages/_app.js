import 'bootstrap/dist/css/bootstrap.css'

import buildClient from '../api/build-client'
import Header from '../components/header'

const MyApp = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  )
}

MyApp.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  const component = appContext.Component
  const pageProps = component.getInitialProps
    ? await component.getInitialProps(appContext.ctx, client, data.currentUser)
    : {}

  return {
    pageProps,
    ...data,
  }
}

export default MyApp
