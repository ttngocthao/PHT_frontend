import React from 'react';

interface Props {
    fastingHours?:string
    sleepingHours?: string
    date: string
    note?: string
}

const DailyNote = ({fastingHours,sleepingHours,date,note}:Props) => {
    return (
        <div>
            <h2>It&#39;s {date}</h2>
            <div>
                <p>Fasting hours: {fastingHours} hours</p>
                <p>Sleeping hours: {sleepingHours} hours</p>
            </div>
            <br/>
            <div>
                <h3>How are you feeling today?</h3>
                <div>
                    {note}
                </div>
            </div>
        </div>
    );
};

export default DailyNote;
