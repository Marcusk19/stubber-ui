import { Component } from "react";
import { Alert, Button, Input, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, Box} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';


class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            success: false,
            form: false,
        };
        this.uploadFile = this.uploadFile.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
        this.handleFormOpen = this.handleFormOpen.bind(this);
    }

    uploadFile(event){
        event.preventDefault();
        console.log(this.state.file);
        if(this.state.file === undefined){
            console.log("No file found"); 
            return;
        }
        const data = new FormData();
        data.append('myFile', this.state.file, this.state.file.name);
        const opts = {
            method:  "POST",
            headers:{
                "Accept": "application/json",
            },
            body: data,
        }
        let uri = process.env.REACT_APP_API_ENDPOINT + "/upload";
        fetch(uri, opts)
        .then(response => response.json())
        .then(success => {
            this.setState({view: "success", success: true})
        })
        .catch(error => console.log(error.message))
    }

    handleInputChange(event){
        this.setState({
            file: event.target.files[0]
        });
    }

    handleFormOpen(){
        this.setState({
            form: true
        });
    }

    handleFormClose(){
        this.setState({
            form: false,
        });
    }

    closeAlert(){
        this.setState({success: false})
    }

    render(){
        return(
            <Box>
                <IconButton onClick={this.handleFormOpen}>
                    <UploadIcon/>
                </IconButton>

                <Dialog open={this.state.form} onClose={this.handleFormClose}>
                    <DialogTitle>Upload csv of rankings</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.uploadFile}>
                            <Input
                                type="file"
                                onChange={this.handleInputChange}
                            />
                            <Button type="submit">Upload</Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleFormClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.success} onClose={this.closeAlert}>
                    <Alert open={this.state.success} onClose={this.closeAlert} severity="success">
                        File uploaded successfully!
                    </Alert>
                </Dialog>
            </Box>
        );
    }
}

export default FileUploader