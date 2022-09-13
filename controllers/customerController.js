const {sendRequest, getResponse} = require('../rabbit/handleRequests');
const {processGet, processPost, processDelete, processLogin}= require('../models/processResponse');
const {Actions, UserRoles,} = require('../constants/enums');
const {reuqirements} = require('../constants/requirements');
const {ValidateParams, ValidateForm, ValidateQuery} = require('../models/validateRequest');
//BASE
module.exports.getAllflights = async(req, res)=>{
    const actionId = Actions.GET_ALL_FLIGHTS;
    const request = {
        'facade_name': 'airline',
        'action_id': actionId,
        'data': {'token': res.locals.token}
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    processGet(req, res, response);
    return;
}

module.exports.getFlightsByParams = async(req, res)=>{
    const actionId = Actions.GET_FLIGHTS_BY_PARAMS;
    const reqParams = reuqirements(actionId);
    const validated = ValidateQuery(req, reqParams);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'origin_country_id' :!req.query.origin_country_id ? null : parseInt(req.query.origin_country_id),
            'dest_country_id' : !req.query.dest_country_id ? null :  parseInt(req.query.dest_country_id),
            'start_date' : !req.query.start_date ? null : req.query.start_date,
            'end_date' : !req.query.end_date ? null : req.query.end_date
        }
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    processGet(req, res, response);
    return;
}

module.exports.getFlightById = async(req, res)=>{
   //VALIDATION
   const actionId = Actions.GET_FLIGHT_BY_ID;
   const reqParams = reuqirements(actionId);
   const validated = ValidateParams(req, reqParams);
   if (!validated){
       res.status(400).send('Missing Values!');
       return;
   }
   //PARAM
   const request = {
       'facade_name': 'cust',
       'action_id': actionId,
       'data': {
          'token': res.locals.token,
          'id': parseInt(req.params.id)
      }
   };
   const correl_id = await sendRequest(request, false);
   const response = await getResponse(correl_id);
   processGet(req, res, response);
   return; 
}
module.exports.getAllAirlines = async(req, res)=>{
    const actionId = Actions.GET_ALL_AIRLINES;
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {'token': res.locals.token}
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    processGet(req, res, response);
    return;
}
module.exports.getAirlineById= async(req, res)=>{
    //VALIDATION
    const actionId = Actions.GET_AIRLINE_BY_ID;
    const reqParams = reuqirements(actionId);
    const validated = ValidateParams(req, reqParams);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    //PARAM
    const airlineId = req.params.id;
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'id': parseInt(airlineId)
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
module.exports.getAirlinesByParameters = async(req, res)=>{
    const actionId = Actions.GET_AIRLINES_BY_PARAMS;
    const reqQuery = reuqirements(actionId);
    const validated = ValidateQuery(req, reqQuery);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'country_id': !req.query.country_id ? null : parseInt(req.query.country_id),
            'name': !req.query.name ? null : req.query.name
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
module.exports.getAllCountries = async(req, res)=>{
    const actionId = Actions.GET_ALL_COUNTRIES;
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {'token': res.locals.token}
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}

module.exports.getTicketsByFlightId= async(req, res)=>{
    //VALIDATION
    const actionId = Actions.GET_TICKETS_BY_FLIGHT;
    const reqParams = reuqirements(actionId);
    const validated = ValidateParams(req, reqParams);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    //PARAM
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'flight_id': parseInt(req.params.flight_id)
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
//CUSTOMER
module.exports.getCustomerById= async(req, res)=>{
    //VALIDATION
    const actionId = Actions.GET_CUSTOMER_BY_ID;
    const reqParams = reuqirements(actionId);
    const validated = ValidateParams(req, reqParams);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    //PARAM
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
           'token': res.locals.token,
           'customer_id': parseInt(req.params.id)
       }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}

module.exports.updateCustomer = async(req, res)=>{   
    const actionId = Actions.UPDATE_CUSTOMER;
    const {param, form} = reuqirements(actionId);
    const validatedParam = ValidateParams(req, param);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const validatedForm = ValidateForm(req, form);
    if (!validatedForm){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'customer_id':parseInt(req.params.id),
            'customer': {
                'id': null,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'address': req.body.address,
                'phone_number': req.body.phone_number,
                'credit_card_number': req.body.credit_card_number,
                'image_url': !req.body.image_url ? null : req.body.image_url,
                'user_id': null
            },
            'user': {
                'id': null,
                'username': req.body.username,
                'password': req.body.password,
                'email': req.body.email,
                'user_role': UserRoles.CUSTOMER
            }
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processLogin(req, res, resposne);
    return;   
}
module.exports.checkTicket = async(req, res)=>{
    const actionId = Actions.CHECK_TICKET;
    const reqForm= reuqirements(actionId);
    const validatedForm = ValidateForm(req, reqForm);
    if (!validatedForm){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'ticket':{
                'flight_id': parseInt(req.body.flight_id),
                'customer_id': parseInt(req.body.customer_id),
                'position': req.body.position
            }         
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processPost(req, res, resposne);
    return;
}
module.exports.addTicket = async(req, res)=>{
    const actionId = Actions.ADD_TICKET;
    const reqForm= reuqirements(actionId);
    const validatedForm = ValidateForm(req, reqForm);
    if (!validatedForm){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'ticket':{
                'flight_id': parseInt(req.body.flight_id),
                'customer_id': parseInt(req.body.customer_id),
                'position': req.body.position
            }         
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processPost(req, res, resposne);
    return;
}
module.exports.removeTicket = async(req, res)=>{
    const actionId = Actions.REMOVE_TICKET;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'ticket_id':parseInt(req.params.id)               
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processDelete(req, res, resposne);
    return;
}
module.exports.getMyTickets = async(req, res)=>{
    const actionId = Actions.GET_TICKETS_BY_CUSTOMER;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'cust',
        'action_id': actionId,
        'data': { 
            'token': res.locals.token,         
            'customer_id': parseInt(req.params.customer_id)               
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}

