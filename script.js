function diff(a, b) {
  return Math.abs(a - b);
}

function div(a, b) {
  if (a === 0 || b === 0) {
    return Math.max(a, b);
  }
  return Math.max(a, b) / Math.min(a, b);
}

function comb(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i) / (i + 1);
  }
  return Math.round(result);
}

function find_data(data, Operator, n) {
  if (Operator === 1 || Operator === 2) {
    let j = 0;
    let result = [data];
    while (result[j].length > 1) {  
        let nextRow = [];
        for (let i = 0; i < result[j].length - 1; i++) {
          if (Operator === 1) {
            nextRow.push(result[j][i + 1] - result[j][i]);
          } else if (Operator === 2) {
            nextRow.push(result[j][i + 1] / result[j][i]);
          } else {
            console.log("ERROR")
          }
        }
        result.push(nextRow);
        j++;
    }
    return result;
  } else if (Operator === 3) {
    const pathResult = findPath(data);
    const finalPath = pathResult.slice(0, -1);
    const term = findNthTerm(data, n + 1, finalPath);
    const result = term[0];
    return result;
  }
}

function learning(data, x, Operator, ldata4) {
  if (Operator === 1 || Operator === 3) {
    learning1(data, x, Operator);
  } else if (Operator === 2) {
    learning2(data, x);
  } else if (Operator === 4) {
    learning3(data, x)
  } else if (Operator === 5){
    learning4(ldata4, x)
  }
}

function learning1(data, x, Operator) {
  let a1 = data[0][0];
  let n = x + 1
  let d = data[1][0];
  let an;
  let formulaText;
  //set 
  if (Operator === 1) {
    an = a1 + (n - 1) * d;
    formulaText = `
      จากสูตร
      $$a_n = a_1 + (n - 1)d $$
      จะได้ว่า $$ a_1 = ${a1}, n = ${n}, d = ${d} $$
      $$ a_1 = ${a1} + (${n} - 1) \\times ${d} = ${an} $$
    `;
  } else if (Operator === 3) {
    an = a1 * Math.pow(data[1][0], n-1);
    formulaText = `
      จากสูตร
      $$ a_n = a_1 \\cdot {r^{n - 1}} $$
      จะได้ว่า $$ a_1 = ${a1}, n = ${n}, r = ${d} $$
      $$ a_1 = ${a1} \\times {${d}^{${n} - 1}} = ${an} $$
    `;
  }

  document.getElementById("learning").innerHTML = formulaText;
  MathJax.typeset();
}

function learning2(data, x) {
  let a1 = data[0][0];
  let n = x + 1;
  let total = 0;
  let sum_terms = [];
  for (let k = 1; k < Math.min(n, data.length); k++) {
      let binom = comb(n-1, k);
      let dk = data[k][0];
      let term = binom * dk;
      total += term;

      sum_terms.push(`\\binom{${n-1}}{${k}} \\cdot d_{${k}} &= ${binom} \\cdot ${dk} = ${term}`);
  }
  let expandedFormula = sum_terms.join(" \\\\ ");
  let an = total + a1;

  let formulaText = `
  จากสูตร:
  $$ a_n = a_1 + \\sum_{k=1}^{n-1} \\binom{n-1}{k} \\cdot d_k $$

  แทนค่าจะได้ว่า:
  $$ a_1 = ${a1}, n = ${n} $$

  กระจายพจน์:
  \\[
  \\begin{aligned}
  ${expandedFormula}
  \\end{aligned}
  \\]

  ผลรวม:
  $$ a_n = ${a1} + ${total} = ${an} $$`;

  document.getElementById("learning").innerHTML = formulaText;
  MathJax.typeset();
}

