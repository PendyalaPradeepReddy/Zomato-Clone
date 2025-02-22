import { Box, Container, Typography } from "@mui/material";
import React from "react";

function AdminFooter() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          background: "#f5faf6",
          py: 1,
          boxShadow: 3,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body1" align="center">
            Designed and Developed By @Toufik
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default AdminFooter;
