const server = require('../app')
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt =require('jsonwebtoken');
const constants = require('../constants/testConstants');

chai.should();
chai.use(chaiHttp);


const expect = chai.expect;




//ANONYMUS
describe('Test Anonymous Routes', ()=>{
    describe('Test GetAllFligths', ()=>{
        it('Should return all Flights', (done)=>{
            chai.request(server)
            .get('/anonym/flights')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');
                expect(response.body).to.not.be.lengthOf(0);           
            done();
            });
        });    
    });
    describe('Test GetFligthsById', ()=>{
        it('Should return 1 Flight', (done)=>{
            chai.request(server)
            .get('/anonym/flights/10')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('object');                   
            done();
            });
        });  
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/anonym/flights/X')
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetFligthsByParams', ()=>{
        it('Should return All Flights Not  (empty Filter)', (done)=>{
             chai.request(server)
            .get('/anonym/flights-search')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return All Flights Filtered by params', (done)=>{
            chai.request(server)
           .get('/anonym/flights-search?origin_country_id=50&dest_country_id=56&start_date=01/01/2022&end_date=31/12/2022')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found (bad parameter) ', (done)=>{
            chai.request(server)
            .get('/anonym/flights-search?origin_country_id=xxx&dest_country_id=56')
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAirlines', ()=>{
        it('Should return Airlines Array ', (done)=>{
            chai.request(server)
           .get('/anonym/airlines')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');  
               expect(response.body).to.not.be.lengthOf(0);  
            done();
            });
        });
    });
    describe('Test GetAirlineById', ()=>{
        it('Should return 1 Airline ', (done)=>{
            chai.request(server)
           .get('/anonym/airlines/14')
           .end((err, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object');   
            done();
            });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/anonym/airlines/xxx')
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetAirlinesByParams', ()=>{
        it('Should return All Flights Airlines (empty filter)', (done)=>{
             chai.request(server)
            .get('/anonym/airlines-search')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return Flights Filtered', (done)=>{
            chai.request(server)
           .get('/anonym/airlines-search?country_id=50&name=British')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/anonym/flights-search?country_id=xxx&name=1111')
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAllCountries', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/anonym/countries')
           .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');  
                expect(response.body).to.not.be.lengthOf(0);    
                done();
            });
        });
    });
    describe('Test Login', ()=>{
        it('Should Login and return token ', (done)=>{
            chai.request(server)
           .post('/anonym/login')
           .set('Accept', 'application/json')
           .send(constants.defaultLogin)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                expect(response.body).to.have.property('token');
                done();
            });
        });
        it('Should Fail Loggin - username/password mismatch ', (done)=>{
            chai.request(server)
           .post('/anonym/login')
           .set('Accept', 'application/json')
           .send(constants.badLogin)        
           .end((err, response)=>{
                expect(response).to.have.status(404);//UNAUTHORIZED
                done();
            });
        });
    });
    describe('Test addCusotmer (from anonym)', ()=>{
        it('Should Login and return token ', (done)=>{
            chai.request(server)
           .post('/anonym/customers')
           .set('Accept', 'application/json')
           .send(constants.newCustomer)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                expect(response.body).to.have.property('token');
                done();
            });
        });
    });
    describe('Test addAirline (from anonym)', ()=>{
        it('Should Login and return token ', (done)=>{
            chai.request(server)
           .post('/anonym/airlines')
           .set('Accept', 'application/json')
           .send(constants.newAirline)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                expect(response.body).to.have.property('token');
                done();
            });
        });
    });
});
 
