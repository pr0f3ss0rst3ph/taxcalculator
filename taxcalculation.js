function calculate(){
    //Pull Data from the calculator input boxes
    var paymenttype = document.getElementById("paymenttype").value;
    var grossincome = document.getElementById("grossincome").value;
    grossincome = Number(grossincome);

    var nisvalue = nis(paymenttype,grossincome);
    console.log(nisvalue);
    var nontaxable = freepay(paymenttype,grossincome);
    console.log(nontaxable);
    var chargeableincome = chargeable(paymenttype, grossincome, nontaxable, nisvalue);
    console.log(chargeableincome);
    var tier1tax = tier1(paymenttype, chargeableincome);
    console.log(tier1tax);
    var tier2tax = tier2(paymenttype, chargeableincome);
    console.log(tier2tax);
    var taxpayable = tier1tax + tier2tax;
    console.log(taxpayable);
    var netincome = grossincome - taxpayable;
    console.log(netincome);

    document.getElementById("nontax_r").innerHTML = "$"+nontaxable.toFixed(2);
    document.getElementById("nis_r").innerHTML = "$"+nisvalue.toFixed(2);
    document.getElementById("chargeableincome_r").innerHTML = "$"+chargeableincome.toFixed(2);
    document.getElementById("taxpayable_r").innerHTML = "$"+taxpayable.toFixed(2);
    document.getElementById("netincome_r").innerHTML = "$"+netincome.toFixed(2);

    function nis(paymenttype, grossincome) {
      if (paymenttype == "Monthly") {
        if (grossincome < 280000) {
          var nisvalue = 0.056 * grossincome;
        } else {
          var nisvalue = 0.056 * 280000;
        }
      }

      return nisvalue;
    }

    function freepay(paymenttype, grossincome) {
      if (paymenttype == "Monthly") {
        if (grossincome > 180000) {
          var nontaxable = grossincome / 3;
        } else {
          var nontaxable = 65000;
        }
      }

      return nontaxable;
    }

    function chargeable(paymenttype, grossincome, nontaxable, nisvalue) {
      if (paymenttype == "Monthly") {
        var initcalculation = grossincome - (nontaxable + nisvalue);

        if (initcalculation < 0) {
          var chargeableincome = 0;
        } else {
          var chargeableincome = initcalculation;
        }
      }

      return chargeableincome;
    }

    function tier1(paymenttype, chargeableincome) {
      if (paymenttype == "Monthly") {
        if (chargeableincome < 120000) {
          var tier1tax = 0.28 * chargeableincome;
        } else {
          var tier1tax = 0.28 * 120000;
        }
      }

      return tier1tax;
    }

    function tier2(paymenttype, chargeableincome) {
      if (paymenttype == "Monthly") {
        var initcalculation = chargeableincome - 120000;

        if (initcalculation > 0) {
          var tier2tax = 0.4 * initcalculation;
        } else {
          var tier2tax = 0;
        }
      }

      return tier2tax;
    }
}

