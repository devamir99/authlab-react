import { svgProps } from './utils';

const IconSms = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);

export default IconSms;
