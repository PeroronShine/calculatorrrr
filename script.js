const result = document.querySelector('#result'),
      expression = document.querySelector('#expression'),
      num = document.querySelectorAll('.number:not(.equals)'),
      operation = document.querySelectorAll('.operation'),
      equals = document.querySelector('.equals'),
      clear = document.querySelector('#clear'),
      ce = document.querySelector('#ce');
let ex = ''; // the expression string to be eval'd
result.innerHTML = '0';



function clickN() { 
  if(!ex || typeof(ex) === 'number' || ex === '0') {
    expression.innerHTML = this.id;
    ex = this.id;
  } else {
    expression.innerHTML += this.id;
    ex += this.id;
  }
  result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
  checkLength(result.innerHTML);
};

function clickO() { 
  if(!ex) {
    return;
  }
  ex = ex.toString().replace(/=/, '');
  if (ex.match(/\/|\*|\+|-|=/)) {
    ex = eval(ex).toString();
  } 
  expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
  ex += this.id;
  result.innerHTML = this.id;
};



Array.from(num).forEach(function(element) { //назнач функцию всем числам и операция
      element.addEventListener('click', clickN);
    });

Array.from(operation).forEach(function(element) {
      element.addEventListener('click', clickO);
    });

clear.addEventListener('click', () => { //почистить все
  result.innerHTML = '';
  expression.innerHTML = '';
  ex = '';
})

ce.addEventListener('click', () => { //почистить последний ввод
  if (!expression.innerHTML.match(/=$/)) {
    
    expression.innerHTML = doCE(expression.innerHTML);
    ex = doCE(ex); 
    result.innerHTML = 0;
    
    function doCE(arg) {
      arg = arg.split(/([\/\*\+\-\=])/g);
      arg.splice(-1, 1);
      return arg.join('');
    }
  }
})

equals.addEventListener('click', ()=> { //вычислить всю операцию
  if (!ex) {
    result.innerHTML = '0';
  } else {
    ex = eval(ex);
    expression.innerHTML += '=';
    result.innerHTML = trim12(ex);
  }
})

function checkLength(arg) { //ввод длинного числа
  if (arg.toString().length > 14) {
    expression.innerHTML = 'number too long'.toUpperCase();
    result.innerHTML = '0';
    ex = '0';
  } 
}

function trim12(arg) { // вывод длинного числа
  if (arg.toString().length > 14) {
    ex = parseFloat(arg.toPrecision(12));
    if (ex.toString().length > 14) { 
      ex = ex.toExponential(9);
    };
    return ex;
  } else {
    return arg;
  }
}
