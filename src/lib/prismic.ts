import Prismic from 'prismic-javascript';

export const apiEndpoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}`;
//export const apiEndpoint = 'https://devcommerce.cdn.prismic.io/api/v2';

export const client = (req = null) => {
  const options = req ? { req } : null;

  return Prismic.client(apiEndpoint, options)
};
