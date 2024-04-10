import { useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-virtualized/styles.css';
import ErrorPage from './ErrorPage';
import PhotoAlbumContext from './context/photoAlbumContext';
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
    path: '/list',
    Component: PhotoAlbums,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const [photoAlbums, setPhotoAlbums] = useState<
    PhotoAlbumState['photoAlbums']
  >([]);
  const context: PhotoAlbumState = useMemo(
    () => ({
      photoAlbums,
      setPhotoAlbums,
      scrollTop,
      setScrollTop,
    }),
    [photoAlbums, scrollTop],
  );
  return (
    <PhotoAlbumContext.Provider value={context}>
      <RouterProvider router={router} />
    </PhotoAlbumContext.Provider>
  );
}

export default App;
