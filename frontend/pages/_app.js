import '../styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv'

function MyApp({ Component, pageProps }) {
  dotenv.config()
  return <Component {...pageProps} />
}

export default MyApp
