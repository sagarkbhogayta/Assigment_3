const Order = require("./Order");
var menu = Object;
var totalPrice = 0;

menu = {
  Types: {
    types: {
      one: ["Recycling Containers", 30],
      two: ["Broom", 20],
    },
  },
  Size: {
    size: {
      one: ["Small", 10],
      two: ["Medium", 20],
    },
  },
  Item: {
    item: {
      one: ["Recycling Bag", 25],
    },
  },
  Extra: {
    Extra: {
      one: ["Ear Buds", 10],
    },
  },
};

const OrderState = Object.freeze({
  TYPE: Symbol("welcome"),
  RECYCLING: Symbol("recycling"),
  BROOM: Symbol("broom"),
  ITEM: Symbol("item"),
  SIZE: Symbol("size"),
  EXTRA: Symbol("extra"),
  EXTRAS: Symbol("extras"),
  PRICE: Symbol("price"),
  MENU: Symbol("menu"),
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sType1 = null;
    this.sType2 = null;
    this.sSize1 = null;
    this.sSize2 = null;
    this.sItem1 = null;
    this.sExtra = null;
    this.sPrice = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.TYPE;
        aReturn.push("Welcome Sagar's Hardware store.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        aReturn.push(
          "What would you like to see for 1.Recycling Containers and 2.Broom"
        );
        break;
      case OrderState.TYPE:
        if (sInput == "1") {
          this.stateCur = OrderState.RECYCLING;
          this.sType2 = menu.Types.types.one[0];
          this.sPrice += menu.Types.types.one[1];
          aReturn.push(
            "What size of Recycling Containers would you like 1.Small $10 and 2.medium $20 !"
          );
        } else if (sInput == "2") {
          this.stateCur = OrderState.BROOM;
          this.sType1 = menu.Types.types.two[0];
          this.sPrice += menu.Types.types.two[1];
          aReturn.push(
            "What size of Broom would you like 1.Small $10 and 2.medium $20 !"
          );
        } else {
          aReturn.push("Please give valid Input !");
          break;
        }
        break;
      case OrderState.RECYCLING:
        this.stateCur = OrderState.ITEM;
        if (sInput == "1") {
          this.sSize2 = menu.Size.size.one[0];
          this.sPrice += menu.Size.size.one[1];
        } else if (sInput == "2") {
          this.sSize2 = menu.Size.size.two[0];
          this.sPrice += menu.Size.size.two[1];
        } else {
          aReturn.push("Please give valid Input !");
          break;
        }
        aReturn.push("Would like to add Recycling Bag Yes/No!");
        break;
      case OrderState.ITEM:
        this.stateCur = OrderState.EXTRA;
        if (sInput.toLowerCase() == "y") {
          this.sItem1 = menu.Item.item.one[0];
          this.sPrice += menu.Item.item.one[1];
          aReturn.push(
            "What Would like to See 1.Broom Size  2.Extra's Options!"
          );
        } else if (sInput.toLowerCase() == "n") {
          aReturn.push(
            "What Would like to See 1.Broom Size  2.Extra's Options!"
          );
        } else {
          aReturn.push("Please give valid Input !");
          break;
        }
        break;
      case OrderState.EXTRA:
        if (sInput == "1") {
          this.stateCur = OrderState.BROOM;
          aReturn.push(
            "What size of Brooms would you like 1.Small $10 and 2.medium $20 !"
          );
        } else if (sInput == "2") {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push("Would you like Ear Buds $10 Y/N!");
        }
        break;
      case OrderState.BROOM:
        this.stateCur = OrderState.EXTRAS;
        if (sInput == "1") {
          this.sSize1 = menu.Size.size.one[0];
          this.sPrice += menu.Size.size.one[1];
        } else if (sInput == "2") {
          this.sSize1 = menu.Size.size.two[0];
          this.sPrice += menu.Size.size.two[1];
        } else {
          aReturn.push("Please give valid Input !");
          break;
        }
        if (this.sType2 == null) {
          this.stateCur = OrderState.MENU;
          aReturn.push("Would you like to see Recycling Container Y/N");
          break;
        }
        aReturn.push("Would like to add Ear Buds Bag Y/N !");
        break;
      case OrderState.MENU:
        if (sInput.toLowerCase() == "y") {
          if (this.sType2 == null) {
            this.stateCur = OrderState.RECYCLING;
            aReturn.push(
              "What size of Recycling Containers would you like 1.Small $10 and 2.medium $20 !"
            );
            break;
          } else if (this.sType1 == null) {
            this.stateCur = OrderState.BROOM;
            aReturn.push(
              "What size of Broom would you like 1.Small $10 and 2.medium $20 !"
            );
            break;
          } else {
            aReturn.push("Please give valid Input !");
            break;
          }
        } else {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push("Would like to add Ear Buds Bag Y/N !");
          break;
        }
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() == "y") {
          this.sExtras = menu.Extra.Extra.one[0];
          this.sPrice += menu.Extra.Extra.one[1];
          aReturn.push(`Thank-you for your order of ${this.sExtra}`);
        }
        totalPrice = this.sPrice * 0.13;
        totalPrice = this.sPrice + totalPrice;
        console.log(this.sPrice);
        aReturn.push("Thank-you for your order of");
        if (this.sType1 != null) {
          aReturn.push(
            `Thank-you for your order of ${this.sType1}, ${this.sSize1}`
          );
        }
        if (this.sType2 != null) {
          if (this.sItem1 != null) {
            aReturn.push(
              `Thank-you for your order of ${this.sType2}, ${this.sSize2} and ${this.sItem1} `
            );
          } else {
            aReturn.push(
              `Thank-you for your order of ${this.sType2}, ${this.sSize2}`
            );
          }
        }
        aReturn.push(`Your total comes to ${totalPrice}`);
        aReturn.push(
          `We will text you from 519-111-1111 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
    <html>
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
      <style type="text/css">
        ol {
          margin: 0;
          padding: 0;
        }
        table td,
        table th {
          padding: 0;
        }
        .c1 {
          border-right-style: solid;
          padding: 5pt 5pt 5pt 5pt;
          border-bottom-color: #000000;
          border-top-width: 1pt;
          border-right-width: 1pt;
          border-left-color: #000000;
          vertical-align: top;
          border-right-color: #000000;
          border-left-width: 1pt;
          border-top-style: solid;
          border-left-style: solid;
          border-bottom-width: 1pt;
          width: 156pt;
          border-top-color: #000000;
          border-bottom-style: solid;
        }
        .c7 {
          border-right-style: solid;
          padding: 5pt 5pt 5pt 5pt;
          border-bottom-color: #000000;
          border-top-width: 1pt;
          border-right-width: 1pt;
          border-left-color: #000000;
          vertical-align: top;
          border-right-color: #000000;
          border-left-width: 1pt;
          border-top-style: solid;
          border-left-style: solid;
          border-bottom-width: 1pt;
          width: 156.8pt;
          border-top-color: #000000;
          border-bottom-style: solid;
        }
        .c9 {
          color: #ce9178;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 15pt;
          font-family: "Courier New";
          font-style: normal;
        }
        .c0 {
          color: #000000;
          font-weight: 400;
          text-decoration: none;
          vertical-align: baseline;
          font-size: 11pt;
          font-family: "Arial";
          font-style: normal;
        }
        .c3 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: left;
          height: 11pt;
        }
        .c6 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1.15;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        .c10 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1;
          text-align: center;
        }
        .c2 {
          padding-top: 0pt;
          padding-bottom: 0pt;
          line-height: 1;
          text-align: left;
        }
        .c8 {
          margin-left: -0.8pt;
          border-spacing: 0;
          border-collapse: collapse;
          margin-right: auto;
        }
        .c11 {
          background-color: #ffffff;
          max-width: 468pt;
          padding: 72pt 72pt 72pt 72pt;
        }
        .c4 {
          background-color: #3c78d8;
        }
        .c5 {
          height: 0pt;
        }
        .title {
          padding-top: 0pt;
          color: #000000;
          font-size: 26pt;
          padding-bottom: 3pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        .subtitle {
          padding-top: 0pt;
          color: #666666;
          font-size: 15pt;
          padding-bottom: 16pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        li {
          color: #000000;
          font-size: 11pt;
          font-family: "Arial";
        }
        p {
          margin: 0;
          color: #000000;
          font-size: 11pt;
          font-family: "Arial";
        }
        h1 {
          padding-top: 20pt;
          color: #000000;
          font-size: 20pt;
          padding-bottom: 6pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        h2 {
          padding-top: 18pt;
          color: #000000;
          font-size: 16pt;
          padding-bottom: 6pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        h3 {
          padding-top: 16pt;
          color: #434343;
          font-size: 14pt;
          padding-bottom: 4pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        h4 {
          padding-top: 14pt;
          color: #666666;
          font-size: 12pt;
          padding-bottom: 4pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        h5 {
          padding-top: 12pt;
          color: #666666;
          font-size: 11pt;
          padding-bottom: 4pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
        h6 {
          padding-top: 12pt;
          color: #666666;
          font-size: 11pt;
          padding-bottom: 4pt;
          font-family: "Arial";
          line-height: 1.15;
          page-break-after: avoid;
          font-style: italic;
          orphans: 2;
          widows: 2;
          text-align: left;
        }
      </style>
    </head>
    <body class="c11 doc-content">
      <p class="c6"><span class="c0">Welcome to Sagars&rsquo;s Hardware</span></p>
      <p class="c3"><span class="c0"></span></p>
      <p class="c6"><span class="c0">Our Menu is below :</span></p>
      <p class="c3"><span class="c0"></span></p>
      <p class="c3"><span class="c0"></span></p>
      <a id="t.67acac20d5611158abe0e63db99ab53085f4f8ef"></a><a id="t.0"></a>
      <table class="c8">
        <thead>
          <tr class="c5">
            <td class="c7 c4" colspan="1" rowspan="1">
              <p class="c10"><span class="c0">Item</span></p>
            </td>
            <td class="c1 c4" colspan="1" rowspan="1">
              <p class="c10"><span class="c0">Size</span></p>
            </td>
            <td class="c1 c4" colspan="1" rowspan="1">
              <p class="c10"><span class="c0">Price CAD</span></p>
            </td>
            <tbody></tbody>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Broom</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">small</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">30</span></p>
            </td>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Broom</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">medium</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">40</span></p>
            </td>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Recycling Container</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">small</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">40</span></p>
            </td>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Recycling Container</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">medium</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">50</span></p>
            </td>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Recycling Bag</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">normal</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">25</span></p>
            </td>
          </tr>
          <tr class="c5">
            <td class="c7" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">Ear Buds</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">&nbsp;normal</span></p>
            </td>
            <td class="c1" colspan="1" rowspan="1">
              <p class="c2"><span class="c0">10</span></p>
            </td>
          </tr>
        </thead>
      </table>
      <p class="c3"><span class="c0"></span></p>
      <p class="c6">
        <span>You can contact us on </span><span class="c9">519-111-1111</span>
      </p>
      <p class="c3"><span class="c0"></span></p>
    </body>
  </html>
  `;
  }
};
