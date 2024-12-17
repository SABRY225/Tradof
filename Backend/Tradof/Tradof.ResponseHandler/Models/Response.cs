using Tradof.ResponseHandler.Consts;
using Newtonsoft.Json;
using System.Formats.Asn1;
using Newtonsoft.Json.Linq;
using Tradof.ResponseHandler.Models;

namespace Tradof.ResponseHandler.Models
{
    public class APIOperationResponse<T>
    {
        public int StatusCode { get; set; }
        public bool Succeeded { get; set; }
        public string? Message { get; set; }
        [JsonConverter(typeof(ConfigConverter<IErrorCodes, CommonErrorCodes>))]
        public IErrorCodes Code { get; set; }
        public List<string>? Errors { get; set; }
        public T? Data { get; set; }

        public static APIOperationResponse<T> Success(T result)
        {
            return new APIOperationResponse<T>
            {
                Code = CommonErrorCodes.NULL,
                Data = result,
                StatusCode = (int)ResponseType.Success
            };
        }

        public static APIOperationResponse<T> Fail(ResponseType errorCode, IErrorCodes error, string description = "", bool IgnoreError = false)
        {
            return new APIOperationResponse<T>
            {
               Code= error,


                Message = description,
                StatusCode =(int) errorCode,
               
            };
        }

        public static APIOperationResponse<T> CreateResponse(ResponseType responseType, string? message, List<string>? errors, T? data)
        {
            return new APIOperationResponse<T>
            {
                StatusCode = (int)responseType,
                Succeeded = IsSuccessResponse(responseType),
                Message = message,
                Errors = errors,
                Data = data
            };
        }

        private static bool IsSuccessResponse(ResponseType responseType)
        {
            return responseType == ResponseType.Success ||
                   responseType == ResponseType.Created ||
                   responseType == ResponseType.NoContent;
        }

        public static APIOperationResponse<T> Success(T data, string? message = null)
        {
            return CreateResponse(ResponseType.Success, message, null, data);
        }

        public static APIOperationResponse<T> Created(string? message = null)
        {
            return CreateResponse(ResponseType.Created, message, null, default);
        }

        public static APIOperationResponse<T> Deleted(string? message = null)
        {
            return CreateResponse(ResponseType.Success, message, null, default);
        }

        public static APIOperationResponse<T> Updated(string? message = null)
        {
            return CreateResponse(ResponseType.Success, message, null, default);
        }

        public static APIOperationResponse<T> NoContent(string? message = null)
        {
            return CreateResponse(ResponseType.NoContent, message, null, default);
        }

        public static APIOperationResponse<T> NotFound(string message = "Not found.")
        {
            return new APIOperationResponse<T> { Succeeded = false, Message = message };
        }

        public static APIOperationResponse<T> BadRequest(string? message = null, List<string>? errors = null)
        {
            return CreateResponse(ResponseType.BadRequest, message, errors, default);
        }

        public static APIOperationResponse<T> ServerError(string? message = null, List<string>? errors = null)
        {
            return CreateResponse(ResponseType.InternalServerError, message, errors, default);
        }
    }
  

    public class ConfigConverter<I, T> : JsonConverter
    {
        public override bool CanWrite => false;
        public override bool CanRead => true;
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(I);
        }
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new InvalidOperationException("Use default serialization.");
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var jsonObject = JObject.Load(reader);
            var deserialized = (T)Activator.CreateInstance(typeof(T));
            serializer.Populate(jsonObject.CreateReader(), deserialized);
            return deserialized;
        }
    }

}
