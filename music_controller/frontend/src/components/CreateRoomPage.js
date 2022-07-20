// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button'
// import { responsiveFontSizes, Typography } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import { Link } from 'react-router-dom'
// import { Radio } from '@material-ui/core';
// import { RadioGroup } from '@material-ui/core';
// import { FormControlLabel } from '@material-ui/core';
// import {withRouter} from './withRouter';

// class CreateRoomPage extends Component {
//     defaultVotes = 2;

//     constructor(props) {
//         super(props);
//         this.state = {
//             guestCanPause: true,
//             votesToSkip: this.defaultVotes
//         };
//         this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)
//         this.handleVotesChange = this.handleVotesChange.bind(this)
//         this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
//     }

//     handleVotesChange(e){
//         this.setState({
//             votesToSkip: e.target.value,
//         });
//     }

//     handleGuestCanPauseChange(e){
//         this.setState({
//             guestCanPause: e.target.value === 'true' ? true : false,
//         })
//     }

//     handleRoomButtonPressed(){
//         const requestoptions = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 votes_to_skip: this.state.votesToSkip,
//                 guest_can_pause: this.state.guestCanPause,
//             })
//         };
//         fetch("/api/create-room", requestoptions).then((
//             response) => response.json())
//             .then((data)=>this.props.navigate('/room/'+data.code));
//     }

//     render() { 
//         return (
//         <Grid container spacing={1}>
//             <Grid item xs={12} align='center'>
//                 <Typography component='h4' variant='h4'>
//                     Create a room
//                 </Typography>
//             </Grid>
//             <Grid item xs={12} align='center'>
//                 <FormControl component='fieldset'>
//                     <FormHelperText>
//                         <div align='center'>
//                             Guest Control of Playback State
//                         </div>
//                     </FormHelperText>
//                     <RadioGroup 
//                     row 
//                     defaultVaule="true" 
//                     onChange={this.handleGuestCanPauseChange}>

//                         <FormControlLabel 
//                         value='true' 
//                         control={<Radio color='primary' />}
//                         label = 'Play/Pause'
//                         labelPlacement='bottom'/>

//                         <FormControlLabel 
//                         value='false' 
//                         control={<Radio color='secondary' />}
//                         label = 'No Control'
//                         labelPlacement='bottom'/>

//                     </RadioGroup>
//                 </FormControl>
//             </Grid>
//             <Grid item xs={12} align='center'>
//                 <FormControl>
//                     <TextField 
//                     required={true} 
//                     type='number'
//                     onChange={this.handleVotesChange}
//                     defaultValue={this.defaultVotes}
//                     inputProps={{
//                         min: 1,
//                         style: {textAlign:'center'}
//                     }}/>
//                     <FormHelperText>
//                         <div align='center'>
//                             Votes Required To Skip Song
//                         </div>
//                     </FormHelperText>
//                 </FormControl>
//             </Grid>
//             <Grid item xs={12} align='center'>
//                 <Button color='primary' variant='contained' onClick={this.handleRoomButtonPressed}>
//                     Create a Room
//                 </Button>
//             </Grid>
//             <Grid item xs={12} align='center'>
//                 <Button color='secondary' variant='contained' to='/' component={Link}>
//                     Back
//                 </Button>
//             </Grid>
//         </Grid>
//         );
//     }
// }

// export default withRouter(CreateRoomPage);

import React,{useState} from 'react'
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@material-ui/core'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
    let defaultVotes = 2
    let navigate = useNavigate();
    const [backData,setBackData]=useState({
        guestCanPause: true,
        votesToSkip:defaultVotes
    })

    const handleVotesChange=(e)=>{
        setBackData(data=>({
            ...data,
            votesToSkip:e.target.value
        }))
    }

    const handleGuestCanPauseChange=(e)=>{
        setBackData(data=>({
            ...data,
            guestCanPause:e.target.value=='true'?true:false
        }))
    }

    const handleRoomButtonPressed=async()=>{
        const feedBack = await fetch('/api/create-room',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                votes_to_skip:backData.votesToSkip,
                guest_can_pause:backData.guestCanPause
            })
        }).then((
                            response) => response.json())
                            .then((data) => navigate("/room/" + data.code));
        const JsonFeedBack = await feedBack.json()
        console.log(JsonFeedBack)
    }

    return (
        <Grid container spacing={1}
        >
            <Grid item xs={12} align="center"
            >
                <Typography component="h4" variant="h4"
                >
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <FormControl
            component="fieldset"
            >
                <FormHelperText>
                    <div align="center">
                    Guest control of playback state
                    </div>
                </FormHelperText>
                <RadioGroup
                row
                defaultValue="true"
                onChange={handleGuestCanPauseChange}
                >
                    <FormControlLabel value="true"
                    control={
                        <Radio color="primary"/>
                    }
                    label="Play/Pause"
                    labelPlacement="bottom"
                    />
                    <FormControlLabel value="false"
                    control={
                        <Radio color="secondary"/>
                    }
                    label="No Control"
                    labelPlacement="bottom"
                    />
                </RadioGroup>
            </FormControl>
            </Grid>
            <Grid 
            item
            xs={12}
            align="center"
            >
                    <FormControl>
                        <TextField
                        required={true}
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={defaultVotes}
                        inputProps={{
                            min:1,
                            style:{
                                textAlign:"center"
                            }
                        }}
                        />
                        <FormHelperText>
                            <div align="center">
                            Votes required to skip song
                            </div>
                        </FormHelperText>
                    </FormControl>
            </Grid>
            <Grid 
            item
            xs={12}
            align="center"
            >
                <Button
                color="primary"
                variant="contained"
                onClick={
                    handleRoomButtonPressed
                }
                >
                        Create A Room
                </Button>
            </Grid>
            <Grid 
            item
            xs={12}
            align="center"
            >
                <Button
                color="secondary"
                variant="contained"
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}
export default CreateRoomPage