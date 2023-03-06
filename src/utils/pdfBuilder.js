export const generateInvoicePDF = async (applicant, paymentInfo) => {
  const images = {};

  const paymentImage = paymentInfo.paymentStatus ? images?.paid : images?.notPaid;
  return {
    content: [
      {
        columns: [
          {
            //   image:

            width: 80,
          },
          {
            text: [
              { text: 'BILL FROM: \n', margin: [5, 15, 0, 0] },
              {
                text: "National Teachers' Institute (NTI),\nKaduna, Nigeria.",
                fontSize: 15,
              },
            ],
            margin: [10, 7, 0, 0],
            width: 250,
          },
          {
            fontSize: 12,
            text: [
              { text: 'For Support and Enquires\n', bold: true, fontSize: 15 },
              {
                text: '0700225569684 \n SMS: 09064579779\n WhatsApp: 09097807503',
              },
            ],
            alignment: 'right',
          },
        ],
      },
      {
        table: {
          widths: [250, '*', '*'],
          headerRows: 1,
          body: [
            [
              { text: '', fillColor: '#46C35F' },
              { text: '', fillColor: '#46C35F' },
              { text: '', fillColor: '#46C35F' },
            ],
          ],
        },
        layout: 'noBorders',
        margin: [0, 20],
      },
      {
        text: 'PAYMENT INVOICE',
        bold: true,
        fontSize: 20,
        margin: [15, 30, 0, 15],
      },
      {
        table: {
          widths: [250, '*', '*'],
          body: [
            ['BILL TO', 'RECIEPT NUMBER', { text: `${paymentInfo.orderId}`, alignment: 'right' }],
            [
              `${applicant.surname} ${applicant.firstname} ${applicant.othername}`,
              'RECEIPT DATE',
              { text: moment().format('DD-MM-YYYY'), alignment: 'right' },
            ],
            [`${applicant.email}`, 'PAYMENT RRR', { text: `${paymentInfo.rrr}`, alignment: 'right' }],
            [`${applicant.phone}`, '', ''],
          ],
        },
        layout: 'noBorders',
        margin: [15, 0, 0, 20],
      },
      {
        table: {
          widths: [200, 150, '*'],
          headerRows: 1,
          body: [
            [
              {
                text: 'Description',
                fillColor: '#46C35F',
                color: '#fff',
                fontSize: 14,
                margin: [15, 5],
              },
              {
                text: 'Academic Session',
                fillColor: '#46C35F',
                color: '#fff',
                fontSize: 14,
                margin: [15, 5],
              },
              {
                text: 'Price',
                fillColor: '#46C35F',
                color: '#fff',
                fontSize: 14,
                alignment: 'right',
                margin: [15, 5],
              },
            ],
            [
              {
                text: `NTI ${paymentInfo.feeType} Form Fee for ${paymentInfo.specialization}`,
                margin: [15, 10],
              },
              { text: `${paymentInfo.session} Session`, margin: [15, 10] },
              {
                text: `₦${paymentInfo.amount}`,
                alignment: 'right',
                margin: [15, 10],
              },
            ],
          ],
        },
        layout: 'noBorders',
        margin: [15, 0, 0, 20],
      },
      {
        table: {
          widths: [280, '*', '*'],
          headerRows: 1,
          body: [
            [
              '',
              {
                text: 'TOTAL',
                fillColor: '#46C35F',
                color: '#FFF',
                fontSize: 14,
                margin: [10, 5],
              },
              {
                text: `₦${paymentInfo.amount}`,
                alignment: 'right',
                color: '#FFF',
                fillColor: '#46C35F',
                fontSize: 14,
                margin: [15, 5],
              },
            ],
          ],
        },
        layout: 'noBorders',
        margin: [15, 0, 0, 20],
      },

      {
        text: 'Payment Options',
        margin: [15, 50, 0, 15],
      },

      {
        //   image:

        width: 400,
        margin: [15, 0, 0, 0],
      },
      {
        image: paymentImage,
        width: 100,
        margin: [15, 0, 0, 0],
        alignment: 'right',
      },
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 16,
        margin: [0, 25, 0, 10],
      },
      text: {
        fontSize: 12,
        margin: [15, 2, 0, 0],
      },
    },
  };
};
