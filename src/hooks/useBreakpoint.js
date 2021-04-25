import { useMedia } from './useMedia';
import { sizes } from '../components/Layout/Theme';

export const useBreakpoint = () => {
  const breakpoint = useMedia(
    // Media queries
    [
      `(min-width: ${sizes.giant}px)`,
      `(min-width: ${sizes.desktop}px)`,
      `(min-width: ${sizes.tablet}px)`,
      `(min-width: ${sizes.phone}px)`,
      `(min-width: ${sizes.smallPhone}px)`,
      `(min-width: ${0}px)`,
    ],
    // Column counts (relates to above media queries by array index)
    [
      { minWidth: sizes.giant, name: 'xlarge' },
      { minWidth: sizes.desktop, name: 'large' },
      { minWidth: sizes.tablet, name: 'medium' },
      { minWidth: sizes.phone, name: 'small' },
      { minWidth: sizes.smallPhone, name: 'xsmall' },
      { minWidth: sizes.smallPhone, name: 'xsmall' },
    ],
    // default
    { minWidth: sizes.smallPhone, breakpoint: 'xsmall' }
  );

  return breakpoint;
};