function learning3(data, x) {
  let a1 = data[0][0]; // ค่า a_1
  let n = x + 1; // คำนวณ n
  let product = a1;
  let product_terms = [];

  let corrected_dk = [];
  for (let k = 0; k < data.length; k++) {
      corrected_dk[k] = (data[k][0] !== 0) ? data[k][0] : (k > 0 ? corrected_dk[k - 1] : 1);
  }

  for (let k = 1; k < Math.min(n, corrected_dk.length); k++) {
      let binom = comb(n-1, k); // คำนวณ C(n, k)
      let dk = corrected_dk[k]; // ค่า d_k หลังแก้ไข
      let term = Math.pow(dk, binom);
      product *= term;

      product_terms.push(`d_{${k}}^{\\binom{${n-1}}{${k}}} &= ${dk}^{${binom}} = ${term}`);
  }

  let expandedFormula = product_terms.join(" \\\\ "); // ใช้ \\ เพื่อขึ้นบรรทัดใหม่

  // แสดงสมการในรูปแบบ MathJax
  let formulaText = `
  จากสูตร:
  $$ a_n = a_1 \\cdot \\prod_{k=1}^{n-1} d_k^{\\binom{n-1}{k}} $$

  แทนค่าจะได้ว่า:
  $$ a_1 = ${a1}, n = ${n} $$

  กระจายพจน์:
  \\[
  \\begin{aligned}
  ${expandedFormula}
  \\end{aligned}
  \\]

  ค่าที่ได้:
  $$ a_n = ${a1} \\times ${product / a1} = ${product} $$`;

  document.getElementById("learning").innerHTML = formulaText;

  // รีเรนเดอร์ MathJax
  MathJax.typeset();
}

