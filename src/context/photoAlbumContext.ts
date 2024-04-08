import { createContext } from 'react';
import { PhotoAlbumState } from '../models/photoAlbum';

export const initialPhotoAlbumState: PhotoAlbumState = {
  photoAlbums: [],
  setPhotoAlbums: () => {},
};
const PhotoAlbumContext = createContext<PhotoAlbumState>(
  initialPhotoAlbumState,
);

export default PhotoAlbumContext;
