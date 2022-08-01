const {sendRequest, getResponse} = require('../rabbit/handleRequests');
const {processGet, processLogin}= require('../models/processResponse');
const {Actions, UserRoles,} = require('../constants/enums');
const {reuqirements} = require('../constants/requirements');
const {ValidateParams, ValidateForm, ValidateQuery} = require('../models/validateRequest');

//BASE
module.exports.getAllflights = async(req, res)=>{
    const actionId = Actions.GET_ALL_FLIGHTS;
    const request = {
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': null
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
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': {
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
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': {'id': parseInt(req.params.id)}
    };
    const correl_id = await sendRequest(request, false);
    const response = await getResponse(correl_id);
    processGet(req, res, response);
    return;
    
}
module.exports.getAllAirlines = async(req, res)=>{
    const actionId = Actions.GET_ALL_AIRLINES;
    const request = {
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': null
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
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': {'id': parseInt(req.params.id)}
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
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': {
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
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': null
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}

//ANONYM
module.exports.login = async(req, res)=>{
    const actionId = Actions.LOGIN;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'anonym',
        'action_id': actionId,
        'data': {
            'username': req.body.username,
            'password': req.body.password
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processLogin(req, res, resposne);
    return;
    
}
module.exports.addCustomer = async(req, res)=>{
    const actionId = Actions.ADD_CUSTOMER;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'anonym',
        'action_id': actionId,
        'data' : {
            'customer': {
                'id': null,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'address': req.body.address,
                'phone_number': req.body.phone_number,
                'credit_card_number': req.body.credit_card_number,
                'image_url': !req.body.image_url ? null :req.body.image_url,
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

module.exports.addAirline = async(req, res)=>{
    const actionId = Actions.ADD_AIRLINE;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'anonym',
        'action_id': actionId,
        'data' : {'airline': {
            'id': null,
            'name': req.body.name,
            'country_id': req.body.country_id,
            'image_url': req.body.image_url,
            'user_id': null
        },
            'user': {
            'id': null,
            'username': req.body.username,
            'password': req.body.password,
            'email': req.body.email,
            'user_role': UserRoles.AIRLINE
        }}
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processLogin(req, res, resposne);
    return;
}

