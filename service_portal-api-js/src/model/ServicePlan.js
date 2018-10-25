/**
 * Service Portal API
 * This is a API to fetch and order catalog items from different cloud sources
 *
 * OpenAPI spec version: 1.0.0
 * Contact: you@your-company.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The ServicePlan model module.
* @module model/ServicePlan
* @version 1.0.0
*/
export default class ServicePlan {
    /**
    * Constructs a new <code>ServicePlan</code>.
    * @alias module:model/ServicePlan
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>ServicePlan</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/ServicePlan} obj Optional instance to populate.
    * @return {module:model/ServicePlan} The populated <code>ServicePlan</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ServicePlan();

            
            
            

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('create_json_schema')) {
                obj['create_json_schema'] = ApiClient.convertToType(data['create_json_schema'], Object);
            }
        }
        return obj;
    }

    /**
    * The name of the Service Plan
    * @member {String} name
    */
    name = undefined;
    /**
    * The Service Plan description
    * @member {String} description
    */
    description = undefined;
    /**
    * The unique identifier for this Service Plan
    * @member {String} id
    */
    id = undefined;
    /**
    * JSON Schema for the object
    * @member {Object} create_json_schema
    */
    create_json_schema = undefined;








}


