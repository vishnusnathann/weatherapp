import React, { Component } from 'react'
import Titile from './Titile'
import Form from './Form'
import Weather from './Weather'
import './Wrapper.css'

 let API_KEY="70b0c8972d41a6b070f028d3f96b53d4"


 class Mainwrapper extends Component {

    state={
        temparature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:undefined
    }

    getWeather= async (e)=>{
        e.preventDefault();
        const city=e.target.elements.city.value;
        const country=e.target.elements.city.value;


        const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
        
        const data =await api_call.json();
        console.log(data.cod);
        if(data.cod==="404"){
            this.setState({
                temparature:undefined,
                city:undefined,
                country:undefined,
                humidity:undefined,
                description:undefined,
                error:"Wrong Details"
            });
            
        }else{

        
        
        if(city && country){
            this.setState(
                {
                    temparature:data.main.temp,
                    city:data.name,
                    country:data.sys.country,
                    humidity:data.main.humidity,
                    description:data.weather[0].description,
                    error:""
                }
            );
        }
        else{
            this.setState(
                {
                    temparature:undefined,
                    city:undefined,
                    country:undefined,
                    humidity:undefined,
                    description:undefined,
                    error:"Please Enter some value"
                }
            );
        }
    }

    }

    render() {
        return (
            <div>
               <div className="wrapper">
                   <div className="main">
                       <div className="container">
                           <div className="row">
                               <div className="col-sm-5 col-xs-12 title-container">
                               <Titile></Titile>
                               </div>
                               <div className="col-sm-7 col-xs-12 form-container">
                               <Form getWeather={this.getWeather}></Form>
                                <Weather 
                                temparature={this.state.temparature}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}
                                ></Weather>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}





export default Mainwrapper
