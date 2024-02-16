export function shuffleArray<T>(array: T[]): T[] {
    // Fisher-Yates洗牌算法
    let current: number = array.length;
    let temp: T, random: number;

    while (current !== 0) {
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}
