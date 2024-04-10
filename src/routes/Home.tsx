import { useMemo, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../context/albumContext';
import Album from '../components/Album';
import { AlbumData, AlbumModel } from '../models/album';

export interface HomeProps {}

const Home = (): JSX.Element => {
  const { albums, setAlbums } = useContext(AlbumContext);
  const favoriteAlbums: AlbumData[] = useMemo(
    () =>
      albums.flatMap((album) =>
        album?.status === 'success' && album.data.favorite ? album.data : [],
      ),
    [albums],
  );
  const onToggleFavorite = useCallback(
    (id: AlbumModel['id']) => {
      setAlbums((currentAlbums) =>
        currentAlbums.map((album) =>
          album?.status === 'success' && album.data.id === id
            ? {
                ...album,
                data: { ...album.data, favorite: !album.data.favorite },
              }
            : album,
        ),
      );
    },
    [setAlbums],
  );
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
      <Link to="/list">The list</Link>
      <h1>Favorites</h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {favoriteAlbums.length ? (
          favoriteAlbums.map((album) => (
            <Album
              key={album.id}
              url={album.thumbnailUrl}
              id={album.id}
              title={album.title}
              actionText={
                album.favorite ? 'Remove from favorites' : 'Add to favorites'
              }
              onAction={onToggleFavorite}
            />
          ))
        ) : (
          <p>
            Visit <Link to="/list">the list</Link> to add albums to favorites.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Home;
