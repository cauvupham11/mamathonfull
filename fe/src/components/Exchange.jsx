import React, { useState } from "react";
import { Button, Grid, Box, Typography, Card, CardContent, Container, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const initialItems = [
  { id: 1, name: "Dragon Pet", owner: "Player A", status: "available" },
  { id: 2, name: "Poodle Dog", owner: "Player B", status: "available" },
  { id: 3, name: "Siamese Cat", owner: "Player A", status: "available" },
  { id: 4, name: "Mini Whale", owner: "Player B", status: "available" },
];

const Exchange = ({ closeExchange }) => {
  const [items, setItems] = useState(initialItems);
  const [marketplace, setMarketplace] = useState([]); // List of items on the marketplace

  const handleAddToMarketplace = (item) => {
    setMarketplace([...marketplace, { ...item, status: "waiting" }]);
    alert(`${item.name} has been listed on the marketplace for exchange!`);
  };

  const renderMarketplace = () => (
    <Grid container spacing={2} justifyContent="center">
      {marketplace.length > 0 ? (
        marketplace.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card variant="outlined" sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" align="center">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary" align="center">Owner: {item.owner}</Typography>
                <Typography variant="body2" align="center" sx={{ color: "gray" }}>Status: {item.status}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Select for Exchange
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
          No items available in the marketplace.
        </Typography>
      )}
    </Grid>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 100 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: "#f9f9f9", position: "relative" }}>
          
          {/* Close button */}
          <IconButton
            onClick={closeExchange}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": { backgroundColor: "#d32f2f" }
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h3" gutterBottom align="center" color="primary" fontWeight={700}>
            🛒 Exchange Marketplace 🛒
          </Typography>

          {/* Player's inventory */}
          <Box sx={{ mt: 4, p: 3, borderRadius: 3, backgroundColor: "#ffffff", boxShadow: 2 }}>
            <Typography variant="h5" color="primary" fontWeight={600} align="center">
              🏆 Your Item Inventory 🏆
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              {items.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                      <Typography variant="h6" align="center">{item.name}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => handleAddToMarketplace(item)}
                        sx={{ mt: 2 }}
                      >
                        List for Exchange
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Marketplace items */}
          <Box sx={{ mt: 5, p: 3, borderRadius: 3, backgroundColor: "#fdf2e9", boxShadow: 2 }}>
            <Typography variant="h5" color="primary" fontWeight={600} align="center">
              📢 Available Items for Exchange 📢
            </Typography>
            {renderMarketplace()}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Exchange;
