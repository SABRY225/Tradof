using Tradof.ResponseHandler.Models;

namespace Tradof.ResponseHandler.Consts
{
    public class CommonErrorCodes : IErrorCodes
    {
        public static readonly CommonErrorCodes NULL = new ("NULL", CommonErrorCode.NULL);
        public static readonly CommonErrorCodes FORBIDDEN = new ("FORBIDDEN", CommonErrorCode.FORBIDDEN);
        public static readonly CommonErrorCodes UN_AUTHORIZED = new ("UN_AUTHORIZED", CommonErrorCode.UN_AUTHORIZED);
        public static readonly CommonErrorCodes OPERATION_FAILED = new ("OPERATION_FAILED", CommonErrorCode.OPERATION_FAILED);
        public static readonly CommonErrorCodes INVALID_INPUT = new ("INVALID_INPUT", CommonErrorCode.INVALID_INPUT);
        public static readonly CommonErrorCodes FAILED_TO_SAVE_DATA = new ("FAILED_TO_SAVE_DATA", CommonErrorCode.FAILED_TO_SAVE_DATA);
        public static readonly CommonErrorCodes SERVER_ERROR = new ("SERVER_ERROR", CommonErrorCode.SERVER_ERROR);
        public static readonly CommonErrorCodes FAILED_TO_SEND_CODE = new ("FAILED_TO_SEND_CODE", CommonErrorCode.FAILED_TO_SEND_CODE);
        public static readonly CommonErrorCodes INVALID_EMAIL_OR_PASSWORD = new ("INVALID_EMAIL_OR_PASSWORD", CommonErrorCode.INVALID_EMAIL_OR_PASSWORD);
        public static readonly CommonErrorCodes EMAIL_NOT_CONFIRMED = new ("EMAIL_NOT_CONFIRMED", CommonErrorCode.EMAIL_NOT_CONFIRMED);
        public static readonly CommonErrorCodes INVALID_REFRESH_TOKEN = new ("INVALID_REFRESH_TOKEN", CommonErrorCode.INVALID_REFRESH_TOKEN);
        public static readonly CommonErrorCodes RESOURCE_NOT_FOUND = new ("RESOURCE_NOT_FOUND", CommonErrorCode.RESOURCE_NOT_FOUND);
        public static readonly CommonErrorCodes NotAuthorized = new ("NotAuthorized", CommonErrorCode.NotAuthorized);
        public static readonly CommonErrorCodes NOT_FOUND = new ("NOT_FOUND", CommonErrorCode.NOT_FOUND);

        private CommonErrorCodes(string value, CommonErrorCode code)
        {
            Value = value;
            Code = (int)code;
        }
        public CommonErrorCodes()
        {
        }
        public string Value { get; set; }
        public int Code { get; set; }
    

}
    public enum CommonErrorCode
    {
    NULL=000,
        FORBIDDEN = 0001,
        UN_AUTHORIZED = 0002,
        OPERATION_FAILED = 0003,
        INVALID_INPUT = 0004,
        FAILED_TO_SAVE_DATA = 0005,
        SERVER_ERROR = 0006,
        FAILED_TO_SEND_CODE = 0007,
        INVALID_EMAIL_OR_PASSWORD = 0008,
        EMAIL_NOT_CONFIRMED = 0009,
        INVALID_REFRESH_TOKEN = 0010,
        RESOURCE_NOT_FOUND = 0011,
        NotAuthorized = 0012,
           NOT_FOUND = 0013,
    

}
}
