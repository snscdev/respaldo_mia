// ----------------------------------------------------------------------

export type ITourFilterValue = string | string[] | Date | IPeople[] | null;

export type ITourFilters = {
  tourGuides: IPeople[];
  destination: string[];
  services: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type IPeople = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type ITourBooker = {
  id: string;
  name?: string;
  avatarUrl?: string;
  guests?: number;
};

export interface ITourGuide {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
}


export type ITourItem = {
  id: string;
  name: string;
  tourGuides?: ITourGuide[] | undefined;
  price?: number;
  socials?: {
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    threads?: string | null;
    [key: string]: string | null | undefined;
  };
  totalViews?: number;
  tags?: string[];
  content: string;
  publish?: string;
  images: string[];
  durations?: string;
  priceSale?: number;
  services?: string[];
  destination?: string;
  ratingNumber?: number;
  bookers?: ITourBooker[];
  people?: IPeople[];
  createdAt?: Date;
  available?: {
    startDate?: Date;
    startTime?: Date;
    endDate?: Date;
  };
};
