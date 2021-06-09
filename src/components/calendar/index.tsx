import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getDayNote,
  setSelectedDate,
  toggleEditMode,
} from "../../state/actionCreators/dailyNote.actionCreators";
import { RootState } from "../../store";

const Calendar = () => {
  const dispatch = useDispatch();
  const dailyNotesState = useSelector((state: RootState) => state.dailyNotes);
  const { dailyNotes: allDailyNotes, selectedDate, editMode } = dailyNotesState;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  //   const [selectedDate, setSelectedDate] = useState(new Date());

  // const changeMonthHandle = (btnType:string) => {
  //     if (btnType === "prev") {
  //     setCurrentMonth(subMonths(currentMonth, 1));
  //     }
  //     if (btnType === "next") {
  //     setCurrentMonth(addMonths(currentMonth, 1));
  //     }
  // };

  const changeWeekHandle = (btnType: string) => {
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
      <div className={`${styles.header} ${styles.row} flex-middle`}>
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
              dispatch(setSelectedDate(cloneDay));
              //setSelectedDate(cloneDay);
              dispatch(getDayNote(dayStr, allDailyNotes));
              if (editMode) {
                dispatch(toggleEditMode());
              }
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
      console.log("days of current weeks", days); //! thinking this need to be global state-->send to server to get data of current week only
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className={`${styles.header} ${styles.row} flex-middle`}>
        <div
          className={`${styles.col} ${styles.colStart}`}
          onClick={() => changeWeekHandle("prev")}
        >
          <div className={styles.icon}>
            <Icon name="chevron left" color="teal" size="big" />
          </div>
        </div>
        <div>{currentWeek}</div>
        <div
          className={`${styles.col} ${styles.colEnd}`}
          onClick={() => changeWeekHandle("next")}
        >
          <div className={styles.icon}>
            <Icon name="chevron right" color="teal" size="big" />
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
