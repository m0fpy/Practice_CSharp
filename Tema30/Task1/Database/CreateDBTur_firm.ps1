$sqlitePath = "D:\Projects\C#\Practice_CSharp\Tema30\Database\sqlite3.exe"

$dbName = "DBTur_firm.db"

& $sqlitePath $dbName "VACUUM;"

$createTablesSQL = @"
CREATE TABLE Туристы (
    Код_туриста INTEGER PRIMARY KEY AUTOINCREMENT,
    Фамилия TEXT,
    Имя TEXT,
    Отчество TEXT
);

CREATE TABLE Информация_о_туристах (
    Код_туриста INTEGER,
    Серия_паспорта TEXT,
    Город TEXT,
    Страна TEXT,
    Телефон TEXT,
    Индекс INTEGER,
    FOREIGN KEY (Код_туриста) REFERENCES Туристы(Код_туриста)
);

CREATE TABLE Туры (
    Код_тура INTEGER PRIMARY KEY AUTOINCREMENT,
    Название TEXT,
    Цена REAL,
    Информация TEXT
);

CREATE TABLE Сезоны (
    Код_сезона INTEGER PRIMARY KEY AUTOINCREMENT,
    Код_тура INTEGER,
    Дата_начала DATETIME,
    Дата_конца DATETIME,
    Сезон_закрыт BOOLEAN,
    Количество_мест INTEGER,
    FOREIGN KEY (Код_тура) REFERENCES Туры(Код_тура)
);

CREATE TABLE Путевки (
    Код_путевки INTEGER PRIMARY KEY AUTOINCREMENT,
    Код_туриста INTEGER,
    Код_сезона INTEGER,
    FOREIGN KEY (Код_туриста) REFERENCES Туристы(Код_туриста),
    FOREIGN KEY (Код_сезона) REFERENCES Сезоны(Код_сезона)
);

CREATE TABLE Оплата (
    Код_оплаты INTEGER PRIMARY KEY AUTOINCREMENT,
    Код_путевки INTEGER,
    Дата_оплаты DATETIME,
    Сумма REAL,
    FOREIGN KEY (Код_путевки) REFERENCES Путевки(Код_путевки)
);
"@

& $sqlitePath $dbName "$createTablesSQL"
