import { svgProps } from './utils';

const IconArrowRight = ({ className = 'w-4 h-4', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default IconArrowRight;
