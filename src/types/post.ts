export type PostFilterValue = string | string[] | Date | null;

export type IPostItem = {
  id: string;
  socialName: string;
  image: string;
  title: string;
  text: string;
  date: Date | null;
  state?: string;
};

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  platforms: string[];
  mediaUrls: string[];
  taggedProfiles: string[];
  scheduleDate: Date;
  creationDate: Date;
  hashtags: string[];
  status: string;
  publish: boolean;
  likes: null;
  shares: null;
  comments: null;
  userId: string;
  ayrshareId: string;
}

export type IPostFilters = {
  socialNetworks: string[];
  startDate: Date | null;
  endDate: Date | null;
  state: string;
};

export type ISocialNetworksNames = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'tiktok';

export type ISocialnetworks = {
  name: ISocialNetworksNames;
  color: string;
};
