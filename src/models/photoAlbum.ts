import { ApiState } from './api';
import type { SetStateAction, Dispatch } from 'react';

export interface PhotoAlbumModel {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type PhotoAlbumData = PhotoAlbumModel & { favorite: boolean };
export type PhotoAlbums = Array<ApiState<PhotoAlbumData>>;
export interface PhotoAlbumState {
  photoAlbums: PhotoAlbums;
  setPhotoAlbums: Dispatch<SetStateAction<PhotoAlbums>>;
  scrollTop: number;
  setScrollTop: Dispatch<SetStateAction<number>>;
}
