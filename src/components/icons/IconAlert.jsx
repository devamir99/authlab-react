import { svgProps } from './utils';

const IconAlert = ({ className = 'w-5 h-5', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export default IconAlert;
