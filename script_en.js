function learn(is_harmoni, num, res) {
  if (num.how_to === 1) {
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}
        From the formula:
        $$a_n = a_1 + (n - 1)d $$
        From observing the sequence, we can see that the common difference is ${num.data[1][0]}
        The first term is ${num.data[0][0]}
        The term we want to find is ${num.n}
        $$a_n = ${num.data[0][0]} + (${num.n} - 1) \\cdot ${num.data[1][0]} $$
        Therefore
        $$a_n = ${res}$$
      `;
    } else {
      formulaText = `
        Ans: ${res}
        From the formula:
        $$a_n = a_1 + (n - 1)d $$
        From observing the sequence, we can see that the common difference is ${num.data[1][0]}
        The first term is ${num.data[0][0]}
        The term we want to find is ${num.n}
        $$a_n = ${num.data[0][0]} + (${num.n} - 1) \\cdot ${num.data[1][0]} $$
        Therefore
        $$a_n = ${res}$$
        And the sum of all terms from 1 to n is ${num.n*(num.data[0][0]+res)/2}
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    let count = 0;
    let data = [res, num.data[1][0], num.data[1][0], num.n];
    
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) {
        for (let i = num.data[1].length; i < num.n-1; i++) {
          num.data[1].push(num.data[1][0]);
        }
        for (let i = num.data[0].length; i < num.n; i++) {
          num.data[0].push(num.data[1][0]+num.data[0][i-1]);
        }
        renderTable(num.data, "output");
      }
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else if (num.how_to === 2) {
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}
        From the formula
        $$a_n = a_1 \\times r^{(n-1)} $$
        From observing the sequence, we can see that the common ratio is ${num.data[1][0]}
        The first term is
        $$a_1 = ${num.data[0][0]}$$
        The term we want to find is n = ${num.n}
        $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$
        Therefore
        $$a_n = ${res}$$
      `;
    } else {
      formulaText = `
        Ans: ${res}
        From the formula
        $$a_n = a_1 \\times r^{(n-1)} $$
        From observing the sequence, we can see that the common ratio is ${num.data[1][0]}
        The first term is
        $$a_1 = ${num.data[0][0]}$$
        The term we want to find is n = ${num.n}
        $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$
        Therefore
        $$a_n = ${res}$$
        And the sum of all terms from 1 to n is ${num.data[0][0]*(1-Math.pow(num.data[1][0], num.n))/(1-num.data[0][0])}
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    let count = 0;
    let data = [res, num.data[1][0], num.data[1][0], num.n];
    
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) {
        for (let i = num.data[1].length; i < num.n-1; i++) {
          num.data[1].push(num.data[1][0]);
        }
        for (let i = num.data[0].length; i < num.n; i++) {
          num.data[0].push(num.data[1][0]*num.data[0][i-1]);
        }
        renderTable(num.data, "output");
      }
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else if (num.how_to === 3) {
    let total = 0;
    let sum_terms = [];
    let data = [];
    
    for (let k = 0; k < Math.min(num.n, num.data.length); k++) {
      let binom = binomial(num.n - 1, k);
      data += binom;
      let dk = num.data[k][0];
      data += dk;
      let term = binom * dk;
      data += term;
      total += term;
      sum_terms.push(`\\binom{${num.n - 1}}{${k}} \\cdot d_{${k}} &= ${binom} \\cdot ${dk} = ${term}`);
    }
    
    let expandedFormula = sum_terms.join(" \\\\ ");
    data += total;
    
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}
        From the formula:
        $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
        Substituting values:
        $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
        Expanding the terms:
        \\[ \\begin{aligned}
        ${expandedFormula}
        \\end{aligned} \\]
        The result:
        $$ a_n = ${total} $$
      `;
    } else {
      formulaText = `
        Ans: ${res}
        From the formula:
        $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
        Substituting values:
        $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
        Expanding the terms:
        \\[ \\begin{aligned}
        ${expandedFormula}
        \\end{aligned} \\]
        The result:
        $$ a_n = ${total} $$
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    data += res;
    data += num.n;
    data += num.data[0][0];
    
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) {
        for (let i = num.data[1].length; i < num.n+2; i++) {
          num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
        }
        for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
          for (let j = num.data[i].length; j < num.n; j++) {
            num.data[i].push(num.data[i+1][j-1]+num.data[i][j-1]);
          }
        }
        renderTable(num.data, "output");
      }
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else if (num.how_to === 4) {
    let product = num.data[0][0];
    let product_terms = [];
    let data = [];
    let corrected_dk = [];
    
    for (let k = 0; k < num.data.length; k++) {
      corrected_dk[k] = (num.data[k][0] !== 0) ? num.data[k][0] : (k > 0 ? corrected_dk[k - 1] : 1);
    }
    
    for (let k = 0; k < Math.min(num.n, corrected_dk.length); k++) {
      let binom = binomial(num.n-1, k);
      data += binom;
      let dk = corrected_dk[k];
      data += dk;
      let term = Math.pow(dk, binom);
      data += term;
      product *= term;
      product_terms.push(`d_{${k}}^{\\binom{${num.n-1}}{${k}}} &= ${dk}^{${binom}} = ${term}`);
    }
    
    data += product;
    let expandedFormula = product_terms.join(" \\\\ ");
    
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}
        From the formula:
        $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
        Substituting values:
        $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
        Expanding the terms:
        \\[ \\begin{aligned}
        ${expandedFormula}
        \\end{aligned} \\]
        The result:
        $$ a_n = ${res} $$
      `;
    } else {
      formulaText = `
        Ans: ${res}
        From the formula:
        $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
        Substituting values:
        $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
        Expanding the terms:
        \\[ \\begin{aligned}
        ${expandedFormula}
        \\end{aligned} \\]
        The result:
        $$ a_n = ${res} $$
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    data += res;
    data += num.n;
    data += num.data[0][0];
    
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) {
        for (let i = num.data[1].length; i < num.n+1; i++) {
          num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
        }
        for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
          for (let j = num.data[i].length; j < num.n; j++) {
            num.data[i].push(num.data[i+1][j-1]*num.data[i][j-1]);
          }
        }
        renderTable(num.data, "output");
      }
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else if (num.how_to === 5) {
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}
        From the formula:
        $$ a_n = a_{n-1} + a_{n-2} $$
        This is a recursive sequence because each term depends on the previous terms
        Initial terms:
        $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$
        The term we want to find:
        $$ n = ${num.n} $$
        Therefore, the ${num.n}th term in the above sequence is ${res}
      `;
    } else {
      formulaText = `
        Ans: ${res}
        From the formula:
        $$ a_n = a_{n-1} + a_{n-2} $$
        This is a recursive sequence because each term depends on the previous terms
        Initial terms:
        $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$
        The term we want to find:
        $$ n = ${num.n} $$
        Therefore, the ${num.n}th term in the above sequence is ${res}
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    let data = [res, num.n, num.data[0][0], num.data[0][1]];
    let count = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) {
        let table = [];
        let temp = [];
        for (let i = 0; i < Math.min(6, num.data[0].length); i++) {
          temp.push(num.data[0][i]);
        }
        table.push(temp);
        temp = [];
        for (let i = 0; i < 5 && i < num.data[1].length; i++) {
          temp.push(num.data[1][i]);
        }
        table.push(temp);
        renderTable(table, "output");
      }
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else if (num.how_to === 6) {
    let steps = [];
    for (let k = 0; k < pathResult.path.length; k++) {
      let stepDesc;
      if (pathResult.path[k] === '0') {
        stepDesc = `Step ${k+1}: Use addition to find the difference of the sequence`;
      } else if (pathResult.path[k] === '1') {
        stepDesc = `Step ${k+1}: Use multiplication to find the ratio of the sequence`;
      }
      steps.push(stepDesc);
    }
    
    let expandedFormula = steps.join("\n");
    
    let formulaText;
    if (is_harmoni) {
      formulaText = `
        Ans: 1/${res}

        Sequence Analysis Result:
        The analysis examines the sequence layer by layer, using addition for sequences with constant differences and multiplication for sequences with constant ratios to find the relationship between terms

        Calculation Steps:
        ${expandedFormula}

        From these steps, we can identify the sequence pattern and construct an equation that describes the general term
      `;
    } else {
      formulaText = `
        Ans: ${res}

        Sequence Analysis Result:
        The analysis examines the sequence layer by layer, using addition for sequences with constant differences and multiplication for sequences with constant ratios to find the relationship between terms

        Calculation Steps:
        ${expandedFormula}

        From these steps, we can identify the sequence pattern and construct an equation that describes the general term
      `;
    }
    
    const checkbox = document.getElementById("run_table");
    let data = [res];
    let count = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (!isFinite(data[i])) {
        count++;
      }
    }
    
    if (count === 0) {
      document.getElementById('run').innerHTML = formulaText;
      if (checkbox.checked) renderTable(num.data, "output");
    } else {
      document.getElementById('run').innerHTML = "We apologize for the inconvenience due to some errors, such as calculations resulting in extremely high values (infinity) or null values, which make it impossible to compute the result";
    }
    
    MathJax.typeset();
  } 
  else {
    document.getElementById('run').innerHTML = "Ans: " + res + "\nThe given sequence may be outside the scope of study. The result is calculated using Lagrange polynomial";
  }
}

function input_1() {
    let start = Date.now();
    let res = {};
    const num = new data_num();
    let line = document.getElementById('dataInput').value.trim();
    let nValue = document.getElementById('x1').value.trim();
    
    if (line === "" || nValue === "") {
        alert("Please fill in all data before calculating!");
    } else {
        Filter_data(num, line);
        num.n = Number(nValue);
        res = find_n(num);
        learn(num.is_harmoni, num, res);
    }
    let end = Date.now();
    document.getElementById('time').innerHTML = "Time elapsed : " + (end - start) + " ms";
    return 0;
}

function input_2() {
    let start = Date.now();
    const inputs = document.querySelectorAll('#inputsContainer input');
    const values = Array.from(inputs)
        .map(input => input.value.trim())
        .filter(v => v !== "");

    if (values.length === 0) {
        alert("Please enter numbers before calculating!");
    } else {
        let res;
        const num = new data_num();
        const s = values.join(', ');
        Filter_data(num, s);
        num.n = Number(document.getElementById('x2').value);
        res = find_n(num);
        learn(num.is_harmoni, num, res);
    }
    let end = Date.now();
    document.getElementById('time').innerHTML = "Time elapsed : " + (end - start) + " ms";
    return 0;
}