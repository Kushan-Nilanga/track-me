import Head from 'next/head'
import NavBar from '../components/navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <NavBar></NavBar>
      </main>

      <footer>

      </footer>
    </div>
  )
}
