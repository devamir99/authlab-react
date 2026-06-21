import { svgProps } from './utils';

const IconX = ({ className = 'w-5 h-5', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default IconX;
