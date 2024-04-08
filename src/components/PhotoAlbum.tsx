import { PhotoAlbumData } from '../models/photoAlbum';

export interface PhotoAlbumProps extends PhotoAlbumData {}

const PhotoAlbum = (props: PhotoAlbumProps): JSX.Element => {
  return <li>{props.id}</li>;
};

export default PhotoAlbum;
