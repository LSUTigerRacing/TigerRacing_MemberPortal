using TRFSAE.MemberPortal.API.Models;
using TRFSAE.MemberPortal.API.Enums;
using System.Text.Json.Serialization;

namespace TRFSAE.MemberPortal.API.DTOs;

public class PurchaseItemUpdateDto
{
    public Guid Requester { get; set; }
    public string PartUrl { get; set; } = string.Empty;
    public string PartName { get; set; } = string.Empty;
    public int ManufacturerPtNo { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public string Supplier { get; set; } = string.Empty;

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus OrderStatus { get; set; }

    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? NeededBy { get; set; }
    public string PoNumber { get; set; } = string.Empty;
    public DateTime? OrderDate { get; set; }
    public DateTime? OrderReceivedDate { get; set; }
    public string OrderActiveStatus { get; set; } = string.Empty;
    public Guid? RequestId { get; set; }
    public bool[]? Approvals { get; set; }
}
