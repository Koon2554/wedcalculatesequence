function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function run_input(n) {
    if (n == 1) {
        document.getElementById('input_ver_1').style.display = 'block';
        document.getElementById('input_ver_2').style.display = 'none';
    } else if (n == 2) {
        document.getElementById('input_ver_2').style.display = 'block';
        document.getElementById('input_ver_1').style.display = 'none';
    }
};

window.onload = function () {
    run_input(1);
};

function addInput() {
    const container = document.getElementById('inputsContainer');
    const div = document.createElement('div');
    div.className = 'inputItem';
    div.innerHTML = `<input type="text" placeholder="ใส่ค่าของคุณ...">
                   <button type="button" onclick="removeInput(this)">ลบ</button>`;
    container.appendChild(div);
}

function removeInput(button) {
    const div = button.parentElement;
    div.remove();
}

function showValues() {
    const inputs = document.querySelectorAll('#inputsContainer input');
    const values = Array.from(inputs).map(input => input.value).filter(v => v !== "");
    document.getElementById('valuesList').innerText = "ค่าที่กรอก: " + values.join(', ');
}

function diff(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function toBinaryInteger(n, length) {
    let result = '';
    for (let i = length - 1; i >= 0; i--) {
        result += ((n >> i) & 1) ? '1' : '0';
    }
    return result;
}

function binomial(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;

    let res = 1;
    for (let i = 1; i <= k; ++i) {
        res = res * (n - k + i) / i;
    }
    return res;
}

function min(a, b) {
    return (a < b) ? a : b;
}

function round_long_double(x) {
    return Math.round(x * 1000.0) / 1000.0;
}

function longDoubleToString(value, precision = 3) {
    return value.toFixed(precision);
}

class data_num {
    constructor() {
        this.data = [[]];
        this.n = 0;
        this.reciprocal_index = [];
        this.is_harmoni = false;
        this.how_to = -1;
    }
}

class point {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

function is_valid_number(s) {
    if (!s || s.length === 0) return false;
    let start = (s[0] === '-') ? 1 : 0;
    let dot_count = 0;
    let slash_count = 0;

    for (let i = start; i < s.length; i++) {
        const c = s[i];
        if (c === '.') {
            dot_count++;
            if (dot_count > 1) return false;
        } else if (c === '/') {
            slash_count++;
            if (slash_count > 1) return false;
        } else if (!/\d/.test(c)) {
            return false;
        }
    }
    if (slash_count === 1) {
        const parts = s.split('/');
        if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) return false;
    }

    return true;
}

function push_data(num, token) {
    if (!token || token.length === 0) return;

    if (!num.data) num.data = [[]];
    if (num.is_harmoni === undefined) num.is_harmoni = true;

    if (token.startsWith("1/(") && token.endsWith(")")) {
        const inside = token.slice(3, -1);
        if (!is_valid_number(inside)) return;

        const val = Number(inside);
        if (isNaN(val)) return;

        num.data[0].push(val);
        num.is_harmoni = true
    }
    else if (token.includes('/')) {
        if (!is_valid_number(token)) return;
        const [a, b] = token.split('/').map(Number);
        if (b === 0) return;
        num.data[0].push(a / b);
        num.is_harmoni = false;
    }
    else if (is_valid_number(token)) {
        num.data[0].push(Number(token));
        num.is_harmoni = false;
    }
}

function Filter_data(num, line) {
    let temp = '';
    let dot_count = 0;

    const should_include = (c, i) => {
        if (/\d/.test(c) || c === '/') return true;
        if (c === '.') return dot_count === 0 && i + 1 < line.length && /\d/.test(line[i + 1]);
        if (c === '-' && (i === 0 || !/\d/.test(line[i - 1]))) return i + 1 < line.length && (/\d/.test(line[i + 1]) || line[i + 1] === '.');
        if (c === '(' || c === ')') return true;
        return false;
    };

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (should_include(c, i)) {
            temp += c;
            if (c === '.') dot_count++;
        } else {
            if (temp.length > 0) {
                push_data(num, temp);
                temp = '';
                dot_count = 0;
            }
        }
    }

    if (temp.length > 0) push_data(num, temp);
}


