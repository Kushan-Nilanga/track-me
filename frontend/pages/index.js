import Head from 'next/head'
import NavBar from '../components/navbar'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
  }

  render() {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <NavBar onLogout={() => window.location.href = '/login'} isLogged={this.state.isLogged}></NavBar>
          <div>
            
          </div>
        </main>

        <footer>

        </footer>
      </div>
    )
  }
}
