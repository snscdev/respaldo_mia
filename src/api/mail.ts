import useSWR, { SWRConfiguration } from 'swr';
import keyBy from 'lodash/keyBy';
import { useMemo } from 'react';
import { fetcher, endpoints } from 'src/utils/axios';
import { IMail, IMails, IMailLabel } from 'src/types/mail';

function useSWRFetch<T = any>(url: string | [string, Record<string, any>] | null, config?: SWRConfiguration<T>) {
  const { data, error } = useSWR<T>(url, url ? fetcher : null, config);
  const isLoading = !data && !error;
  const isValidating = !data && !error;

  return { data, error, isLoading, isValidating };
}

export function useGetLabels() {
  const { data, isLoading, error, isValidating } = useSWRFetch<IMailLabel[]>(endpoints.mail.labels);

  return useMemo(() => ({
    labels: data || [],
    labelsLoading: isLoading,
    labelsError: error,
    labelsValidating: isValidating,
    labelsEmpty: !isLoading && !data?.length,
  }), [data, error, isLoading, isValidating]);
}

export function useGetMails(labelId?: string) {
  const URL: [string, Record<string, any>] | null = labelId ? [endpoints.mail.list, { params: { labelId } }] : null;
  const { data, isLoading, error, isValidating } = useSWRFetch<{ mails: IMail[] }>(URL);

  return useMemo(() => {
    const byId = keyBy(data?.mails, 'id') || {};
    const allIds = Object.keys(byId);

    return {
      mails: { byId, allIds } as IMails,
      mailsLoading: isLoading,
      mailsError: error,
      mailsValidating: isValidating,
      mailsEmpty: !isLoading && !allIds.length,
    };
  }, [data, error, isLoading, isValidating]);
}

export function useGetMail(mailId?: string) {
  const URL: [string, Record<string, any>] | null = mailId ? [endpoints.mail.details, { params: { mailId } }] : null;
  const { data, isLoading, error, isValidating } = useSWRFetch<{ mail: IMail }>(URL);

  return useMemo(() => ({
    mail: data?.mail,
    mailLoading: isLoading,
    mailError: error,
    mailValidating: isValidating,
  }), [data, error, isLoading, isValidating]);
}
