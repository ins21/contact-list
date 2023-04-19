import { render } from '@testing-library/react';

import ContactList from '../components/ContactList/ContactList';
import { Contact } from "../types";

jest.mock('../components/PersonInfo/PersonInfo', () => {
  const PersonInfo = ({ data }: { data: Contact }) => (
    <div>{data.firstNameLastName}</div>
  );
  return PersonInfo;
});

describe('ContactList', () => {
  it('renders a list of contacts with selected contacts in the top of the list', () => {
    const data = [
      { id: '1', firstNameLastName: 'First unselected user', jobTitle: 'title1', emailAddress: 'email1' },
      { id: '2', firstNameLastName: 'First selected user', jobTitle: 'title2', emailAddress: 'email2' },
      { id: '3', firstNameLastName: 'Second unselected user', jobTitle: 'title3', emailAddress: 'email3' },
      { id: '4', firstNameLastName: 'Second selected user', jobTitle: 'title4', emailAddress: 'email4' }
    ];
    const selectedIds = new Set(['2', '4']);

    const { getByTestId } = render(<ContactList data={data} selected={selectedIds} onClick={() => {}} />);
    const contactList = getByTestId('contact-list');

    expect(contactList.childNodes[0].textContent).toContain('First selected user');
    expect(contactList.childNodes[1].textContent).toContain('Second selected user');
    expect(contactList.childNodes[2].textContent).toContain('First unselected user');
    expect(contactList.childNodes[3].textContent).toContain('Second unselected user');
  });
});
