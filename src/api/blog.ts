import useSWR, { SWRConfiguration } from 'swr';
import { useMemo } from 'react';
import { AxiosRequestConfig } from 'axios';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { IPostItem } from 'src/types/blog';

// Generic function to handle SWR fetch
function useSWRFetch<T = any>(url: string | [string, AxiosRequestConfig<any>] | null, fetcherFn: typeof fetcher, config?: SWRConfiguration) {
  return useSWR<T, any>(url, fetcherFn, config);
}


// ----------------------------------------------------------------------

export function useGetPosts() {
  const { data, isLoading, error, isValidating } = useSWRFetch<{ posts: IPostItem[] }>(endpoints.post.list, fetcher);

  return useMemo(
    () => ({
      posts: data?.posts || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.posts.length,
    }),
    [data?.posts, error, isLoading, isValidating]
  );
}

// ----------------------------------------------------------------------

export function useGetPost(title: string) {
  const URL = title ? `${endpoints.post.details}?title=${title}` : null;
  const { data, isLoading, error, isValidating } = useSWRFetch(URL, fetcher);

  return useMemo(
    () => ({
      post: data?.post as IPostItem,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data?.post, error, isLoading, isValidating]
  );
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? `${endpoints.post.latest}?title=${title}` : null;
  const { data, isLoading, error, isValidating } = useSWRFetch(URL, fetcher);
  return useMemo(
    () => ({
      latestPosts: (data?.latestPosts as IPostItem[]) || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const URL = query ? `${endpoints.post.search}?query=${query}` : null;

  const { data, isLoading, error, isValidating } = useSWRFetch(URL, fetcher, {
    keepPreviousData: true,
  });

  return useMemo(
    () => ({
      searchResults: (data?.results as IPostItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );
}
