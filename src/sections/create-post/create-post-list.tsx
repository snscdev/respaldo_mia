// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { IPost } from 'src/types/post';
// routes
import PostItem from './post-item';
//

// ----------------------------------------------------------------------

type Props = {
  posts: IPost[];
};

export default function PostList({ posts = [] }: Props) {
  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        sx={{
          justifyItems: { xs: 'center', sm: 'stretch', md: 'stretch', lg: 'stretch' },
        }}
      >
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          color="info"
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
