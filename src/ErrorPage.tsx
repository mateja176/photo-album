import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string' ? (
        <p>
          <i>{error.message}</i>
        </p>
      ) : null}
    </div>
  );
}
