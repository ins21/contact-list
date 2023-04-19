
import { useMemo } from "react";

import { Contact } from "../../types";
import PersonInfo from "../PersonInfo/PersonInfo";

import css from "./ContactList.module.css";

type ContactListProps = {
  data: Contact[];
  selected: Set<string>;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function ContactList({ data, selected, onClick }: ContactListProps) {
  const list = useMemo(() => {
    const selectedItems = [] as Contact[];
    const notSelectedItems = [] as Contact[];

    for (const contact of data) {
      selected.has(contact.id) ? selectedItems.push(contact) : notSelectedItems.push(contact);
    }

    return [...selectedItems, ...notSelectedItems].map((personInfo) => {
      const isContactSelected = selected.has(personInfo.id);
      return <PersonInfo key={personInfo.id} data={personInfo} selected={isContactSelected} />
    });
  }, [data, selected]);

  return (
    <div className={css.list} onClick={onClick} data-testid='contact-list'>
      {list}
    </div>
  );
}

export default ContactList;
