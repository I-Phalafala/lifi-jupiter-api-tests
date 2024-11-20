// Note that the response is a large array of strings. We can't make any assumptions about the contents of the array, so we'll just check that the response is successful and that the response body is an array of strings.
xdescribe('GET /tokens', () => {
  it('should return a successful response with a list of tokens', () => {
    cy.request({
      method: 'GET',
      url: '/tokens',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.not.be.empty;
      response.body.forEach(token => {
        expect(token).to.be.a('string');
      });
    });
  });

  it('should contain supported tokens in the response', () => {
    const supportedTokens = [
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'So11111111111111111111111111111111111111112'  // SOL
    ];

    cy.request({
      method: 'GET',
      url: '/tokens',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.include.members(supportedTokens);
    });
  });
});