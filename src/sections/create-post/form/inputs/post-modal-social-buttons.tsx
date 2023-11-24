import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { useState } from 'react';
import Image from 'src/components/image/image';
import { SOCIALNETWORKS } from 'src/const/post/redes';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  '&.MuiToggleButtonGroup-root': {
    border: 'none',
    gap: 16,
  },
});

const StyledToogleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    '&.MuiToggleButton-root': {
      border: `1px solid ${theme.palette.background.neutral} !important`,
    },
    '&.Mui-selected': {
      border: `1px solid ${theme.palette.info.main} !important`,
      backgroundColor: `${theme.palette.background.default} !important`,
    },
  },
}));
export default function PostModalSocialButtons() {
  const [socialNetworkSelected, setSocialNetworkSelected] = useState(() => ['facebook']);

  const handleClickSocialNetwork = (
    event: React.MouseEvent<HTMLElement>,
    newSocialNetwork: string[]
  ) => {
    setSocialNetworkSelected(newSocialNetwork);
  };
  return (
    <StyledToggleButtonGroup value={socialNetworkSelected} onChange={handleClickSocialNetwork}>
      {SOCIALNETWORKS.map((social) => (
        <StyledToogleButton key={social.name} value={social.name}>
          <Image
            src={`/assets/icons/dashboard/post/${social.name}.svg`}
            alt={social.name}
            width={24}
            height={24}
          />
        </StyledToogleButton>
      ))}
    </StyledToggleButtonGroup>
  );
}
