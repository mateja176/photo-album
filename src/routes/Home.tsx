import { useMemo, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PhotoAlbumContext from '../context/photoAlbumContext';
import PhotoAlbum from '../components/PhotoAlbum';
import { PhotoAlbumData, PhotoAlbumModel } from '../models/photoAlbum';

export interface HomeProps {}

const Home = (): JSX.Element => {
  const { photoAlbums, setPhotoAlbums } = useContext(PhotoAlbumContext);
  const favoriteAlbums: PhotoAlbumData[] = useMemo(
    () =>
      photoAlbums.flatMap((album) =>
        album?.status === 'success' && album.data.favorite ? album.data : [],
      ),
    [photoAlbums],
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
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Link to="/photo-albums">Photo Albums</Link>
      <ul>
        {favoriteAlbums.map((album) => (
          <PhotoAlbum
            key={album.id}
            onToggleFavorite={onToggleFavorite}
            {...album}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
