import Head from 'next/head'
import NavBar from '../components/navbar'
import Device from '../components/device'
import axios from 'axios'

let api_url = ""

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    api_url = process.env.API_URL
    axios.get(`${api_url}/devices`).then((res) => { 
      console.log(res.data)
    })
    this.state = { isLogged: false, devices: [], user: null };
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
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </main>

        <footer>

        </footer>
      </div>
    )
  }
}
