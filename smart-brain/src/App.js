import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ""
  }  
}
class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  // the box received is the returned value from calFaceLoc
  displayFaceBox = (box) => {
    console.log(box); 
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
// the url is replaced with he input state since the url we are dealing with is dynamic and it is the input url we detect.
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://warm-savannah-51601.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://warm-savannah-51601.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            }).catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'Signout') {
      this.setState(initialState)
    } else if (route === "Home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  
  render() {
    return (
      <div className="App">
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        { this.state.route === 'Home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit =  {this.onButtonSubmit}/> 
            <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>
          :(
              this.state.route === "SignIn" ?
              <SignIn loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/> 
              : <Register onRouteChange={this.onRouteChange} loadUser = {this.loadUser}/> 
            )
        }
      </div>
    )
  }

}
export default App;
