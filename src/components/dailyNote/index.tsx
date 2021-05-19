import React from 'react';

interface Props {
    fastingHours?:string
    sleepingHours?: string
    date: string
    note?: string
    fastingProtocol:string
}

const DailyNote = ({fastingHours,sleepingHours,date,note,fastingProtocol}:Props) => {
    return (
        <div>
            <h2>It&#39;s {date} - {fastingProtocol} - [if no medication, shows here]</h2>
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
            <div>
                <h3>Medication</h3>
                <p>if taken medication, shows here</p>
            </div>
        </div>
    );
};

export default DailyNote;