function learning4(data, x) {
  const pathResult = findPath(data);
  let product_terms = [];
  let term;

  for (let k = 0; k < pathResult.length; k++) {
      if (pathResult[k] === 0) {
        term = 'การบวก';
      } else if (pathResult[k] === 1) {
        term = 'การคูณ'
      }
      product_terms.push(`${k+1}. ${term}`);
  }

  let expandedFormula = product_terms.join(" \\\\ "); // ใช้ \\ เพื่อขึ้นบรรทัดใหม่

  // แสดงสมการในรูปแบบ MathJax
  let formulaText = `
  ผลการคำนวณที่ได้
  เกิดจากขั้นตอนการคำนวณดังนี้

  \\[
  \\begin{aligned}
  ${expandedFormula}
  \\end{aligned}
  \\]
  `;

  document.getElementById("learning").innerHTML = formulaText;

  // รีเรนเดอร์ MathJax
  MathJax.typeset();
}
function generateTable(data, Operator) {
  let table = document.getElementById("resultTable");
  table.innerHTML = "";
  if (Operator === 1 || Operator === 3) {
    for (let row of data.slice(0, 2)) {
      let tr = document.createElement("tr");
      for (let num of row) {
          let td = document.createElement("td");
          td.textContent = num;
          tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  } else if (Operator === 2 || Operator === 4 || Operator === 5) {
    for (let row of data) {
      let tr = document.createElement("tr");
      for (let num of row) {
          let td = document.createElement("td");
          td.textContent = num;
          tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
}

function create_table(data, n, Operator) {
  let find;
  if (Operator === 1 || Operator === 2) {
    find = 1;
  } else if (Operator === 3 || Operator === 4) {
    find = 2;
  } else if (Operator === 5) {
    find = 3;
  }
  const result = find_data(data, find, n);
  learning(result, n, Operator, data);
  generateTable(result, Operator);
}

function newtonDividedDiff(x, y) {
  const n = x.length;
  const coef = [...y];
  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
    }
  }
  return coef;
}

function newtonInterpolate(xPoints, yPoints, x) {
  const coef = newtonDividedDiff(xPoints, yPoints);
  const n = xPoints.length;
  let result = coef[0];
  let term = 1.0;
  for (let i = 1; i < n; i++) {
    term *= (x - xPoints[i - 1]);
    result += coef[i] * term;
  }
  return result;
}

function Newton(values) {
  if (Array.isArray(values[0])) {
    values = values[0];
  }
  
  const xPoints = Array.from({ length: values.length }, (_, i) => i + 1);
  const yPoints = [...values];
  
  return newtonInterpolate(xPoints, yPoints, x);
}

function Differences(data, Operator) {
  let j = 1;
  while (data[j - 1].length > 1) {
    const newData = [];
    for (let i = 0; i < data[j - 1].length - 1; i++) {
      if (Operator === 1) {
        newData.push(data[j - 1][i + 1] - data[j - 1][i]);
      } else if (Operator === 2) {
        newData.push(data[j - 1][i + 1] / data[j - 1][i]);
      }
    }
    data.push(newData);
    j++;
  }
  return j;
}

function GeometricProgressionDetector(data) {
  let j = 1;
  while (data[j - 1].length > 1) {
    const newData = [];
    for (let i = 0; i < data[j - 1].length - 1; i++) {
      newData.push(data[j - 1][i + 1] / data[j - 1][i]);
    }
    data.push(newData);
    j++;
  }
  return j;
}

function polynomialSequence(data) {
  let total = 0;
  for (let k = 1; k < Math.min(n, data.length); k++) {
    total += comb(n, k) * data[k][0];
  }
  return total + data[0][0];
}

function arithmeticSequence(data) {
  return data[0][0] + n * data[1][0];
}

function multiplication(data) {
  let total = 1;
  for (let k = 1; k < Math.min(n, data.length); k++) {
    total *= Math.pow(data[k][0], comb(n, k));
  }
  return total * data[0][0];
}

function geometricSequence(data) {
  return data[0][0] * Math.pow(data[1][0], n);
}

function findPath(data) {
  const queue = [[data, [], null]];
  const visited = new Set();
  
  while (queue.length > 0) {
    const [current, path, lastOp] = queue.shift();
    const state = JSON.stringify(current);
    if (visited.has(state)) continue;
    visited.add(state);
    
    if (current.length === 1) {
      if (lastOp === null) {
        return path;
      }
      if (lastOp === 0 && current[0] === 0) {
        return path.slice(0, -1);
      }
      if (lastOp === 1 && current[0] === 1) {
        return path.slice(0, -1);
      }
    }
    
    if (current.length > 1 && current.every(x => x === current[0]) && lastOp !== null) {
      if (lastOp === 0) {
        return [...path, 0];
      }
      if (lastOp === 1 && current[0] !== 0) {
        return [...path, 1];
      }
    }
    
    const diffData = [];
    const divData = [];
    
    for (let i = 0; i < current.length - 1; i++) {
      diffData.push(diff(current[i], current[i + 1]));
      divData.push(div(current[i], current[i + 1]));
    }
    
    if (diffData.length > 0 && diffData.every(x => x === diffData[0]) && diffData[0] === 0) {
      return [...path, 0];
    }
    
    if (divData.length > 0 && divData.every(x => x === divData[0]) && divData[0] === 1) {
      return [...path, 1];
    }
    
    if (diffData.length > 0) {
      queue.push([diffData, [...path, 0], 0]);
    }
    
    if (divData.length > 0) {
      queue.push([divData, [...path, 1], 1]);
    }
  }
  
  return null;
}

function findNthTerm(data, n, path) {
  if (n <= data.length) {
    return [data, data[n - 1]];  // คืนค่าเป็นอาร์เรย์ที่มี sequences และ n-th term
  }
  const sequences = [data.slice()];
  for (let i = 0; i < path.length; i++) {
    const op = path[i];
    const prevSeq = sequences[sequences.length - 1];
    const newSeq = [];
    if (op === 0) {
      for (let j = 1; j < prevSeq.length; j++) {
        newSeq.push(prevSeq[j] - prevSeq[j - 1]);
      }
    } else if (op === 1) {
      for (let j = 1; j < prevSeq.length; j++) {
        if (prevSeq[j - 1] === 0) {
          newSeq.push(0);
        } else {
          newSeq.push(prevSeq[j] / prevSeq[j - 1]);
        }
      }
    }
    sequences.push(newSeq);
  }
  const bottomSeq = sequences[sequences.length - 1];
  if (bottomSeq.length < 2) {
    return [sequences, bottomSeq.length ? bottomSeq[bottomSeq.length - 1] : null];
  }
  
  let updateFn;
  let isArithmetic = true;
  const commonDiff = bottomSeq[1] - bottomSeq[0];
  
  for (let i = 2; i < bottomSeq.length; i++) {
    if (bottomSeq[i] - bottomSeq[i - 1] !== commonDiff) {
      isArithmetic = false;
      break;
    }
  }
  
  if (isArithmetic) {
    updateFn = x => x + commonDiff;
  } else {
    let isGeometric = true;
    const commonRatio = bottomSeq[1] / bottomSeq[0];
    
    for (let i = 2; i < bottomSeq.length; i++) {
      if (Math.abs(bottomSeq[i] / bottomSeq[i - 1] - commonRatio) > 1e-10) {
        isGeometric = false;
        break;
      }
    }
    
    if (isGeometric) {
      updateFn = x => x * commonRatio;
    } else {
      throw new Error("Cannot predict the next term");
    }
  }
  
  while (sequences[0].length < n) {
    const nextBottom = updateFn(bottomSeq[bottomSeq.length - 1]);
    bottomSeq.push(nextBottom);
    
    for (let i = sequences.length - 1; i > 0; i--) {
      const currentSeq = sequences[i];
      const prevSeq = sequences[i - 1];
      const currentOp = path[i - 1];
      
      let nextValue;
      if (currentOp === 0) {
        nextValue = prevSeq[prevSeq.length - 1] + currentSeq[currentSeq.length - 1];
      } else if (currentOp === 1) {
        nextValue = prevSeq[prevSeq.length - 1] * currentSeq[currentSeq.length - 1];
      }
      
      prevSeq.push(nextValue);
    }
  }

  // คืนค่าเป็นอาร์เรย์ที่มีทั้ง sequences และ n-th term
  return [sequences, sequences[0][n - 1]];  // คืนทั้ง sequences และ n-th term
}


function CheckDifferences(info, data, data2, data3, n) {
  let resultSet = 0;
  let predicted = null;
  const diffLevels = Differences(data, 1);
  
  if (data[2] && data[2].every(x => x === 0)) {
    predicted = arithmeticSequence(data);
    resultSet = 1;
  } else if (data[diffLevels - 1] && data[diffLevels - 1].every(x => x === 0)) {
    predicted = polynomialSequence(data);
    resultSet = 2;
  }
  
  if (resultSet === 0) {
    const geoLevels = Differences(data2, 2);
    
    if (data2[2] && data2[2].every(x => x === 1)) {
      predicted = geometricSequence(data2);
      resultSet = 3;
    } else if (data2[geoLevels - 1] && data2[geoLevels - 1].every(x => x === 1)) {
      predicted = multiplication(data2);
      resultSet = 4;
    }
  }
  
  if (resultSet === 0) {
    const pathResult = findPath(data3);
    
    if (pathResult === null) {
      predicted = Newton(info);
      resultSet = 6;
    } else {
      const finalPath = pathResult.slice(0, -1);
      const predicted2 = findNthTerm(data3, n + 1, finalPath);
      predicted = predicted2[1];
      resultSet = 5;
    }
  }
  
  return { resultSet, predicted };
}

function calculateSequence() {
  const dataInput = document.getElementById("dataInput").value;
  const termInput = document.getElementById("x").value;
  if (!dataInput.trim()) {
    showMessage("Please enter data points.", "alert");
    return;
  }
  if (!termInput.trim()) {
    showMessage("Please enter a valid value for x.", "alert");
    return;
  }
  
  const nInput = parseInt(termInput) - 1;
  if (isNaN(nInput) || nInput < 0) {
    showMessage("The term number is incorrect.", "alert");
    return;
  }

  window.x = nInput + 1;
  window.n = nInput;
  
  const values = dataInput.split(",").map(num => Number(num.trim()));
  if (values.some(isNaN)) {
    showMessage("The information is invalid. Please enter the correct numbers separated by commas.", "alert");
    return;
  }

  const data = [values.slice()];
  const data2 = [values.slice()];
  const info = [values.slice()];
  const data3 = values.slice();
  const data4 = values.slice();

  const { resultSet, predicted } = CheckDifferences(info, data, data2, data3, nInput);
  let message = "";
  switch(resultSet) {
    case 1:
      create_table(data4, nInput, 1)
      message = `ลำดับเลขคณิต ทำนายเทอมที่ ${nInput + 1} ได้ค่า: ${predicted}`;
      break;
    case 2:
      create_table(data4, nInput, 2)
      message = `ลำดับพหุนาม ทำนายเทอมที่ ${nInput + 1} ได้ค่า: ${predicted}`;
      break;
    case 3:
      create_table(data4, nInput, 3)
      message = `ลำดับเรขาคณิต ทำนายเทอมที่ ${nInput + 1} ได้ค่า: ${predicted}`;
      break;
    case 4:
      create_table(data4, nInput, 4)
      message = `ลำดับการคูณ ทำนายเทอมที่ ${nInput + 1} ได้ค่า: ${predicted}`;
      break;
    case 5:
      create_table(data4, nInput, 5)
      message = `ทำนายเทอมที่ ${nInput + 1} ผ่าน transformation path ได้ค่า: ${predicted}`;
      break;
    case 6:
      message = `ทำนายเทอมที่ ${nInput + 1} ด้วย Newton's interpolation ได้ค่า: ${predicted}`;
      break;
    default:
      message = "ไม่สามารถทำนายค่าได้";
  }
  document.getElementById("output").innerHTML = `
  <h3>${message}</h3>
  `;
}

function showMessage(message, type) {
  document.getElementById("output").innerHTML = `<div class="${type}">${message}</div>`;
}

let mybutton = document.getElementById("top");
window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}