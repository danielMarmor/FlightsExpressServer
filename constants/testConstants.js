//CONSTANTS
const {UserRoles} = require('./enums')

const constants ={};

constants.loginCustomer = {
     "username": "shanita.daugherty",
     "password": "2IclAD6J4q"
 };
constants.loginAirline = {
     "username": "tricia.russela",
     "password": "P5GS8WOo6g"
   };
constants.loginAdmin = {
    "username": "alfonso.frami",
     "password": "we8XmvTbYN"
   };

constants.defaultLogin = constants.loginCustomer;

constants.badLogin = {
    "username": "shanita.daugherty",
     "password": "XXXXXXXXX"
};

constants.newCustomer ={  
    'first_name': 'Dustin',
    'last_name': 'Hofman',
    'address': 'Malcom Drive 1060 Los Angeles CA',
    'phone_number': '+4604003403',
    'credit_card_number': '1600-1500-1400-1203',
    'username': 'dustin.hofman',
    'password': 'XCXVXBXNMX',
    'email': 'dustin.hofman@gmail.com',
}

//customer_Id= 3
constants.updatedCustomer ={  
    'first_name': 'Shanita',
    'last_name': 'Daugherty',
    'address': 'Malcom Drive 9056 Los Angeles CA',
    'phone_number': '+4698703403',
    'credit_card_number': '1939-255-778-7666',
    'username': "shanita.daugherty",
    'password': "2IclAD6J4q",
    'email': 'shanita.daugherty@gmail.com',
}

constants.newAirline = {  
    'name': 'American Airlines',
    'country_id': 40 ,      
    'username': 'amerigo.versachi',
    'password': 'XVBtyiSeCV',
    'email': 'amerigo.versachi@gmail.com',  
}
//airline_id = 3
constants.updatedAirline = {  
    'name': 'Casper And Moorse',
    'country_id': 35 ,      
    'username': 'tricia.russela',
    'password': 'P5GS8WOo6g',
    'email': 'tricia.russela@gmail.com',  
}

constants.newTicket = {
    'flight_id' : 18,
    'customer_id' : 3
}
constants.newBadTicket = {
    'flight_id' : 18,
    'customer_id' : 4
}
constants.removeTicketId = 610;
constants.removeBadTicketId = 351;

//airline_id = 3
constants.newFlight ={
    'airline_company_id': 3,
    'origin_country_id':  50,
    'destination_country_id': 60,
    'departure_date': '25/08/2022',
    'departure_hour':  8,
    'departure_minute':  0,
    'landing_date':'25/08/2022',
    'landing_hour':  17,
    'landing_minute': 0 ,
    'remaining_tickets': 285,
    'price': 582.5

}

//airline_id = 3 flight_id= 7
constants.updatedFlight ={
    'airline_company_id': 2,
    'origin_country_id':  50,
    'destination_country_id': 60,
    'departure_date': '25/08/2022',
    'departure_hour':  8,
    'departure_minute':  45,
    'landing_date':'25/08/2022',
    'landing_hour':  17,
    'landing_minute': 45 ,
    'remaining_tickets': 285,
    'price': 582.5
}

constants.newAdministrator ={  
    'first_name': 'Malki',
    'last_name': 'Golan',
    'username': 'malki.golan',
    'password': 'hgty56TYYY',
    'email': 'malki.golan@gmail.com'
}



    

module.exports = constants;

