using Microsoft.AspNetCore.Mvc;
using Sanalogi.InvoiceApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanalogi.InvoiceApp.Controllers
{
    public class InvoiceController : Controller
    {
        List<Invoice> Invoices = new List<Invoice>();
        List<InvoiceDetail> InvoiceDetails = new List<InvoiceDetail>();
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Add(DateTime date, float totalPrice, ICollection<InvoiceDetail> ınvoiceDetail)
        {
            int invoiceId = 1;

            Invoices.Add(new Invoice
            {
                Id = invoiceId,
                Date = date,
                TotalPrice = totalPrice
            });
            int invoiceDetailId = 1;
            foreach (var item in ınvoiceDetail)
            {
                InvoiceDetails.Add(new InvoiceDetail
                {
                    Id = invoiceDetailId,
                    InvoiceId = invoiceId,
                    ProductName = item.ProductName,
                    Price = item.Price
                });
                invoiceDetailId++;
            }

            var invoice = Invoices.FirstOrDefault(x => x.Id == invoiceId);
            var invoicesDetails = InvoiceDetails.Where(x => x.InvoiceId == invoiceId).ToList();
            return Json(new InvoiceDetailsVM
            {
                Invoice = invoice,
                InvoiceDetails = invoicesDetails
            });

        }

    }
}
