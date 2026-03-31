/**
 * Standardized response helper for the backend
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Message for the response
 * @param {Object} data - Data to send in the response
 */
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: statusCode < 400,
        code: statusCode,
        message,
        data
    });
};

module.exports = sendResponse;
