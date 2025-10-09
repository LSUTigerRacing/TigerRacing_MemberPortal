using System;
using System.ComponentModel.DataAnnotations;

namespace TRFSAE.MemberPortal.API.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required] public int MemberId { get; set; }

        [Required, MaxLength(40)]
        public string Status { get; set; } = "Pending";

        [Range(0, double.MaxValue)]
        public decimal Total { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
