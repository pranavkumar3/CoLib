import { getByText, render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home'
import React from 'react';
describe("<App />", () => {
    it("Renders <App /> component correctly", () => {
      const { getByText } = render(<App/>);
      expect(getByText(/CoLib/i)).toBeInTheDocument();
    });

    it('Home page loading or not', function () {
        const { getByText } = render(<App />
            );
              //Case-1
              fireEvent.click(getByText("Home"));
              expect(getByText(/TEXT/i)).toBeInTheDocument();
              });
            

  });