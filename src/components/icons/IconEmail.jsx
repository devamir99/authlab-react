import { svgProps } from './utils';

const IconEmail = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

export default IconEmail;
