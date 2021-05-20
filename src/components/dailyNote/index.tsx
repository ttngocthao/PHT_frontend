import React from 'react';
import { Measurement, Medication } from '../../types';

interface Props {
    fastingHours?:string
    sleepingHours?: string
    date: string
    note?: string
    fastingProtocol:string
    medication?: Medication[]|[]
    bloodPressure?:Measurement[]|[]
    bloodGlucose?:Measurement[]|[]
    activities?:string
    beverages?:string
}

const DailyNote = ({fastingHours,sleepingHours,date,note,fastingProtocol,medication,bloodPressure,bloodGlucose,activities,beverages}:Props) => {
    return (
        <div style={{paddingTop:'2rem'}}>
            <h2>It&#39;s {date} - {fastingProtocol} {medication?.length===0 && ' - No Med'}</h2>
            <div>
                <p>Fasting hours: {fastingHours} hours</p>
                <p>Sleeping hours: {sleepingHours} hours</p>
            </div>
            <br/>
            <div>
                <h3>Other note: constipation, menstruation starts...etc </h3>
                <div>
                    {note}
                </div>
            </div>
            <br/>
            {medication && medication?.length!==0 && <div>
                <h3>Medication</h3>
                <ul>
                    {medication.map((item,index)=>
                        <li key={index}>
                            <span>{item.medName}</span>
                            &nbsp;at/during&nbsp;
                            <span>{item.time}</span>
                        </li>
                    )}
                </ul>
            </div>}
            <br/>
            {bloodPressure && bloodPressure?.length!==0 && <div>
                <h3>Blood Pressure</h3>
                <ul>
                    {bloodPressure.map((item,index)=>
                        <li key={index}>
                            <span>{item.readingNo} mmHg</span>
                            &nbsp;at&nbsp;
                            <span>{item.time}</span>
                        </li>
                    )}
                </ul>    
            </div>} 
            <br/>
            {bloodGlucose && bloodGlucose?.length!==0 && <div>
                <h3>Blood Glucose</h3>
                <ul>
                    {bloodGlucose.map((item,index)=>
                        <li key={index}>
                            <span>{item.readingNo} mg/dL</span>
                            &nbsp;at&nbsp;
                            <span> {item.time}</span>
                        </li>
                    )}
                </ul>    
            </div>}
            <br/>
            {activities && <div>
                <h3>Activities or Events</h3>
                <p>{activities}</p>
            </div>}
            <br/>
            {beverages && <div>
                <h3>Beverages</h3>
                <p>{beverages}</p>
            </div>}
        </div>
    );
};

export default DailyNote;
