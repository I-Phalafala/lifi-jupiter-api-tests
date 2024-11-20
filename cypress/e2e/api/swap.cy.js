// cypress/e2e/api/swap.cy.js

describe('POST /swap', () => {
  const userPublicKey =  Cypress.env('userPublicKey');// This is a test user public key
  const inputMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';// USDC
  const outputMint = 'So11111111111111111111111111111111111111112';// SOL
  const amount = 1000;

  it('should return a successful response with required fields', () => {
    cy.getQuote(inputMint, outputMint, amount).then((quoteResponse) => {
      cy.request({
        method: 'POST',
        url: '/swap',
        body: {
          userPublicKey: userPublicKey,
          wrapAndUnwrapSol: true,
          quoteResponse: quoteResponse
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('swapTransaction').that.is.a('string');
        expect(response.body).to.have.property('lastValidBlockHeight').that.is.a('number');
        expect(response.body).to.have.property('prioritizationFeeLamports').that.is.a('number');
        expect(response.body).to.have.property('computeUnitLimit').that.is.a('number');
        expect(response.body).to.have.property('prioritizationType').that.is.an('object');
        expect(response.body.prioritizationType).to.have.property('computeBudget').that.is.an('object');
        expect(response.body.prioritizationType.computeBudget).to.have.property('microLamports').that.is.a('number');
        expect(response.body.prioritizationType.computeBudget).to.have.property('estimatedMicroLamports').that.is.a('number');
        expect(response.body).to.have.property('dynamicSlippageReport').that.is.null;
        expect(response.body).to.have.property('simulationError').that.is.null;
      });
    });
  });
});
