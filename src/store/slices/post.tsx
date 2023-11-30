'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost, ISocialNetworksNames } from 'src/types/post';

export interface PostState {
  openModal: boolean;
  openModalPreviewMobile: boolean;
  postList: IPost[];
  formData: {
    errors: any;
    values: any;
  };
  tabSelected: ISocialNetworksNames;
  socialNetworksConnected: ISocialNetworksNames[];
  socialNetworksToPublish: ISocialNetworksNames[];
  showCropSection: boolean;
  dataImageCrop: string;
  dataImageCroped: string;
}

const initialState: PostState = {
  openModal: false,
  openModalPreviewMobile: false,
  postList: [],
  formData: {
    errors: {},
    values: {},
  },
  socialNetworksConnected: ['facebook'],
  tabSelected: 'facebook',
  socialNetworksToPublish: [],
  showCropSection: true,
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

    setPostList: (state, action: PayloadAction<IPost[]>) => {
      state.postList = action.payload;
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
} = PostSlice.actions;

export default PostSlice.reducer;
