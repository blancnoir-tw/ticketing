const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT sined in</h1>
}

LandingPage.getInitialProps = async (contextm, client, currentUser) => {}

export default LandingPage
