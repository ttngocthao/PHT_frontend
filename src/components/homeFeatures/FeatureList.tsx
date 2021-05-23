import React from 'react';
import Feature from './Feature';
import styles from './styles.module.scss';
const FeatureList = () => {
  return (
    <ul className={styles.list}>
      <Feature 
        path='/weekly-view'
        iconName='book'
        title='Diary'
      />
      <Feature
        path='#'
        iconName='code'
        title='Comming Later'
      />
    </ul>
  );
};

export default FeatureList;
