import { useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-virtualized/styles.css';
import './App.css';
import ErrorPage from './ErrorPage';
import PhotoAlbumContext, {
  initialPhotoAlbumState,
} from './context/photoAlbumContext';
import { PhotoAlbumState } from './models/photoAlbum';
import Home from './routes/Home';
import PhotoAlbums from './routes/PhotoAlbums';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    errorElement: <ErrorPage />,
  },
  {
    path: '/photo-albums',
    Component: PhotoAlbums,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [photoAlbums, setPhotoAlbums] = useState<
    PhotoAlbumState['photoAlbums']
  >([]);
  const context: PhotoAlbumState = useMemo(
    () => ({
      ...initialPhotoAlbumState,
      photoAlbums,
      setPhotoAlbums,
    }),
    [photoAlbums],
  );
  return (
    <PhotoAlbumContext.Provider value={context}>
      <RouterProvider router={router} />
    </PhotoAlbumContext.Provider>
  );
}

export default App;
