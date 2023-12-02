/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-spread */
/* eslint-disable @next/next/no-img-element */
import { DependencyList, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Box, Button, Slider, Typography } from '@mui/material';
import {
  setDataImageCroped,
  setShowCropSection,
  setUpdateFormDataMediaUrls,
} from 'src/store/slices/post';
import CropSectionLayout from './crop-section-layout';
import 'react-image-crop/dist/ReactCrop.css';
import { imgPreview } from './imgPreview';

export default function CropSection() {
  const [crop, setCrop] = useState<Crop>({ unit: 'px', width: 300, height: 300, x: 100, y: 25 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>();

  const dataImageCrop = useSelector((state: RootState) => state.post.dataImageCrop);
  const dataImageCroped = useSelector((state: RootState) => state.post.dataImageCroped);

  const imgRef = useRef<HTMLImageElement>(null);

  const distpach = useDispatch();

  useEffect(() => {
    setCompletedCrop(crop as PixelCrop);
  }, []);

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
      let b64 = '';
      if (completedCrop?.width && completedCrop?.height && imgRef?.current) {
        b64 = imgPreview(imgRef.current, completedCrop, scale, rotate);
        distpach(setDataImageCroped(b64));
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleSave = () => {
    distpach(setShowCropSection(false));
    distpach(setUpdateFormDataMediaUrls(dataImageCroped));
    distpach(setDataImageCroped(''));
  };

  return (
    <CropSectionLayout>
      <Box>
        <Box>
          <Typography>Escala</Typography>
          <Slider
            size="small"
            defaultValue={1}
            step={0.1}
            min={1}
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
          maxHeight={imgRef?.current?.height}
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
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, background: 'white' }}
          />
        </ReactCrop>
      )}
      <Button variant="contained" color="primary" sx={{ width: '20%' }} onClick={handleSave}>
        Guardar
      </Button>
    </CropSectionLayout>
  );
}
