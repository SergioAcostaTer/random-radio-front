function generateFunnyName() {
    const adjectives = ["Crazy", "Silly", "Funny", "Quirky", "Wacky", "Zany", "Goofy", "Weird", "Playful", "Cheeky"];
    const nouns = ["Duck", "Cucumber", "Banana", "Penguin", "Pancake", "Muffin", "Taco", "Squirrel", "Noodle", "Flamingo"];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return randomAdjective + randomNoun;
}

export default generateFunnyName;