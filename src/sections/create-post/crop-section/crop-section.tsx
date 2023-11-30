/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-spread */
/* eslint-disable @next/next/no-img-element */
import { DependencyList, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setDataImageCroped } from 'src/store/slices/post';
import CropSectionLayout from './crop-section-layout';
import 'react-image-crop/dist/ReactCrop.css';
import { imgPreview } from './imgPreview';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface ICropSection {
  image: {
    file: any;
    data: string;
    success: boolean;
    dataPreview: string;
  };
}

export default function CropSection({ image }: ICropSection) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>();

  const dataImageCrop = useSelector((state: RootState) => state.post.dataImageCrop);

  const imgRef = useRef<HTMLImageElement>(null);

  const distpach = useDispatch();

  // const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget;
  //     setCrop(centerAspectCrop(width, height, aspect));
  //   }
  // };

  function useDebounceEffect(fn: any, waitTime: number, deps?: DependencyList) {
    useEffect(() => {
      const t = setTimeout(() => {
        fn.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(t);
      };
    }, deps);
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef?.current) {
        const b64 = imgPreview(imgRef.current, completedCrop, scale, rotate);
        distpach(setDataImageCroped(b64));
        // setSelectedImage({
        //   data: image.data,
        //   file: image.file,
        //   success: false,
        //   dataPreview: b64,
        //   manteinAspect: aspectImage
        // })
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <CropSectionLayout>
      {dataImageCrop.length > 0 && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={dataImageCrop}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            // onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
    </CropSectionLayout>
  );
}
