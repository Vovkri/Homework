let historyStack = ['main']; 
const previousPages = {
    'Warehouse': 'tasks',
    'expenditure': 'Warehouse',
    'Production': 'tasks',
    'settings': 'main',
    'about': 'main',
    'tasks': 'main',
};

function changePage(page) {
    const titleElement = document.getElementById('page-title');
    const contentElement = document.getElementById('content');
    const headerElement = document.querySelector('.header');
    if (historyStack[historyStack.length - 1] !== 'main') {
        historyStack.push('main');
    }
    const buttons = headerElement.querySelectorAll('button'); // Ищем все кнопки внутри header
    buttons.forEach(button => button.remove()); // Удаляем каждую 
    if (pages[page].buttons) {
        headerElement.insertAdjacentHTML('beforeend', pages[page].buttons);
    }

    if (pages[page]) {
        titleElement.textContent = pages[page].title;
        

        if (pages[page].links) {
            contentElement.innerHTML = pages[page].links.map(link => {
                const imgTag = link.img ? `<img src="${link.img}" alt="${link.alt}" class="image">` : '';
                return `<a href="#" onclick="changePage('${link.page}')">${imgTag}${link.text}</a>`;
            }).join('');
        } else if (pages[page].content) {
            contentElement.innerHTML = pages[page].content;

            const recordList = document.getElementById('record-list');
            for (let i = 1; i <= 10; i++) {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div style="border: 1px solid #ccc; padding: 20px;">    
                    <h3>ВЗН №${String(i).padStart(3, '0')}</h3>
                    <p><strong>Отправитель:</strong> Отправитель ${i}</p>
                    <p><strong>Получатель:</strong> Получатель ${i}</p>
                    <p><strong>Дата выдачи:</strong> ${getRandomDate()}</p>
                    </div>
                `;
                recordList.appendChild(card);
            }
        }
        historyStack.push(page);
    }
}
function getRandomDate() {
    const start = new Date(2024, 0, 1); 
    const end = new Date(2024, 11, 31); 
    const date = new Date(start.getTime() + Math.random() * (end - start));
    return date.toLocaleDateString('ru-RU'); 
}
function validateInput(test) {
    var input = document.getElementById(test).value;
    if (!input) {
        return true;
    }

    if (!/^-?\d+$/.test(input)) {
        alert('Пожалуйста, введите положительное целое число.');
        document.getElementById(test).value = ''; 
        return;
    }
    var number = parseInt(input, 10);
    if (number <= 0) {
        alert('Пожалуйста, введите положительное целое число.');
        document.getElementById(test).value = ''; // Очистить поле
        return false;
    }
    if (input.length > 20) {
      alert('Число должно содержать не более 20 знаков.');
      document.getElementById(test).value = '';
      return;
    }
    return true;
  }
  function validateDateRange(val) {
    const dateRangeInput = document.getElementById(val);
    
    const dateRange = dateRangeInput.value.trim();
    if (!dateRange) {
        return true;
    }
    // Проверка формата диапазона дат с помощью регулярного выражения
    const dateRegex = /^(\d{2}\.\d{2}\.\d{4})\s-\s(\d{2}\.\d{2}\.\d{4})$/;
    const match = dateRange.match(dateRegex);

    if (!match) {
        alert('Неверный формат даты. Используйте формат "dd.mm.yyyy - dd.mm.yyyy".');
        dateRangeInput.value = '';
        return;
    }

    const startDateStr = match[1];
    const endDateStr = match[2];

    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);

    if (!startDate || !endDate) {
        alert('Неверный формат даты. Используйте формат "dd.mm.yyyy".');
        dateRangeInput.value = '';
        return;
    }

    // Проверка, что дата окончания не раньше даты начала
    if (startDate > endDate) {
        alert('Дата окончания не может быть раньше даты начала.');
        dateRangeInput.value = '';
        return;
    }

    return true;
}

function parseDate(dateStr) {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12) {
        return null;
    }

    return new Date(year, month - 1, day);
}

function formatDate(date) {
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}
function validateTextInput(val) {
    var input = document.getElementById(val).value;

    if (input.length > 50) {
        alert('Пожалуйста, введите текст, который содержит не более 50 знаков.');
        document.getElementById(val).value = ''; 
        return;
    }
    return true;

}
function goBack() {
    if (historyStack.length > 1) {
        const currentPage = historyStack.pop();
        const previousPage = previousPages[currentPage]; 

        if (previousPage) {
            changePage(previousPage);
        } else {
            historyStack.push(currentPage); 
        }
    }
}
function openScannerForm() {
    document.getElementById('scanner-form').style.display = 'block'; 
}

function closeScannerForm() {
    document.getElementById('scanner-form').style.display = 'none';
}

function applyFilters() {


    if (!validateInput('vzn') || !validateTextInput('inp') || !validateTextInput('out')|| !validateDateRange('dateRange')) {
        
    } else {
        alert('Поиск выполнен!');
        closeScannerForm();
    }
}

const pages = {
    tasks: {
        title: 'Задачи',
        links: [
            { text: 'Складской учет', page: 'Warehouse', img: 'warehouse.png', alt: 'Складской учет' },
            { text: 'Учёт в производстве', page: 'Production', img: 'accouting.png', alt: 'Учёт в производстве' }
        ]
    },
    settings: {
        title: 'Настройки',
        links: [
            { text: 'Настройка 1', page: 'settings1', img: 'warehouse.png', alt: 'Настройка 1' },
            { text: 'Настройка 2', page: 'settings2', img: 'accouting.png', alt: 'Настройка 2' }
        ]
    },
    about: {
        title: 'О системе',
        links: [
            { text: 'Информация 1', page: 'info1' },
            { text: 'Информация 2', page: 'info2' }
        ]
    },
    main: {
        title: 'Меню',
        links: [
            { text: 'Задачи', page: 'tasks', img: 'work.png', alt: 'Задачи' },
            { text: 'Настройки', page: 'settings', img: 'settings.png', alt: 'Настройки' },
            { text: 'О системе', page: 'about', img: 'about.png', alt: 'О системе' }
        ]
    },
    Warehouse: {
        title: 'Учёт в производстве',
        
        links: [
            { text: 'Акты инвентарицации', page: 'acts' },
            { text: 'Внутризаводские накладные (Приход)', page: 'coming' },
            { text: 'Внутризаводские накладные (Расход)', page: 'expenditure' },
            { text: 'Лимитные карты (Приход)', page: 'limit' },
            { text: 'Цеховая номенклатура', page: 'nomenclature' }
        ]
    },
    expenditure: {
        title: 'ВЗН УП (Расход)',
        buttons: `
                <button onclick="openScannerForm()" style="margin-left: 10%;margin-top: 25px; height: 30px; ">Поиск</button>
                <button onclick="createRecord()" style="margin-right:10px;margin-left:10px;margin-top: 25px; height: 30px; ">Создать</button>
        `,

        content: `
            <div class="content" id="record-list"></div>
            <div id="scanner-form" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeScannerForm()">&times;</span>
                    <h2>Фильтр ВЗН УП</h2>
                    <div class="form-container">
                        <div class="input-container">
                            <input type="text" id="vzn" required ">
                            <label>Номер ВЗН</label>
                        </div>
                        <div class="input-container">
                            <input type="text" required id="out" ">
                            <label>Отправитель</label>
                        </div>
                        <div class="input-container">
                            <input type="text" required id="inp" maxlength="50">
                            <label>Получатель</label>
                        </div>
                        <div class="input-container">
                            <input type="text" id="dateRange" required ">
                            <label>Дата принятия (Период)</label>
                        </div>
                        <div class="button-container">
                            <button onclick="applyFilters()">Применить</button>
                            <button onclick="closeScannerForm()">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};
