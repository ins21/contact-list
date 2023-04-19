import { render } from '@testing-library/react';

import PersonInfo from '../components/PersonInfo/PersonInfo';

const testProps = {
  data: {
    id: '1',
    jobTitle: 'Test title',
    emailAddress: 'Test email',
    firstNameLastName: 'Test name',
  },
  selected: false,
};

describe('PersonInfo component', () => {
  test('Renders with correct content', () => {
    const { getByText } = render(<PersonInfo {...testProps} />);

    expect(getByText('Test title')).toBeInTheDocument();
    expect(getByText('Test email')).toBeInTheDocument();
    expect(getByText('Test name')).toBeInTheDocument();
  });

  test('Renders with a green border when prop "selected" is true', () => {
    const { container } = render(<PersonInfo {...testProps} selected />);
    expect(container.firstChild).toHaveStyle('border: 4px solid green');
  });

  test('Renders with a transparent border when prop "selected" is false', () => {
    const { container } = render(<PersonInfo {...testProps} />);
    expect(container.firstChild).toHaveStyle('border: 4px solid transparent');
  });
});
