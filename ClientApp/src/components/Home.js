import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ['.xlsx'];

    // Проверяем расширение файла
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      alert('Invalid file type. Only .xlsx files are allowed.');
      this.setState({ file: null });
      return;
    }

    this.setState({ file });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);

    try {
      const response = await fetch('https://localhost:7200/FileUpload/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.log('Failed to upload file');
      }
    } catch (error) {
      console.log('Error uploading file: ' + error.message);
    }
  }


  render() {

    return (
      <div className="container mt-4">
        {/*<h5>Hello, world!</h5>*/}

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-6">
              <input className="form-control" type="file" id="formFile" onChange={this.handleFileChange}/>
            </div>
            <div className="col-3">
              <button type="submit" className="btn btn-primary">Upload File</button>
            </div>
          </div>
        </form>

      </div>
    );
  }
}
