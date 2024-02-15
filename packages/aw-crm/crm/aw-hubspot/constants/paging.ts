import { PagingType } from '../types/responseType';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultPagingResults: PagingType<any> = {
  paging: {
    next: {
      after: '',
      link: '',
    },
    prev: {
      before: '',
      link: '',
    },
  },
  results: [],
};
