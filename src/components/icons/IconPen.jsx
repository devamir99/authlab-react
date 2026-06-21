import { svgProps } from './utils';

const IconPen = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export default IconPen;
