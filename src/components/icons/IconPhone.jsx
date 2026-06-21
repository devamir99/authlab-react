import { svgProps } from './utils';

const IconPhone = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

export default IconPhone;
