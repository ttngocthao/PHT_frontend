import React from 'react';
import styles from './styles.module.scss';
interface Props {
  date: string
}
const DateIcon = ({date}:Props) => {
 const theDate = date[4]+ date[5];
 const theMonth = date[7] + date[8] + date[9];
  return (
    <div className={styles.wrap}>
	<div className={styles.info}>
		<div className={styles.heading}>{theMonth}</div>
		<div className={styles.body}>{theDate}</div>
	</div>
</div>
  );
};

export default DateIcon;
