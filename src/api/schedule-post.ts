import axios from 'axios';
import { IPostDetails, IPostResponse } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const schedulePost = async (postDetails: IPostDetails): Promise<IPostResponse> => {
  // export const schedulePost = async (postDetails: any) => {
  console.log(postDetails);

  const response = await axios.post(`${BASE_URL}/schedule-post`, postDetails);
  // const response = await api.create(`/schedule-post`, postDetails);
  console.log(response.data);
  return response.data;
};