//CUSOTMER
describe('Test Customer Routes', ()=>{
    let token;
    before('Login user', async () => {
        const response = await chai.request(server)
        .post('/anonym/login')
        .set('Accept', 'application/json')
        .send(constants.loginCustomer);
        //SET TOKEN AND USE IT IN EVERY CUSTOMER RREQUEST
        token = response.body.token; 
    });
    describe('Test GetAllFligths', ()=>{
        it('Should return all Flights', (done)=>{
            chai.request(server)
            .get('/cust/flights')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');
                expect(response.body).to.not.be.lengthOf(0);           
            done();
            });
        });    
    });
    describe('Test GetFligthsById', ()=>{
        it('Should return 1 Flight', (done)=>{
            chai.request(server)
            .get('/cust/flights/10')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('object');                   
            done();
            });
        });  
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/cust/flights/X')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetFligthsByParams', ()=>{
        it('Should return All Flights Not  (empty Filter)', (done)=>{
             chai.request(server)
            .get('/cust/flights-search')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return All Flights Filtered by params', (done)=>{
            chai.request(server)
           .get('/cust/flights-search?origin_country_id=50&dest_country_id=56&start_date=01/01/2022&end_date=31/12/2022')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found (bad parameter) ', (done)=>{
            chai.request(server)
            .get('/cust/flights-search?origin_country_id=xxx&dest_country_id=56')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAirlines', ()=>{
        it('Should return Airlines Array ', (done)=>{
            chai.request(server)
           .get('/cust/airlines')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');  
               expect(response.body).to.not.be.lengthOf(0);  
            done();
            });
        });
    });
    describe('Test GetAirlineById', ()=>{
        it('Should return 1 Airline ', (done)=>{
            chai.request(server)
           .get('/cust/airlines/14')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object');   
            done();
            });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/cust/airlines/xxx')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetAirlinesByParams', ()=>{
        it('Should return All Flights Airlines (empty filter)', (done)=>{
             chai.request(server)
            .get('/cust/airlines-search')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return Flights Filtered', (done)=>{
            chai.request(server)
           .get('/cust/airlines-search?country_id=50&name=British')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/cust/flights-search?country_id=xxx&name=1111')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAllCountries', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/cust/countries')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
            expect(response).to.have.status(200);      
            expect(response.body).to.be.a('array');  
            expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
    });
    describe('Test updateCusotmer', ()=>{
        it('Should Login and return token ', (done)=>{
            chai.request(server)
           .put('/cust/customers/3')
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)
           .send(constants.updatedCustomer)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                expect(response.body).to.have.property('token');
                done();
            });
        });
    });
    describe('Test addTicket', ()=>{
        it('Should post new Ticket ', (done)=>{
            chai.request(server)
           .post('/cust/tickets')
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)
           .send(constants.newTicket)                
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');
                done();
            });
        });
        it('Should blocked- unathorized user token', (done)=>{
            chai.request(server)
           .post('/cust/tickets')
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)
           .send(constants.newBadTicket)        
           .end((err, response)=>{
                //status ===> 200 + exception message
                expect(response).to.have.status(200);
                done();
            });
        });
    });
    describe('Test removeTicket', ()=>{
        it('Should remove ticket ', (done)=>{
            chai.request(server)
           .delete(`/cust/tickets/${constants.removeTicketId}`)
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)       
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
        it('Should block- unathirized user token', (done)=>{
            chai.request(server)
           .delete(`/cust/tickets/${constants.removeBadTicketId}`)
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)      
           .end((err, response)=>{
                expect(response).to.have.status(200);
                done();
            });
        });
    });
    describe('Test getMyTickets', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/cust/tickts/my/3')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
                expect(response).to.have.status(200);      
                expect(response.body).to.be.a('array');  
            done();
            });
        });
    });
});
//AIRLINE
describe('Test Airline Routes', ()=>{
    let token;
    before('Login user', async () => {
        const response = await chai.request(server)
        .post('/anonym/login')
        .set('Accept', 'application/json')
        .send(constants.loginAirline);
        //SET TOKEN AND USE IT IN EVERY CUSTOMER RREQUEST
        token = response.body.token; 
    });
    describe('Test GetAllFligths', ()=>{
        it('Should return all Flights', (done)=>{
            chai.request(server)
            .get('/airline/flights')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');
                expect(response.body).to.not.be.lengthOf(0);           
            done();
            });
        });    
    });
    describe('Test GetFligthsById', ()=>{
        it('Should return 1 Flight', (done)=>{
            chai.request(server)
            .get('/airline/flights/10')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('object');                   
            done();
            });
        });  
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/airline/flights/X')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetFligthsByParams', ()=>{
        it('Should return All Flights Not  (empty Filter)', (done)=>{
             chai.request(server)
            .get('/airline/flights-search')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return All Flights Filtered by params', (done)=>{
            chai.request(server)
           .get('/airline/flights-search?origin_country_id=50&dest_country_id=56&start_date=01/01/2022&end_date=31/12/2022')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found (bad parameter) ', (done)=>{
            chai.request(server)
            .get('/airline/flights-search?origin_country_id=xxx&dest_country_id=56')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAirlines', ()=>{
        it('Should return Airlines Array ', (done)=>{
            chai.request(server)
           .get('/airline/airlines')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');  
               expect(response.body).to.not.be.lengthOf(0);  
            done();
            });
        });
    });
    describe('Test GetAirlineById', ()=>{
        it('Should return 1 Airline ', (done)=>{
            chai.request(server)
           .get('/airline/airlines/14')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object');   
            done();
            });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/airline/airlines/xxx')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetAirlinesByParams', ()=>{
        it('Should return All Flights Airlines (empty filter)', (done)=>{
             chai.request(server)
            .get('/airline/airlines-search')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return Flights Filtered', (done)=>{
            chai.request(server)
           .get('/airline/airlines-search?country_id=50&name=British')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/airline/flights-search?country_id=xxx&name=1111')
            .set('Cookie', `jwt=${token}`)
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAllCountries', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/airline/countries')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
            expect(response).to.have.status(200);      
            expect(response.body).to.be.a('array');  
            expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
    });
    describe('Test getMyFlights', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/airline/flights/my/3')
           .set('Cookie', `jwt=${token}`)
           .end((err, response)=>{
                expect(response).to.have.status(200);      
                expect(response.body).to.be.a('array');  
            done();
            });
        });
    });
    describe('Test updateAirline', ()=>{
        it('Should Login and return token ', (done)=>{
            chai.request(server)
           .put('/airline/airlines/3')
           .set('Cookie', `jwt=${token}`)
           .send(constants.updatedAirline)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                expect(response.body).to.have.property('token');
                done();
            });
        });
    });
    describe('Test addFligth', ()=>{
        it('Should add new Flight ', (done)=>{
            chai.request(server)
           .post('/airline/flights')
           .set('Cookie', `jwt=${token}`)
           .send(constants.newFlight)                
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');
                done();
            });
        });
    });
    describe('Test updateFligth', ()=>{
        it('Should update Flight ', (done)=>{
            chai.request(server)
           .put('/airline/flights/7')
           .set('Cookie', `jwt=${token}`)
           .send(constants.updatedFlight)                
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
    });
    describe('Test removeFligth', ()=>{
        it('Should remove Flight ', (done)=>{
            chai.request(server)
           .delete('/airline/flights/8')
           .set('Cookie', `jwt=${token}`)           
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
        it('Should block - invalid token ', (done)=>{
            chai.request(server)
           .delete('/airline/flights/7')
           .set('Cookie', `jwt=${token}`)           
           .end((err, response)=>{
                //status ===> 200 + exception message
                expect(response).to.have.status(200);
                done();
            });
        });
    });
    
});
describe('Test Admin Routes', ()=>{
    let token;
    before('Login user', async () => {
        const response = await chai.request(server)
        .post('/anonym/login')
        .set('Accept', 'application/json')
        .send(constants.loginAdmin);
        //SET TOKEN AND USE IT IN EVERY CUSTOMER RREQUEST
        token = response.body.token; 
    });
    describe('Test GetAllFligths', ()=>{
        it('Should return all Flights', (done)=>{
            chai.request(server)
            .get('/admin/flights')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');
                expect(response.body).to.not.be.lengthOf(0);           
            done();
            });
        });    
    });
    describe('Test GetFligthsById', ()=>{
        it('Should return 1 Flight', (done)=>{
            chai.request(server)
            .get('/admin/flights/10')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('object');                   
            done();
            });
        });  
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/admin/flights/X')
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetFligthsByParams', ()=>{
        it('Should return All Flights Not  (empty Filter)', (done)=>{
             chai.request(server)
            .get('/admin/flights-search')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return All Flights Filtered by params', (done)=>{
            chai.request(server)
           .get('/admin/flights-search?origin_country_id=50&dest_country_id=56&start_date=01/01/2022&end_date=31/12/2022')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found (bad parameter) ', (done)=>{
            chai.request(server)
            .get('/admin/flights-search?origin_country_id=xxx&dest_country_id=56')
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAirlines', ()=>{
        it('Should return Airlines Array ', (done)=>{
            chai.request(server)
           .get('/admin/airlines')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');  
               expect(response.body).to.not.be.lengthOf(0);  
            done();
            });
        });
    });
    describe('Test GetAirlineById', ()=>{
        it('Should return 1 Airline ', (done)=>{
            chai.request(server)
           .get('/admin/airlines/14')
           .end((err, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object');   
            done();
            });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/admin/airlines/xxx')
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test GetAirlinesByParams', ()=>{
        it('Should return All Flights Airlines (empty filter)', (done)=>{
             chai.request(server)
            .get('/admin/airlines-search')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array'); 
                expect(response.body).to.not.be.lengthOf(0);    
            done();
            });
        });
        it('Should return Flights Filtered', (done)=>{
            chai.request(server)
           .get('/admin/airlines-search?country_id=50&name=British')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/admin/flights-search?country_id=xxx&name=1111')
            .end((err, response)=>{
                expect(response).to.have.status(400);
                done();
            });
         });    
    });
    describe('Test GetAllCountries', ()=>{
        it('Should return Countries Array ', (done)=>{
            chai.request(server)
           .get('/admin/countries')
           .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');  
                expect(response.body).to.not.be.lengthOf(0);    
                done();
            });
        });
    });
    describe('Test GetAllCustomers', ()=>{
        it('Should return Customers Array ', (done)=>{
            chai.request(server)
           .get('/admin/customers')
           .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');  
                expect(response.body).to.not.be.lengthOf(0);    
                done();
            });
        });
    });
    describe('Test GetCustomersByParams', ()=>{
        it('Should return All Customers (empty filter)', (done)=>{
             chai.request(server)
            .get('/admin/customers-search')
            .end((err, response)=>{
                expect(response).to.have.status(200);
                expect(response.body).to.be.a('array');    
            done();
            });
        });
        it('Should return Customers Filtered', (done)=>{
            chai.request(server)
           .get('/admin/customers-search?search=son')
           .end((err, response)=>{
               expect(response).to.have.status(200);
               expect(response.body).to.be.a('array');   
            done();
           });
        });
    });
    describe('Test GetCustomerById', ()=>{
        it('Should return 1 Customers ', (done)=>{
            chai.request(server)
           .get('/admin/customers/3')
           .end((err, response)=>{
            expect(response).to.have.status(200);
            expect(response.body).to.be.a('object');   
            done();
            });
        });
        it('Should return Missing Values 400 Not Found ', (done)=>{
            chai.request(server)
            .get('/admin/customers/xxx')
            .end((err, response)=>{
                expect(response).to.have.status(400);
            done();
            });
        });    
    });
    describe('Test addCusotmer (from admin)', ()=>{
        it('Should return newCustomer ', (done)=>{
            chai.request(server)
           .post('/admin/customers')
           .set('Accept', 'application/json')
           .send(constants.newCustomer)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                done();
            });
        });
    });
    describe('Test updateCusotmer (from admin)', ()=>{
        it('should update and return 204 response ', (done)=>{
            chai.request(server)
           .put('/admin/customers/3')
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)
           .send(constants.updatedCustomer)        
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
    });
    describe('Test removeCustommer', ()=>{
        it('Should remove customer and return 204 ', (done)=>{
            chai.request(server)
           .delete(`/admin/customers/3`)
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)       
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
    });
    describe('Test addAirline (from admin)', ()=>{
        it('Should add and return new airline ', (done)=>{
            chai.request(server)
           .post('/admin/airlines')
           .set('Accept', 'application/json')
           .send(constants.newAirline)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                done();
            });
        });
    });
    describe('Test updateAirline (from admin)', ()=>{
        it('Should update and return 204 ', (done)=>{
            chai.request(server)
           .put('/admin/airlines/3')
           .set('Cookie', `jwt=${token}`)
           .send(constants.updatedAirline)        
           .end((err, response)=>{
                expect(response).to.have.status(204);     
                done();
            });
        });
    });
    describe('Test removeAirline', ()=>{
        it('Should remove airline and return 204 ', (done)=>{
            chai.request(server)
           .delete(`/admin/airlines/3`)
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)       
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
    });
    describe('Test add administtrator', ()=>{
        it('Should add and return new airline ', (done)=>{
            chai.request(server)
           .post('/admin/administrators')
           .set('Accept', 'application/json')
           .send(constants.newAdministrator)        
           .end((err, response)=>{
                expect(response).to.have.status(201);
                expect(response.body).to.be.a('object');  
                done();
            });
        });
    });
    describe('Test removeAdministtrator', ()=>{
        it('Should remove admin and return 204 ', (done)=>{
            chai.request(server)
           .delete(`/admin/administrators/1`)
           .set('Accept', 'application/json')
           .set('Cookie', `jwt=${token}`)       
           .end((err, response)=>{
                expect(response).to.have.status(204);
                done();
            });
        });
    });
});