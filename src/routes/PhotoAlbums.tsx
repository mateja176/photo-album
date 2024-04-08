import { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  InfiniteLoader,
  List,
  type IndexRange,
  type Index,
  type ListRowProps,
} from 'react-virtualized';
import PhotoAlbumContext from '../context/photoAlbumContext';
import PhotoAlbum from '../components/PhotoAlbum';
import { PhotoAlbumModel } from '../models/photoAlbum';

const rowCount = 50;
const pageSize = 10;

export interface PhotoAlbumsProps {}

const PhotoAlbums = (): JSX.Element => {
  const { photoAlbums, setPhotoAlbums } = useContext(PhotoAlbumContext);
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
      return !!photoAlbums[index];
    },
    [photoAlbums],
  );
  const loadMoreRows = useCallback(
    ({ startIndex, stopIndex }: IndexRange) => {
      console.log({ startIndex, stopIndex });
      const limit = stopIndex - startIndex + 1;
      const page = (startIndex ? startIndex / pageSize : 0) + 1;
      const range = Array(limit).fill(0);
      setPhotoAlbums((albums) => {
        return range.reduce((newAlbums, _, index) => {
          const albumIndex = index + startIndex;
          return [
            ...newAlbums.slice(0, albumIndex),
            { status: 'loading' },
            ...newAlbums.slice(albumIndex + 1),
          ];
        }, albums);
      });
      return fetch(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=${limit}`,
      )
        .then((response) => {
          // TODO validate data shape
          return response.json();
        })
        .then((data: PhotoAlbumModel[]) => {
          return setPhotoAlbums((albums) => {
            return range.reduce((newAlbums, _, index) => {
              const albumIndex = index + startIndex;
              return [
                ...newAlbums.slice(0, albumIndex),
                { status: 'success', data: data[index] },
                ...newAlbums.slice(albumIndex + 1),
              ];
            }, albums);
          });
        });
    },
    [setPhotoAlbums],
  );
  const rowRenderer = useCallback(
    ({ key, index, style }: ListRowProps) => {
      const album = photoAlbums[index];
      return (
        <div key={key} style={style}>
          {album?.status === 'success' ? <PhotoAlbum {...album.data} /> : null}
        </div>
      );
    },
    [photoAlbums],
  );

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Link to="/">Favorites</Link>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
        minimumBatchSize={10}
        threshold={10}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
            height={200}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={rowCount}
            rowHeight={20}
            rowRenderer={rowRenderer}
            width={300}
          />
        )}
      </InfiniteLoader>
    </div>
  );
};

export default PhotoAlbums;
