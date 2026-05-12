const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber, Footer, Header
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: "2E74B5" };
const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };

function h(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: level, children: [new TextRun(text)] });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: "Times New Roman", size: 24, bold: opts.bold, italics: opts.italic })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Times New Roman", size: 24 })]
  });
}

function code(text) {
  return new Paragraph({
    spacing: { after: 80, before: 80 },
    indent: { left: 720 },
    children: [new TextRun({ text, font: "Courier New", size: 20, color: "1F4E79" })]
  });
}

function sectionTitle(text) {
  return new Paragraph({
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, font: "Times New Roman", size: 26, bold: true })]
  });
}

function tableCell(text, isHeader = false, width = 4680) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: isHeader ? { fill: "2E74B5", type: ShadingType.CLEAR } : { fill: "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({
        text,
        font: "Times New Roman",
        size: 22,
        bold: isHeader,
        color: isHeader ? "FFFFFF" : "000000"
      })]
    })]
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Times New Roman", color: "1F4E79" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Times New Roman", color: "2E74B5" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1008, bottom: 1440, left: 1701 }
      }
    },
    children: [
      // ТИТУЛЬНА СТОРІНКА
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "МІНІСТЕРСТВО ОСВІТИ І НАУКИ УКРАЇНИ", font: "Times New Roman", size: 22, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Кафедра інформаційних технологій", font: "Times New Roman", size: 22 })]
      }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "ЗВІТ", font: "Times New Roman", size: 36, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "до лабораторної роботи №3", font: "Times New Roman", size: 28, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "з дисципліни «Управління ІТ-проєктами»", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "Тема: Автоматизація збірки проєкту та управління артефактами", font: "Times New Roman", size: 26, bold: true })]
      }),
      new Paragraph({ spacing: { after: 600 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Виконав: студент групи ______", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Корольов / ваше ім'я", font: "Times New Roman", size: 24, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
        children: [new TextRun({ text: "Перевірив: ______________________", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "2025", font: "Times New Roman", size: 24 })]
      }),

      // РОЗРИВ СТОРІНКИ
      new Paragraph({ pageBreakBefore: true, children: [new TextRun("")] }),

      // РОЗДІЛ 1: МЕТА
      h("1. Мета роботи"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({
          text: "Опанувати принципи та інструменти автоматизації життєвого циклу фронтенд-застосунків. Навчитися налаштовувати процеси бандлінгу, мініфікації та оптимізації ресурсів. Зрозуміти концепцію «артефакту збірки» та забезпечити відтворюваність процесу отримання готового продукту.",
          font: "Times New Roman", size: 24
        })]
      }),

      // РОЗДІЛ 2: ЗАВДАННЯ
      h("2. Завдання"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "В якості базового проєкту обрано Todo List застосунок на основі Vite + Vanilla JavaScript:", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 120 },
        indent: { left: 720 },
        children: [new TextRun({ text: "https://github.com/taras-king/Vite-VanillaJS-App_Todo_list", font: "Courier New", size: 20, color: "1F4E79" })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 80 },
        children: [new TextRun({ text: "В рамках роботи необхідно було:", font: "Times New Roman", size: 24 })]
      }),
      bullet("Налаштувати скрипти автоматизації (dev, build, preview, lint) у package.json"),
      bullet("Підключити та налаштувати ESLint і Prettier для статичного аналізу коду"),
      bullet("Створити файли змінних оточення .env і .env.production"),
      bullet("Відобразити значення змінної VITE_APP_STATUS в інтерфейсі застосунку"),
      bullet("Виконати збірку та проаналізувати артефакти у папці dist/"),
      bullet("Перевірити працездатність продуктової версії через npm run preview"),
      bullet("Забезпечити коректну гігієну репозиторію (.gitignore)"),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      // РОЗДІЛ 3: ХІД РОБОТИ
      h("3. Хід виконання роботи"),

      h("3.1. Клонування репозиторію та встановлення залежностей", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Першим кроком було клоновано репозиторій з GitHub та встановлено всі необхідні залежності:", font: "Times New Roman", size: 24 })]
      }),
      code("git clone https://github.com/taras-king/Vite-VanillaJS-App_Todo_list.git"),
      code("cd Vite-VanillaJS-App_Todo_list"),
      code("npm install"),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      h("3.2. Налаштування скриптів у package.json", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "У файлі package.json налаштовано розділ \"scripts\" з усіма обов'язковими командами:", font: "Times New Roman", size: 24 })]
      }),
      code('"scripts": {'),
      code('  "dev": "vite",'),
      code('  "build": "vite build",'),
      code('  "preview": "vite preview",'),
      code('  "lint": "eslint . --ext .js --fix"'),
      code('}'),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      h("3.3. Налаштування ESLint і Prettier", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Встановлено пакети ESLint, Prettier та необхідні плагіни:", font: "Times New Roman", size: 24 })]
      }),
      code("npm install --save-dev eslint @eslint/js globals prettier eslint-config-prettier"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 120, after: 100 },
        children: [new TextRun({ text: "Створено файл eslint.config.js з такими налаштуваннями:", font: "Times New Roman", size: 24 })]
      }),
      code("import js from \"@eslint/js\";"),
      code("import globals from \"globals\";"),
      code(""),
      code("export default ["),
      code("  js.configs.recommended,"),
      code("  {"),
      code("    languageOptions: {"),
      code("      globals: { ...globals.browser, ...globals.node }"),
      code("    },"),
      code("    rules: {"),
      code("      \"no-unused-vars\": \"warn\","),
      code("      \"no-console\": \"warn\""),
      code("    }"),
      code("  }"),
      code("];"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 120, after: 100 },
        children: [new TextRun({ text: "Ключовим налаштуванням стало додавання globals.browser та globals.node — без цього ESLint не розпізнавав стандартні браузерні об'єкти (document, localStorage, console) і Node.js змінні (process), видаючи помилки «is not defined». Також створено файл .prettierrc з правилами форматування:", font: "Times New Roman", size: 24 })]
      }),
      code('{ "semi": true, "singleQuote": true, "tabWidth": 2 }'),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      h("3.4. Змінні оточення", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Створено два файли змінних оточення в корені проєкту:", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: "Файл .env (режим розробки):", font: "Times New Roman", size: 24, bold: true })]
      }),
      code("VITE_APP_STATUS=Development"),
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [new TextRun({ text: "Файл .env.production (продуктовий режим):", font: "Times New Roman", size: 24, bold: true })]
      }),
      code("VITE_APP_STATUS=Production Mode"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 120, after: 100 },
        children: [new TextRun({ text: "Для відображення значення змінної у файл main.js додано код, який виводить поточний режим у футері сторінки. У режимі розробки текст відображається оранжевим кольором, у продуктовому — зеленим. Це дозволяє візуально розрізняти середовища запуску.", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),

      // РОЗДІЛ 4: РЕЗУЛЬТАТИ
      h("4. Результати виконання"),

      h("4.1. Результат виконання npm run lint", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Після виправлення конфігурації ESLint (додавання globals.browser та globals.node) команда npm run lint завершилась з результатом 0 помилок:", font: "Times New Roman", size: 24 })]
      }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3000, 3026, 3000],
        rows: [
          new TableRow({
            children: [
              tableCell("Файл", true, 3000),
              tableCell("Результат", true, 3026),
              tableCell("Деталі", true, 3000),
            ]
          }),
          new TableRow({
            children: [
              tableCell("main.js", false, 3000),
              tableCell("1 попередження", false, 3026),
              tableCell("no-console (рядок 90)", false, 3000),
            ]
          }),
          new TableRow({
            children: [
              tableCell("playwright.config.js", false, 3000),
              tableCell("0 проблем", false, 3026),
              tableCell("—", false, 3000),
            ]
          }),
          new TableRow({
            children: [
              tableCell("ЗАГАЛОМ", true, 3000),
              tableCell("0 errors, 1 warning", false, 3026),
              tableCell("✓ Успішно", false, 3000),
            ]
          }),
        ]
      }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Єдине попередження — no-console у рядку 90 файлу main.js. Це очікувана поведінка: правило попереджає про наявність console.log() у коді, що є прийнятним для навчального проєкту. Жодних критичних помилок (errors) не виявлено.", font: "Times New Roman", size: 24 })]
      }),

      h("4.2. Збірка проєкту — npm run build", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Виконано команду npm run build. Vite v4.0.3 успішно трансформував 4 модулі та створив папку dist/ з оптимізованими файлами:", font: "Times New Roman", size: 24 })]
      }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3800, 2000, 1500, 1726],
        rows: [
          new TableRow({
            children: [
              tableCell("Файл", true, 3800),
              tableCell("Розмір", true, 2000),
              tableCell("gzip", true, 1500),
              tableCell("Призначення", true, 1726),
            ]
          }),
          new TableRow({
            children: [
              tableCell("dist/index.html", false, 3800),
              tableCell("0.87 kB", false, 2000),
              tableCell("—", false, 1500),
              tableCell("Головна сторінка", false, 1726),
            ]
          }),
          new TableRow({
            children: [
              tableCell("dist/assets/index-62b52bbd.css", false, 3800),
              tableCell("1.27 kB", false, 2000),
              tableCell("0.60 kB", false, 1500),
              tableCell("Мініфікований CSS", false, 1726),
            ]
          }),
          new TableRow({
            children: [
              tableCell("dist/assets/index-c28d183a.js", false, 3800),
              tableCell("2.66 kB", false, 2000),
              tableCell("0.97 kB", false, 1500),
              tableCell("Мініфікований JS", false, 1726),
            ]
          }),
        ]
      }),
      new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

      h("4.3. Порівняльна таблиця розмірів", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Для оцінки ефективності збірки проведено порівняння розміру вихідних файлів та фінального артефакту:", font: "Times New Roman", size: 24 })]
      }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3500, 2263, 1763, 1500],
        rows: [
          new TableRow({
            children: [
              tableCell("Ресурс", true, 3500),
              tableCell("Тип", true, 2263),
              tableCell("Розмір на диску", true, 1763),
              tableCell("Стиснення", true, 1500),
            ]
          }),
          new TableRow({
            children: [
              tableCell("main.js + style.css + index.html", false, 3500),
              tableCell("Сирцевий код (src)", false, 2263),
              tableCell("~12 KB (3 × 4.0K)", false, 1763),
              tableCell("—", false, 1500),
            ]
          }),
          new TableRow({
            children: [
              tableCell("dist/", false, 3500),
              tableCell("Артефакт збірки", false, 2263),
              tableCell("16 KB", false, 1763),
              tableCell("JS: gzip 0.97kB", false, 1500),
            ]
          }),
        ]
      }),
      new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Примітка: Команда du -sh на Windows відображає мінімальний блок диску (4.0K) для кожного файлу незалежно від реального розміру. Фактичний розмір JS файлу головного застосунку складає 2.66 KB, CSS — 1.27 KB. При передачі через мережу з gzip-стисненням фінальний JS займає лише 0.97 KB — це в ~2.7 рази менше від нестиснутого варіанту.", font: "Times New Roman", size: 22, italics: true })]
      }),

      h("4.4. Хешовані назви файлів", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Згенеровані файли мають хешовані назви: index-62b52bbd.css та index-c28d183a.js. Хеш у назві файлу — це механізм cache busting. Браузер кешує статичні ресурси за їхнім URL. Якщо назва файлу не змінилася — браузер завантажить стару версію з кешу, навіть якщо вміст оновився. Хеш генерується на основі вмісту файлу: будь-яка зміна в коді автоматично змінює хеш і, відповідно, назву файлу — браузер отримує примусове оновлення.", font: "Times New Roman", size: 24 })]
      }),

      h("4.5. Перевірка змінних оточення в режимі Production", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Після виконання команди npm run preview застосунок запустився на localhost:4173. У футері сторінки відобразився напис «Режим: Production Mode» зеленим кольором — саме значення зі змінної VITE_APP_STATUS файлу .env.production. При запуску через npm run dev той самий елемент показує «Режим: Development» оранжевим кольором. Це підтверджує, що Vite автоматично підставляє відповідний .env файл залежно від режиму збірки.", font: "Times New Roman", size: 24 })]
      }),

      h("4.6. Гігієна репозиторію", HeadingLevel.HEADING_2),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "Файл .gitignore перевірено та доповнено. Містить:", font: "Times New Roman", size: 24 })]
      }),
      bullet("node_modules/ — великий об'єм залежностей, відновлюються через npm install"),
      bullet("dist/ — автоматично генерується збіркою, не потребує версіонування"),
      bullet(".env — містить локальні налаштування, не для публічного репозиторію"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "До репозиторію додано (git add та git commit): eslint.config.js, .prettierrc, .prettierignore, .env.production, оновлений package.json та main.js.", font: "Times New Roman", size: 24 })]
      }),

      // РОЗДІЛ 5: КОНТРОЛЬНІ ЗАПИТАННЯ
      h("5. Відповіді на контрольні запитання"),

      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "1. Чому папку dist зазвичай додають у .gitignore?", font: "Times New Roman", size: 24, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 160 },
        children: [new TextRun({ text: "Папка dist/ є артефактом збірки — результатом автоматичного перетворення сирцевого коду. Вона генерується командою npm run build і може бути відтворена з вихідного коду в будь-який момент. Зберігання dist/ в репозиторії: збільшує його розмір; створює конфлікти при злитті гілок; вносить плутанину між версіями коду та артефактів. Правило: у Git зберігають лише те, що не можна автоматично відновити.", font: "Times New Roman", size: 24 })]
      }),

      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "2. Навіщо інструменти збірки додають хеш до назв файлів?", font: "Times New Roman", size: 24, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 160 },
        children: [new TextRun({ text: "Браузери активно кешують статичні файли (JS, CSS) для пришвидшення завантаження. Якщо файл називається index.js і не змінився з минулого відвідування — браузер завантажить його з кешу, навіть якщо сервер видає нову версію. Хеш (наприклад, index-c28d183a.js) генерується на основі вмісту файлу: при будь-якій зміні коду хеш змінюється, відповідно змінюється URL, і браузер вимушений завантажити оновлений файл.", font: "Times New Roman", size: 24 })]
      }),

      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "3. Різниця між dependencies та devDependencies?", font: "Times New Roman", size: 24, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 160 },
        children: [new TextRun({ text: "dependencies — пакети, необхідні для роботи застосунку у production (наприклад, Vue, React). devDependencies — пакети виключно для розробки: ESLint, Prettier, Vite, тестові фреймворки. Інструменти збірки (Vite, Webpack) не включають devDependencies у фінальний бандл — це зменшує розмір артефакту та прибирає зайві залежності з продуктового середовища.", font: "Times New Roman", size: 24 })]
      }),

      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: "4. Що станеться при деплої сирцевого коду без збірки?", font: "Times New Roman", size: 24, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Без збірки застосунок, швидше за все, взагалі не запуститься у браузері, адже: браузер не підтримує синтаксис ES-модулів без додаткових налаштувань сервера; файли не оптимізовані — браузер виконуватиме сотні окремих HTTP-запитів; відсутня мініфікація — код важчий та повільніший; змінні оточення Vite (import.meta.env) не будуть підставлені.", font: "Times New Roman", size: 24 })]
      }),

      // РОЗДІЛ 6: ВИСНОВОК
      h("6. Висновок"),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "У ході виконання лабораторної роботи було опановано практичні навички автоматизації збірки фронтенд-застосунку на базі Vite + Vanilla JavaScript. Налаштовано повний набір скриптів автоматизації (dev, build, preview, lint), підключено статичний аналізатор коду ESLint з підтримкою браузерних та Node.js глобальних змінних, а також форматувальник Prettier.", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Реалізовано механізм змінних оточення через файли .env та .env.production: застосунок автоматично відображає поточний режим роботи у футері сторінки. Успішно проведено збірку проєкту — Vite трансформував 4 модулі, застосувавши мініфікацію та хешування файлів. Фінальний JS-бандл з gzip-стисненням займає лише 0.97 kB.", font: "Times New Roman", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Перевірено коректну роботу продуктової версії через npm run preview. Забезпечено гігієну репозиторію: папки dist/ та node_modules/, а також файл .env виключено з Git. Усі файли конфігурації (eslint.config.js, .prettierrc, .env.production) додано до відстеження.", font: "Times New Roman", size: 24 })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('Звіт_Лабораторна_3.docx', buffer);
  console.log('Done!');
});