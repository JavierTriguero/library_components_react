import { ScrollPanel } from './ScrollPanel.jsx';

export default {
  title: 'Componentes/ScrollPanel',
  component: ScrollPanel,
};

export const Default = {
  render: () => (
    <ScrollPanel aria-label="Términos" className="h-48 max-w-md p-4 ring-1 ring-border">
      {Array.from({ length: 12 }, (_, i) => (
        <p key={i} className="mb-3 text-sm">
          Párrafo {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </p>
      ))}
    </ScrollPanel>
  ),
};
