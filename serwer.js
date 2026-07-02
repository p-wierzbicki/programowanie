import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import kalk from './kalkulator.js';
import db from './baza.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hej, serwer działa!');
});

app.get('/dane', async function(req,res) {
    const tekst = await fs.promises.readFile('./dane.json', 'utf8');
    const dane = JSON.parse(tekst);
    res.json(dane);
});

app.post('/oblicz', function(req, res) {
    const { a, b, operacja } = req.body;

    if (!a || !b || !operacja) {
        return res.status(400).json({ blad: 'Brakuje danych — podaj a, b i operacje' });
    }

    if (!kalk[operacja]) {
        return res.status(400).json({ blad: `Nieznana operacja: ${operacja}` });
    }

    const wynik = kalk[operacja](a, b);

    db.prepare('INSERT INTO obliczenia (a, b, operacja, wynik) VALUES (?, ?, ?, ?)').run(a, b, operacja, wynik);

    res.json({ a, b, operacja, wynik });
});

app.get('/historia', function(req, res) {
    const historia = db.prepare('SELECT * FROM obliczenia').all();
    res.json(historia);
});

app.listen(PORT, function() {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});