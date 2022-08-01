const {sendRequest, getResponse} = require('../rabbit/handleRequests');
const {processGet, processPost, processDelete, processPut}= require('../models/processResponse');
const {Actions, UserRoles,} = require('../constants/enums');
const {reuqirements} = require('../constants/requirements');
const {ValidateParams, ValidateForm, ValidateQuery} = require('../models/validateRequest');

//BASE
module.exports.getAllflights = async(req, res)=>{
    const actionId = Actions.GET_ALL_FLIGHTS;
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token
        }
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
        'facade_name': 'admin',
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
        'facade_name': 'admin',
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
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token
        }
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
         'facade_name': 'admin',
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
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'country_id': parseInt(req.query.country_id),
            'name': req.query.name
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
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
//ADMIN
module.exports.getAllCustomers = async(req, res)=>{
    const actionId = Actions.GET_ALL_CUSTOMERS;
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}

module.exports.getCustomersByParams= async(req, res)=>{
    const actionId = Actions.GET_CUSTOMERS_BY_PARAMS;
    const reqQuery = reuqirements(actionId);
    const validated = ValidateQuery(req, reqQuery);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'search' : !req.query.search ? null : req.query.search 
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processGet(req, res, resposne);
    return;
}
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
module.exports.addCustomer = async(req, res)=>{
    const actionId = Actions.ADD_CUSTOMER;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
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
    processPost(req, res, resposne);
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
        'facade_name': 'admin',
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
    processPut(req, res, resposne);
    return;   
}
module.exports.removeCustomer = async(req, res)=>{
    const actionId = Actions.REMOVE_CUSTOMER;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'customer_id':parseInt(req.params.id)               
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processDelete(req, res, resposne);
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
        'facade_name': 'admin',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'airline': {
            'id': null,
            'name': req.body.name,
            'country_id': parseInt(req.body.country_id),
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
    processPost(req, res, resposne);
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
        'facade_name': 'admin',
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
    processPut(req, res, resposne);
    return;
}
module.exports.removeAirline = async(req, res)=>{
    const actionId = Actions.REMVOE_AIRLINE;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'airline_id':parseInt(req.params.id)               
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processDelete(req, res, resposne);
    return;
}
module.exports.addAdministrator = async(req, res)=>{
    const actionId = Actions.ADD_ADMINISTRATOR;
    const requstedForm = reuqirements(actionId);
    const validated = ValidateForm(req, requstedForm);
    if (!validated){
        res.status(400).send('Missing Values!');
        return;
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data' : {
            'token': res.locals.token,
            'administrator': {
                'id': null,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'user_id': null
            },
            'user': {
                'id': null,
                'username': req.body.username,
                'password': req.body.password,
                'email': req.body.email,
                'user_role': UserRoles.ADMINISTRATOR
            }
        }
    };
    const correl_id = await sendRequest(request, true);
    const resposne = await getResponse(correl_id);
    processPost(req, res, resposne);
    return;
}
module.exports.removeAdministrator = async(req, res)=>{
    const actionId = Actions.REMOVE_ADMINISTRATOR;
    const reqParam= reuqirements(actionId);
    const validatedParam = ValidateParams(req, reqParam);
    if (!validatedParam){
        res.status(400).send('Missing Values!');
        return; 
    }
    const request = {
        'facade_name': 'admin',
        'action_id': actionId,
        'data': {
            'token': res.locals.token,
            'administrator_id':parseInt(req.params.id)               
        }
    };
    const correl_id = await sendRequest(request, false);
    const resposne = await getResponse(correl_id);
    processDelete(req, res, resposne);
    return;
}

