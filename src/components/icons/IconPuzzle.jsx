import { svgProps } from './utils';

const IconPuzzle = ({ className = 'w-6 h-6', ...props }) => (
  <svg {...svgProps(className, props)}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V6a1 1 0 0 0 1 1h1.5a2.5 2.5 0 0 1 0 5H13a1 1 0 0 0-1 1v1.5a2.5 2.5 0 0 1-5 0V13a1 1 0 0 0-1-1H4.5a2.5 2.5 0 0 1 0-5H6a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M16.5 14A2.5 2.5 0 0 1 19 16.5V18a1 1 0 0 0 1 1h.5a2.5 2.5 0 0 1 0 5H19a1 1 0 0 0-1 1v.5a2.5 2.5 0 0 1-5 0V22a1 1 0 0 0-1-1h-1.5a2.5 2.5 0 0 1 0-5H14a1 1 0 0 0 1-1v-1.5a2.5 2.5 0 0 1 2.5-2.5z" />
  </svg>
);

export default IconPuzzle;
