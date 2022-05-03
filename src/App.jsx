import React from 'react';
import GlobalStyle from './styles/global.js';
import { Container, Content } from './styles';
import UploadComponent from './components/Upload/index.jsx';
import FileListComponent from './components/FileList/index.jsx';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import fileSize from 'filesize';
import api from './services/api.js';

function App() {
  const { state, setState } = useState({
    files: [],
  });

  function handleUpload(files) {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setState({
      files: state.files.concat(uploadedFiles),
    });

    uploadedFiles.forEach( processUpload => {
    });
  }

  const updateFile = (id, data) => {
    setState({
      files: state.files.map(file => {
        return file.id === id ? { ...file, ...data } : file;
      }),
    });
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('/files', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        updateFile(uploadedFile.id, {
          progress,
        });
      },
    }).then(response => {
      updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id,
        url: response.data.url,
      });
    }).catch(() => {
      updateFile(uploadedFile.id, {
        error: true,
      });
    });
  }

  const uploadedFiles = state?.files;

  return (
    <div className="App">
      <Container>
        <Content>
          <UploadComponent onUpload={ handleUpload } />
          { !!uploadedFiles.length && <FileListComponent files={ uploadedFiles } /> }
        </Content>
          <GlobalStyle />
      </Container>
    </div>
  );
}

export default App;
