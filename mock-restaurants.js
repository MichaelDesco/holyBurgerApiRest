const restaurants = [
    {
        id: 1,
        name: "WestBay",
        address: { "number": "58", "street": "boulevard des palmiers", "postCode": 33800, "city": "Bordeaux" },
        picture: "/images/westbay-burger-logo.jpg",
        telephone: "0556789012",
        mail: "westbay@gmail.com",
        created: new Date()
    },
    {
        id: 2,
        name: "Resto Ranch",
        address: { "number": "8", "street": "chemin du rodeo", "postCode": 69000, "city": "Lyon" },
        picture: "/images/resto-ranch-logo.jpg",
        telephone: "0556748879",
        mail: "restoranch@gmail.com",
        created: new Date()
    },
    {
        id: 3,
        name: "Le Hambourg",
        address: { "number": "68 bis", "street": "avenue Jean Jaurès", "postCode": 33150, "city": "Cenon" },
        picture: "/images/hambourg-burger-logo.jpg",
        telephone: "0551020912",
        mail: "lehambourg@gmail.com",
        created: new Date()
    },
    {
        id: 4,
        name: "Sunny",
        address: { "number": "61", "street": "rue du Château d'Eau", "postCode": 33000, "city": "Bordeaux" },
        picture: "/images/sunny-burger-logo.jpg",
        telephone: "0554473212",
        mail: "sunnyburger@gmail.com",
        created: new Date()
    }
];

module.exports = restaurants