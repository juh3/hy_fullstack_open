import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import PatientView from "./PatientView";
import { setPatientList, setDiagnoseList } from "./state/reducer";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoseList = async () => {
      try{
        const { data: diagnoseListfFromApi } = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses');
        dispatch(setDiagnoseList(diagnoseListfFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnoseList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path = "/patients/:id" element = {<PatientView />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
