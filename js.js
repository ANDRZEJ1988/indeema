let btn = document.getElementById('change');
btn.onclick = (e) => {
    let form = document.forms.form;
    let money = Number(form.money.value);
    let price = Number(form.price.value);
    if (isNaN(money) || isNaN(price)) {
        alert('please type number');
        form.money.value = '';
        form.price.value = '';
    } else {
        let answer = document.getElementById('rest-result');

        if (money > price) {
            let result = (money - price).toFixed(2);
            let str = result.split('.');
            let [dollar, coin] = str;
            let firstPart = '';
            dollar === '0' ? firstPart = '' : firstPart = `${dollar} dollars,`;
            let cent = parseInt(coin);
            let res = [];
            const arr = [50, 25, 10, 5, 1];
            arr.reduce((previousValue, currentValue) => {
                if ((previousValue / currentValue) >= 1) {
                    if (Number.isInteger(previousValue / currentValue)) {
                        res.push({
                            currentValue,
                            amount: previousValue / currentValue
                        });
                        return (0)
                    } else {
                        res.push({
                            currentValue,
                            amount: Math.floor(previousValue / currentValue)
                        });
                        return (previousValue - currentValue * Math.floor(previousValue / currentValue))
                    }
                } else {
                    res.push({
                        currentValue,
                        amount: 0
                    });
                    return (previousValue)
                }
            }, cent);
            let array = res.map(value => {
                if (value.amount !== 0) {
                    return (`${value.amount} coins by nominal ${value.currentValue} cents. `);
                }
                return ''
            });
            let string = array.join('');
            answer.innerText = `Your rest is ${firstPart} ${coin} cents. (by nominal value of ${firstPart} ${string})`;
        }
        if (money === price) {
            answer.innerText = 'You have not change';
        }
        if (money < price) {
            answer.innerText = 'You can not buy this product';
        }
        form.money.value = '';
        form.price.value = '';
    }

};
let create = document.getElementById('create');
create.onclick = () => {
    let win = document.getElementById('window');
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    let bod = document.createElement('div');
    bod.setAttribute('class', 'body');
    let content = document.createElement('div');
    content.setAttribute('class', 'modal-content');
    let btnClose = document.createElement('button');
    btnClose.setAttribute('class', 'close');
    btnClose.innerText = 'X';
    let p = document.createElement('p');
    p.innerText = 'this is new modal window';
    let bntNewModal = document.createElement('button');
    bntNewModal.setAttribute('class', 'create');
    bntNewModal.innerText = 'new modal';
    content.appendChild(btnClose);
    content.appendChild(p);
    modal.appendChild(bntNewModal);
    bod.appendChild(content);
    modal.appendChild(bod);
    win.appendChild(modal);
    btnClose.onclick = () => {
        bod.childNodes.length === 1 ? modal.remove() : content.remove();
        content.remove();
    };
    window.onclick = (e) => {
        if (e.target == bod) {
            modal.remove();
        }
    };
    bntNewModal.onclick = () => {

        let clone = content.cloneNode(true);
        bod.appendChild(clone);
        let btn = document.getElementsByClassName('close');
        for (let i = 0; i < btn.length; i++) {
            btn[i].onclick = (e) => {
                bod.childNodes.length === 1 ? modal.remove() : e.target.parentElement.remove()
            }
        }
    }
};

const date1 = new Date(2020, 5, 21, 9, 15);
const date2 = new Date(2020, 5, 23, 21, 0);
let data = [
    {
        name: 'olya',
        surname: 'makuch',
        email: 'fsdfsdfk@fkkf.ru',
        date: date1.toLocaleString()
    },
    {
        name: 'vasya',
        surname: 'sherbina',
        email: 'vasss@mail.ru',
        date: date2.toLocaleString()
    },
    {
        name: 'petro',
        surname: 'kush',
        email: 'qwerty123@gmaile.com',
        date: (new Date).toLocaleString()
    }
];
let divTable = document.getElementById('div-table');
let table = document.createElement('table');
table.setAttribute('id', 'table');
let headerRow = document.createElement('tr');
let key = Object.keys(data[0]);
for (let element of key) {
    let headerColumn = document.createElement('th');
    headerColumn.innerText = element;
    headerRow.appendChild(headerColumn);
}
table.appendChild(headerRow);
for (let element of data) {
    let row = document.createElement('tr');
    let values = Object.values(element);
    for (let val of values) {
        let column = document.createElement('td');
        column.innerText = val;
        row.appendChild(column);
    }
    table.appendChild(row);
}
divTable.appendChild(table);
let add = document.getElementById('add');
add.onclick = (e) => {
    let form = document.getElementById('table-form');
    let name = form.name.value;
    let surname = form.surname.value;
    let email = form.email.value;
    if (name.length === 0 || surname.length === 0 || email.length === 0) {
        alert('please type all fields')
    } else {
        if (data.some(value => value.email === email)) {
            alert('please type another mail');
            form.email.value = '';
        } else {
            data.push({name, surname, email, date: (new Date).toLocaleString()});
            let user = [name, surname, email, (new Date).toLocaleString()];
            let row = document.createElement('tr');
            for (let value of user) {
                let column = document.createElement('td');
                column.innerText = value;
                row.appendChild(column);
            }
            table.appendChild(row);
            form.name.value = '';
            form.surname.value = '';
            form.email.value = '';
        }
    }

};
let btnDeleteRow = document.getElementById('button-delete-row');
btnDeleteRow.onclick = () => {
    let form = document.forms.delete;
    let index = form.deleteRrow.value;
    let allRows = table.rows.length;
    index >= 1 && index < allRows ? table.deleteRow(index) : alert('there is no row for this number');
    form.deleteRrow.value = '';
    table - form
};
let btnDeleteFewRows = document.getElementById('button-delete-few-rows');
btnDeleteFewRows.onclick = () => {
    btnDeleteFewRows.style.display = 'none';
    let form = document.getElementById('table-form');
    form.style.display = 'none';
    let rows = document.getElementsByTagName('tr');
    for (let element of rows) {
        let column = document.createElement('td');
        let inp = document.createElement('input');
        inp.setAttribute('type', 'checkbox');
        let p = document.createElement('p');
        p.innerText = 'delete this row';
        let div = document.createElement('div');
        div.setAttribute('class', 'div-delete-from-table');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        inp.onclick = (e) => {
            if (inp.checked) {
                table.deleteRow(element.rowIndex)
            }
        };
        div.appendChild(inp);
        div.appendChild(p);
        column.appendChild(div);
        element.appendChild(column);
    }
    let finish = document.getElementById('finish-delete-few-rows');
    finish.style.display = 'block';
    finish.onclick = () => {
        for (let row of rows) {
            row.deleteCell(4);
        }
        btnDeleteFewRows.style.display = 'block';
        finish.style.display = 'none';
        form.style.display = 'block';
    }
};

let tds = document.querySelectorAll('td');
for (let td of tds) {
    td.addEventListener('click', function edit() {
        let input = document.createElement('input');
        input.value = td.innerText;
        td.innerText = '';
        td.appendChild(input);
        td.removeEventListener('click', edit);
        input.onkeypress = (event) => {
            if (event.key === 'Enter') {
                td.innerText = input.value;
                td.addEventListener('click', edit);
            }
        };
    })
}



