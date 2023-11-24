import { useSelector } from 'react-redux';
import { SOCIALNETWORKSNAMES } from 'src/const/post/redes';

import { RootState } from 'src/store';
import PreviewDefault from './preview-default';

export default function RenderPreview() {
  const previewSelected = useSelector((state: RootState) => state.post.previewSelected);
  const { platforms } = useSelector((state: RootState) => state.post.previewData);

  if (platforms.length === 0) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === '') {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === SOCIALNETWORKSNAMES.facebook) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === SOCIALNETWORKSNAMES.instagram) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === SOCIALNETWORKSNAMES.twitter) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === SOCIALNETWORKSNAMES.linkedin) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (previewSelected === SOCIALNETWORKSNAMES.tiktok) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }
}
