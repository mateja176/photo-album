import { useCallback, useContext, useEffect, useRef } from 'react';
import classes from './Route.module.scss';
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
import AlbumContext from '../context/albumContext';
import Album from '../components/Album';
import { AlbumModel, AlbumState } from '../models/album';
import AlbumSkeleton from '../components/AlbumSkeleton';

const rowCount = 50;

export interface AlbumsProps {}

const Albums = (): JSX.Element => {
  const { albums, setAlbums, onToggleFavorite, scrollTop, setScrollTop } =
    useContext(AlbumContext);
  const isRowLoaded = useCallback(
    ({ index }: Index): boolean => {
      return !!albums[index];
    },
    [albums],
  );
  const loadMoreRows = useCallback(
    ({ startIndex, stopIndex }: IndexRange) => {
      console.log({ startIndex, stopIndex });
      const start = startIndex;
      const limit = stopIndex - startIndex + 1;
      const range = Array(limit).fill(0);
      setAlbums((currentAlbums) => {
        return range.reduce((newAlbums, _, index) => {
          const albumIndex = index + startIndex;
          return [
            ...newAlbums.slice(0, albumIndex),
            { status: 'loading' },
            ...newAlbums.slice(albumIndex + 1),
          ];
        }, currentAlbums);
      });
      return fetch(
        `https://jsonplaceholder.typicode.com/albums/1/photos?_start=${start}&_limit=${limit}`,
      )
        .then((response) => {
          // TODO validate data shape
          if (!response.ok) {
            throw new Error('Failed to load batch of albums.');
          }
          return response.json();
        })
        .then((data: AlbumModel[]) => {
          return setAlbums((currentAlbums) => {
            return range.reduce<AlbumState['albums']>((newAlbums, _, index) => {
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
            }, currentAlbums);
          });
        })
        .catch((err) => {
          return setAlbums((currentAlbums) => {
            return range.reduce<AlbumState['albums']>((newAlbums, _, index) => {
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
            }, currentAlbums);
          });
        });
    },
    [setAlbums],
  );
  const rowRenderer = useCallback(
    ({ key, index, style }: ListRowProps) => {
      const album = albums[index];
      return (
        <div key={key} style={style}>
          {album?.status === 'success' ? (
            <Album
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
            <AlbumSkeleton />
          ) : album?.status === 'error' ? (
            <Album
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
    [albums, onToggleFavorite],
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
    <div className={classes['route']}>
      <nav className={classes['navigation']}>
        <Link to="/">Back to home</Link>
      </nav>
      <h1>Albums</h1>
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

export default Albums;
