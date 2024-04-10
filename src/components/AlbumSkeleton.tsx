import classes from './Album.module.scss';
import clsx from 'clsx';

export interface AlbumSkeletonProps {}

const AlbumSkeleton = (): JSX.Element => {
  return (
    <li className={classes['list-item']}>
      <div className={classes['figure']} />
      <div className={classes['main']}>
        <div className={classes['section']}>
          <div className={clsx(classes['placeholder'], 'loading')} />
        </div>
        <div className={clsx(classes['actions'], 'loading')}>
          <button aria-hidden="true" className="hidden">
            Add to favorites
          </button>
        </div>
      </div>
    </li>
  );
};

export default AlbumSkeleton;
