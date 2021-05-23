import React from 'react';
import Greeting from '../../components/greeting/Greeting';
import FeatureList from '../../components/homeFeatures/FeatureList';


const HomePage =()=>{
    return(
        <div>
           <Greeting/>
          <FeatureList/>
        </div>
    );
};

export default HomePage;