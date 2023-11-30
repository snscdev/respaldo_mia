import { useSelector } from 'react-redux';
import { SOCIALNETWORKSNAMES } from 'src/const/post/redes';
import { RootState } from 'src/store';
import PreviewDefault from './preview-default';
import PreviewFacebook from './preview-facebook';
import PreviewTwitter from './preview-twitter';
import PreviewInstagram from './preview-instagram';
import PreviewTiktok from './preview-tiktok';

export default function RenderPreview() {
  const tabSelected = useSelector((state: RootState) => state.post.tabSelected);

  if (tabSelected === SOCIALNETWORKSNAMES.facebook) {
    return <PreviewFacebook image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (tabSelected === SOCIALNETWORKSNAMES.instagram) {
    return <PreviewInstagram image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (tabSelected === SOCIALNETWORKSNAMES.twitter) {
    return <PreviewTwitter image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (tabSelected === SOCIALNETWORKSNAMES.linkedin) {
    return <PreviewDefault image="/assets/images/dasboard/post/post-default.png" />;
  }

  if (tabSelected === SOCIALNETWORKSNAMES.tiktok) {
    return <PreviewTiktok image="/assets/images/dasboard/post/post-default.png" />;
  }
}
