import { Dispatch, MouseEventHandler, useCallback } from 'react';
import { PhotoAlbumData } from '../models/photoAlbum';

export interface PhotoAlbumProps extends PhotoAlbumData {
  onToggleFavorite: Dispatch<PhotoAlbumData['id']>;
}

const PhotoAlbum = (props: PhotoAlbumProps): JSX.Element => {
  const onToggleFavorite: MouseEventHandler = useCallback(() => {
    props.onToggleFavorite(props.id);
  }, [props]);
  return <li onClick={onToggleFavorite}>{props.id}</li>;
};

export default PhotoAlbum;
