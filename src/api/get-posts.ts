import axios from 'axios';
import { IPost, ICalendarEvent } from 'src/types/calendar';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getPosts = async (postDetails: any) => {
  console.log(postDetails);
  const response = await axios.get(`${BASE_URL}/get-posts`, postDetails);
  console.log(response.data);
  return response.data;
};
export function mapPostsToCalendarEvents(posts: IPost[]): ICalendarEvent[] {
  return posts.map(post => ({
    id: post.id,
    color: 'blue', // You can assign a color based on post status or some other attribute
    title: `${post.content.slice(0, 20)}...`, // Truncate post content to use as the event title
    allDay: true, // Whether the event spans all day can be determined by your logic
    description: post.content,
    start: new Date(post.scheduledTime).toISOString(), // Assuming 'scheduledTime' is a valid date string
    end: new Date(post.scheduledTime).toISOString()  // Assuming 'scheduledTime' is a valid date string
  }));
}

