const {sendRequest, getResponse} = require('../rabbit/handleRequests');
const {processGet, processPost, processPut, processDelete, processLogin }= require('../models/processResponse');
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
        'facade_name': 'airline',
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
         'facade_name': 'airline',
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
        'facade_name': 'airline',
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
     const request = {
         'facade_name': 'airline',
         'action_id': actionId,
         'data': {
            'token': res.locals.token,
            'id': parseInt(req.params.id)
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
        'facade_name': 'airline',
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
        'facade_name': 'airline',
        'action_id': actionId,
        'data': {'token': res.locals.token}
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
//AIRLINE
module.exports.getMyFlights = async(req, res)=>{
    const actionId = Actions.GET_FLIGHTS_BY_AIRLINE;
    const reqParam = reuqirements(actionId);
    const validated = ValidateParams(req, reqParam);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'airline',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'airline_id':parseInt(req.params.airline_id) 
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
module.exports.updateAirline = async(req, res)=>{
    const actionId = Actions.UPDATE_AIRLINE;
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
        'facade_name': 'airline',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'airline_id': parseInt(req.params.id),
            'airline': {
                'id': null,
                'name': req.body.name,
                'country_id': parseInt(req.body.country_id),
                'image_url': req.body.image_url,
                'user_id' : null
            },
            'user': {
                'id': null,
                'username': req.body.username,
                'password': req.body.password,
                'email': req.body.email,
                'user_role': UserRoles.AIRLINE
            }
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processLogin(req, res, resposne);
    return;
}
module.exports.addFligth = async(req, res)=>{
    const actionId = Actions.ADD_FLIGHT;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'airline',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'flight': {
                'id': null,
                'airline_company_id': parseInt(req.body.airline_company_id),
                'origin_country_id':  parseInt(req.body.origin_country_id),
                'destination_country_id':  parseInt(req.body.destination_country_id),
                'departure_date': req.body.departure_date,
                'departure_hour':  parseInt(req.body.departure_hour),
                'departure_minute':  parseInt(req.body.departure_minute),
                'landing_date': req.body.landing_date,
                'landing_hour':  parseInt(req.body.landing_hour),
                'landing_minute':  parseInt(req.body.landing_minute),
                'price': parseFloat(req.body.price),
                'remaining_tickets':  parseInt(req.body.remaining_tickets),
            }
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processPost(req, res, resposne);
    return;
}
module.exports.updateFlight = async(req, res)=>{
    const actionId = Actions.UPDATE_FLIGHT;
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
        'facade_name': 'airline',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'flight_id': parseInt(req.params.id),
            'flight': {
                'id': null,
                'airline_company_id': parseInt(req.body.airline_company_id),
                'origin_country_id':  parseInt(req.body.origin_country_id),
                'destination_country_id':  parseInt(req.body.destination_country_id),
                'departure_date': req.body.departure_date,
                'departure_hour':  parseInt(req.body.departure_hour),
                'departure_minute':  parseInt(req.body.departure_minute),
                'landing_date':  req.body.landing_date,
                'landing_hour':  parseInt(req.body.landing_hour),
                'landing_minute':  parseInt(req.body.landing_minute),
                'price': parseFloat(req.body.price),
                'remaining_tickets':  parseInt(req.body.remaining_tickets),
            }
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processPut(req, res, resposne);
    return;

}
module.exports.removeFligth = async(req, res)=>{
    const actionId = Actions.REMOVE_FLIGHT;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'airline',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'flight_id':parseInt(req.params.id)               
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processDelete(req, res, resposne);
    return;
}

