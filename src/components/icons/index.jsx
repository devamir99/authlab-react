import IconEmail from './IconEmail';
import IconSocial from './IconSocial';
import IconPhone from './IconPhone';
import IconMagicLink from './IconMagicLink';
import IconPuzzle from './IconPuzzle';
import IconGlobe from './IconGlobe';
import IconPalette from './IconPalette';
import IconLock from './IconLock';
import IconInbox from './IconInbox';
import IconSms from './IconSms';
import IconKey from './IconKey';
import IconPen from './IconPen';
import IconCheck from './IconCheck';
import IconX from './IconX';
import IconAlert from './IconAlert';
import IconInfo from './IconInfo';
import IconArrowRight from './IconArrowRight';
import IconChevronRight from './IconChevronRight';

export const iconMap = {
  email: IconEmail,
  social: IconSocial,
  phone: IconPhone,
  'magic-link': IconMagicLink,
  puzzle: IconPuzzle,
  globe: IconGlobe,
  palette: IconPalette,
  lock: IconLock,
  inbox: IconInbox,
  sms: IconSms,
  key: IconKey,
  pen: IconPen,
  check: IconCheck,
  x: IconX,
  warning: IconAlert,
  info: IconInfo,
  'arrow-right': IconArrowRight,
  'chevron-right': IconChevronRight,
};

/**
 * Themed flow/UI icon — pass `name` from iconMap keys.
 * Wrap in `text-primary` or `text-app-muted` for color.
 */
const FlowIcon = ({
  name,
  className = 'w-6 h-6',
  box = false,
  boxClassName = 'w-12 h-12 rounded-xl bg-[var(--color-primary-soft)] text-primary flex items-center justify-center',
  ...props
}) => {
  const Icon = iconMap[name];
  if (!Icon) return null;

  const iconEl = <Icon className={className} {...props} />;

  if (box) {
    return <span className={boxClassName}>{iconEl}</span>;
  }

  return iconEl;
};

export default FlowIcon;

export {
  IconEmail,
  IconSocial,
  IconPhone,
  IconMagicLink,
  IconPuzzle,
  IconGlobe,
  IconPalette,
  IconLock,
  IconInbox,
  IconSms,
  IconKey,
  IconPen,
  IconCheck,
  IconX,
  IconAlert,
  IconInfo,
  IconArrowRight,
  IconChevronRight,
};
