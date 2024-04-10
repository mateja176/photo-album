export interface PhotoAlbumErrorProps {
  message: string;
  onRetry: <Data>() => Promise<Data>;
}

const PhotoAlbumError = (props: PhotoAlbumErrorProps): JSX.Element => {
  return (
    <li style={{ display: 'flex', columnGap: '1rem' }}>
      <div style={{ width: 150, height: 150, backgroundColor: 'lightgrey' }} />
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 5,
        }}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <p
            style={{
              flexGrow: 1,
            }}
          >
            {props.message}
          </p>
        </div>
        <div
          style={{
            marginBottom: '1rem',
            alignSelf: 'flex-start',
          }}
        >
          <button onClick={props.onRetry}>Retry</button>
        </div>
      </div>
    </li>
  );
};

export default PhotoAlbumError;
