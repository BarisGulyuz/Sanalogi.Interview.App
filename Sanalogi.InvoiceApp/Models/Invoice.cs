using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanalogi.InvoiceApp.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float TotalPrice { get; set; }
        public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
