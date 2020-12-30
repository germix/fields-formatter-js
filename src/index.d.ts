
export class Token
{
    /**
     * @var string|integer Id del token
     */
    readonly id;
    /**
     * @var integer Línea donde se encontró el token
     */
    readonly line;
    /**
     * @var string Lexema del token
     */
    readonly lexeme;

    /**
     * Constructor
     *
     * @param string|integer id     Id del token
     * @param integer        line   Línea donde se encontró el token
     * @param string         lexeme Lexema del token
     */
    constructor($id, $line, $lexeme);
}

export class FieldsLexer
{
    /**
     * Constructor
     * Iniciar el análisis léxico
     *
     * @param string string Cadena
     */
    constructor(string);

    /**
     * Obtener el siguiente token
     *
     * @return Token Token
     */
    getToken() : Token;
}

export class FieldsParser
{
    /**
     * Constructor
     */
    constructor();

    /**
     * Parsear
     *
     * @param string $fields
     *
     * @return array
     */
    parse(fields);
}

export interface FieldsFormatterEntity
{
    /**
     * Format field
     * 
     * @param FieldsFormatter   formatter       Formatter
     * @param string            field           Field name
     * @param array             subfields       Sub fields for an object field
     * @param any               data            Custom data
     *
     * @return null|string|array
     */
    formatField(formatter, field, subfields, data);

    /**
     * Get default fields
     *
     * @return null|array|string Null, array of fields, comma separated string of fields
     */
    defaultFormatterFields();
}

export class FieldsFormatter
{
    /**
     * Constructor
     * 
     * @param any data Custom data
     */
    constructor(data?);

    /**
     * Format entity or collection of entities
     *
     * @param FieldsFormatterEntity|FieldsFormatterEntity[] target      Target to format
     * @param array|string                                  fields      Fields
     *
     * @return array
     *
     * @throws InvalidDefaultFieldsException
     * @throws InvalidFieldsFormatterElementException
     */
    format(target: FieldsFormatterEntity|FieldsFormatterEntity[], fields?) : Promise<any>;
}

export class FieldsFormatterException
{
    construct();
}
