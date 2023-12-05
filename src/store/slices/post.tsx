'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost, ISocialNetworksNames } from 'src/types/post';
import { PostState } from './types';

const initialState: PostState = {
  openModal: false,
  openModalPreviewMobile: false,
  postList: [],
  formData: {
    errors: {},
    values: {
      /// constantes
      title: '',
      content: '',
      mediaUrls: [],
      scheduleDate: '',
      taggedProfiles: [],
      hashtags: [],
      publish: true,

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
    },
  },
  socialNetworksConnected: [],
  tabSelected: 'facebook',
  socialNetworksToPublish: [],
  showCropSection: false,
  dataImageCrop: '',
  dataImageCroped: '',
};

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setPostList: (state, action: PayloadAction<IPost>) => {
      state.postList.push(action.payload);
    },
    setUpdateFormDataMediaUrls: (state, action: PayloadAction<string>) => {
      state.formData.values.mediaUrls.push(action.payload);
    },
    setOpenModalPreviewMobile: (state, action: PayloadAction<boolean>) => {
      state.openModalPreviewMobile = action.payload;
    },
    setFormData: (state, action: PayloadAction<any>) => {
      state.formData = action.payload;
    },
    setTabSelected: (state, action: PayloadAction<ISocialNetworksNames>) => {
      state.tabSelected = action.payload;
    },
    setSocialNetworksConnected: (state, action: PayloadAction<ISocialNetworksNames[]>) => {
      state.socialNetworksConnected = action.payload;
    },
    setSocialNetworksToPublish: (state, action: PayloadAction<ISocialNetworksNames[]>) => {
      state.socialNetworksToPublish = action.payload;
    },
    setShowCropSection: (state, action: PayloadAction<boolean>) => {
      state.showCropSection = action.payload;
    },
    setDataImageCrop: (state, action: PayloadAction<string>) => {
      state.dataImageCrop = action.payload;
    },
    setDataImageCroped: (state, action: PayloadAction<string>) => {
      state.dataImageCroped = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenModal,
  setPostList,
  setOpenModalPreviewMobile,
  setFormData,
  setTabSelected,
  setSocialNetworksConnected,
  setSocialNetworksToPublish,
  setShowCropSection,
  setDataImageCrop,
  setDataImageCroped,
  setUpdateFormDataMediaUrls,
} = PostSlice.actions;

export default PostSlice.reducer;
