describe('GET /quote', () => {
  const inputMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; //USDC
  const outputMint = 'So11111111111111111111111111111111111111112'; //SOL
  const amount = 1000;
  const slippageBps = 50;
  const swapMode = 'ExactIn';

  it('should return a successful response with required parameters', () => {
    cy.request({
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
      expect(response.body).to.have.property('inputMint', inputMint);
      expect(response.body).to.have.property('inAmount', '1000');
      expect(response.body).to.have.property('outputMint', outputMint);
      expect(response.body).to.have.property('outAmount');
      expect(response.body).to.have.property('otherAmountThreshold');
      expect(response.body).to.have.property('swapMode');
      expect(response.body).to.have.property('slippageBps');
      expect(response.body).to.have.property('platformFee');
      expect(response.body).to.have.property('priceImpactPct');
      expect(response.body).to.have.property('routePlan').that.is.an('array');
      expect(response.body).to.have.property('contextSlot');
      expect(response.body).to.have.property('timeTaken').that.is.a('number');

      response.body.routePlan.forEach((route, index) => {
        expect(route).to.have.property('swapInfo');
        expect(route.swapInfo).to.have.property('ammKey').that.is.a('string');
        expect(route.swapInfo).to.have.property('label').that.is.a('string');
        expect(route.swapInfo).to.have.property('inputMint').that.is.a('string');
        expect(route.swapInfo).to.have.property('outputMint').that.is.a('string');
        expect(route.swapInfo).to.have.property('inAmount').that.is.a('string');
        expect(route.swapInfo).to.have.property('outAmount').that.is.a('string');
        expect(route.swapInfo).to.have.property('feeAmount').that.is.a('string');
        expect(route.swapInfo).to.have.property('feeMint').that.is.a('string');
        expect(route).to.have.property('percent').that.is.a('number');
      });
    });
  });

  it('should handle optional parameters', () => {
    cy.request({
      method: 'GET',
      url: '/quote',
      qs: {
        inputMint: inputMint,
        outputMint: outputMint,
        amount: amount,
        slippageBps: slippageBps,
        swapMode:   swapMode
      },
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('inputMint', inputMint);
      expect(response.body).to.have.property('outputMint', outputMint);
      expect(response.body).to.have.property('inAmount', amount.toString());
      expect(response.body).to.have.property('outAmount');
      expect(response.body).to.have.property('slippageBps', slippageBps);
      expect(response.body).to.have.property('swapMode', swapMode);
    });
  });
});