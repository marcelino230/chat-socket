import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Card, CardContent, TextField, Button, Select, MenuItem } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [channel, setChannel] = useState('general');
    const history = useHistory();

    useEffect(() => {
        sessionStorage.clear();   // when in signin page, there's no user connected
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.setItem('username', username);
        history.push({
            pathname: '/chat',
            state: { username, channel }
        });
    }

    return (
        <Grid container justify="center" alignItems="center" className="container-height">
            <Card style={{ backgroundColor: "darkgrey" }}>
                <CardContent>
                    <h1>Welcome to ChatApp!</h1>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <Grid container justify="center" alignItems="center" spacing={1}>
                            <Grid item className="mt-4">
                                <FontAwesomeIcon icon={faUser} />
                            </Grid>
                            <Grid item>
                                <TextField id="standard-basic" value={username} label="Username" onChange={e => setUsername(e.target.value)} />
                            </Grid>
                            <Grid item>
                                <Button type="submit"
                                    disabled={username.length >= 3 && username.length <= 12 ? false : true}
                                    variant="contained" className="mt-2">
                                    Join
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container justify="center" alignItems="center" className="mt-3" spacing={3}>
                        <Select
                            value={channel}
                            onChange={e => setChannel(e.target.value)}
                            style={{ minWidth: 120 }}
                        >
                            <MenuItem value={'general'}>General</MenuItem>
                            <MenuItem value={'hobbies'}>Hobbies</MenuItem>
                            <MenuItem value={'programming'}>Programming</MenuItem>
                        </Select>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SignIn
