const {Actions, Types} = require('./enums');

module.exports.reuqirements =(action_id)=>{
    switch(action_id){
        case Actions.LOGIN:
            return {
                'username': Types.STRING,
                'password': Types.STRING
            }
        case Actions.GET_FLIGHTS_BY_PARAMS:
            return {
                'origin_country_id': Types.INTEGER,
                'dest_country_id': Types.INTEGER,
                'start_date': Types.STRING,
                'end_date': Types.STRING
            }
        case Actions.GET_FLIGHT_BY_ID:
        case Actions.GET_AIRLINE_BY_ID:
        case Actions.GET_CUSTOMER_BY_ID:
        case Actions.REMOVE_TICKET:
        case Actions.REMOVE_FLIGHT:
        case Actions.REMOVE_CUSTOMER:
        case Actions.REMVOE_AIRLINE:
        case Actions.REMOVE_ADMINISTRATOR:
            return {
                'id' : Types.INTEGER
            }
        case Actions.GET_AIRLINES_BY_PARAMS:
            return {
                'country_id' : Types.INTEGER,
                'name': Types.STRING
            }
        case Actions.ADD_CUSTOMER:
            return {
                'username' : Types.STRING,
                'password': Types.STRING,
                'email': Types.STRING,
                'first_name': Types.STRING,
                'last_name': Types.STRING,
                'address': Types.STRING,
                'phone_number': Types.STRING,
                'credit_card_number': Types.STRING,
                'image_url' : Types.STRING    
            }
            case Actions.UPDATE_CUSTOMER:
                return { 
                   'param':{
                            'id': Types.INTEGER
                        },
                   'form':{
                        'username': Types.STRING,
                        'password': Types.STRING,
                        'email': Types.STRING,
                        'first_name': Types.STRING,
                        'last_name': Types.STRING,
                        'address': Types.STRING,
                        'phone_number': Types.STRING,
                        'credit_card_number': Types.STRING,
                        'image_url' : Types.STRING             
                    }
                
                }
        case Actions.GET_FLIGHTS_BY_AIRLINE:
            return {
                'airline_id': Types.INTEGER
            }
        case Actions.ADD_AIRLINE:
            return {
                'username' : Types.STRING,
                'password': Types.STRING,
                'email': Types.STRING,
                'name': Types.STRING,
                'country_id': Types.INTEGER,
                'image_url' : Types.STRING          
            }
        case Actions.UPDATE_AIRLINE:
            return { 
                'param':{
                        'id': Types.INTEGER
                    },
                'form':{
                    'username': Types.STRING,
                    'password': Types.STRING,
                    'email': Types.STRING,
                    'name': Types.STRING,
                    'country_id': Types.INTEGER, 
                    'image_url' : Types.STRING                     
                    }
                }

        case Actions.ADD_TICKET:{
            return {
                'flight_id': Types.INTEGER,
                'customer_id': Types.INTEGER
            }
        }
        case Actions.GET_TICKETS_BY_CUSTOMER:
            return{
                'customer_id': Types.INTEGER
            } 
            
        case Actions.ADD_FLIGHT:
            return {
                'airline_company_id' : Types.INTEGER,
                'origin_country_id': Types.INTEGER,
                'destination_country_id': Types.INTEGER,
                'departure_date': Types.STRING,
                'departure_hour': Types.INTEGER,
                'departure_minute': Types.INTEGER,
                'landing_date': Types.STRING,
                'landing_hour': Types.INTEGER,
                'landing_minute': Types.INTEGER,
                'price' : Types.INTEGER,
                'remaining_tickets': Types.INTEGER      
            }
        case Actions.UPDATE_FLIGHT:
            return { 
                'param':{
                        'id': Types.INTEGER
                    },
                'form':{
                    'airline_company_id' : Types.INTEGER,
                    'origin_country_id': Types.INTEGER,
                    'destination_country_id': Types.INTEGER,
                    'departure_date': Types.STRING,
                    'departure_hour': Types.INTEGER,
                    'departure_minute': Types.INTEGER,
                    'landing_date': Types.STRING,
                    'landing_hour': Types.INTEGER,
                    'landing_minute': Types.INTEGER,
                    'price' : Types.INTEGER,
                    'remaining_tickets': Types.INTEGER                       
                }
            }
        case Actions.GET_CUSTOMERS_BY_PARAMS:
            return {
                'search' : Types.STRING
            }
        case Actions.ADD_ADMINISTRATOR:
            return {
                'username' : Types.STRING,
                'password': Types.STRING,
                'email': Types.STRING,
                'first_name': Types.STRING,
                'last_name': Types.STRING           
            }
        default:
            return undefined;
    }
};