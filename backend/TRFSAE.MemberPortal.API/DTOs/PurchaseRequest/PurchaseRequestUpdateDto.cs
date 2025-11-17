namespace TRFSAE.MemberPortal.API.DTOs
{
    public class PurchaseRequestUpdateDto
    {
        public string Status { get; set; } = string.Empty;
        public Guid Requester { get; set; }
    }
}
