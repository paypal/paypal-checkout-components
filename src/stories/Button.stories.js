/** @jsx node */
import {node, html} from '@krakenjs/jsx-pragmatic';
import { Mark as ApplePayMark } from '../funding/applepay/template.jsx';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'ApplePayMark',
};

const Template = ({ label, ...args }) => {
  return <div class="paypal-mark"><ApplePayMark /></div>.render(html());
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};


