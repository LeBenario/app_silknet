"use client";
import { useState, useEffect } from 'react';
import '../dashboard.css'; // Assurez-vous de créer ce fichier CSS pour le style
import InfiniteScroll from 'react-infinite-scroll-component';
import xml2js from 'xml2js';

const availableLanguages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja'];

const Dashboard = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [languages, setLanguages] = useState(['fr', 'en', 'es', 'de']);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState({
    fr: ['file1.json', 'file2.xlf'],
    fr: ['file1.json', 'file2.xlf'],
    en: ['file1.json', 'file2.xlf'],
    en: ['file1.json', 'file2.xlf']
  });
  const [translations, setTranslations] = useState({
    'file1.json': [
      { id: '1', text: 'Bonjour', translation: 'Hello' },
      { id: '2', text: 'Monde', translation: 'World' },
      { id: '3', text: 'Chat', translation: 'Cat' },
      { id: '4', text: 'Chien', translation: 'Dog' },
      { id: '5', text: 'Maison', translation: 'House' },
      { id: '6', text: 'Voiture', translation: 'Car' },
      { id: '7', text: 'Arbre', translation: 'Tree' },
      { id: '8', text: 'Fleur', translation: 'Flower' }
    ],
    'file2.xlf': [
      { id: '9', text: 'Bonjour', translation: 'Hola' },
      { id: '10', text: 'Monde', translation: 'Mundo' },
      { id: '11', text: 'Chat', translation: 'Gato' },
      { id: '12', text: 'Chien', translation: 'Perro' },
      { id: '13', text: 'Maison', translation: 'Casa' },
      { id: '14', text: 'Voiture', translation: 'Coche' },
      { id: '15', text: 'Arbre', translation: 'Árbol' },
      { id: '16', text: 'Fleur', translation: 'Flor' }
    ]
  });
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [exportLanguages, setExportLanguages] = useState([]);
  const [languageToAdd, setLanguageToAdd] = useState('');
  const [translationProgress, setTranslationProgress] = useState({});

  useEffect(() => {
    if (selectedFile && translations[selectedFile]) {
      setItems(translations[selectedFile].slice(0, 20));
    }
  }, [selectedFile, translations]);

  useEffect(() => {
    calculateTranslationProgress();
  }, [translations, languages]);

  const handleAddLanguage = () => {
    if (languageToAdd && !languages.includes(languageToAdd)) {
      setLanguages([...languages, languageToAdd]);
      setFiles({ ...files, [languageToAdd]: [] });
      setLanguageToAdd('');
    }
  };

  const handleRemoveLanguage = (lang) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la langue ${lang} ?`)) {
      setLanguages(languages.filter(language => language !== lang));
      const newFiles = { ...files };
      delete newFiles[lang];
      setFiles(newFiles);
    }
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = [...files[selectedLanguage]];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        let extractedData;
        if (file.name.endsWith('.json')) {
          extractedData = extractFromJson(content);
        } else if (file.name.endsWith('.xlf')) {
          extractedData = extractFromXlf(content);
        } else {
          alert('Unsupported file format');
          return;
        }
        // Vérification des ID existants
        const existingIds = new Set(translations[selectedLanguage]?.map(item => item.id));
        const filteredData = extractedData.filter(item => {
          if (existingIds.has(item.id)) {
            alert(`ID ${item.id} already exists in ${selectedLanguage}`);
            return false;
          }
          return true;
        });
        setTranslations(prev => ({
          ...prev,
          [file.name]: filteredData
        }));
        setSelectedFile(file.name); // Afficher le fichier sélectionné
      };
      reader.readAsText(file);
      newFiles.push(file.name);
    });
    setFiles(prev => ({
      ...prev,
      [selectedLanguage]: newFiles
    }));
  };

  const handleRemoveFile = (file) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le fichier ${file} ?`)) {
      setFiles(prev => ({
        ...prev,
        [selectedLanguage]: prev[selectedLanguage].filter(f => f !== file)
      }));
      setTranslations(prev => {
        const newTranslations = { ...prev };
        delete newTranslations[file];
        return newTranslations;
      });
      if (selectedFile === file) {
        setSelectedFile(null);
        setItems([]);
      }
    }
  };

  const extractFromJson = (fileContent) => {
    const data = JSON.parse(fileContent);
    return Object.keys(data).map(key => ({
      id: key,
      text: data[key],
      translation: ''
    }));
  };

  const extractFromXlf = (fileContent) => {
    let result = [];
    xml2js.parseString(fileContent, { explicitArray: false }, (err, parsedResult) => {
      if (err) throw err;
      const transUnits = parsedResult.xliff.file.body['trans-unit'];
      result = Array.isArray(transUnits) ? transUnits.map(unit => ({
        id: unit.$.id,
        text: unit.source,
        translation: unit.target || ''
      })) : [{
        id: transUnits.$.id,
        text: transUnits.source,
        translation: transUnits.target || ''
      }];
    });
    return result;
  };

  const fetchMoreData = () => {
    if (items.length >= translations[selectedFile].length) {
      setHasMore(false);
      return;
    }
    const newItems = translations[selectedFile].slice(items.length, items.length + 20);
    setItems([...items, ...newItems]);
  };

  const handleTranslationChange = (id, lang, value) => {
    setTranslations(prev => ({
      ...prev,
      [selectedFile]: prev[selectedFile].map(item =>
        item.id === id ? { ...item, [lang]: value } : item
      )
    }));
  };

  const handleExport = () => {
    const dataToExport = exportLanguages.reduce((acc, lang) => {
      acc[lang] = translations[selectedFile].map(item => ({
        id: item.id,
        text: item.text,
        translation: item[lang] || '',
      }));
      return acc;
    }, {});
    const blob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile}-translations.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportLanguageChange = (lang) => {
    setExportLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const calculateTranslationProgress = () => {
    const progress = {};
    languages.forEach(lang => {
      const totalPhrases = Object.values(translations).flat().length;
      const translatedPhrases = Object.values(translations).flat().filter(item => item[lang]).length;
      progress[lang] = ((translatedPhrases / totalPhrases) * 100).toFixed(2);
    });
    setTranslationProgress(progress);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="applications fontBlack">
          <h3>Applications</h3>
          <ul>
            <li onClick={() => setSelectedApp('App1')}>App1</li>
            <li onClick={() => setSelectedApp('App2')}>App2</li>
          </ul>
        </div>
        <div className="languages fontBlack">
          <h3>Languages</h3>
          <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <select value={languageToAdd} onChange={(e) => setLanguageToAdd(e.target.value)}>
            <option value="">Select Language to Add</option>
            {availableLanguages.filter(lang => !languages.includes(lang)).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <button onClick={handleAddLanguage}>Add Language</button>
          {selectedLanguage && <button onClick={() => handleRemoveLanguage(selectedLanguage)}>Remove Selected Language</button>}
        </div>
        {selectedLanguage && (
          <div className="files fontBlack">
            <h3>Files ({selectedLanguage})</h3>
            <input type="file" multiple onChange={handleFileChange} />
            <ul>
              {files[selectedLanguage].map((file) => (
                <li key={file}>
                  <span onClick={() => handleFileClick(file)}>{file}</span>
                  <button onClick={() => handleRemoveFile(file)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="content">
        {selectedFile && selectedFile in translations && (
          <div className="translations fontBlack">
            <h3>Translations for {selectedFile}</h3>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Original</th>
                    <th>Translation</th>
                    {languages.filter(lang => lang !== selectedLanguage).map(lang => (
                      <th key={lang}>{lang}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
  {items.map((word) => (
    <tr key={word.id}>
      <td>{word.id}</td>
      <td>
        {Array.isArray(word.text) ? 
          word.text.map(subItem => <span key={subItem.id} style={{ display: 'block' }}>{subItem.text}</span>) :
          word.text}
      </td>
      <td>{word.translation || ''}</td>
      {languages.filter(lang => lang !== selectedLanguage).map(lang => (
        <td key={lang}>
          <input
            type="text"
            value={word[lang] || ''}
            onChange={(e) => handleTranslationChange(word.id, lang, e.target.value)}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>

              </table>
            </InfiniteScroll>
            <h3>Select Languages to Export</h3>
            <div className="export-languages">
              {languages.map(lang => (
                <div key={lang}>
                  <input
                    type="checkbox"
                    id={`export-${lang}`}
                    checked={exportLanguages.includes(lang)}
                    onChange={() => handleExportLanguageChange(lang)}
                  />
                  <label htmlFor={`export-${lang}`}>{lang}</label>
                </div>
              ))}
            </div>
            <button onClick={handleExport}>Export Translations</button>
            <h3>Translation Progress</h3>
            <ul>
              {Object.entries(translationProgress).map(([lang, progress]) => (
                <li key={lang}>{lang}: {progress}% translated</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
