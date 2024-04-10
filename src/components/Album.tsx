import { Dispatch, MouseEventHandler, useCallback } from 'react';
import { AlbumData } from '../models/album';

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

export default Album;
