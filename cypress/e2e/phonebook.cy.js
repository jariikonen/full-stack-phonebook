const contact = { name: 'siiri', number: '555-1234567' };
const contactStr = `${contact.name} ${contact.number}`;

describe('Phonebook', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3001');
    cy.contains('Phonebook');
    cy.contains('Add new contact');
  });

  it('a contact can be added', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3001');
    cy.contains(contactStr).should('not.exist');
    cy.contains('name:').children().type(contact.name);
    cy.contains('number:').children().type(contact.number);
    cy.get('form').contains('add').click();
    cy.contains(`Added ${contact.name} to the phonebook`);
    cy.contains(contactStr).should('exist');
  });

  it('a contact can be deleted', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3001');
    cy.contains(contactStr).should('not.exist');
    cy.request('POST', 'http://localhost:3001/api/persons', contact);
    cy.contains(contactStr).should('exist');
    cy.contains(contactStr).children().click();
    cy.contains(`Removed ${contact.name} from the phonebook`);
    cy.contains(contactStr).should('not.exist');
  });
});
