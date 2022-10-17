import React from "react";
import Data from "../Data";
import "./Legends/Legends.css"
function Info(props)
{
    let obj= {};

    Data.map((data)=>{
        if(data.algo === props.algo)
        {
            obj = data;
        }
    })

    return <div className="info">
        <div className='key2'> 
            <span >Best Case Time Complexity : {obj.besttc}</span> 
        </div>
        <div className='key2'> 
            <span>Worst Case Time Complexity : {obj.worsttc}</span> 
        </div>
        <div className='key2'> 
            <span>Space Complexity : {obj.spacec}</span> 
        </div>
        <div className='key2'> 
            <span><a target = "_blank" style = {{color:"whitesmoke"}} href={obj.url}><img className = "more-info" src = "./moreInfo.png"/></a></span> 
        </div>
    </div>
}

export default Info;