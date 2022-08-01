const {Router} = require('express');

const anonymController = require('../controllers/anonymController');
const customerController = require('../controllers/customerController');
const airlineController = require('../controllers/airlineControler');
const adminController = require('../controllers/adminController');

const router = Router();

//ANONYM
router.get('/anonym/flights', anonymController.getAllflights);
router.get('/anonym/flights-search', anonymController.getFlightsByParams);
router.get('/anonym/flights/:id', anonymController.getFlightById);
router.get('/anonym/airlines', anonymController.getAllAirlines);
router.get('/anonym/airlines/:id', anonymController.getAirlineById);
router.get('/anonym/airlines-search', anonymController.getAirlinesByParameters);
router.get('/anonym/countries', anonymController.getAllCountries);
router.post('/anonym/login', anonymController.login);
router.post('/anonym/customers', anonymController.addCustomer);
router.post('/anonym/airlines', anonymController.addAirline);
//CUSOTMER
router.get('/cust/flights', customerController.getAllflights);
router.get('/cust/flights-search', customerController.getFlightsByParams);
router.get('/cust/flights/:id', customerController.getFlightById);
router.get('/cust/airlines', customerController.getAllAirlines);
router.get('/cust/airlines/:id', customerController.getAirlineById);
router.get('/cust/airlines-search', customerController.getAirlinesByParameters);
router.get('/cust/countries', customerController.getAllCountries);
router.put('/cust/customers/:id', customerController.updateCustomer);
router.post('/cust/tickets', customerController.addTicket);
router.delete('/cust/tickets/:id', customerController.removeTicket);
router.get('/cust/tickts/my/:customer_id', customerController.getMyTickets);
//AIRLINE
router.get('/airline/flights', airlineController.getAllflights);
router.get('/airline/flights-search', airlineController.getFlightsByParams);
router.get('/airline/flights/:id', airlineController.getFlightById);
router.get('/airline/airlines', airlineController.getAllAirlines);
router.get('/airline/airlines/:id', airlineController.getAirlineById);
router.get('/airline/airlines-search', airlineController.getAirlinesByParameters);
router.get('/airline/countries', airlineController.getAllCountries);
router.get('/airline/flights/my/:airline_id', airlineController.getMyFlights);
router.put('/airline/airlines/:id', airlineController.updateAirline);
router.post('/airline/flights', airlineController.addFligth);
router.put('/airline/flights/:id', airlineController.updateFlight);
router.delete('/airline/flights/:id', airlineController.removeFligth);
//ADMIN
router.get('/admin/flights', adminController.getAllflights);
router.get('/admin/flights-search', adminController.getFlightsByParams);
router.get('/admin/flights/:id', adminController.getFlightById);
router.get('/admin/airlines', adminController.getAllAirlines);
router.get('/admin/airlines/:id', adminController.getAirlineById);
router.get('/admin/airlines-search', adminController.getAirlinesByParameters);
router.get('/admin/countries', adminController.getAllCountries);
router.get('/admin/customers', adminController.getAllCustomers);
router.get('/admin/customers-search', adminController.getCustomersByParams);
router.get('/admin/customers/:id', adminController.getCustomerById);
router.post('/admin/customers', adminController.addCustomer);
router.put('/admin/customers/:id', adminController.updateCustomer);
router.delete('/admin/customers/:id', adminController.removeCustomer);
router.post('/admin/airlines', adminController.addAirline);
router.put('/admin/airlines/:id', adminController.updateAirline);
router.delete('/admin/airlines/:id', adminController.removeAirline);
router.post('/admin/administrators', adminController.addAdministrator);
router.delete('/admin/administrators/:id', adminController.removeAdministrator);

module.exports = router;

