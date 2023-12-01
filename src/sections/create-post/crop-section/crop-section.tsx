/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-spread */
/* eslint-disable @next/next/no-img-element */
import { DependencyList, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Box, Slider, Typography } from '@mui/material';
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

  const rotateImage = (srcBase64: string, angle: number) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = srcBase64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const cw = img.width;
        const ch = img.height;
        const cx = cw / 2;
        const cy = ch / 2;
        canvas.width = cw;
        canvas.height = ch;
        ctx?.rotate((angle * Math.PI) / 180);
        ctx?.drawImage(img, -cx, -cy);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (err) => reject(err);
    });

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
      /// rotar la imagen asi no este cortada
      if (rotate !== 0) {
        const b64 = await rotateImage(image.data, rotate);
        distpach(setDataImageCroped(b64));
      }
      //   setSelectedImage({
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <CropSectionLayout>
      <Box>
        <Box>
          <Typography>Escala</Typography>
          <Slider
            size="small"
            defaultValue={1}
            step={0.1}
            min={0.1}
            max={5}
            sx={{ width: '80%' }}
            value={scale}
            marks
            valueLabelDisplay="auto"
            disabled={!dataImageCrop}
            color={'info' as 'primary'}
            onChange={(event: Event, newValue: number | number[]) => setScale(Number(newValue))}
          />
        </Box>

        <div>
          <Typography>Rotar</Typography>
          <Slider
            size="small"
            color={'info' as 'primary'}
            step={1}
            min={-180}
            max={180}
            value={rotate}
            sx={{ width: '80%' }}
            marks
            valueLabelDisplay="auto"
            disabled={!dataImageCrop}
            onChange={(event: Event, newValue: number | number[]) =>
              setRotate(Math.min(180, Math.max(-180, Number(newValue))))
            }
          />
        </div>
      </Box>
      {dataImageCrop.length > 0 && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          style={{
            width: '80%',
            height: '100%',
          }}
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
