import React,{useState} from 'react';
import { Icon } from 'semantic-ui-react';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import styles from './styles.module.css';
// import CSS from 'csstype';
// const stylesVar ={
//     borderColor: '#eee',
//     neutralColor:'#fff',
// };
// interface IStyles {
//     calendar:CSS.Properties,
//     header: CSS.Properties,
//     row: CSS.Properties,
// }
// const styles:IStyles ={
//     calendar:{
//         display: 'block',
//         position: 'relative',
//         width:'100%',
//         background: `${stylesVar.neutralColor}`,
//         border: `1px solid ${stylesVar.borderColor}`
//     },
//     header:{
//         display: 'block',
//         width: '100%',
//         padding: '1.75em 0',
//         borderBottom: `1px solid ${stylesVar.borderColor}`,
//         background: `${stylesVar.neutralColor}`
//     },
//     row:{
//         margin: 0,
//         padding: 0,
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         width: '100%'
//     },
    
// };


const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());

    // const changeMonthHandle = (btnType:string) => {
    //     if (btnType === "prev") {
    //     setCurrentMonth(subMonths(currentMonth, 1));
    //     }
    //     if (btnType === "next") {
    //     setCurrentMonth(addMonths(currentMonth, 1));
    //     }
    // };

  const changeWeekHandle = (btnType:string) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };
const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className={`${styles.header} ${styles.row} flex-middle`} >
        <div className={`${styles.col} ${styles.colStart}`}>
          {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div> */}
        </div>
        <div className={`${styles.col} ${styles.colCenter}`}>
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className={`${styles.col} ${styles.colEnd}`}>
          {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`${styles.col} ${styles.colCenter}`} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`${styles.col} ${styles.cell} ${
              isSameDay(day, new Date())
                ? styles.today
                : isSameDay(day, selectedDate)
                ? styles.selected
                : ""
            }`}
            key={i}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              setSelectedDate(cloneDay);
              console.log(dayStr);
             // onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className={styles.number}>{formattedDate}</span>
            <span className={styles.bg}>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className={styles.row} key={formattedDate}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className={`${styles.header} ${styles.row} flex-middle`}>
        <div className={`${styles.col} ${styles.colStart}`} onClick={() => changeWeekHandle("prev")}>
         <div className={styles.icon}>
              <Icon name='chevron left' color='teal' size='big' />
         </div>
          
           
          
        </div>
        <div>{currentWeek}</div>
        <div className={`${styles.col} ${styles.colEnd}`} onClick={() => changeWeekHandle("next")}>
          <div className={styles.icon}>
            
              <Icon name='chevron right' color='teal' size='big'/>
          </div>
        </div>
      </div>
    );
  };
    return (
        <div className={styles.calendar}>
            {renderHeader()}
            {renderDays()}
            {renderCells()}
            {renderFooter()} 
        </div>
    );
};

export default Calendar;

/**
 * to use the Semantic ui, need to add this link into index.html file
 * <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css">
 */
