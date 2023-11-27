'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost, ISocialNetworksNames } from 'src/types/post';

export interface PostState {
  openModal: boolean;
  openModalPreviewMobile: boolean;
  previewData: IPost;
  previewSelected: ISocialNetworksNames | string;
  postList: IPost[];
  formData: {
    errors: any;
    values: any;
  };
  tabSelected: ISocialNetworksNames;
  socialNetworksConnected: ISocialNetworksNames[];
  socialNetworksToPublish: ISocialNetworksNames[];
}

const initialState: PostState = {
  openModal: false,
  openModalPreviewMobile: false,
  previewData: {
    id: '6471648e-d6c5-4fdc-a156-56ba19583019',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    content: '',
    platforms: [],
    mediaUrls: [''],
    taggedProfiles: [''],
    scheduleDate: new Date(),
    hashtags: [''],
    status: '',
    publish: true,
    likes: null,
    shares: null,
    comments: null,
    userId: '',
    ayrshareId: '',
  },
  previewSelected: '',
  postList: [],
  formData: {
    errors: {},
    values: {},
  },
  socialNetworksConnected: ['facebook'],
  tabSelected: 'facebook',
  socialNetworksToPublish: [],
};

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setPreviewData: (state, action: PayloadAction<IPost>) => {
      state.previewData = action.payload;
    },
    setPostList: (state, action: PayloadAction<IPost[]>) => {
      state.postList = action.payload;
    },
    setPreviewSelected: (state, action: PayloadAction<ISocialNetworksNames>) => {
      state.previewSelected = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenModal,
  setPreviewData,
  setPostList,
  setPreviewSelected,
  setOpenModalPreviewMobile,
  setFormData,
  setTabSelected,
  setSocialNetworksConnected,
  setSocialNetworksToPublish,
} = PostSlice.actions;

export default PostSlice.reducer;
