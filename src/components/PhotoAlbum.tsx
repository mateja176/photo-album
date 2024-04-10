import { Dispatch, MouseEventHandler, useCallback } from 'react';
import { PhotoAlbumData } from '../models/photoAlbum';

export interface PhotoAlbumProps extends Pick<PhotoAlbumData, 'id' | 'title'> {
  url: PhotoAlbumData['thumbnailUrl'] | null;
  actionText: string;
  onAction: Dispatch<PhotoAlbumData['id']>;
}

const PhotoAlbum = (props: PhotoAlbumProps): JSX.Element => {
  const onAction: MouseEventHandler = useCallback(() => {
    props.onAction(props.id);
  }, [props]);
  return (
    <li style={{ display: 'flex', columnGap: '1rem' }}>
      <div style={{ width: 150, height: 150, backgroundColor: 'lightgrey' }}>
        {props.url ? <img src={props.url} alt={props.title} /> : null}
      </div>
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            flexGrow: 1,
          }}
        >
          <span>{props.id}.</span>
          <span style={{ marginLeft: 5 }}>{props.title}</span>
        </p>
        <div
          style={{
            marginBottom: '1rem',
            alignSelf: 'flex-start',
          }}
        >
          <button onClick={onAction}>{props.actionText}</button>
        </div>
      </div>
    </li>
  );
};

export default PhotoAlbum;
