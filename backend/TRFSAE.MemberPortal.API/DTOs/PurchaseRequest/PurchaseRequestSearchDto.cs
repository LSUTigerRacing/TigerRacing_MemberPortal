namespace TRFSAE.MemberPortal.API.DTOs
{
    public class PurchaseRequestSearchDto
    {
        public string Status { get; set; } = string.Empty;
        public Guid? Requester { get; set; }
    }
}
