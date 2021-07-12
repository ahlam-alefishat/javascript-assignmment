import React from 'react';
import './form.css';


class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        shortUrl:'',
        url: '',
        errormessage: '',
     allUrls:[]
      };
     
    }

    getLocalData =()=>{
    let data=  JSON.parse(window.localStorage.getItem('data'));
    console.log('Data from local storage',data);
    if(data !==null){
      this.setState({allUrls:data})
    }
    }
   
    saveToLocalStorage = (URL) =>{
      this.getLocalData();
      let all=this.state.allUrls;
      all.push({url:URL,copied:false});
      this.setState({allUrls:all});
      window.localStorage.setItem('data', JSON.stringify(this.state.allUrls));
    
    }
 
    handleSubmit = async (e) => {
      e.preventDefault();
      let err = '';
      
      if (!this.state.url ) {
          err = <span className='error' >Please add a link</span>

        }
      this.setState({errormessage: err});

      if (this.state.url) {
          try {
            const raw = await fetch(`https://api.shrtco.de/v2/shorten?url=${this.state.url}`);
            const data = await raw.json();
            this.setState({shortUrl:data.result.full_short_link}); 
            
           
            this.saveToLocalStorage(this.state.shortUrl);
            this.props.handler(this.state.allUrls);


          }catch (err) {
            console.log(err);
          }
          
      }
    };
  
    handleChange = (e) => {
      const url = e.target.value;

      this.setState({ url })
    };
  
  
    render() {
      return (
        



<div className="form-container" >
      <form  className="form" onSubmit={this.handleSubmit} style={{ 
      backgroundImage:`url(images/bg-shorten-desktop.svg)`
     
    }}>
      
        <input id="input" type="text" placeholder="Shorten a link here..." onChange={this.handleChange}/>        
                <button type="submit" className='button' >Shorten it !</button>
                {this.state.errormessage}
      </form>
    
     
    </div>

        
      );
    }
  }
  
  export default Form;
  