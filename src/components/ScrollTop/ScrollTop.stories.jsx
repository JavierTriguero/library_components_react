import { ScrollTop } from './ScrollTop.jsx';

export default {
  title: 'Componentes/ScrollTop',
  component: ScrollTop,
};

export const InsideContainer = {
  render: () => (
    <div className="h-64 max-w-md overflow-auto rounded-lg p-4 ring-1 ring-border">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="mb-3 text-sm">
          Desplázate hacia abajo… párrafo {i + 1}.
        </p>
      ))}
      <ScrollTop target="parent" threshold={100} />
    </div>
  ),
};
