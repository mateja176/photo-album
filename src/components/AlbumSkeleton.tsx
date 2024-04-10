export interface AlbumSkeletonProps {}

const AlbumSkeleton = (): JSX.Element => {
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
          <div
            style={{
              width: '100%',
              height: '2rem',
              backgroundColor: 'lightgrey',
            }}
          />
        </div>
        <div
          style={{
            marginBottom: '1rem',
            alignSelf: 'flex-start',
            backgroundColor: 'lightgrey',
          }}
        >
          <button
            aria-hidden="true"
            style={{
              visibility: 'hidden',
            }}
          >
            Add to favorites
          </button>
        </div>
      </div>
    </li>
  );
};

export default AlbumSkeleton;
