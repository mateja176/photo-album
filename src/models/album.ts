import { ApiState } from './api';
import type { SetStateAction, Dispatch } from 'react';

export interface AlbumModel {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type AlbumData = AlbumModel & { favorite: boolean };
export type Albums = Array<ApiState<AlbumData>>;
export interface AlbumState {
  albums: Albums;
  setAlbums: Dispatch<SetStateAction<Albums>>;
  scrollTop: number;
  setScrollTop: Dispatch<SetStateAction<number>>;
}
