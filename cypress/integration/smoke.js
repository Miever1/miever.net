describe(`Website smoke tests`, () => {
  it(`should work`, () => {
    cy.visit(`/`);
  });

  it(`should be able to visit about me`, () => {
    cy.visit(`/`)
      .getByText(/about/i)
      .click()
      .getByText(/Jacob Cofman/i);
  });
});
