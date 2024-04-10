import { useCallback, useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-virtualized/styles.css';
import ErrorPage from './ErrorPage';
import AlbumContext from './context/albumContext';
import { AlbumModel, AlbumState } from './models/album';
import Home from './routes/Home';
import Albums from './routes/Albums';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    errorElement: <ErrorPage />,
  },
  {
    path: '/list',
    Component: Albums,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  const [albums, setAlbums] = useState<AlbumState['albums']>([]);
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
  const context: AlbumState = useMemo(
    () => ({
      albums,
      setAlbums,
      onToggleFavorite,
      scrollTop,
      setScrollTop,
    }),
    [albums, onToggleFavorite, scrollTop],
  );
  return (
    <AlbumContext.Provider value={context}>
      <RouterProvider router={router} />
    </AlbumContext.Provider>
  );
}

export default App;