function Lagrange_Polynomial(p, x) {
    let sum = 0;
    for (let i = 0; i < p.length; i++) {
        let poly = p[i].y;
        for (let j = 0; j < p.length; j++) {
            if (j !== i) {
                poly *= ((x - p[j].x) / (p[i].x - p[j].x));
            }
        }
        sum += poly;
    }
    return sum;
}

function check(num) {
    for (let i = 1; i < num.data[num.data.length - 1].length; i++) {
        if (Math.abs(num.data[num.data.length - 1][i] - num.data[num.data.length - 1][i - 1]) > 1e-6) return false;
    }
    return true;
}

function diff_all_data(num, n) {
    const temp = [];
    for (let i = 1; i < num.data[n].length; i++) {
        temp.push(num.data[n][i] - num.data[n][i - 1]);
    }
    const newNum = JSON.parse(JSON.stringify(num));
    newNum.data.push(temp);
    return newNum;
}

function div_all_data(num, n) {
    const temp = [];
    for (let i = 1; i < num.data[n].length; i++) {
        temp.push(num.data[n][i] / num.data[n][i - 1]);
    }
    const newNum = JSON.parse(JSON.stringify(num));
    newNum.data.push(temp);
    return newNum;
}

function find_path(num) {
    const original = JSON.parse(JSON.stringify(num));
    const size = original.data[0].length;

    if (size < 3) {
        console.log("fail (data too short)");
        return { success: false, path: '' };
    }

    for (let length = 1; length <= size - 1; length++) {
        const max_code = 1 << length;

        for (let code = 1; code < max_code; code++) {
            let current = JSON.parse(JSON.stringify(original));
            const path = toBinaryInteger(code, length);
            let success = true;

            for (let i = 0; i < path.length && success; i++) {
                if (path[i] === '0') {
                    current = diff_all_data(current, i);
                } else {
                    current = div_all_data(current, i);
                }

                if (!current || !current.data || current.data.length === 0 || current.data[0].length === 0) {
                    success = false;
                    break;
                }
            }
            if (success) {
                success = check(current);

                if (success) {
                    num.data = JSON.parse(JSON.stringify(current.data));
                    return { success: true, path: path };
                }
            }
        }
    }

    return { success: false, path: '' };
}

function toBinaryInteger(num, length) {
    return num.toString(2).padStart(length, '0');
}

function diff_many_lines(num) {
    const original = JSON.parse(JSON.stringify(num));
    const size = num.data[0].length;

    if (size < 3) {
        return false;
    }

    let current = JSON.parse(JSON.stringify(num));

    for (let i = 0; i < size - 2; i++) {
        current = diff_all_data(current, i);

        if (!current || !current.data || current.data.length === 0 || current.data[0].length === 0) {

            num.data = JSON.parse(JSON.stringify(original.data));
            return false;
        }
    }

    const success = check(current);

    if (success) {
        num.data = JSON.parse(JSON.stringify(current.data));
    } else {
        num.data = JSON.parse(JSON.stringify(original.data));
    }

    return success;
}

function div_many_lines(num) {
    const original = JSON.parse(JSON.stringify(num));
    const size = num.data[0].length;

    if (size < 3) {
        return false;
    }

    let current = JSON.parse(JSON.stringify(num));

    for (let i = 0; i < size - 2; i++) {
        current = div_all_data(current, i);

        if (!current || !current.data || current.data.length === 0 || current.data[0].length === 0) {

            num.data = JSON.parse(JSON.stringify(original.data));
            return false;
        }
    }

    const success = check(current);

    if (success) {
        num.data = JSON.parse(JSON.stringify(current.data));
    } else {
        num.data = JSON.parse(JSON.stringify(original.data));
    }

    return success;
}

