import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('.', 'messages.txt');
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content: data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read file' });
  }
}
