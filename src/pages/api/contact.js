import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Créez le chemin du fichier
    const filePath = path.join(process.cwd(), 'messages.txt');

    // Le contenu du message
    const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    // Enregistrez le message dans le fichier
    fs.appendFile(filePath, content, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save message' });
        return;
      }
      res.status(200).json({ success: 'Message saved successfully' });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
