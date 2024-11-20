
describe('API Reliability Tests', () => {
    const inputMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    const outputMint = 'So11111111111111111111111111111111111111112';
    const amount = 1000;
    const userPublicKey =  Cypress.env('userPublicKey');
  
    it('should have a consistent response time for GET /quote', () => {
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
        expect(response.duration).to.be.lessThan(1000); // Ensure response time is less than 1 second
      });
    });
  
    it('should have a consistent response time for POST /swap', () => {
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
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.duration).to.be.lessThan(2000); // Ensure response time is less than 2 seconds
        });
      });
    });
  
    xit('should be available for GET /tokens', () => {
      cy.request({
        method: 'GET',
        url: '/tokens',
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should return consistent data for GET /quote', () => {
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
      }).then((response1) => {
        expect(response1.status).to.eq(200);
        cy.wait(1000); // Wait for 1 second before making the next request
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
        }).then((response2) => {
          expect(response2.status).to.eq(200);
          const outAmount1 = Number(response1.body.outAmount);
          const outAmount2 = Number(response2.body.outAmount);
          expect(Math.abs(outAmount1 - outAmount2)).to.be.within(0, 2); // Ensure the difference is within 0 to 2
        });
      });  
    });
  });