function find_n_overlapping(num, path) {
    path = path.split('').reverse().join('');
    const size = num.n - num.data[0].length;
    for (let i = 0; i < size; i++) {
        num.data[num.data.length - 1].push(num.data[num.data.length - 1][0]);
    }
    let k = 0;
    for (let i = num.data.length - 2; i >= 0; i--) {
        const s = num.data[i].length - 1;
        for (let j = 0; j < size; j++) {
            if (path[k] === '0') {
                num.data[i].push(num.data[i][s + j] + num.data[i + 1][s + j]);
            } else {
                num.data[i].push(num.data[i][s + j] * num.data[i + 1][s + j]);
            }
        }
        k++;
    }
    return num.data[0][num.n - 1];
}

function check_recursive(num) {
    for (let i = 0; i < num.data[0].length - 2; i++) {
        if (num.data[0][i] + num.data[0][i + 1] !== num.data[0][i + 2]) {
            return false;
        }
    }
    return true;
}

function find_n_recursive(num) {
    let i = num.data[0].length;
    while (i <= num.n - 1) {
        num.data[0].push(num.data[0][i - 1] + num.data[0][i - 2]);
        i++;
    }
    let d = [];
    for (let i = 1; i <= num.data[0].length; i++) {
        d.push(diff(num.data[0][i], num.data[0][i-1]));
    }
    num.data.push(d);
    return num.data[0][num.n - 1];
}

function find_n_arithmetic_sequence(num) {
    return num.data[0][0] + (num.n - 1) * num.data[1][0];
}

function find_n_geometric_sequence(num) {
    return num.data[0][0] * Math.pow(num.data[1][0], num.n - 1);
}

function find_n_poly_diff_sequence(num, parameter) {
    let sum = 0;
    const max_term = Math.min(parameter.length - 1, num.n - 1);
    for (let i = 0; i <= max_term; i++) {
        sum += binomial(num.n - 1, i) * parameter[i];
    }
    return sum;
}

function find_n_poly_div_sequence(num, parameter) {
    let product = num.data[0][0];
    for (let k = 0; k < Math.min(num.n, parameter.length); k++) {
        let binom = binomial(num.n-1, k);
        let dk = parameter[k];
        let term = Math.pow(dk, binom);
        product *= term;
    }
    return product;
}

function find_Lagrange_Polynomial(num) {
    const p = [];
    for (let i = 0; i < num.data[0].length; i++) {
        const t = new point();
        t.x = i + 1;
        t.y = num.data[0][i];
        p.push(t);
    }
    return Lagrange_Polynomial(p, num.n + 1);
}

let pathResult;

function find_n(num) {
    let path = '';
    if (check(diff_all_data(num, 0))) {
        Object.assign(num, diff_all_data(num, 0));
        num.how_to = 1;
        console.log(num.how_to);
        return find_n_arithmetic_sequence(num);
    } else if (check(div_all_data(num, 0))) {
        Object.assign(num, div_all_data(num, 0));
        num.how_to = 2;
        return find_n_geometric_sequence(num);
    } else if (diff_many_lines(num)) {
        const parameter = [];
        for (let i = 0; i < num.data.length; i++) {
            if (num.data[i].length > 0) {
                parameter.push(num.data[i][0]);
            }
        }
        num.how_to = 3;
        return find_n_poly_diff_sequence(num, parameter);
    } else if (div_many_lines(num)) {
        const parameter = [];
        for (let i = 0; i < num.data.length; i++) {
            if (num.data[i].length > 0) {
                parameter.push(num.data[i][0]);
            }
        }
        num.how_to = 4;
        return find_n_poly_div_sequence(num, parameter);
    } else if (check_recursive(num)) {
        num.how_to = 5;
        return find_n_recursive(num);
    } else {
        pathResult = find_path(num, path);
        if (pathResult.success) {
            num.how_to = 6;
            return find_n_overlapping(num, pathResult.path);
        } else {
            num.how_to = 7;
            return find_Lagrange_Polynomial(num);
        }
    }
}

