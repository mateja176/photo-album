import { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlbumContext from '../context/albumContext';
import Album from '../components/Album';
import { AlbumData } from '../models/album';
import routeClasses from './Route.module.scss';
import classes from './Home.module.scss';

export interface HomeProps {}

const Home = (): JSX.Element => {
  const { albums, onToggleFavorite } = useContext(AlbumContext);
  const favoriteAlbums: AlbumData[] = useMemo(
    () =>
      albums.flatMap((album) =>
        album?.status === 'success' && album.data.favorite ? album.data : [],
      ),
    [albums],
  );

  return (
    <div className={routeClasses['route']}>
      <nav className={routeClasses['navigation']}>
        <Link to="/list">The list</Link>
      </nav>
      <h1>Favorites</h1>
      <ul className={classes['list']}>
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
