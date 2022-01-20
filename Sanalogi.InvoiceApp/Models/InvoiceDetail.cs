using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanalogi.InvoiceApp.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
        public string ProductName { get; set; }
        public float Price { get; set; }
    }
}
