import { svgProps } from './utils';

const IconLock = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default IconLock;
