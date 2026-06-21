import { svgProps } from './utils';

const IconChevronRight = ({ className = 'w-4 h-4', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default IconChevronRight;
