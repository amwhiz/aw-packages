import { URLS } from '../constants/url';
import { UrlsPathType } from '../types/urls';

export const getUrl = (stage: string, path: UrlsPathType): string => `${stage === 'dev' ? URLS['devBaseURI'] : URLS['baseURI']}${URLS[path]}`;
