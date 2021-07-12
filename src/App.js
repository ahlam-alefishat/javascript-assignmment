// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Main from './component/main/main';
import Form from './component/form/form';
import Header from './component/header/header';
import Cards from './component/cards/cards';
import Footer from './component/footer/footer';
import { CopyToClipboard } from 'react-copy-to-clipboard';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortUrl: '',
      allUrls: [],
      copied: false

    }
  }
  componentDidMount() {
    this.getLocalData();

  }
  getLocalData = () => {
    let data = JSON.parse(window.localStorage.getItem('data'));
    console.log("data", data);
    if (data !==null) {
      this.setState({ allUrls: data })

    }
  }

  handler = (url) => {
    this.setState({ allUrls: url });
  }



  render() {
    return (

      <div className="App">

        <Header></Header>
        <Main></Main>

        <Form handler={this.handler} />

        {this.state.allUrls.map((val, i) => {

          return <div className="result"key={i}>
            <p>  {val.url}
              <CopyToClipboard text={val.url}

                onCopy={(e) => {
                  console.log(e)
                  let arr = this.state.allUrls;
                  arr = arr.map((element) => {
                    if(element.url === e){
                      element.copied=true
                      return element
                    }else return element
                   
                  })
                  this.setState({allUrls:arr})
                }}  >

                <button className="CopyButton">Copy!</button>
              </CopyToClipboard>

            </p>
            {val.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}

          </div>


        })}



        <Cards></Cards>

        <Footer></Footer>

      </div>
    );
  }
}

export default App;
