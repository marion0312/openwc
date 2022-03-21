import { html } from 'lit';
import '../src/codality-shell.js';

export default {
  title: 'CodalityShell',
  component: 'codality-shell',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <codality-shell
      style="--codality-shell-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </codality-shell>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
