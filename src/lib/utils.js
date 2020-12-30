"use strict";

const { FieldsFormatterException } = require("./FieldsFormatterException");

const TOK_EOF = -1;
const TOK_LEXEME = -2;

function throwInvalidFieldListException()
{
    throw new FieldsFormatterException('Invalid fields');
}
function throwInvalidFieldNameException(fieldName)
{
    throw new FieldsFormatterException('Invalid field name (' + fieldName + ')');
}
function throwInvalidFieldsFormatterEntityException(className)
{
    throw new FieldsFormatterException('Invalid field formatting entity (' + className + ')');
}
function throwInvalidSubFieldsListException()
{
    throw new FieldsFormatterException('Invalid sub fields');
}
function throwUnexpectedTokenException(expectedToken, foundToken)
{
    throw new FieldsFormatterException('Expected \'' + expectedToken + '\', but found \'' + foundToken.id + '\'');
}

exports.TOK_EOF = TOK_EOF;
exports.TOK_LEXEME = TOK_LEXEME;

exports.throwInvalidFieldListException = throwInvalidFieldListException;
exports.throwInvalidFieldNameException = throwInvalidFieldNameException;
exports.throwInvalidFieldsFormatterEntityException = throwInvalidFieldsFormatterEntityException;
exports.throwInvalidSubFieldsListException = throwInvalidSubFieldsListException;
exports.throwUnexpectedTokenException = throwUnexpectedTokenException;
