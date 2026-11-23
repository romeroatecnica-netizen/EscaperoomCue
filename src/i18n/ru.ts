import type {TranslationDictionary} from './types';

export const ru: TranslationDictionary = {
  brand: 'EscapeCue',
  seo: {
    title: 'EscapeCue — Генератор квестов для дома, SVG-план и визуальные головоломки',
    description:
      'Создавайте домашние квесты (эскейп-румы), просматривайте тайники на интерактивном SVG-плане и печатайте готовый набор ведущего. 100% локально в браузере.',
    ogTitle: 'EscapeCue — Генератор домашних квестов и конструктор планов',
    ogDescription: 'Проводите семейные квесты дома: 7 типов визуальных загадок, уровни сложности и карточки для печати.',
    appCategory: 'GameApplication',
  },
  nav: {generator: 'Студия ведущего', floorplan: 'План SVG', printKit: 'Печать', guide: 'Гид', newMission: 'Новый квест'},
  hero: {
    kicker: 'Студия ведущего (GM) · 100% локально',
    title: 'Создайте незабываемый домашний квест за считанные минуты',
    subtitle: 'Выберите комнаты, настройте сложность для детей или взрослых, проверьте тайники на SVG-плане и распечатайте карточки.',
    privacyBanner:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
  },
  controls: {
    spaceLabel: 'Пространство', difficultyLabel: 'Сложность', themeLabel: 'Сюжет', seedLabel: 'Сид', regenerate: 'Обновить', viewModeLabel: 'Режим поля', gmView: 'Вид ведущего (GM)', playerView: 'Вид игроков', soundOn: 'Звук вкл', soundOff: 'Без звука', timerStart: 'Старт', timerPause: 'Пауза', timerReset: 'Сброс', targetDuration: 'Время', minutesUnit: 'мин', exportJson: 'Экспорт JSON', importJson: 'Импорт JSON', saveSetup: 'Сохранить', savedList: 'Сохранённые', printPhysicalKit: 'Набор для печати', addStation: 'Добавить этап', importSuccess: 'Квест импортирован из JSON.', importError: 'Неверный формат JSON.', saveSuccess: 'Сохранено локально в браузере.',
  },
  spaces: {
    full_house: {name: 'Вся квартира / дом (несколько комнат)', shortDesc: 'Гостиная, кухня, спальня и прихожая'},
    living_room: {name: 'Гостиная и столовая', shortDesc: 'Диван, стол, шкаф, ТВ и лампа'},
    kitchen: {name: 'Кухня и кладовая', shortDesc: 'Холодильник, шкафчик, таймер и специи'},
    bedroom: {name: 'Спальня / детская комната', shortDesc: 'Стол, полка, шкаф и сундук'},
    garden: {name: 'Сад, терраса или балкон', shortDesc: 'Кашпо, скамейка, ступени и пергола'},
    other_space: {name: 'Другие места (класс / офис / поездка)', shortDesc: 'Универсальная планировка для групп'},
  },
  difficulties: {
    easy: {name: 'Лёгкий', ageHint: 'Дети (6–10)', summary: '4 этапа · Цвета, счёт и прямые подсказки'},
    medium: {name: 'Средний', ageHint: 'Семья (10+)', summary: '5 этапов · Шифры, логика и поиск по плану'},
    hard: {name: 'Сложный', ageHint: 'Эксперты (14+)', summary: '6 этапов · Цепочки правил и бонус'},
  },
  themes: {
    lost_key: {name: 'Тайна потерянного ключа', intro: 'Запасной ключ пропал перед киновечером! Пройдите по комнатам и откройте тайник.', finale: 'Коробка открыта! Киновечер спасён.', bonus: 'Бонус: назовите все комнаты в обратном порядке по памяти.'},
    lab_rescue: {name: 'Операция «Лаборатория»', intro: 'Шипучий эксперимент заблокировал шкаф. Расшифруйте формулу до конца таймера.', finale: 'Реакция остановлена! Формула нейтрализована.', bonus: 'Бонус: назовите финальный код задом наперёд.'},
    treasure_map: {name: 'Загадка карты сокровищ', intro: 'Дедушка спрятал компас и шкатулку. Соберите координаты карты.', finale: 'Сокровище найдено!', bonus: 'Бонус: нарисуйте маршрут от 1-й точки к сундуку за 15 секунд.'},
    space_alert: {name: 'Тревога на космической станции', intro: 'Маяки домашних секторов отключились. Перезапустите каждый модуль.', finale: 'Автопилот восстановлен!', bonus: 'Бонус: передайте финальный код молча жестами.'},
    chronometer_chest: {name: 'Шкатулка хронометра', intro: 'Старинные часы остановились в полночь. Совместите шестерни и символы.', finale: 'Маятник снова пошёл! Шкатулка открыта.', bonus: 'Бонус: сложите все числовые коды этой игры.'},
  },
  roomsAndSpots: {
    room_living: 'Гостиная', room_kitchen: 'Кухня', room_bedroom: 'Спальня', room_hallway: 'Прихожая', room_dining: 'Обеденная зона', room_pantry: 'Кладовая', room_study: 'Уголок стола', room_patio: 'Терраса', room_lawn: 'Садовая дорожка', room_main_hall: 'Основная зона', room_breakout: 'Доп. станция',
    spot_sofa: 'Под подушкой дивана', spot_bookshelf: 'За книгой на полке', spot_tv: 'Ящик тумбы под ТВ', spot_dining_table: 'Под стулом в столовой', spot_lamp: 'У основания торшера', spot_fridge: 'Под магнитом на холодильнике', spot_cupboard: 'Внутри кухонного шкафа', spot_stove: 'Рядом с кухонным таймером', spot_jars: 'За мерными банками', spot_spices: 'На полке со специями', spot_desk: 'Под подставкой на столе', spot_wardrobe: 'В кармане пальто в шкафу', spot_chest: 'Внутри ящика с игрушками', spot_calendar: 'За листом календаря', spot_bed: 'Под углом подушки', spot_coat_rack: 'Конверт на вешалке', spot_planter: 'Под краем кашпо', spot_bench: 'Под садовой скамьёй', spot_steps: 'У третьей ступеньки', spot_pergola: 'На балке перголы', spot_whiteboard: 'На лотке маркерной доски', spot_cabinet: 'Над шкафчиком',
  },
  puzzleTypes: {
    color_symbol_lock: {name: 'Цветовой и символьный замок', badge: 'Визуал'},
    visual_cipher: {name: 'Шифр символов', badge: 'Шифр'},
    number_balance: {name: 'Весы и числовой ряд', badge: 'Логика'},
    floorplan_search: {name: 'Поиск по плану', badge: 'Карта'},
    chronology_order: {name: 'Хронология событий', badge: 'Порядок'},
    deduction_grid: {name: 'Логическое исключение', badge: 'Дедукция'},
    pattern_odd_one: {name: 'Матрица наблюдений', badge: 'Паттерн'},
  },
  station: {
    stationLabel: 'Этап', ofLabel: 'из', solvedLabel: 'Решён', lockedLabel: 'Закрыт', activeLabel: 'Активен', hidingSpotLabel: 'Тайник', gmNoteLabel: 'Заметка ведущего', solutionLabel: 'Код ответа', hint1Btn: 'Подсказка 1', hint2Btn: 'Подсказка 2', revealSolutionBtn: 'Ответ (GM)', hint1Label: 'Лёгкая подсказка', hint2Label: 'Явная подсказка', explanationLabel: 'Разбор', enterCodePlaceholder: 'Введите код', checkAnswer: 'Открыть', wrongAttempt: 'Пока неверно — проверьте подсказки.', unlockedToast: 'Этап открыт! Идите к следующей точке.', editStation: 'Изменить', moveUp: 'Выше', moveDown: 'Ниже', deleteStation: 'Удалить', regenPuzzle: 'Другая загадка', nextStation: 'Далее', missionCompleteTitle: 'Миссия выполнена!', missionCompleteDesc: 'Все этапы пройдены!', playAgain: 'Играть снова', bonusChallengeLabel: 'Бонусное задание',
    colorLabels: {indigo: 'Индиго', emerald: 'Изумруд', amber: 'Янтарь', rose: 'Коралл', sky: 'Небо'},
    shapeLabels: {circle: 'Круг', triangle: 'Треугольник', square: 'Квадрат', star: 'Звезда', diamond: 'Ромб'},
    clickTilePrompt: 'Нажмите на плитку, нарушающую правило:', orderStepsPrompt: 'Нажмите на 4 карточки в правильном порядке (1–4):', resetOrder: 'Сбросить', tapDialsPrompt: 'Нажимайте на диски для выбора цвета и фигуры:',
  },
  floorplan: {titleGm: 'Интерактивный план — Ведущий', titlePlayer: 'Интерактивный план — Игроки', subtitleGm: 'Все тайники, порядок этапов и коды на одном экране.', subtitlePlayer: 'Отслеживайте маршрут без показа ответов.', legendActive: 'Активный', legendSolved: 'Решён', legendLocked: 'Закрыт', legendSpot: 'Свободный тайник', clickPinHint: 'Нажмите на маркер этапа на карте.', reassignSpot: 'Переместить сюда'},
  editor: {modalTitle: 'Редактировать этап', titleField: 'Название', spotField: 'Тайник на плане', storyField: 'Сюжет', promptField: 'Задание', setupNoteField: 'Заметка ведущего', solutionField: 'Ответ', hint1Field: 'Подсказка 1', hint2Field: 'Подсказка 2', saveChanges: 'Сохранить', cancel: 'Отмена'},
  savedModal: {title: 'Сохранённые квесты', empty: 'Пока нет сохранённых квестов.', loadBtn: 'Загрузить', deleteBtn: 'Удалить', closeBtn: 'Закрыть', stationsCount: 'этапов'},
  printKit: {gmSheetTitle: 'Памятка ведущего', gmSheetSubtitle: 'Разложите карточки по тайникам до начала игры.', playerCardsTitle: 'Карточки с загадками для печати', playerCardsSubtitle: 'Вырежьте по пунктиру и спрячьте в комнатах.', cutLineLabel: 'Линия реза', placeAtLabel: 'Спрятать здесь', codeToEnterLabel: 'Код открытия', backToStudio: 'В студию', printNow: 'Печать'},
  puzzleTemplates: {
    colorLock: {title: 'Замок призмы', story: 'Цветные символы запечатывают конверт.', prompt: 'Выставьте диски в нужном порядке.', clueFirst: 'Позиция 1: {color} ({shape}).', clueLast: 'Последняя позиция: {color} ({shape}).', clueMiddle: 'Позиция {pos} идёт после {prevColor} — это {color} ({shape}).', clueNoRepeat: 'Цвета не повторяются.', hint1: 'Сначала закрепите первый и последний диски.', hint2: 'Порядок цветов: {preview}.', explain: 'Последовательность: {code}.'},
    visualCipher: {title: 'Таблица символов', story: 'Секретная записка зашифрована значками.', promptDigits: 'Расшифруйте символы в цифровой ПИН.', promptWord: 'Расшифруйте символы в кодовое слово.', hint1: 'Сверяйте значки слева направо.', hint2: 'Первые два символа: {prefix}.', explain: 'Таблица даёт {code}.', wordsEasy: ['КОД', 'ДОМ', 'ЛЕС', 'ШАР', 'ЛУЧ'], wordsMedium: ['КЛЮЧ', 'КАРТА', 'КНИГА', 'ЗВЕЗДА', 'ЛАМПА'], wordsHard: ['СУНДУК', 'ЗАМОК', 'КОМПАС', 'ПРИЗМА', 'СЕКРЕТ']},
    numberBalance: {title: 'Весы и ряд чисел', story: 'Латунные весы удерживают защёлку.', prompt: 'Найдите недостающее число (?).', hint1: 'Сначала вычислите вес одной фигуры в первой строке.', hint2: 'Ответ рядом с {near}.', explain: 'Решение уравнений даёт {code}.', ruleLabel: 'Правило'},
    floorplanSearch: {title: 'Поиск по комнате', story: 'На плане отмечен безопасный тайник.', prompt: 'Найдите указанное место в комнате и введите код.', clueRoom: 'Идите в: {room}.', clueSpot: 'Осмотрите: {spot}.', clueCount: 'Считайте {len}-значный код.', hint1: 'Посмотрите на SVG-план в {room}.', hint2: 'Проверьте {spot}; начало — {prefix}.', explain: 'В точке {spot} находится код {code}.'},
    chronologyOrder: {title: 'Порядок действий', story: 'Четыре карточки описывают события вразброс.', prompt: 'Нажмите карточки в хронологическом порядке.', hint1: 'Найдите самое первое действие.', hint2: 'Начните с «{first}», затем «{second}».', explain: 'Порядок: 1 → 2 → 3 → 4.', scenarios: [{steps: ['Найти ключ под ковриком', 'Открыть шкаф в прихожей', 'Достать сложенную карту', 'Отметить место сундука']}, {steps: ['Надеть защитные очки', 'Отмерить две ложки порошка', 'Размешать до зелёного свечения', 'Прочитать код на этикетке']}, {steps: ['Включить фонарик в коридоре', 'Направить луч в зеркало', 'Прочитать отражённое число', 'Ввести цифры на коробке']}]},
    deductionGrid: {title: 'Три подсказки', story: 'Три предмета с цифрами подчиняются трём правилам.', prompt: 'Найдите 3-значный код методом исключения.', hint1: 'Начните с правила, исключающего позицию 1.', hint2: 'Первая цифра {firstDigit}, последняя {lastDigit}.', explain: 'Единственный ответ: {code}.', items: ['Красный конверт', 'Синяя коробка', 'Золотой ключ'], clueNotFirst: '{item} имеет цифру {d}, и она НЕ на 1-м месте.', clueEven: 'На 1-м месте чётная цифра меньше {limit}.', clueGreater: '{itemA} больше, чем {itemB}.', finalQuestion: 'Введите 3 цифры: Красный конверт, Синяя коробка, Золотой ключ.'},
    patternOddOne: {title: 'Лишняя плитка', story: 'Одна из шести плиток нарушает правило.', prompt: 'Нажмите на плитку, отличающуюся от остальных.', hint1: 'Сравните количество точек и форму.', hint2: 'Присмотритесь к плитке #{rowHint}.', explain: 'Плитка #{tileNum} нарушает правило.', ruleDots: 'У всех, кроме одной, одинаковое число точек.', ruleShape: 'У всех, кроме одной, одинаковая фигура.'},
  },
  monetization: {
    adSlotLabel: 'Реклама', adNotice: 'Зарезервированный слот Media.net (без сдвига макета)', gearHeading: 'Полезные аксессуары для домашнего квеста', gearSubheading: 'Опциональный реквизит для сочетания с печатными карточками.', disclosure: 'Партнёрские ссылки могут приносить небольшую комиссию без доплат для вас.',
    gearItems: [
      {id: 'padlock', title: 'Кодовые замки со сменой кода', subtitle: 'Установите код из EscapeCue на реальный ящик.', tag: 'Замок', url: 'https://escapecue.bastelar.com/#gear-padlocks'},
      {id: 'uv_pen', title: 'УФ-ручки с невидимыми чернилами', subtitle: 'Пишите тайные подсказки для фонарика.', tag: 'УФ-свет', url: 'https://escapecue.bastelar.com/#gear-uv-pens'},
      {id: 'envelopes', title: 'Крафт-конверты с номерами', subtitle: 'Удобная маркировка этапов 1–6.', tag: 'Конверты', url: 'https://escapecue.bastelar.com/#gear-envelopes'},
      {id: 'board_game', title: 'Семейные настольные квесты', subtitle: 'Идеи головоломок между домашними играми.', tag: 'Семья', url: 'https://escapecue.bastelar.com/#gear-boardgames'},
    ],
  },
  editorial: {
    heading: 'Полное руководство по проведению квеста дома', subheading: 'Как безопасно спрятать подсказки и адаптировать сложность под любой возраст.',
    stepsTitle: '5 шагов к домашнему квесту',
    steps: [
      {title: '1. Выберите зоны и сюжет', body: 'Вся квартира или одна комната.'},
      {title: '2. Настройте сложность', body: 'Лёгкий для детей, средний для семьи, сложный для опытных.'},
      {title: '3. Проверьте SVG-план', body: 'Адаптируйте тайники под вашу мебель.'},
      {title: '4. Распечатайте карточки', body: 'Разложите конверты и оставьте планшет как электронный замок.'},
      {title: '5. Дозируйте подсказки', body: 'Давайте подсказку 1 через 4 минуты паузы.'},
    ],
    difficultyGuideTitle: 'Сложность по возрасту',
    difficultyRows: [
      {level: 'Лёгкий (6–10)', age: '6–10 лет', mechanics: 'Цвета, фигуры и счёт', pacing: '20–30 мин · 4 этапа'},
      {level: 'Средний (Семья)', age: '10+ лет', mechanics: 'Шифры и поиск по плану', pacing: '35–45 мин · 5 этапов'},
      {level: 'Сложный (Профи)', age: '14+ лет', mechanics: 'Цепочки логики и бонус', pacing: '45–60 мин · 6 этапов'},
    ],
    safeCluesTitle: 'Безопасные тайники без порчи мебели',
    safeClues: ['Используйте малярный скотч вместо обычного.', 'Прячьте записки в книгах или карманах.', 'Заранее обозначьте закрытые комнаты.', 'Положите приз в финальную коробку.'],
    puzzleGuideTitle: 'Типы визуальных загадок',
    faqTitle: 'Частые вопросы',
    faqs: [
      {q: 'Нужен ли ключ API ИИ?', a: 'Нет. Приложение на 100% работает локально в браузере.'},
      {q: 'Можно ли менять тайники?', a: 'Да, редактируйте любой этап в режиме ведущего.'},
      {q: 'Как сохранить игру?', a: 'Автосохранение в localStorage и экспорт/импорт JSON.'},
      {q: 'Есть ли печатная версия?', a: 'Да, Набор для печати создаёт лист ведущего и карточки.'},
    ],
  },
  footer: {
    privacyStatement:
      '100% client-side escape room generator for home, family, kids, and group play. All missions, floorplans, and saved setups stay locally in your browser.',
    canonicalNote: 'Канонический домен: https://escapecue.bastelar.com',
    copyright: '© 2026 EscapeCue · Для семейных и групповых ведущих',
  },
};
