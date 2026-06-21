/** Shared SVG props — icons inherit color via currentColor (use text-primary on wrapper) */
const svgProps = (className, props) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className,
  'aria-hidden': true,
  ...props,
});

export { svgProps };
