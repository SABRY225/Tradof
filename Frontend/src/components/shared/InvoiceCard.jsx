import { Print } from '@mui/icons-material';
import React from 'react';

const InvoiceCard = ({ invoice }) => {
  const handlePrint = () => {
    const printContent = document.getElementById(`invoice-${invoice._id}`);
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              border: 1px solid #eee;
              padding: 30px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              font-size: 16px;
              line-height: 24px;
              color: #555;
            }
            .title {
              font-size: 45px;
              line-height: 45px;
              color: #333;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 40px;
            }
            .logo, .profile {
              width: 80px;
              height: 80px;
              object-fit: cover;
              border-radius: 8px;
            }
            .invoice-details td {
              padding: 5px 0;
            }
            .total {
              font-weight: bold;
              font-size: 18px;
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };
  console.log(invoice);
  

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 my-6 border border-gray-200">
      <div id={`invoice-${invoice._id}`} className="invoice-box">
        {/* Header with logos */}
        <div className="invoice-header">
          <div className="flex flex-col items-start">
            <img
              src="/vite.svg"
              alt="Company Logo"
              className="logo mb-2 w-12 h-12"
            />
            <div className="title font-bold">Tradof</div>
            <p>www.tradof.com</p>
          </div>

          <div className="text-right">
            <img
              src={invoice.user?.profileImageUrl}
              alt="User"
              className="profile mb-2 ml-auto w-14 h-14 border-2 border-main-color rounded-lg"
            />
            <h3>INVOICE</h3>
            <p>#{invoice.invoiceNumber}</p>
            <p>{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* User Details */}
        <table className="invoice-details w-full">
          <tbody>
            <tr>
              <td><strong>Customer Name:</strong></td>
              <td>{invoice.user?.firstName +" "+ invoice.user?.lastName}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{invoice.user?.email || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Invoice Type:</strong></td>
              <td>{invoice.type}</td>
            </tr>
          </tbody>
        </table>

        {/* Service Details */}
        <table className="w-full text-left mt-4 border-t pt-4">
          <thead>
            <tr className="border-b">
              <th className="py-2">Description</th>
              <th className="py-2">Reference ID</th>
            </tr>
          </thead>
          <tbody>
            {invoice.type === "Subscription" && (
             <>
              <tr>
                <td>The package has been subscribed</td>
                <td>{invoice.subPackageId?.packageId?.name || "N/A"}</td>
              </tr>
              <tr>
                <td>Package Description</td>
                <td>{invoice.subPackageId?.packageId?.description || "N/A"}</td>
              </tr>
               <tr>
                <td>Package start date</td>
                <td>{new Date(invoice.subPackageId?.startSub).toLocaleDateString() || "N/A"}</td>
              </tr>
               <tr>
                <td>Package duration</td>
                <td>{invoice.subPackageId?.packageId?.durationInMonths || "N/A"}</td>
              </tr>
             </>
            )}
            {invoice.type === "Withdraw Profits" && (
              <tr>
                <td>Profit Withdrawal</td>
                <td>{invoice.withdrawProfitId?._id || "N/A"}</td>
              </tr>
            )}
            {invoice.type === "Pay Project" && (
              <tr>
                <td>Payment for Project</td>
                <td>{invoice.pFinancialId?._id || "N/A"}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-6 text-right">
          <p className="total">Total : {" "}

            {invoice.type === "Subscription" && invoice.subPackageId?.packageId?.price}
            {invoice.type === "Pay Project" && invoice.pFinancialId?.budget}
            {invoice.type === "Withdraw Profits" && ""}
            {" "}EGP
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Thank you for your business!</p>
          <p>If you have any questions about this invoice, please contact us.</p>
        </div>
      </div>

      {/* <button
        onClick={handlePrint}
        className="flex mt-6 bg-main-color text-white px-4 py-2 rounded hover:bg-main-color transition"
      >
        <Print />
        <div className='ml-3'>Print Invoice</div>
      </button> */}
    </div>
  );
};

export default InvoiceCard;
