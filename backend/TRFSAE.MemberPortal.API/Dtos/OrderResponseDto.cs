namespace TRFSAE.MemberPortal.API.Dtos
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}