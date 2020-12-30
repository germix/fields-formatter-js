"use strict";

const { FieldsParser } = require("./FieldsParser.js");
const { throwInvalidFieldListException } = require("./utils.js");
const { throwInvalidFieldNameException } = require("./utils.js");
const { throwInvalidFieldsFormatterEntityException } = require("./utils.js");
const { throwInvalidSubFieldsListException } = require("./utils.js");

const FieldsFormatter = function ()
{
    /**
     * Constructor
     * 
     * @param any data Custom data
     */
    function FieldsFormatter(data = null)
    {
        this.customData = data;
    }

    /**
     * Format entity or collection of entities
     *
     * @param FieldsFormatterEntity|Traversable|array       target      Target to format
     * @param array|string                                  fields      Fields
     *
     * @return array
     *
     * @throws InvalidDefaultFieldsException
     * @throws InvalidFieldsFormatterElementException
     */
    FieldsFormatter.prototype.format = async function(target, fields)
    {
        if(target === null)
        {
            return null;
        }

        fields = checkFields(fields);

        if(isArray(target))
        {
            let json = [];

            for(const e of target)
            {
                json.push(await this.format(e, fields));
            }
            return json;
        }
        else if('formatField' in target && 'defaultFormatterFields' in target)
        {
            let json = {};

            // If there are no fields, use default
            if(fields.length == 0)
            {
                fields = checkFields(target.defaultFormatterFields());
            }

            // Format fields
            for(let i = 0; i < fields.length; i++)
            {
                let fieldName = fields[i];
                let subfieldsNames = null;
                if(isArray(fieldName))
                {
                    let a = fieldName;
                    if(fieldName.length != 2)
                    {
                        throwInvalidSubFieldsListException();
                    }
                    fieldName = a[0];
                    subfieldsNames = a[1];
                    if(!(isString(fieldName) && isArray(subfieldsNames)))
                    {
                        throwInvalidSubFieldsListException();
                    }
                }
                else if(!isString(fieldName))
                {
                    throwInvalidFieldNameException(fieldName);
                }
                let fieldValue = await target.formatField(this, fieldName, subfieldsNames, this.customData);
                if(fieldValue !== undefined)
                {
                    json[fieldName] = fieldValue;
                }
            }
            return json;
        }
        else
        {
            throwInvalidFieldsFormatterEntityException(target.constructor.name);
        }

        return undefined;
    }

    return FieldsFormatter;
}();

exports.FieldsFormatter = FieldsFormatter;

function isArray(value)
{
    return value && typeof value === 'object' && value.constructor === Array;
}

function isString(value)
{
    return typeof value === 'string' || value instanceof String;
}

function checkFields(fields)
{
    if(fields == null)
    {
        fields = [];
    }
    else if(isString(fields))
    {
        fields = (new FieldsParser()).parse(fields);
    }
    else if(!isArray(fields))
    {
        throwInvalidFieldListException();
    }
    return fields;
}
