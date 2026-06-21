import { svgProps } from './utils';

const IconInfo = ({ className = 'w-5 h-5', ...props }) => (
  <svg {...svgProps(className, props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export default IconInfo;
