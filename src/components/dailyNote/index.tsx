import React from 'react';
import { Button } from 'semantic-ui-react';
import { Measurement, Medication } from '../../types';
import DateIcon from '../dateIcon/DateIcon';

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
    editMode:boolean
    editDayNoteHandle:()=>void
}

const DailyNote = ({fastingHours,sleepingHours,date,note,fastingProtocol,medication,bloodPressure,bloodGlucose,activities,beverages,editDayNoteHandle,editMode}:Props) => {
    return (
        <div style={{paddingTop:'2rem'}}>
            <div style={{display:'flex', alignItems:'center'}}>
                <DateIcon date={date}/>
                <h2 style={{marginTop:0}}>{fastingProtocol} {medication?.length===0 && ' - No Med'}</h2>
                {editMode && <Button color='orange' onClick={editDayNoteHandle}>Edit General Details</Button>}
            </div>
            <br/>
            {fastingHours &&  <div>
                <h3>Fasting hours</h3>
                <p>{fastingHours} hours</p> <br/>
            </div>}
           
           {sleepingHours &&    <div>
               <h3>Sleeping hours</h3>
                <p>{sleepingHours} hours</p><br/>
            </div>}
           
         
            
            
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
                <br/>
            </div>}
            
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
                </ul> <br/>    
            </div>} 
           
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
                </ul>    <br/> 
            </div>}
           
            {activities && <div>
                <h3>Activities or Events</h3>
                <p>{activities}</p> <br/>
            </div>}
           
            {beverages && <div>
                <h3>Beverages</h3>
                <p>{beverages}</p><br/>
            </div>}

            {note && <div>
                <h3>Other note</h3>
                <div>
                    {note}
                </div> <br/>
            </div>
           }
        </div>
    );
};

export default DailyNote;
