import * as Sentry from "@sentry/node";

export const initializeSentry  = ( dsn: string ) => {
  Sentry.init({ dsn, tracesSampleRate: 1.0 });
};
