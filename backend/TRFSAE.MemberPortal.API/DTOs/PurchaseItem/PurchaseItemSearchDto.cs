using System.Text.Json.Serialization;
using TRFSAE.MemberPortal.API.Enums;

namespace TRFSAE.MemberPortal.API.DTOs
{
    public class PurchaseItemSearchDto
    {
        public string? PartName { get; set; }
        public int ManufacturerPtNo { get; set; }
        public string? Supplier { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime? NeededBy { get; set; }
        public string? PoNumber { get; set; }
        public string? OrderActiveStatus { get; set; }
        public Guid? RequestId { get; set; }
    }
}
