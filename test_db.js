const { query } = require('./lib/db.js'); // Utilisation de require() pour du CommonJS

async function testConnection() {
  try {
    const result = await query('SELECT 1+1 AS result');
    console.log('Connexion réussie ! Résultat:', result);
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

testConnection();
