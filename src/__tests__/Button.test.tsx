import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../components/Button/Button';

const mockOnclick = jest.fn();

describe('Button component', () => {
  test('Renders with correct text', () => {
    const { getByText } = render(<Button onClick={mockOnclick}>Test text</Button>);

    expect(getByText('Test text')).toBeInTheDocument();
  });

  test('Calls "onClick" function after button click', () => {
    const { getByText } = render(<Button onClick={mockOnclick}>Test text</Button>);

    userEvent.click(getByText('Test text'));
    expect(mockOnclick).toHaveBeenCalledTimes(1);
  });
});
