import { PagePaths } from '../routes/config';

export const getBaseUrl = () => {

  const pages = Object.values(PagePaths).filter((page) => page !== '/').map((page) => page.replace(/\//g, ''));

  if (typeof window === 'undefined') return '/';

  const pathname = window.location.pathname;

  const segments = pathname.split('/').filter(str=> str !== 'index.html');

  if (pages.includes(segments[0])) {
    segments.shift();
  }

  return segments.length > 0 ? `/${segments[0]}` : '/';

};

export const getRelativePath = (path: string): string => {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const fullPath = `${baseUrl}${normalizedPath}`;

  return fullPath.replace(/\/{2,}/g, '/');
};
