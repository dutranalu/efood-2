import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import theme from './styles/theme';

test('renders learn react link', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </ThemeProvider>
  );
  const loadingText = screen.getByText(/carregando restaurantes/i);
  expect(loadingText).toBeInTheDocument();
});
