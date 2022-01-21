using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanalogi.InvoiceApp.Models
{
    public class InvoiceDetailsVM
    {
        public Invoice Invoice { get; set; }
        public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
