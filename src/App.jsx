import GlobalStyle from './styles/global.js';
import { Container, Content } from './styles';
import UploadComponent from './components/Upload/index.jsx';
import FileListComponent from './components/FileList/index.jsx';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import fileSize from 'filesize';

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

    uploadedFiles.forEach(uploadedFile => {
      const data = new FormData();

      data.append('file', uploadedFile.file, uploadedFile.name);
      const api = 'https://us-central1-app-react-upload-file.cloudfunctions.net/uploadFile';
      const upload = async () => {
        try {
          const response = await api.post('/files', data);

          const { url } = response.data;

          setState({
            files: state.files.map(file => {
              if (file.id === uploadedFile.id) {
                return { ...file, id: uniqueId(), uploaded: true, url, preview: null };
              }

              return file;
            }),
          });
        } catch (err) {
          console.log(err);

          setState({
            files: state.files.map(file => {
              if (file.id === uploadedFile.id) {
                return { ...file, error: true };
              }

              return file;
            }),
          });
        }
      };

      upload();
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
