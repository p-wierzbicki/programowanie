import chalk from 'chalk';
import kalk from './kalkulator.js';
import fs from 'fs';

async function main(){
const tekst = await fs.promises.readFile('./dane.json', 'utf8');
const dane = JSON.parse(tekst);

const znaki = { dodaj: "+", odejmij: "-", pomnoz: "*", podziel: "/" };

dane.forEach(function(dzialanie) {
    const wynik = kalk[dzialanie.operacja](dzialanie.a, dzialanie.b);
    const wynikZaokraglony = parseFloat(wynik.toFixed(2));
    console.log(chalk.green(`${dzialanie.a} ${znaki[dzialanie.operacja]} ${dzialanie.b} = ${wynikZaokraglony}`));
});
}
main();