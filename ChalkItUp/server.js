import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL Verbindung konfigurieren
import { createConnection } from "mysql2";

const db = createConnection({
  host: "mysql-10bf4a0a-chalkitup.g.aivencloud.com",
  port: 16719,
  user: "avnadmin",
  password: process.env.passwort,
  database: "defaultdb",
});

// Verbindung zur Datenbank herstellen
db.connect((err) => {
  if (err) {
    console.error("Fehler bei der Verbindung zur Datenbank:", err);
    return;
  }
  console.log("Mit der MySQL-Datenbank verbunden.");
});

// Spieler speichern
app.post("/save-player", (req, res) => {
  const { firstName, lastName } = req.body;
  const sql = "INSERT INTO Player (FirstName, LastName) VALUES (?, ?)";

  db.query(sql, [firstName, lastName], (err, result) => {
    if (err) {
      console.error("Fehler beim Speichern des Spielers:", err);
      return res.status(500).send("Fehler beim Speichern des Spielers");
    }
    res.status(201).send("Spieler erfolgreich gespeichert");
  });
});

// Spiele speichern
app.post("/save-game", (req, res) => {
  const { winner, loser } = req.body;
  const sql = "INSERT INTO Games (Winner, Loser) VALUES (?, ?)";

  db.query(sql, [winner, loser], (err, result) => {
    if (err) {
      console.error("Fehler beim Speichern des Spiels:", err);
      return res.status(500).send("Fehler beim Speichern des Spiels");
    }
    res.status(201).send("Spiel erfolgreich gespeichert");
  });
});

// Spieler abrufen
app.get("/players", (req, res) => {
  const sql = "SELECT * FROM Player";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Spieler:", err);
      return res.status(500).send("Fehler beim Abrufen der Spieler");
    }
    res.json(results);
  });
});

// Spiele abrufen
app.get("/games", (req, res) => {
  const sql = "SELECT * FROM Games";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen der Spiele:", err);
      return res.status(500).send("Fehler beim Abrufen der Spiele");
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
