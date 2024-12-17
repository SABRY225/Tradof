using System.Runtime.InteropServices;
namespace Tradof.Comman.Base
{
    public class AuditEntity<T> : BaseEntity<T>
    {
        public DateTime CreationDate { get; set; } = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Arab Standard Time")) :
            DateTime.UtcNow;
        public DateTime? ModificationDate { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedBy { get; set; }
    }
    public class AuditEntity
    {


        public DateTime CreationDate { get; set; } = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Arab Standard Time")) :
             TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Asia/Riyadh")); //DateTime.UtcNow;
        public DateTime? ModificationDate { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedBy { get; set; }
    }
}
