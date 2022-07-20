import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom'
import { Radio } from '@material-ui/core/Radio';
import { RadioGroup } from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

export default function RoomJoinPage(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         roomCode: "",
    //         error: ""
    //     }
    //     this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    //     this.roomButtonPressed = this.roomButtonPressed.bind(this)
    // }
    let navigate = useNavigate();
    const[roomCode,setRoomCode] = useState("");
    const[error,setError] = useState("");


    const handleTextFieldChange=(e)=>{
        setRoomCode(e.target.value)
    }

    // const roomButtonPressed=()=>{
    //     const requestOptions = {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({
    //             code: roomCode
    //         })
    //     }
    //     fetch('/api/join-room', requestOptions).then((response) =>{
    //         if (response.ok) {
    //             navigate("/room/" + roomCode)
    //         }else{
    //             setError("Room not found.");
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    const roomButtonPressed=async()=>{
        const requestOptions = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                code: roomCode
            })
        };
        fetch('/api/join-room', requestOptions).then(
            (response) =>{
                if (response.ok) {
                    navigate("/room/" + roomCode)
                }else{
                    setError("Room not found.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                error={error}
                label="Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                helperText={error}
                variant="outlined"
                onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color='primary' to="/" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant='contained' color='secondary' to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
    
}
