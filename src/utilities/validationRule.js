/**
 * Determines what error message to display based upon the fields validation state
 * as well as what type of form field it is.
 *
 * @return  {Array}      If applicable, it will display an array with the tailored validation
 *                       error messsage.
 *
 * @param   fieldName    The form field name we're validating
 * @param   errorMessage What error message to dispaly in the event the field isn't validated.
 */
export default function validationRule (validationObject, fieldName, errorMessage, validationGroup = null) {
    if (validationGroup) {
        return validationObject[`${validationGroup}`][`${fieldName}`].$invalid
            ? [errorMessage]
            : [];
    }

    return validationObject[`${fieldName}`].$invalid
      ? [errorMessage]
      : [];
};