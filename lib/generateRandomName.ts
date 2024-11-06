export const generateRandomName = () => {
    const adjectives = [
        "Calm", "Curious", "Daring", "Elegant", "Fierce", "Gentle",
        "Happy", "Jolly", "Kind", "Lovely", "Magical", "Noble",
        "Peaceful", "Quirky", "Radiant", "Serene", "Tender", "Vibrant",
        "Wise", "Zesty"
    ];

    const nouns = [
        "Apple", "Bear", "Cat", "Dog", "Eagle", "Fox",
        "Giraffe", "Hawk", "Iguana", "Jaguar", "Koala", "Lion",
        "Monkey", "Nightingale", "Owl", "Panda", "Quail", "Raven",
        "Snake", "Tiger", "Unicorn", "Vulture", "Whale", "Yak",
        "Zebra"
    ];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective} ${randomNoun}`;
};
