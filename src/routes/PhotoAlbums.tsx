import { useCallback, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  InfiniteLoader,
  List,
  type IndexRange,
  type Index,
  type ListRowProps,
  AutoSizer,
  ScrollParams,
} from 'react-virtualized';
import PhotoAlbumContext from '../context/photoAlbumContext';
import PhotoAlbum from '../components/PhotoAlbum';
import { PhotoAlbumModel, PhotoAlbumState } from '../models/photoAlbum';
import PhotoAlbumSkeleton from '../components/PhotoAlbumSkeleton';

const rowCount = 50;

export interface PhotoAlbumsProps {}

const PhotoAlbums = (): JSX.Element => {
  const { photoAlbums, setPhotoAlbums, scrollTop, setScrollTop } =
    useContext(PhotoAlbumContext);
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
      return !!photoAlbums[index];
    },
    [photoAlbums],
  );
  const loadMoreRows = useCallback(
    ({ startIndex, stopIndex }: IndexRange) => {
      console.log({ startIndex, stopIndex });
      const start = startIndex;
      const limit = stopIndex - startIndex + 1;
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
        `https://jsonplaceholder.typicode.com/albums/1/photos?_start=${start}&_limit=${limit}`,
      )
        .then((response) => {
          // TODO validate data shape
          if (!response.ok) {
            throw new Error('Failed to load batch of photo albums.');
          }
          return response.json();
        })
        .then((data: PhotoAlbumModel[]) => {
          return setPhotoAlbums((albums) => {
            return range.reduce<PhotoAlbumState['photoAlbums']>(
              (newAlbums, _, index) => {
                const albumIndex = index + startIndex;
                const album = data[index];
                return album
                  ? [
                      ...newAlbums.slice(0, albumIndex),
                      {
                        status: 'success',
                        data: { ...album, favorite: false },
                      },
                      ...newAlbums.slice(albumIndex + 1),
                    ]
                  : newAlbums;
              },
              albums,
            );
          });
        })
        .catch((err) => {
          return setPhotoAlbums((albums) => {
            return range.reduce<PhotoAlbumState['photoAlbums']>(
              (newAlbums, _, index) => {
                const albumIndex = index + startIndex;
                return [
                  ...newAlbums.slice(0, albumIndex),
                  {
                    status: 'error',
                    error:
                      err instanceof Error ? err : new Error('Unknown error.'),
                  },
                  ...newAlbums.slice(albumIndex + 1),
                ];
              },
              albums,
            );
          });
        });
    },
    [setPhotoAlbums],
  );
  const onToggleFavorite = useCallback(
    (id: PhotoAlbumModel['id']) => {
      setPhotoAlbums((albums) =>
        albums.map((album) =>
          album?.status === 'success' && album.data.id === id
            ? {
                ...album,
                data: { ...album.data, favorite: !album.data.favorite },
              }
            : album,
        ),
      );
    },
    [setPhotoAlbums],
  );
  const rowRenderer = useCallback(
    ({ key, index, style }: ListRowProps) => {
      const album = photoAlbums[index];
      return (
        <div key={key} style={style}>
          {album?.status === 'success' ? (
            <PhotoAlbum
              url={album.data.thumbnailUrl}
              id={album.data.id}
              title={album.data.title}
              actionText={
                album.data.favorite
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
              onAction={onToggleFavorite}
            />
          ) : album?.status === 'loading' ? (
            <PhotoAlbumSkeleton />
          ) : album?.status === 'error' ? (
            <PhotoAlbum
              url={null}
              id={index + 1}
              title={album?.error.message}
              actionText="Retry"
              onAction={() => {
                // TODO
              }}
            />
          ) : null}
        </div>
      );
    },
    [photoAlbums, onToggleFavorite],
  );

  const onScroll = useCallback(
    (scrollParams: ScrollParams) => {
      setScrollTop(scrollParams.scrollTop);
    },
    [setScrollTop],
  );
  const listRef = useRef<List | null>(null);
  useEffect(() => {
    if (scrollTop) {
      listRef.current?.scrollToPosition(scrollTop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingBottom: '8rem',
        paddingTop: '2rem',
        paddingLeft: '2rem',
      }}
    >
      <div style={{ marginRight: 'auto' }}>
        <Link to="/">Back to home</Link>
      </div>
      <h1>Photo Albums</h1>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
        minimumBatchSize={10}
        threshold={10}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                style={{ marginTop: 5 }}
                height={height}
                onRowsRendered={onRowsRendered}
                ref={(ref) => {
                  registerChild(ref);
                  listRef.current = ref;
                }}
                rowCount={rowCount}
                rowHeight={155}
                rowRenderer={rowRenderer}
                width={width}
                onScroll={onScroll}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default PhotoAlbums;
