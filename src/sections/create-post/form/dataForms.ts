import * as Yup from 'yup';

export const initialValues = {
  /// constantes
  title: '',
  content: '',
  mediaUrls: [],
  scheduleDate: '',
  taggedProfiles: [],
  hashtags: [],
  publish: false,

  /// Instagram
  instagramOptions: {
    reels: false,
    shareReelsFeed: false,
    stories: false,
  },
  instagramComments: '',

  /// Facebook
  facebookOptions: {
    thumbNail: 'string',
    reels: false,
  },

  /// TikTok
  tikTokOptions: {
    disableComments: true,
    disableDuet: true,
    disableStitch: true,
  },

  /// LinkedIn
  linkedInOptions: {
    thumbNail: 'string',
  },

  /// Twitter
  twitterOptions: {
    longVideo: false,
    poll: {
      duration: 0,
      options: ['string'],
    },
  },
};

export const validationSchema = Yup.object({
  content: Yup.string().required('Introduce un texto'),
});
