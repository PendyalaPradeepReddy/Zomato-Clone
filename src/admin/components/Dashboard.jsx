import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PieChartComponent from "./PieChartComponent";

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography
        variant="h5"
        component="h5"
        className="text-center underline text-red-800 mt-2"
      >
        Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: "20px 40%" }}
        onClick={() => alert("Still Working...")}
      >
        Admin Login
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
            <Typography variant="h6" component="h6">
              Pie Chart
            </Typography>
            <PieChartComponent />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
