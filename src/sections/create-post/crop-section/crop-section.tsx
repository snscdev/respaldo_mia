/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-spread */
/* eslint-disable @next/next/no-img-element */
import { DependencyList, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Box, Button, Slider, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import {
  setDataImageCroped,
  setOpenModalPreviewMobile,
  setShowCropSection,
  setUpdateFormDataMediaUrls,
} from 'src/store/slices/post';
import { useLocales } from 'src/locales';
import CropSectionLayout from './crop-section-layout';
import 'react-image-crop/dist/ReactCrop.css';
import { imgPreview } from './imgPreview';

export default function CropSection() {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>();
  const { t } = useLocales();
  const mdDown = useResponsive('down', 'md');

  const dispatch = useDispatch();

  const dataImageCrop = useSelector((state: RootState) => state.post.dataImageCrop);
  const dataImageCroped = useSelector((state: RootState) => state.post.dataImageCroped);

  const imgRef = useRef<HTMLImageElement>(null);

  const distpach = useDispatch();

  useEffect(() => {
    const imgTag = document.createElement('img');
    imgTag.src = dataImageCrop;
    const w = 150;
    const h = 150;
    setCrop({
      unit: 'px',
      width: w,
      height: h,
      x: 5,
      y: 5,
    });

    setCompletedCrop(crop as PixelCrop);
  }, [dataImageCrop]);

  function useDebounceEffect(fn: any, waitTime: number, deps?: DependencyList) {
    useEffect(() => {
      const time = setTimeout(() => {
        fn.apply(undefined, deps);
      }, waitTime);

      return () => {
        clearTimeout(time);
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
      <Box width="100%" padding="0 24px 0 0">
        <Box>
          <Typography>{t('Dashboard.Create_Post.Create.Modal.Crop_Scale')}</Typography>
          <Slider
            size="small"
            defaultValue={1}
            step={0.1}
            min={1}
            max={5}
            value={scale}
            marks
            valueLabelDisplay="auto"
            disabled={!dataImageCrop}
            color={'info' as 'primary'}
            onChange={(event: Event, newValue: number | number[]) => setScale(Number(newValue))}
          />
        </Box>

        <div>
          <Typography>{t('Dashboard.Create_Post.Create.Modal.Crop_Rotate')}</Typography>
          <Slider
            size="small"
            color={'info' as 'primary'}
            step={1}
            min={-180}
            max={180}
            value={rotate}
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
            height: '100%',
            width: '80%',
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

      {mdDown && (
        <Button
          variant="outlined"
          color="info"
          sx={{
            width: {
              xs: '100%',
              md: '20%',
            },
          }}
          onClick={() => dispatch(setOpenModalPreviewMobile(true))}
        >
          {t('Dashboard.Create_Post.Create.Modal.btn_See_Preview')}
        </Button>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: {
            xs: '100%',
            md: '20%',
          },
          margin: '0 0 24px 0',
          alignSelf: 'flex-start',
        }}
        onClick={handleSave}
      >
        {t('Dashboard.Create_Post.Create.Modal.btn_Save')}
      </Button>
    </CropSectionLayout>
  );
}
