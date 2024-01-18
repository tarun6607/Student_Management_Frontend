/**
 * Student component displays a form to add a new student and fetch/display a list of existing students.
 *
 * Uses React hooks like useState and useEffect for state management and data fetching.
 * Renders UI with Material UI components.
 * Handles form submission by calling API to add student to backend.
 * Fetches list of students from API and displays them.
 */

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function Student() {
    const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [students, setStudents] = useState([]);
    const classes = useStyles();

    const handleClick = async (e) => {
        e.preventDefault();
        const student = { name, address };

        try {
            const response = await fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });

            if (response.ok) {
                console.log("New Student added");
            } else {
                throw new Error("Request failed with status: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:8080/student/getAll");
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    });

    /*
      useEffect(() => {
          fetch("http://localhost:8080/student/getAll")
              .then(res => res.json())
              .then((result) => {
                  setStudents(result);
              }
              )
      }, [])
      */

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}>
                    <u>Add Student</u>
                </h1>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic"
                        label="Student Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Student Address"
                        variant="outlined"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
            </Paper>

            <h1>Students</h1>

            <Paper elevation={3} style={paperStyle}>
                {students.map((student) => (
                    <Paper
                        elevation={6}
                        style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                        key={student.id}
                    >
                        Id: {student.id}
                        <br />
                        Name: {student.name}
                        <br />
                        Address: {student.address}
                        <br />
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
