import { svgProps } from './utils';

const IconCheck = ({ className = 'w-5 h-5', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default IconCheck;
