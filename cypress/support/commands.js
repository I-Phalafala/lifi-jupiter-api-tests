Cypress.Commands.add('getQuote', (inputMint, outputMint, amount) => {
    return cy.request({
      method: 'GET',
      url: '/quote',
      qs: {
        inputMint: inputMint,
        outputMint: outputMint,
        amount: amount
      },
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
  });