import type { NextComponentType } from 'next';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';
import { ReactElement, ReactNode } from 'react';
declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P & { router: Router }> & {
    getLayout?: (page: ReactElement, props: P) => ReactNode;
  };
}
