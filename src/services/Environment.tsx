export const USE_AZDO_SERVICE: boolean =
    process.env.REACT_APP_USE_AZDO_SERVICE === "true" ? true : false;

export const USE_COMPLIANCYCHECKER_SERVICE: boolean =
    process.env.REACT_APP_USE_COMPLIANCYCHECKER_SERVICE === "true"
        ? true
        : false;