function renderTable(arr, containerId) {
  const container = document.getElementById(containerId);
  const tbl = document.createElement("table");
  tbl.className = "my-table";

  arr.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbl.appendChild(tr);
  });

  container.innerHTML = "";
  container.appendChild(tbl);
}

function input_1() {
    let start = Date.now();
    let res = {};
    const num = new data_num();
    let line = document.getElementById('dataInput').value.trim();
    let nValue = document.getElementById('x1').value.trim();
    
    if (line === "" || nValue === "") {
        alert("กรุณากรอกข้อมูลทั้งหมดก่อนทำการคำนวณ!");
    } else {
        Filter_data(num, line);
        num.n = Number(nValue);
        res = find_n(num);
        if (num.is_harmoni) {
            if (num.how_to === 1) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร : <br>
                $$a_n = a_1 + (n - 1)d $$ 
                จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
                พจน์แรกคือ  ${num.data[0][0]} <br>
                พจน์ที่ต้องการหาคือ  ${num.n} <br>
                $$a_n = ${num.data[0][0]} + (${num.n - 1} - 1) \\cdot ${num.data[1][0]} $$ 
                จะได้ $$a_n = ${res}$$
                `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]+num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 2) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
                จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
                พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
                พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
                $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
                จะได้ $$a_n = ${res}$$ 
              `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]*num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 3) {
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
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: <br>
                $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
            
                กระจายพจน์ : 
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${total} $$`;
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
                    for (let i = num.data[1].length; i < num.n+2; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]+num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 4) {
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
            
                let formulaText = `
                Ans : 1/${product} <br> 
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: <br>
                $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
            
                กระจายพจน์:
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${product} $$
                `;
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
                    for (let i = num.data[1].length; i < num.n+1; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]*num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 5) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
                ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
                พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
                พจน์ที่ต้องการหา: $$ n = ${num.n} $$
                ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
                `;
                let data = [res, num.n, num.data[0][0], num.data[0][1]];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    let table = [];
                    let temp = [];
                    console.log(num.data);
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
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 6) {
                let steps = [];
                console.log(pathResult.path);
                for (let k = 0; k < pathResult.path.length; k++) {
                    let stepDesc;
                    if (pathResult.path[k] === '0') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การบวก เพื่อหาผลต่าง (Difference) ของลำดับ`;
                    } else if (pathResult.path[k] === '1') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การคูณ เพื่อหาผลหาร (Ratio) ของลำดับ`;
                    }
                    steps.push(stepDesc);
                }
            
                let expandedFormula = steps.join(" <br> ");
            
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                <div>
                  <p><b>ผลการวิเคราะห์ลำดับ:</b></p>
                  <p>
                    การวิเคราะห์จะตรวจสอบลำดับทีละชั้น โดยใช้ <b>การบวก</b> สำหรับลำดับที่มีผลต่างคงที่ 
                    และ <b>การคูณ</b> สำหรับลำดับที่มีอัตราส่วนคงที่ เพื่อหาความสัมพันธ์ระหว่างพจน์
                  </p>
            
                  <p><b>ขั้นตอนการคำนวณ:</b></p>
                  ${expandedFormula}
                  <p>
                    จากขั้นตอนเหล่านี้ สามารถระบุรูปแบบลำดับและสร้างสมการที่อธิบายพจน์ทั่วไปได้
                  </p>
                </div>
                `;
                let data = [res];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
            } else {
                document.getElementById('run').innerHTML = "Ans : " + res + "\nลำดับที่ให้มาอาจอยู่นอกขอบเขตการศึกษา ในส่วนผลที่ได้คำนวณจาก Lagrange polynomial";
            } 
            MathJax.typeset();
        } else {
            if (num.how_to === 1) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร : <br>
                $$a_n = a_1 + (n - 1)d $$ 
                จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
                พจน์แรกคือ  ${num.data[0][0]} <br>
                พจน์ที่ต้องการหาคือ  ${num.n} <br>
                $$a_n = ${num.data[0][0]} + (${num.n - 1} - 1) \\cdot ${num.data[1][0]} $$ 
                จะได้ $$a_n = ${res}$$
                `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]+num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 2) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
                จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
                พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
                พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
                $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
                จะได้ $$a_n = ${res}$$ 
              `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]*num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 3) {
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
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร: <br>
                $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
            
                กระจายพจน์ : 
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${total} $$`;
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
                    for (let i = num.data[1].length; i < num.n+2; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]+num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 4) {
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
            
                let formulaText = `
                Ans : ${product} <br> 
                จากสูตร: <br>
                $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
            
                กระจายพจน์:
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${product} $$
                `;
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
                    for (let i = num.data[1].length; i < num.n+1; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]*num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 5) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
                ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
                พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
                พจน์ที่ต้องการหา: $$ n = ${num.n} $$
                ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
                `;
                let data = [res, num.n, num.data[0][0], num.data[0][1]];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    let table = [];
                    let temp = [];
                    console.log(num.data);
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
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 6) {
                let steps = [];
                console.log(pathResult.path);
                for (let k = 0; k < pathResult.path.length; k++) {
                    let stepDesc;
                    if (pathResult.path[k] === '0') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การบวก เพื่อหาผลต่าง (Difference) ของลำดับ`;
                    } else if (pathResult.path[k] === '1') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การคูณ เพื่อหาผลหาร (Ratio) ของลำดับ`;
                    }
                    steps.push(stepDesc);
                }
            
                let expandedFormula = steps.join(" <br> ");
            
                let formulaText = `
                Ans : ${res} <br>
                <div>
                  <p><b>ผลการวิเคราะห์ลำดับ:</b></p>
                  <p>
                    การวิเคราะห์จะตรวจสอบลำดับทีละชั้น โดยใช้ <b>การบวก</b> สำหรับลำดับที่มีผลต่างคงที่ 
                    และ <b>การคูณ</b> สำหรับลำดับที่มีอัตราส่วนคงที่ เพื่อหาความสัมพันธ์ระหว่างพจน์
                  </p>
            
                  <p><b>ขั้นตอนการคำนวณ:</b></p>
                  ${expandedFormula}
                  <p>
                    จากขั้นตอนเหล่านี้ สามารถระบุรูปแบบลำดับและสร้างสมการที่อธิบายพจน์ทั่วไปได้
                  </p>
                </div>
                `;
                let data = [res];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else {
                document.getElementById('run').innerHTML = "Ans : " + res + "\nลำดับที่ให้มาอาจอยู่นอกขอบเขตการศึกษา ในส่วนผลที่ได้คำนวณจาก Lagrange polynomial";
            } 
        }
    }
    let end = Date.now();
    document.getElementById('time').innerHTML = "ใช้เวลาไป : " + (end - start) + " ms";
    return 0;
}

function input_2() {
    const inputs = document.querySelectorAll('#inputsContainer input');
    const values = Array.from(inputs)
        .map(input => input.value.trim())
        .filter(v => v !== "");

    if (values.length === 0) {
        alert("กรุณากรอกตัวเลขก่อนทำการคำนวณ!");
    } else {
        let res;
        const num = new data_num();
        const s = values.join(', ');
        Filter_data(num, s);
        num.n = Number(document.getElementById('x2').value);
        res = find_n(num);
        if (num.is_harmoni) {
            if (num.how_to === 1) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร : <br>
                $$a_n = a_1 + (n - 1)d $$ 
                จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
                พจน์แรกคือ  ${num.data[0][0]} <br>
                พจน์ที่ต้องการหาคือ  ${num.n} <br>
                $$a_n = ${num.data[0][0]} + (${num.n - 1} - 1) \\cdot ${num.data[1][0]} $$ 
                จะได้ $$a_n = ${res}$$
                `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]+num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 2) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
                จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
                พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
                พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
                $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
                จะได้ $$a_n = ${res}$$ 
              `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]*num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 3) {
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
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: <br>
                $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
            
                กระจายพจน์ : 
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${total} $$`;
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
                    for (let i = num.data[1].length; i < num.n+2; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]+num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 4) {
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
            
                let formulaText = `
                Ans : 1/${product} <br> 
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: <br>
                $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
            
                กระจายพจน์:
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${product} $$
                `;
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
                    for (let i = num.data[1].length; i < num.n+1; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]*num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 5) {
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
                ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
                พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
                พจน์ที่ต้องการหา: $$ n = ${num.n} $$
                ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
                `;
                let data = [res, num.n, num.data[0][0], num.data[0][1]];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    let table = [];
                    let temp = [];
                    console.log(num.data);
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
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 6) {
                let steps = [];
                console.log(pathResult.path);
                for (let k = 0; k < pathResult.path.length; k++) {
                    let stepDesc;
                    if (pathResult.path[k] === '0') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การบวก เพื่อหาผลต่าง (Difference) ของลำดับ`;
                    } else if (pathResult.path[k] === '1') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การคูณ เพื่อหาผลหาร (Ratio) ของลำดับ`;
                    }
                    steps.push(stepDesc);
                }
            
                let expandedFormula = steps.join(" <br> ");
            
                let formulaText = `
                Ans : 1/${res} <br>
                จะสังเกตุว่าลำดับที่ได้มาเป็นลำดับฮาร์โมนิก จึงนำเฉพาะตัวส่วนมาวิเคราะห์ <br>
                <div>
                  <p><b>ผลการวิเคราะห์ลำดับ:</b></p>
                  <p>
                    การวิเคราะห์จะตรวจสอบลำดับทีละชั้น โดยใช้ <b>การบวก</b> สำหรับลำดับที่มีผลต่างคงที่ 
                    และ <b>การคูณ</b> สำหรับลำดับที่มีอัตราส่วนคงที่ เพื่อหาความสัมพันธ์ระหว่างพจน์
                  </p>
            
                  <p><b>ขั้นตอนการคำนวณ:</b></p>
                  ${expandedFormula}
                  <p>
                    จากขั้นตอนเหล่านี้ สามารถระบุรูปแบบลำดับและสร้างสมการที่อธิบายพจน์ทั่วไปได้
                  </p>
                </div>
                `;
                let data = [res];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
            } else {
                document.getElementById('run').innerHTML = "Ans : " + res + "\nลำดับที่ให้มาอาจอยู่นอกขอบเขตการศึกษา ในส่วนผลที่ได้คำนวณจาก Lagrange polynomial";
            } 
            MathJax.typeset();
        } else {
            if (num.how_to === 1) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร : <br>
                $$a_n = a_1 + (n - 1)d $$ 
                จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
                พจน์แรกคือ  ${num.data[0][0]} <br>
                พจน์ที่ต้องการหาคือ  ${num.n} <br>
                $$a_n = ${num.data[0][0]} + (${num.n - 1} - 1) \\cdot ${num.data[1][0]} $$ 
                จะได้ $$a_n = ${res}$$
                `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]+num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 2) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
                จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
                พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
                พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
                $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
                จะได้ $$a_n = ${res}$$ 
              `;
                let count = 0;
                let data = [res, num.data[1][0], num.data[1][0], num.n];
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    for (let i = num.data[1].length; i < num.n-1; i++) {
                        num.data[1].push(num.data[1][0]);
                    }
                    for (let i = num.data[0].length; i < num.n; i++) {
                        num.data[0].push(num.data[1][0]*num.data[0][i-1]);
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 3) {
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
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร: <br>
                $$ a_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} \\cdot d_k $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, n = ${num.n} $$
            
                กระจายพจน์ : 
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${total} $$`;
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
                    for (let i = num.data[1].length; i < num.n+2; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]+num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 4) {
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
            
                let formulaText = `
                Ans : ${product} <br> 
                จากสูตร: <br>
                $$ a_n = \\prod_{k=0}^{n-1} d_k^{\\binom{n-1}{k}} $$
            
                แทนค่าจะได้ว่า: <br>
                $$ a_1 = ${num.data[0][0]}, \\quad n = ${num.n} $$
            
                กระจายพจน์:
                \\[
                \\begin{aligned}
                ${expandedFormula}
                \\end{aligned}
                \\]
            
                ค่าที่ได้:
                $$ a_n = ${product} $$
                `;
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
                    for (let i = num.data[1].length; i < num.n+1; i++) {
                        num.data[Math.min(num.n, num.data.length)-1].push(num.data[Math.min(num.n, num.data.length)-1][0]);
                    }
                    for (let i = Math.min(num.n, num.data.length)-1; i >= 0; i--) {
                        for (let j = num.data[i].length; j < num.n; j++) {
                            num.data[i].push(num.data[i+1][j-1]*num.data[i][j-1]);
                        }
                    }
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 5) {
                let formulaText = `
                Ans : ${res} <br>
                จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
                ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
                พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
                พจน์ที่ต้องการหา: $$ n = ${num.n} $$
                ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
                `;
                let data = [res, num.n, num.data[0][0], num.data[0][1]];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    let table = [];
                    let temp = [];
                    console.log(num.data);
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
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else if (num.how_to === 6) {
                let steps = [];
                console.log(pathResult.path);
                for (let k = 0; k < pathResult.path.length; k++) {
                    let stepDesc;
                    if (pathResult.path[k] === '0') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การบวก เพื่อหาผลต่าง (Difference) ของลำดับ`;
                    } else if (pathResult.path[k] === '1') {
                        stepDesc = `ขั้นตอนที่ ${k+1}: ใช้ การคูณ เพื่อหาผลหาร (Ratio) ของลำดับ`;
                    }
                    steps.push(stepDesc);
                }
            
                let expandedFormula = steps.join(" <br> ");
            
                let formulaText = `
                Ans : ${res} <br>
                <div>
                  <p><b>ผลการวิเคราะห์ลำดับ:</b></p>
                  <p>
                    การวิเคราะห์จะตรวจสอบลำดับทีละชั้น โดยใช้ <b>การบวก</b> สำหรับลำดับที่มีผลต่างคงที่ 
                    และ <b>การคูณ</b> สำหรับลำดับที่มีอัตราส่วนคงที่ เพื่อหาความสัมพันธ์ระหว่างพจน์
                  </p>
            
                  <p><b>ขั้นตอนการคำนวณ:</b></p>
                  ${expandedFormula}
                  <p>
                    จากขั้นตอนเหล่านี้ สามารถระบุรูปแบบลำดับและสร้างสมการที่อธิบายพจน์ทั่วไปได้
                  </p>
                </div>
                `;
                let data = [res];
                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    if (!isFinite(data[i])) {
                        count++;
                    }
                }
                if (count === 0) {
                    document.getElementById('run').innerHTML = formulaText;
                    renderTable(num.data, "output");
                } else {
                    document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
                }
                MathJax.typeset();
            } else {
                document.getElementById('run').innerHTML = "Ans : " + res + "\nลำดับที่ให้มาอาจอยู่นอกขอบเขตการศึกษา ในส่วนผลที่ได้คำนวณจาก Lagrange polynomial";
            } 
        }
    }
    return 0;
}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}