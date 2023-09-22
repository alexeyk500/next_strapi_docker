import React from 'react';
import classes from './NewsCard.module.css';

interface INewsCardProps {
  tile: string;
  description: string;
  imgUrl: string;
}

const NewsCard: React.FC <INewsCardProps>= ({tile, description, imgUrl}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {tile}
      </div>
      <div className={classes.description}>
        {description}
      </div>
      <div className={classes.imgContainer}>
        <img src={imgUrl} className={classes.img} alt="imgUrl" />
      </div>
    </div>
  );
};

export default NewsCard;