function learn(is_harmoni, num, res) {
    if (num.how_to === 1) {
        let formulaText; 
        res = Number(res.toFixed(6));
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br>
            จากสูตร : <br>
            $$a_n = a_1 + (n - 1)d $$ 
            จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
            พจน์แรกคือ  ${num.data[0][0]} <br>
            พจน์ที่ต้องการหาคือ  ${num.n} <br>
            $$a_n = ${num.data[0][0]} + (${num.n} - 1) \\cdot ${num.data[1][0]} $$ 
            จะได้ $$a_n = ${res}$$
            `;
        } else {
            formulaText = `
            Ans : ${res} <br>
            จากสูตร : <br>
            $$a_n = a_1 + (n - 1)d $$ 
            จากการสังเกต ลำดับจะเห็นได้ว่าผลต่างร่วมคือ ${num.data[1][0]} <br>
            พจน์แรกคือ  ${num.data[0][0]} <br>
            พจน์ที่ต้องการหาคือ  ${num.n} <br>
            $$a_n = ${num.data[0][0]} + (${num.n} - 1) \\cdot ${num.data[1][0]} $$ 
            จะได้ $$a_n = ${res}$$
            และได้ผลรวมทั้งหมด ตั้งแต่ตัวที่ 1-n คือ ${num.n*(num.data[0][0]+res)/2}
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
            document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
        }
        MathJax.typeset();
    } else if (num.how_to === 2) {
        let formulaText; 
        res = Number(res.toFixed(6));
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br>
            จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
            จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
            พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
            พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
            $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
            จะได้ $$a_n = ${res}$$ 
            `;
        } else {
            formulaText = `
            Ans : ${res} <br>
            จากสูตร $$a_n = a_1 \\times r^{(n-1)} $$
            จากการสังเกต ลำดับจะเห็นได้ว่าผลคูณร่วมคือ  ${num.data[1][0]} <br>
            พจน์แรกคือ  $$a_1 = ${num.data[0][0]}$$ 
            พจน์ที่ต้องการหาคือ  n = ${num.n} <br>
            $$a_n = a_1 \\times r^{(n-1)} = ${num.data[0][0]} \\times ${num.data[1][0]}^{(${num.n}-1)}$$ 
            จะได้ $$a_n = ${res}$$ 
            และได้ผลรวมทั้งหมด ตั้งแต่ตัวที่ 1-n คือ ${num.data[0][0]*(1-Math.pow(num.data[1][0], num.n))/(1-num.data[0][0])}
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
        let formulaText; 
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br>
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
            $$ a_n = ${total} $$
            `;
        } else {
            formulaText = `
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
    
        let formulaText;
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br> 
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
            $$ a_n = ${res} $$
            `;
        } else {
            formulaText = `
            Ans : ${res} <br> 
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
            document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
        }
        MathJax.typeset();
    } else if (num.how_to === 5) {
        let formulaText;
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br>
            จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
            ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
            พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
            พจน์ที่ต้องการหา: $$ n = ${num.n} $$
            ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
            `;
        } else {
            formulaText = `
            Ans : ${res} <br>
            จากสูตร: $$ a_n = a_{n-1} + a_{n-2} $$ 
            ลำดับนี้เป็นลำดับ recursive เนื่องจากแต่ละพจน์ขึ้นอยู่กับพจน์ก่อนหน้า<br>
            พจน์เริ่มต้น: $$ a_1 = ${num.data[0][0]}, a_2 = ${num.data[0][1]} $$ 
            พจน์ที่ต้องการหา: $$ n = ${num.n} $$
            ดังนั้น พจน์ที่ ${num.n} ในลำดับข้างต้น คือ ${res}
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
            document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
        }
        MathJax.typeset();
    } else if (num.how_to === 6) {
        let steps = [];
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
    
        let formulaText;
        if (is_harmoni) {
            formulaText = `
            Ans : 1/${res} <br>
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
        } else {
            formulaText = `
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
            document.getElementById('run').innerHTML = "ขออภัยในความไม่สะดวกเนื่องจากข้อผิดพลาดบางประการ เช่น การคำนวณค่าสูงมากจนเป็น infnity หรือ พบค่าเป็น null ทำให้ไม่สามารถคำนวณออกมาได้";
        }
        MathJax.typeset();
    } else {
        document.getElementById('run').innerHTML = "Ans : " + res + "\nลำดับที่ให้มาอาจอยู่นอกขอบเขตการศึกษา ในส่วนผลที่ได้คำนวณจาก Lagrange polynomial";
    } 
}

function input_1() {
    document.getElementById("run").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    let start = Date.now();
    let res = {};
    const num = new data_num();
    let line = document.getElementById('dataInput').value.trim();
    let nValue = document.getElementById('x1').value.trim();
    const username = localStorage.getItem("name");
    if (line === "" || nValue === "") {
        alert("กรุณากรอกข้อมูลทั้งหมดก่อนทำการคำนวณ!");
    } else {
        Filter_data(num, line);
        num.n = Number(nValue);
        res = find_n(num);
        learn(num.is_harmoni, num, res);
    }
    let url = "https://script.google.com/macros/s/AKfycbwYcg2sh-TzoH1HrOaoQAAkkVTzFVthmSw3Aejc8WawWJd_jP-fzLnCLp6xlPu-HmYFyg/exec?use=save_data&user=";
    url += encodeURIComponent(username);
    url += "&num=" + (line) + "&n=" +encodeURIComponent(nValue);

    fetch(url);
    let end = Date.now();
    document.getElementById('time').innerHTML = "ใช้เวลาไป : " + (end - start) + " ms";
    return 0;
}

function input_2() {
    let start = Date.now();
    document.getElementById("run").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    const username = localStorage.getItem("name");
    const inputs = document.querySelectorAll('#inputsContainer input');
    const values = Array.from(inputs)
        .map(input => input.value.trim())
        .filter(v => v !== "");

    if (values.length === 0) {
        alert("กรุณากรอกตัวเลขก่อนทำการคำนวณ!");
    } else {
        let res;
        const num = new data_num();
        const s = values.join(',');
        let url = "https://script.google.com/macros/s/AKfycbwYcg2sh-TzoH1HrOaoQAAkkVTzFVthmSw3Aejc8WawWJd_jP-fzLnCLp6xlPu-HmYFyg/exec?use=save_data&user=";
        url += encodeURIComponent(username);
        url += "&num=" + (s) + "&n=" +encodeURIComponent(Number(document.getElementById('x2').value));
        fetch(url);
        console.log(s);
        Filter_data(num, s);
        num.n = Number(document.getElementById('x2').value);
        res = find_n(num);
        learn(num.is_harmoni, num, res);
    }
    let end = Date.now();
    document.getElementById('time').innerHTML = "ใช้เวลาไป : " + (end - start) + " ms";
    return 0;
}
