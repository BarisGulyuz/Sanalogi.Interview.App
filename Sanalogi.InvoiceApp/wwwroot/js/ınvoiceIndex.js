//DATE-PICKER CONFIG START HERE
$(function () {
    $("#date").datepicker({
        //closeText: "kapat",
        //prevText: "&#x3C;geri",
        //nextText: "ileri&#x3e",
        //currentText: "bugün",
        //monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        //    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        //monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
        //    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        //dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        //dayNamesShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        //dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        //weekHeader: "Hf",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "",
        duration: 1000,
        showAnim: "drop",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: "1920:2030"
    });
});
//DATE-PICKER CONFIG END HERE

//CLEAR INPUTS START HERE
function clearItem() {

    $("#product-name").val('');

    $("#product-price").val('');

}
//CLEAR INPUTS END HERE

// ADD PRODUCTS TO TABLE START HERE
$('#btn-product-add').click(function (e) {
    e.preventDefault()
    if ($.trim($("#product-name").val()) == "" || $.trim($("#product-price").val()) == "") return alert('Ürün Adı veya Fiyatı Boş Bırakılamaz') //if values are empty dont save

    let productName = $('#product-name').val()
    let price = $('#product-price').val()
    let detailsTable = $('#details tbody')

    let tableItems = '<tr><td>' + productName + '</td><td>' + price + '</td><td><a data-itemId="0" href="#" class="btn btn-danger btn-sm deleteItem"><span class="fas fa-trash" ></span></a></td></tr>'
    detailsTable.append(tableItems)


    CalcTotalPrice()
    clearItem()

})
// ADD PRODUCTS TO TABLE END HERE

//CALC TOTALPRICE START HERE
function CalcTotalPrice() {

    let priceArr = []
    priceArr.length = 0

    $.each($('#details tbody tr'), function () {
        priceArr.push({
            Price: Number($(this).find('td:eq(1)').html())
        })
    })
    let totalPrice = 0
    for (var i = 0; i < priceArr.length; i++) {
        totalPrice += Number(priceArr[i].Price)
    }
    $('#total-price').val(Number(totalPrice))

}
//CALC TOTALPRICE END HERE

//CLEARITEM FROM TABLE START HERE

$(document).on('click', 'a.deleteItem', function (e) {

    e.preventDefault()
    if ($(this).attr('data-itemId') == "0") {

        $(this).parents('tr').css("background-color", "#ff6347").fadeOut(800, function () {
            $(this).remove();
            CalcTotalPrice()
        });

    }

})

//CLEARITEM FROM TABLE END HERE

//SEND DATA START HERE

$('#btnSave').click(function (e) {
    e.preventDefault()
    let invoiceDetails = []
    invoiceDetails.length = 0

    $.each($('#details tbody tr'), function () {
        invoiceDetails.push({
            ProductName: $(this).find('td:eq(0)').html(),
            Price: $(this).find('td:eq(1)').html(),
        })
    })

    let data = {
        date: $("#date").val(),
        totalPrice: $("#total-price").val(),
        ınvoiceDetail: invoiceDetails
    }

    $.when(saveInvoice(data)).then(function (response) {
        console.log(response)
    }).fail(function (err) {
        console.log(err)
    })
})

function saveInvoice(data) {
    return $.ajax({

        dataType: 'json',
        type: 'post',
        url: '/Invoice/Add',
        data: { date: data.date, totalPrice: data.totalPrice, ınvoiceDetail: data.ınvoiceDetail },
        success: function (result) {

            $('#number-span').text(result.invoices[0].id)
            $('#date-span').text(Date(result.invoices[0].date))
            $('#price-span').text(result.invoices[0].totalPrice)
            let tableRow = ``
            $.each(result.invoiceDetails, (key, value) => {
                tableRow += `<tr>   <td> ${value.id} </td>
                                    <td> ${value.productName} </td>
                                    <td> ${value.price} $</td> </tr>`
            })
            $('#alert').fadeOut(1000)
            $('#invoice-section').fadeOut(1000)
            $('#report-table tbody').html(tableRow)
            $('#report-div').fadeIn(1000)
            /*  location.reload();*/
        },
        error: function () {

            alert("Somethings Wrong!")
        }
    })
}

//SEND DATA END HERE

