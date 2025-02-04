import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL Verbindung konfigurieren
import { createConnection } from 'mysql2';

const db = createConnection({
    host: 'mysql-10bf4a0a-chalkitup.g.aivencloud.com',
    port: 16719,
    user: 'avnadmin',
    password: process.env.password,
    database: 'defaultdb',
});

// Verbindung zur Datenbank herstellen
db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
        return;
    }
    console.log('Mit der MySQL-Datenbank verbunden.');
});

// Spieler speichern
app.post('/save-player', (req, res) => {
    const { firstName, lastName } = req.body;
    const sql = 'INSERT INTO Player (FirstName, LastName) VALUES (?, ?)';

    db.query(sql, [firstName, lastName], (err, result) => {
        if (err) {
            console.error('Fehler beim Speichern des Spielers:', err);
            return res.status(500).send('Fehler beim Speichern des Spielers');
        }
        res.status(201).send('Spieler erfolgreich gespeichert');
    });
});

// Spiele speichern
app.post('/save-game', (req, res) => {
    const { winner, loser } = req.body;
    const sql = 'INSERT INTO Games (Winner, Loser) VALUES (?, ?)';

    db.query(sql, [winner, loser], (err, result) => {
        if (err) {
            console.error('Fehler beim Speichern des Spiels:', err);
            return res.status(500).send('Fehler beim Speichern des Spiels');
        }
        res.status(201).send('Spiel erfolgreich gespeichert');
    });
});

// Spieler abrufen
app.get('/players', (req, res) => {
    const sql = 'SELECT * FROM Player';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Spieler:', err);
            return res.status(500).send('Fehler beim Abrufen der Spieler');
        }
        res.json(results);
    });
});

// Spiele abrufen
app.get('/games', (req, res) => {
    const sql = 'SELECT * FROM Games';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Spiele:', err);
            return res.status(500).send('Fehler beim Abrufen der Spiele');
        }
        res.json(results);
    });
});

app.get('/player-stats', (req, res) => {
    const sql = `
        SELECT 
            p1.PlayerID AS Player1, 
            p2.PlayerID AS Player2,
            (SELECT COUNT(*) FROM Games g WHERE g.Winner = p1.PlayerID AND g.Loser = p2.PlayerID) AS Wins_P1,
            (SELECT COUNT(*) FROM Games g WHERE g.Winner = p2.PlayerID AND g.Loser = p1.PlayerID) AS Wins_P2
        FROM Player p1
        JOIN Player p2 ON p1.PlayerID < p2.PlayerID;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Spieler-Statistiken:', err);
            return res
                .status(500)
                .send('Fehler beim Abrufen der Spieler-Statistiken');
        }
        res.json(results);
    });
});

app.get('/games-between', (req, res) => {
    const { player1, player2 } = req.query;

    if (!player1 || !player2) {
        return res.status(400).send('Beide Spieler-IDs sind erforderlich.');
    }

    const sql = `
        SELECT * FROM Games 
        WHERE (Winner = ? AND Loser = ?) 
        OR (Winner = ? AND Loser = ?)
        ORDER BY GameID DESC;
    `;

    db.query(sql, [player1, player2, player2, player1], (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Spiele:', err);
            return res.status(500).send('Fehler beim Abrufen der Spiele');
        }
        res.json(results);
    });
});

app.put('/updatePlayer', (req, res) => {
    const { playerId, firstName, lastName } = req.body;

    // Überprüfen, ob alle notwendigen Parameter vorhanden sind
    if (!playerId || !lastName || !firstName) {
        return res.status(400).json({
            message: 'Missing required fields: playerID, lastName, firstName',
        });
    }

    const sql =
        'UPDATE Player SET LastName = ?, FirstName = ? WHERE PlayerID = ?';

    db.query(sql, [lastName, firstName, playerId], (err, results) => {
        if (err) {
            console.error('Fehler beim Update:', err);
            return res.status(500).json({ message: 'Error updating player' });
        }

        // Wenn keine Zeilen betroffen sind, wurde der Spieler möglicherweise nicht gefunden
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({ message: 'Player successfully updated' });
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
