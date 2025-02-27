import React, { useState, useEffect } from "react";
import { Button, Grid, Box, Typography, Card, CardContent, Container, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Exchange = ({ closeExchange }) => {
  const [backpackItems, setBackpackItems] = useState([]); 
  const [marketplace, setMarketplace] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then(response => response.json())
      .then(data => {
        const savedMarketplace = JSON.parse(localStorage.getItem("marketplaceItems")) || [];
        setMarketplace(savedMarketplace);
        setBackpackItems(data.backpack || []);
      })
      .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("marketplaceItems", JSON.stringify(marketplace));
  }, [marketplace]);

  const handleAddToMarketplace = (item) => {
    const sellingItem = { ...item, status: "waiting" };
    setMarketplace([...marketplace, sellingItem]);
    setBackpackItems(backpackItems.filter(i => i.name !== item.name));
    alert(`${item.name} đã được đưa lên Marketplace!`);
  };

  const handleRemoveFromMarketplace = (item) => {
    setMarketplace(marketplace.filter(i => i.name !== item.name));
    setBackpackItems([...backpackItems, item]);
    alert(`${item.name} đã được gỡ khỏi Marketplace và quay lại Backpack.`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Container maxWidth="lg" sx={{ py: 3, position: "relative", zIndex: 100 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: "#f9f9f9", position: "relative" }}>
          
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
            <CloseIcon fontSize="medium" />
          </IconButton>

          <Typography variant="h5" align="center" color="primary" fontWeight={700}>
            🛒 Exchange Marketplace 🛒
          </Typography>

          <Box sx={{ mt: 3, p: 2, borderRadius: 3, backgroundColor: "#ffffff", boxShadow: 2 }}>
            <Typography variant="h6" color="primary" fontWeight={600} align="center">
              🏆 Your Item Inventory 🏆
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2, maxHeight: "40vh", overflowY: "auto" }}>
              {backpackItems.length > 0 ? (
                backpackItems.map(item => (
                  <Grid item xs={6} sm={4} md={3} key={item.name}>
                    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
                      <CardContent sx={{ p: 1 }}>
                        <img src={item.image} alt={item.name} style={{ width: "80%", height: "80px", objectFit: "contain", display: "block", margin: "0 auto" }} />
                        <Typography variant="body2" align="center" sx={{ fontWeight: 600, mt: 1 }}>{item.name}</Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          size="small"
                          onClick={() => handleAddToMarketplace(item)}
                          sx={{ mt: 1 }}
                        >
                          List for Exchange
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                  No items in backpack.
                </Typography>
              )}
            </Grid>
          </Box>

          <Box sx={{ mt: 4, p: 2, borderRadius: 3, backgroundColor: "#fdf2e9", boxShadow: 2 }}>
            <Typography variant="h6" color="primary" fontWeight={600} align="center">
              📢 Items for Exchange 📢
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ maxHeight: "40vh", overflowY: "auto", mt: 2 }}>
              {marketplace.length > 0 ? (
                marketplace.map((item) => (
                  <Grid item xs={6} sm={4} md={3} key={item.name}>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
                      <CardContent sx={{ p: 1 }}>
                        <img src={item.image} alt={item.name} style={{ width: "80%", height: "80px", objectFit: "contain", display: "block", margin: "0 auto" }} />
                        <Typography variant="body2" align="center" sx={{ fontWeight: 600, mt: 1 }}>{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ display: "block" }}>Status: {item.status}</Typography>
                        <Button variant="contained" color="primary" fullWidth size="small" sx={{ mt: 1 }}>Exchange</Button>
                        <Button variant="outlined" color="error" fullWidth size="small" sx={{ mt: 1 }} onClick={() => handleRemoveFromMarketplace(item)}>Cancel</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                  No items available.
                </Typography>
              )}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Exchange;
