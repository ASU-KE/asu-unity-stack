export const getBaseUrl = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return '/';

  const host = window.location.host;
  const pathname = window.location.pathname;
  const isS3Hosting = host.includes('amazonaws.com');

  let basename = '/';

  // GitHub Pages
  if (host.includes('.github.io')) {
    basename = '/asu-unity-stack';
  }
  // S3 Static Hosting
  else if (isS3Hosting) {
    basename = './';
  }
  // Local Build
  else if (pathname.includes('/build/')) {
    basename = pathname.replace(/(.*?\/build\/).*/, '$1');
  }

  return basename;
};

export const getRelativePath = (path: string): string => {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`.replace(/\/+/g, '/');
};
