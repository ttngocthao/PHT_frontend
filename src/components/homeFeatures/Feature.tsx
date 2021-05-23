import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import styles from './styles.module.scss';
interface Props {
  path: string
  title: string
  iconName:SemanticICONS
}
const Feature = ({path,title,iconName}:Props) => {
  return (
    <li className={styles.itemWrap}>
      <Link className={styles.itemLink} to={path}>
        <Icon name={iconName} size='huge' className={styles.icon}/>
        <h2 className={styles.title}>{title}</h2>
      </Link>      
    </li>
  );
};

export default Feature;
