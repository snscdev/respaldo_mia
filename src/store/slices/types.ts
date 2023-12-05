import { IPost, ISocialNetworksNames } from 'src/types/post';

export interface PostState {
  openModal: boolean;
  openModalPreviewMobile: boolean;
  postList: IPost[];
  formData: {
    errors: any;
    values: {
      title: string;
      content: string;
      mediaUrls: string[];
      scheduleDate: string;
      taggedProfiles: string[];
      hashtags: string[];
      publish: boolean;

      instagramOptions: {
        reels: boolean;
        shareReelsFeed: boolean;
        stories: boolean;
      };
      instagramComments: string;

      facebookOptions: {
        thumbNail: string;
        reels: boolean;
      };

      tikTokOptions: {
        disableComments: boolean;
        disableDuet: boolean;
        disableStitch: boolean;
      };

      linkedInOptions: {
        thumbNail: string;
      };

      twitterOptions: {
        longVideo: boolean;
        poll: {
          duration: number;
          options: string[];
        };
      };
    };
  };
  tabSelected: ISocialNetworksNames;
  socialNetworksConnected: ISocialNetworksNames[];
  socialNetworksToPublish: ISocialNetworksNames[];
  showCropSection: boolean;
  dataImageCrop: string;
  dataImageCroped: string;
}
