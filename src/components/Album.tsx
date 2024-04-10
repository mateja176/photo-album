import { Dispatch, MouseEventHandler, useCallback } from 'react';
import { AlbumData } from '../models/album';
import classes from './Album.module.scss';

export interface AlbumProps extends Pick<AlbumData, 'id' | 'title'> {
  url: AlbumData['thumbnailUrl'] | null;
  actionText: string;
  onAction: Dispatch<AlbumData['id']>;
}

const Album = (props: AlbumProps): JSX.Element => {
  const onAction: MouseEventHandler = useCallback(() => {
    props.onAction(props.id);
  }, [props]);
  return (
    <li className={classes['list-item']}>
      <div className={classes['figure']}>
        {props.url ? <img src={props.url} alt={props.title} /> : null}
      </div>
      <div className={classes['main']}>
        <p className={classes['section']}>
          <span>{props.id}.</span>
          <span className={classes['title']}>{props.title}</span>
        </p>
        <div className={classes['actions']}>
          <button onClick={onAction}>{props.actionText}</button>
        </div>
      </div>
    </li>
  );
};

export default Album;
