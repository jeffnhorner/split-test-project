/**
 * Determines what error message to display based upon the field's validation state
 * as well as what type of form field it is.
 *
 * @return  {Array}           If applicable, it will display an array with the tailored validation
 *                            error messsage.
 *
 * @param   validationObject  The vuelidate validation object
 * @param   fieldName         The fieldName we're trying to validate within the validationGroup object
 * @param   errorMessage      What error message to dispaly in the event the field isn't validated.
 * @param   validationGroup   The vuelidate validationGroup.
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