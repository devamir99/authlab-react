import { svgProps } from './utils';

const IconGlobe = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export default IconGlobe;
