import { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import PhotoAlbumContext from '../context/photoAlbumContext';
import PhotoAlbum from '../components/PhotoAlbum';
import { PhotoAlbumData } from '../models/photoAlbum';

export interface HomeProps {}

const Home = (): JSX.Element => {
  const { photoAlbums } = useContext(PhotoAlbumContext);
  const favoriteAlbums: PhotoAlbumData[] = useMemo(
    () =>
      photoAlbums.flatMap((album) =>
        album?.status === 'success' && album.data.favorite ? album.data : [],
      ),
    [photoAlbums],
  );
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Link to="/photo-albums">Photo Albums</Link>
      <ul>
        {favoriteAlbums.map((album) => (
          <PhotoAlbum {...album} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
