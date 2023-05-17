import * as Sentry from '../../sentry.config';

export const captureError = (error: Error): void => {
  Sentry.captureException(error);
}
