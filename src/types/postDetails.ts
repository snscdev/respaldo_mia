export type IPostDetails = {
  post: string;
  platforms: (string | undefined)[] | undefined;
  mediaUrls: any[] | undefined;
  scheduleDate: string;
};
export type IPostResponse = {
  id: string;
  status: string;
  platform: string;
  postUrl: string;
};
