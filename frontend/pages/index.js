import Head from 'next/head'
import NavBar from '../components/navbar'
import Device from '../components/device'
import axios from 'axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    const demo = <tr key={0}> <td> user </td> <td> name </td> </tr> 
    this.state = { devices: demo, isLogged:true }
  }

  fetchDevices = () =>{
    axios.get(`http://localhost:5000/api/devices`).then((res) => {
      const dat = res.data.map(dev=> 
        <Device id={dev._id} name={dev.name} key={dev._id} user={dev.user} sensorData={dev.sensorData}/>
      )
      this.setState({ devices: dat, isLogged:true })
    })
  }

  componentDidMount = () =>{
    this.fetchDevices()
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
            <table className="table" style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
              {this.state.devices}
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
