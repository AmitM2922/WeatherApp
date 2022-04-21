import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './Weather.css'
export default function Weather() {
    const[City,SetCity]=useState('');
    const[Search,SetSearch]=useState('Nagpur');
    const[Temperature,SetTemperature]=useState(0);
    const[Weather,SetWeather]=useState('');
    const[Sunrise,SetSunrise]=useState();
    const[SunSet,SetSunSet]=useState();
    
    useEffect(()=>{
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+`${Search}`+'&appid=56ab6ef36fd117452d573a4917e31b6f')
        .then((res)=>{
            SetSunrise(new Date(res.data.sys.sunrise * 1000).toLocaleTimeString('en-IN'))
            SetSunSet(new Date(res.data.sys.sunset * 1000).toLocaleTimeString('en-IN'))
            SetCity(res.data.name)
            const temp = Math.round(res.data.main.temp - 273)
            SetTemperature(temp)
            SetWeather(res.data.weather[0].main)
        })
      
    })
    return (
        <>
        
            
         <div className='container mt-5'>
         <div className="card text-white bg-transparent m-2 " >
               
               <div className="card-header">
               <input
               className='form-control'
                       type='search'
                       placeholder='Enter your city'
                       onChange={(e) => { SetSearch(e.target.value)}}
                   />
               </div>
               <div className="card-body">
                   <h2 className="card-title">
                   <i className='fas fa-street-view'></i> {City}
                   </h2>
                   <span className="card-text">
                       <h1>{Temperature}&#176;C</h1>
                       <h3 style={{display:Weather=="Clouds"?'block':'none'}}>{Weather} <i className="fas fa-cloud " style={{color:'skyblue'}}></i></h3>
                       <h3 style={{display:Weather=="Clear"?'block':'none'}}>{Weather} <i className="fas fa-circle " style={{color:'yellow'}}></i></h3>
                       <h3 style={{display:Weather=="Haze"?'block':'none'}}>{Weather} <i className="fas fa-water" style={{color:'whitesmoke'}}></i></h3>
                       <h3 style={{display:Weather=="Rain"?'block':'none'}}>{Weather} <i className="fas fa-cloud-rain" style={{color:'whitesmoke'}}></i></h3>
                   
                     <h4>Sunrise: {Sunrise} </h4>
                    <h4>Sunset: {SunSet}</h4>
                   </span>
                   
                   
               </div>
           </div>
                <footer className="bg-transparent text-center text-lg-start">

                    <div className="text-center p-3 mt-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                      <span style={{fontWeight:'bold'}}> Developed By &nbsp;</span>
                        <a className="text-dark" href="https://amitm2922.github.io/Website/" style={{fontWeight:'900',fontSize:'20px'}}>Amit Mulmule</a>
                    </div>
                   
                </footer>
         </div>
        
        </>
    )
}
