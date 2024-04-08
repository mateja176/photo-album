export type ApiState<Data, Err extends Error = Error> =
  | undefined
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Err };
