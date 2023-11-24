import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher, endpoints } from 'src/utils/axios';
import { IProductItem } from 'src/types/product';

interface ProductListData {
  products: IProductItem[];
}

interface ProductData {
  product: IProductItem;
}

interface SearchProductData {
  results: IProductItem[];
}

export function useGetProducts() {
  const { data } = useSWR<ProductListData>(endpoints.product.list, fetcher);

  return useMemo(() => ({
    products: data?.products || [],
    productsLoading: !data,
    productsError: data ? null : 'Error fetching products',
    productsValidating: !data,
    productsEmpty: !data?.products.length,
  }), [data]);
}

export function useGetProduct(productId: string) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : null;
  const { data, error } = useSWR<ProductData>(URL, fetcher);

  return useMemo(() => ({
    product: data?.product,
    productLoading: !data,
    productError: error,
    productValidating: !data,
  }), [data, error]);
}

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : null;
  const { data } = useSWR<SearchProductData>(URL, fetcher, {
    keepPreviousData: true,
  });

  return useMemo(() => ({
    searchResults: data?.results || [],
    searchLoading: !data,
    searchError: data ? null : 'Error fetching search results',
    searchValidating: !data,
    searchEmpty: !data?.results.length,
  }), [data]);
}
