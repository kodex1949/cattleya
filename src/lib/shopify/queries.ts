export const GET_PRODUCT_BY_HANDLE = `
query getProduct($handle: String!) {
  product(handle: $handle) { id title }
}
`;
